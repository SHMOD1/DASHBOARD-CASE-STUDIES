"use client";

import { motion } from "framer-motion";
import type { MediaAsset, Section, StatEntry } from "@/types/content";
import { Heading, SectionShell } from "@/components/sections/shared";
import { useReveal } from "@/hooks/useReveal";
import { staggerContainer } from "@/animations/variants";
import { useCounter } from "@/hooks/useCounter";
import { formatNumber } from "@/lib/utils";

function Stat({ stat }: { stat: StatEntry }) {
  const { ref, value } = useCounter(stat.value);
  return (
    <div className="text-center">
      <p className="font-heading text-5xl md:text-6xl">
        <span ref={ref}>{formatNumber(value)}</span>
        {stat.suffix}
      </p>
      <p className="font-body mt-3 text-sm uppercase tracking-[0.25em] opacity-60">{stat.label}</p>
    </div>
  );
}

const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};

export function StatsSection({ section }: { section: Section; media: MediaAsset[] }) {
  const { content, animation, layout } = section;
  const reveal = useReveal(animation);
  const stats = content.stats ?? [];

  return (
    <SectionShell section={section} contentClassName="w-full">
      {content.heading && (
        <div className="mb-14 text-center">
          <Heading scale={0.5}>{content.heading}</Heading>
        </div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer(0.12)}
        className={`grid gap-10 ${COLS[layout.columns] ?? COLS[3]}`}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={reveal.variants}>
            <Stat stat={stat} />
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
