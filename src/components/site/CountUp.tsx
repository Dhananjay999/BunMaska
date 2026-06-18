import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: string;
  suffix?: string | null;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>("0");
  const startedRef = useRef(false);

  const numeric = Number(String(value).replace(/[^\d.-]/g, ""));
  const isNumeric = !Number.isNaN(numeric) && Number.isFinite(numeric) && String(value).match(/\d/);

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(String(value));
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (startedRef.current) continue;
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              const current = numeric * eased;
              setDisplay(
                Number.isInteger(numeric)
                  ? Math.round(current).toString()
                  : current.toFixed(1),
              );
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          } else {
            startedRef.current = false;
            setDisplay("0");
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, isNumeric, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix ?? ""}
    </span>
  );
}
