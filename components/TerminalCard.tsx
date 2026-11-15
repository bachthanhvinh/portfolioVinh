'use client';

import type { ReactNode } from 'react';
import TiltCard from '@/components/TiltCard';

export default function TerminalCard() {
  return (
    <TiltCard max={6} className="card-base border border-subtle">
      <div className="flex items-center justify-between border-b border-subtle bg-card px-3 py-2">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 bg-neon-magenta" />
          <span className="font-mono text-[10px] tracking-[0.15em] text-neon-green">profile.json</span>
        </div>
        <div aria-hidden className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-neon-magenta/40" />
          <span className="h-1.5 w-1.5 bg-neon-cyan/40" />
          <span className="h-1.5 w-1.5 bg-neon-green/40" />
        </div>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-[11px] leading-6 md:text-xs">
        <div className="min-w-max">
          <Line n={1}>
            <span className="text-neon-green">$</span> <span className="text-neon-cyan">whoami</span>
          </Line>
          <Line n={2}>
            <span className="text-neon-green">vinh</span>
          </Line>
          <Line n={3}>
            <span className="text-neon-green">$</span> <span className="text-neon-cyan">cat profile.json</span>
          </Line>
          <Line n={4}>
            <span className="text-muted">{'{'}</span>
          </Line>
          <Line n={5}>
            <span>{'  '}</span>
            <span className="text-muted">{'"role"'}</span>
            <span className="text-muted">: </span>
            <span className="text-neon-cyan">{'"Frontend Developer"'}</span>
            <span className="text-muted">,</span>
          </Line>
          <Line n={6}>
            <span>{'  '}</span>
            <span className="text-muted">{'"education"'}</span>
            <span className="text-muted">: </span>
            <span className="text-neon-cyan">{'"BIU · 2022—2026"'}</span>
            <span className="text-muted">,</span>
          </Line>
          <Line n={7}>
            <span>{'  '}</span>
            <span className="text-muted">{'"gpa"'}</span>
            <span className="text-muted">: </span>
            <span className="bg-neon-magenta/20 px-0.5 text-neon-magenta">3.25</span>
            <span className="text-muted">,</span>
          </Line>
          <Line n={8}>
            <span>{'  '}</span>
            <span className="text-muted">{'"stack"'}</span>
            <span className="text-muted">: [</span>
            <span className="text-neon-cyan">{'"React", "Next.js", "TypeScript"'}</span>
            <span className="text-muted">],</span>
          </Line>
          <Line n={9}>
            <span className="text-muted">{'}'}</span>
          </Line>
          <Line n={10}>
            <span className="text-neon-green">$</span>
            <span className="caret ml-1 inline-block h-3 w-1.5 translate-y-[2px] bg-neon-magenta" />
          </Line>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-subtle px-3 py-1.5">
        <span className="font-mono text-[9px] tracking-[0.15em] text-muted">vinh@portfolio:~</span>
        <span aria-hidden className="h-2 w-2 bg-neon-cyan" />
      </div>
    </TiltCard>
  );
}

function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span aria-hidden className="w-4 shrink-0 select-none text-right text-muted">
        {n}
      </span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}