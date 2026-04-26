export type ParsedProfile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl: string;
  skills: string;
  education: string;
  certifications: string;
  yearsOfExperience: string;
  recentJobTitles: string;
};

export type ResumeSource = 'uploaded' | 'pasted' | 'ai_generated';

export type ResumeRecord = {
  id: string;
  name: string;
  source: ResumeSource;
  fileName: string;
  createdAt: string;
  resumeText: string;
  parsedProfile: ParsedProfile;
};

const RESUMES_KEY = 'applisynai_resumes';
export const SELECTED_RESUME_KEY = 'applisynai_selected_resume_id';

const emptyProfile: ParsedProfile = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedInUrl: '',
  portfolioUrl: '',
  skills: '',
  education: '',
  certifications: '',
  yearsOfExperience: '',
  recentJobTitles: '',
};

export function getResumes(): ResumeRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const value = window.localStorage.getItem(RESUMES_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value) as ResumeRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResumes(resumes: ResumeRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
}

export function parseResumeProfile(text: string): ParsedProfile {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';
  const phone = text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || '';
  const linkedInUrl = text.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s]+/i)?.[0] || '';
  const githubUrl = text.match(/https?:\/\/(www\.)?(github\.com|portfolio\.)[^\s]*/i)?.[0] || '';
  const location = text.match(/\b([A-Z][a-z]+,\s?[A-Z]{2})\b/)?.[0] || '';
  const yearsOfExperience = text.match(/(\d+\+?\s+years?\s+of\s+experience)/i)?.[0] || '';

  const skillsLine = lines.find((line) => /skills?/i.test(line)) || '';
  const educationLine = lines.find((line) => /education|bachelor|master|university|college/i.test(line)) || '';
  const certificationLine = lines.find((line) => /certification|certified|certificate/i.test(line)) || '';
  const titleLine = lines.find((line) => /engineer|developer|manager|architect|analyst|consultant|lead/i.test(line)) || '';

  const fullName = lines[0] || '';

  return {
    ...emptyProfile,
    fullName,
    email,
    phone,
    location,
    linkedInUrl,
    portfolioUrl: githubUrl,
    skills: skillsLine.replace(/^skills?[:\-]?/i, '').trim(),
    education: educationLine,
    certifications: certificationLine,
    yearsOfExperience,
    recentJobTitles: titleLine,
  };
}

export function addResumeRecord(record: ResumeRecord) {
  const resumes = getResumes();
  saveResumes([record, ...resumes]);
}
