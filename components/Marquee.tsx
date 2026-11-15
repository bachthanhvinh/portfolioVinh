const items = [
  { label: 'REACT' },
  { label: 'NEXT.JS' },
  { label: 'TYPESCRIPT' },
  { label: 'JAVASCRIPT' },
  { label: 'TAILWIND' },
  { label: 'FRAMER MOTION' },
  { label: 'HTML' },
  { label: 'CSS' },
];

export default function Marquee() {
  return (
    <div className="overflow-hidden py-3">
      <div className="marquee -rotate-1 scale-105 overflow-hidden border-y border-subtle bg-card py-3">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-7 pr-7"
            >
              {items.map((item, index) => (
                <div key={item.label} className="flex items-center gap-7">
                  <span className={`text-sm font-synth ${index % 2 === 0 ? 'text-neon-magenta' : 'text-neon-cyan'}`}>
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className={`h-2 w-2 ${index % 2 === 0 ? 'bg-neon-magenta' : 'bg-neon-cyan'}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}