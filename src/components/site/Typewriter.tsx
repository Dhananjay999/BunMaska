import { useEffect, useState } from "react";

export function Typewriter({
  words,
  interval = 2800,
}: {
  words: string[];
  interval?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words, interval]);

  return (
    <span className="relative inline-flex align-bottom overflow-hidden">
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <span className="absolute inset-0 whitespace-nowrap" aria-live="polite">
        {words.map((w, i) => (
          <span
            key={w}
            className="text-gradient absolute inset-0 transition-all duration-700 ease-out will-change-transform"
            style={{
              opacity: i === index ? 1 : 0,
              transform:
                i === index
                  ? "translateY(0)"
                  : i === (index - 1 + words.length) % words.length
                  ? "translateY(-100%)"
                  : "translateY(100%)",
            }}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
