import { NextResponse } from 'next/server';

type MatchResponse = {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: 'Apply' | 'Maybe' | 'Skip';
  explanation: string;
  resumeImprovementTips: string[];
};

function sanitizeResult(value: unknown): MatchResponse {
  const fallback: MatchResponse = {
    matchScore: 0,
    matchedSkills: [],
    missingSkills: [],
    recommendation: 'Maybe',
    explanation: 'No explanation provided.',
    resumeImprovementTips: [],
  };

  if (!value || typeof value !== 'object') return fallback;
  const raw = value as Partial<MatchResponse>;

  const matchScore = typeof raw.matchScore === 'number' ? Math.max(0, Math.min(100, Math.round(raw.matchScore))) : 0;
  const matchedSkills = Array.isArray(raw.matchedSkills) ? raw.matchedSkills.filter((item): item is string => typeof item === 'string') : [];
  const missingSkills = Array.isArray(raw.missingSkills) ? raw.missingSkills.filter((item): item is string => typeof item === 'string') : [];
  const recommendation = raw.recommendation === 'Apply' || raw.recommendation === 'Maybe' || raw.recommendation === 'Skip' ? raw.recommendation : 'Maybe';
  const explanation = typeof raw.explanation === 'string' ? raw.explanation : fallback.explanation;
  const resumeImprovementTips = Array.isArray(raw.resumeImprovementTips)
    ? raw.resumeImprovementTips.filter((item): item is string => typeof item === 'string')
    : [];

  return { matchScore, matchedSkills, missingSkills, recommendation, explanation, resumeImprovementTips };
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENROUTER_API_KEY is missing on server.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const resumeText = typeof body?.resumeText === 'string' ? body.resumeText.trim() : '';
    const jobDescription = typeof body?.jobDescription === 'string' ? body.jobDescription.trim() : '';

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'resumeText and jobDescription are required.' }, { status: 400 });
    }

    const systemPrompt =
      'You are an expert recruiting analyst. Compare a resume to a job description. Return JSON only with keys: matchScore (0-100), matchedSkills (string[]), missingSkills (string[]), recommendation (Apply|Maybe|Skip), explanation (string), resumeImprovementTips (string[]).';

    const userPrompt = `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`;

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      return NextResponse.json({ error: `OpenRouter request failed: ${errorText}` }, { status: 502 });
    }

    const completion = await openRouterResponse.json();
    const content = completion?.choices?.[0]?.message?.content;

    if (typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid model response format.' }, { status: 502 });
    }

    const parsed = JSON.parse(content);
    const result = sanitizeResult(parsed);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: `Matcher API failed: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
