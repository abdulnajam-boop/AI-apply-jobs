import { getAuthUser } from '@/lib/auth';

export type ParsedProfile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  skills: string;
  education: string;
  certifications: string;
  recentTitles: string;
};

export type ResumeSource = 'uploaded' | 'pasted' | 'ai_generated';

export type ResumeRecord = {
  id: string;
  ownerId: string;
  name: string;
  source: ResumeSource;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
  resumeText: string;
  parsedProfile: ParsedProfile;
};

const RESUMES_KEY = 'applisynai_resumes';
export const ACTIVE_RESUME_KEY = 'applisynai_active_resume_id';

const emptyProfile: ParsedProfile = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  skills: '',
  education: '',
  certifications: '',
  recentTitles: '',
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

export function getResumesForCurrentUser() {
  const authUser = getAuthUser();
  if (!authUser) return [];
  return getResumes().filter((resume) => resume.ownerId === authUser.id);
}

export function parseResumeProfile(text: string): ParsedProfile {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';
  const phone = text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || '';
  const linkedin = text.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s]+/i)?.[0] || '';
  const github = text.match(/https?:\/\/(www\.)?(github\.com|portfolio\.)[^\s]*/i)?.[0] || '';
  const location = text.match(/\b([A-Z][a-z]+,\s?[A-Z]{2})\b/)?.[0] || '';

  const skillsLine = lines.find((line) => /skills?/i.test(line)) || '';
  const educationLine = lines.find((line) => /education|bachelor|master|university|college/i.test(line)) || '';
  const certificationLine = lines.find((line) => /certification|certified|certificate/i.test(line)) || '';
  const titleLine = lines.find((line) => /engineer|developer|manager|architect|analyst|consultant|lead/i.test(line)) || '';

  return {
    ...emptyProfile,
    fullName: lines[0] || '',
    email,
    phone,
    location,
    linkedin,
    github,
    skills: skillsLine.replace(/^skills?[:\-]?/i, '').trim(),
    education: educationLine,
    certifications: certificationLine,
    recentTitles: titleLine,
  };
}

export function upsertResume(record: ResumeRecord) {
  const resumes = getResumes();
  const existingIndex = resumes.findIndex((resume) => resume.id === record.id);
  if (existingIndex >= 0) {
    resumes[existingIndex] = record;
    saveResumes(resumes);
    return;
  }

  saveResumes([record, ...resumes]);
}

export function deleteResumeById(id: string) {
  const resumes = getResumes();
  saveResumes(resumes.filter((resume) => resume.id !== id));
}
