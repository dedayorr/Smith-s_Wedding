import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function DetailCard({ icon, label, value, sub }) {
  const ref = useReveal();
  return (
    <div className="detail-card reveal" ref={ref}>
      <div className="detail-card-icon">{icon}</div>
      <div className="detail-card-label">{label}</div>
      <div className="detail-card-value" dangerouslySetInnerHTML={{ __html: value }} />
      <div className="detail-card-sub" dangerouslySetInnerHTML={{ __html: sub }} />
    </div>
  );
}

export default function Details() {
  const titleRef = useReveal();
  const bannerRef = useReveal();

  return (
    <section className="details-section" id="details">
      <div className="container">
        <div className="reveal" ref={titleRef}>
          <span className="section-tag">The Celebration</span>
          <h2 className="section-title">The Garden <em>Wedding</em></h2>
          <div className="divider"></div>
          <p style={{ fontSize: '.94rem', color: 'var(--text-light)', lineHeight: '1.82', maxWidth: '580px' }}>
            Join us for an intimate garden ceremony and a joyful reception surrounded by family
            and friends as we celebrate the beginning of forever.
          </p>
        </div>

        <div className="details-grid">
          <DetailCard icon="🗓️" label="Date &amp; Time"
            value="Sunday<br/>5th April, 2025"
            sub="Ceremony begins at 3:00 PM (WAT)<br/>Reception to follow" />
          <DetailCard icon="📍" label="Venue"
            value="Bay Water Park"
            sub="8B Wole Olateju Crescent<br/>Lekki Phase 1, Lagos, Nigeria" />
          <DetailCard icon="👗" label="Dress Code"
            value="A Touch of Blue"
            sub="Incorporate a hint of blue into your outfit — from a pocket square to a full gown, all shades welcome." />
          <DetailCard icon="🎫" label="Entry"
            value="QR Code Required"
            sub="Your personal QR code will be sent to you after RSVP. Have it ready — it will be scanned at the entrance." />
        </div>

        <div className="no-kids-banner reveal" ref={bannerRef}>
          <span>⚠</span>
          <span>PLEASE NOTE: THIS IS AN ADULTS-ONLY EVENT — NO CHILDREN ALLOWED</span>
          <span>⚠</span>
        </div>
      </div>
    </section>
  );
}
