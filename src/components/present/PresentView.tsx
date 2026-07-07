import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageRenderer } from '../render/PageRenderer';
import { useDocStore } from '../../store/useDocStore';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-violet-500"
    />
  );
}

function ChromeBar({ title, accent }: { title: string; accent: string }) {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > lastY && y > 120);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-3 text-sm text-white/80 backdrop-blur transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ background: 'rgba(10,10,13,0.55)' }}
    >
      <Link to="/" className="rounded-md border border-white/15 px-2.5 py-1 text-xs hover:bg-white/10">
        ← Editor
      </Link>
      <span className="truncate font-medium" style={{ color: accent }}>
        {title}
      </span>
    </div>
  );
}

export function PresentView() {
  const doc = useDocStore((s) => s.doc);

  useEffect(() => {
    document.title = doc.seo.title || doc.title;
  }, [doc.seo.title, doc.title]);

  return (
    <div className="min-h-screen" style={{ background: doc.theme.background, color: doc.theme.text }}>
      <ScrollProgressBar />
      <ChromeBar title={doc.title} accent={doc.theme.accent} />
      <PageRenderer doc={doc} />
    </div>
  );
}
