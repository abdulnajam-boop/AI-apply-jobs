import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Applisynai',
  description: 'Smarter job matching. Better applications. AI-powered workflow for matching, tailoring, and tracking applications.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
