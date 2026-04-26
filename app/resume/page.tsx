'use client';

import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';

type UploadStatus = 'No file selected' | 'TXT extracted successfully' | 'Parsing coming next' | 'Unsupported file type';

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
  const [fileSize, setFileSize] = useState('');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('No file selected');
  const [resumeText, setResumeText] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const storedResume = window.localStorage.getItem('applisynai_resume_text');
    if (storedResume) {
      setResumeText(storedResume);
    }
  }, []);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFileName(selectedFile.name);
    setFileSize(formatFileSize(selectedFile.size));
    setStoredFile(selectedFile);
    setSaveMessage('');

    const extension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (extension === 'txt') {
      const text = await selectedFile.text();
      setResumeText(text);
      setUploadStatus('TXT extracted successfully');
      return;
    }

    if (extension === 'pdf' || extension === 'docx') {
      setUploadStatus('Parsing coming next');
      return;
    }

    setUploadStatus('Unsupported file type');
  };

  const handleSaveResume = () => {
    window.localStorage.setItem('applisynai_resume_text', resumeText);
    setSaveMessage('Resume text saved locally.');
  };

  return (
    <DashboardLayout>
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
              <span className="font-semibold">File size:</span> {fileSize || '—'}
            </p>
            <p>
              <span className="font-semibold">Upload status:</span> {uploadStatus}
            </p>
            {storedFile && (
              <p>
                <span className="font-semibold">File selected:</span> Ready
              </p>
            )}
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
    </DashboardLayout>
  );
}
