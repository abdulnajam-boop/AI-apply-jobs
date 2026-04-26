'use client';

import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { getAuthUser } from '@/lib/auth';
import {
  ACTIVE_RESUME_KEY,
  ResumeRecord,
  ResumeSource,
  deleteResumeById,
  getResumesForCurrentUser,
  parseResumeProfile,
  upsertResume,
} from '@/lib/resume';

type UploadStatus = 'No file selected' | 'TXT extracted successfully' | 'Parsing coming next, paste text below' | 'Unsupported file type';

const acceptedTypes = '.pdf,.docx,.txt';

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [storedFile, setStoredFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('No file selected');
  const [resumeText, setResumeText] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [savedResumes, setSavedResumes] = useState<ResumeRecord[]>([]);
  const [activeResumeId, setActiveResumeId] = useState('');

  const refreshUserResumes = () => {
    const resumes = getResumesForCurrentUser();
    setSavedResumes(resumes);
    const localActive = window.localStorage.getItem(ACTIVE_RESUME_KEY) || resumes[0]?.id || '';
    setActiveResumeId(localActive);
  };

  useEffect(() => {
    refreshUserResumes();
  }, []);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFileName(selectedFile.name);
    setFileSize(selectedFile.size);
    setStoredFile(selectedFile);
    if (!resumeName) {
      setResumeName(selectedFile.name.replace(/\.[^/.]+$/, ''));
    }
    setSaveMessage('');

    const extension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (extension === 'txt') {
      const text = await selectedFile.text();
      setResumeText(text);
      setUploadStatus('TXT extracted successfully');
      return;
    }

    if (extension === 'pdf' || extension === 'docx') {
      setUploadStatus('Parsing coming next, paste text below');
      return;
    }

    setUploadStatus('Unsupported file type');
  };

  const handleSaveResume = () => {
    const authUser = getAuthUser();
    if (!authUser) return;

    const cleanText = resumeText.trim();
    if (!cleanText) {
      setSaveMessage('Please add resume text before saving.');
      return;
    }

    const parsedProfile = parseResumeProfile(cleanText);
    const source: ResumeSource = storedFile ? 'uploaded' : 'pasted';
    const now = new Date().toISOString();

    const resumeRecord: ResumeRecord = {
      id: `resume_${Date.now()}`,
      ownerId: authUser.id,
      name: resumeName.trim() || 'Untitled Resume',
      source,
      fileName: fileName || 'Manual paste',
      fileType: storedFile?.type || 'text/plain',
      fileSize,
      createdAt: now,
      updatedAt: now,
      resumeText: cleanText,
      parsedProfile,
    };

    upsertResume(resumeRecord);
    window.localStorage.setItem(ACTIVE_RESUME_KEY, resumeRecord.id);
    window.localStorage.setItem('applisynai_user_profile', JSON.stringify({ ownerId: authUser.id, ...parsedProfile }));

    setSaveMessage('Resume saved successfully.');
    refreshUserResumes();
  };

  const handleUseResume = (resumeId: string) => {
    window.localStorage.setItem(ACTIVE_RESUME_KEY, resumeId);
    setActiveResumeId(resumeId);
    setSaveMessage('Active resume updated.');
  };

  const handleRenameResume = (resume: ResumeRecord) => {
    const nextName = window.prompt('Rename resume', resume.name);
    if (!nextName) return;

    upsertResume({ ...resume, name: nextName.trim(), updatedAt: new Date().toISOString() });
    refreshUserResumes();
  };

  const handleDeleteResume = (resumeId: string) => {
    deleteResumeById(resumeId);
    const currentActive = window.localStorage.getItem(ACTIVE_RESUME_KEY);
    if (currentActive === resumeId) {
      window.localStorage.removeItem(ACTIVE_RESUME_KEY);
    }
    refreshUserResumes();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card title="Resume Upload" description="Upload your resume file or paste your resume text below.">
          <div className="space-y-6">
            <div className="rounded-lg border border-dashed border-border bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-600">Accepted formats: PDF, DOCX, TXT</p>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes}
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleFileClick}
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Select File
              </button>
            </div>

            <div className="grid gap-2 rounded-lg border border-border bg-white p-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold">File name:</span> {fileName || '—'}
              </p>
              <p>
                <span className="font-semibold">File size:</span> {fileSize ? formatFileSize(fileSize) : '—'}
              </p>
              <p>
                <span className="font-semibold">Upload status:</span> {uploadStatus}
              </p>
            </div>

            <div>
              <label htmlFor="resume-name" className="mb-2 block text-sm font-semibold text-slate-700">
                Resume name
              </label>
              <input
                id="resume-name"
                value={resumeName}
                onChange={(event) => setResumeName(event.target.value)}
                placeholder="e.g. DevOps Resume"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm text-slate-700"
              />
            </div>

            <div>
              <label htmlFor="resume-text" className="mb-2 block text-sm font-semibold text-slate-700">
                Resume text
              </label>
              <textarea
                id="resume-text"
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                rows={12}
                placeholder="Paste your resume text here..."
                className="w-full rounded-lg border border-border px-3 py-2 text-sm text-slate-700"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSaveResume}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Save Resume
              </button>
              <Link
                href="/matcher"
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Continue to Job Matcher
              </Link>
            </div>

            {saveMessage && <p className="text-sm font-medium text-emerald-700">{saveMessage}</p>}
          </div>
        </Card>

        <Card title="Your Resume Library" description="Manage saved resumes for this account.">
          <div className="space-y-3">
            {savedResumes.length === 0 && <p className="text-sm text-slate-500">No resumes yet. Save one above to get started.</p>}
            {savedResumes.map((resume) => (
              <div key={resume.id} className="rounded-lg border border-border p-3 text-sm">
                <p className="font-semibold text-slate-900">{resume.name}</p>
                <p className="text-xs text-slate-500">{resume.fileName} · {resume.source}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" onClick={() => handleUseResume(resume.id)} className="rounded-md border px-2 py-1 text-xs">
                    {activeResumeId === resume.id ? 'Active' : 'Select active resume'}
                  </button>
                  <button type="button" onClick={() => handleRenameResume(resume)} className="rounded-md border px-2 py-1 text-xs">
                    Rename
                  </button>
                  <button type="button" onClick={() => handleDeleteResume(resume.id)} className="rounded-md border px-2 py-1 text-xs text-rose-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
