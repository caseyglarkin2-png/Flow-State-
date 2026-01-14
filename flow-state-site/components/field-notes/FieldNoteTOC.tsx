"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { List } from "lucide-react";

type TocItem = {
  id: string;
  label: string;
};

type FieldNoteTOCProps = {
  items: TocItem[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FieldNoteTOC({ items }: FieldNoteTOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.aside
      className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="glass-card p-4 w-56">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neon/10">
          <List size={16} className="text-neon/70" />
          <span className="text-xs uppercase tracking-wider text-neon/70 font-medium">
            Contents
          </span>
        </div>

        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                activeId === item.id
                  ? "bg-neon/20 text-neon border-l-2 border-neon"
                  : "text-steel/70 hover:text-white hover:bg-neon/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
