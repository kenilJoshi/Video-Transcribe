// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Video className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">ReelForge</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-9 text-sm" asChild>
              <Link href="/projects">My Projects</Link>
            </Button>
            <Button variant="ghost" className="h-9 text-sm" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}