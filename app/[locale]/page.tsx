import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';

export default function Page() {
  return (
    <>
      <Hero />
      <Marquee />

      <main id="main" className="mx-auto max-w-5xl overflow-x-clip px-4">
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
    </>
  );
}