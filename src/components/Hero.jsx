import React, { useState, useEffect } from "react";

const PETALS = [
  {
    left: "12%",
    size: "10px",
    delay: "0s",
    duration: "12s",
    color: "rgba(200,54,110,.55)",
  },
  {
    left: "28%",
    size: "8px",
    delay: "2s",
    duration: "15s",
    color: "rgba(245,198,216,.7)",
  },
  {
    left: "45%",
    size: "12px",
    delay: "5s",
    duration: "11s",
    color: "rgba(200,54,110,.4)",
  },
  {
    left: "62%",
    size: "9px",
    delay: "1s",
    duration: "14s",
    color: "rgba(245,198,216,.6)",
  },
  {
    left: "78%",
    size: "11px",
    delay: "3.5s",
    duration: "13s",
    color: "rgba(200,54,110,.5)",
  },
  {
    left: "90%",
    size: "7px",
    delay: "7s",
    duration: "16s",
    color: "rgba(245,198,216,.65)",
  },
];

function useCountdown(targetDate) {
  const calculate = () => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();

    if (diff <= 0) {
      return { days: "00", hours: "00", mins: "00", secs: "00" };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      mins: String(mins).padStart(2, "0"),
      secs: String(secs).padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(() => calculate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}

export default function Hero() {
  const time = useCountdown("2026-04-05T15:00:00+01:00");

  return (
    <section className="hero" id="home">
      <div className="hero-glow"></div>

      {PETALS.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50% 0 50% 0",
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      <div className="hero-logo-wrap">
        <div className="hero-logo-ring">
          <img
            className=""
            src="/wedding_logo.jpeg"
            alt="Ayomide & Adedayo"
            width="130"
            height="130"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
      </div>

      <div className="hero-tag">The Garden Wedding of</div>
      <h1 className="hero-names">
        Ayomide
        <span className="hero-amp">&amp;</span>
        Adedayo
      </h1>
      <p className="hero-date text-center">
        Sunday · 5th April 2025 · Lagos, Nigeria
      </p>
      <p className="hero-hashtag">#LoveFoundTwoAs</p>

      <div className="countdown">
  {[
    ["days", time.days],
    ["hours", time.hours],
    ["mins", time.mins],
    ["secs", time.secs],
  ].map(([label, val], i) => (
    <div key={label} className="countdown-item">
      <div className="countdown-unit">
        <span className="countdown-num">{val}</span>
        <span className="countdown-label">{label}</span>
      </div>

      {i < 3 && <div className="countdown-sep">·</div>}
    </div>
  ))}
</div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
