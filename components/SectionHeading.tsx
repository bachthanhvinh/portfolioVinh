type SectionHeadingProps = {
  index: string;
  title: string;
};

export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-4 border-b border-subtle pb-3">
      <span className="font-mono text-[10px] tracking-[0.2em] text-muted">/{index}</span>
      <h2 className="font-synth text-2xl leading-none md:text-3xl text-fg">{title}</h2>
      <span aria-hidden className="ml-auto h-3 w-3 rotate-6 bg-neon-magenta" />
    </div>
  );
}