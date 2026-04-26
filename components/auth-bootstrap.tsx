'use client';

import { useEffect } from 'react';
import { initializeDefaultUsers } from '@/lib/auth';

export function AuthBootstrap() {
  useEffect(() => {
    initializeDefaultUsers();
  }, []);

  return null;
}
