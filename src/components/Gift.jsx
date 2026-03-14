import { useState, useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function Gift() {
  const titleRef = useReveal();
  const cardRef = useReveal();
  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText("0694701478").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="gift-section" id="gift">
      <div className="container">
        <div className="reveal" ref={titleRef}>
          <span className="section-tag">With Love &amp; Gratitude</span>
          <h2 className="section-title">
            Gift <em>Registry</em>
          </h2>
          <div className="divider"></div>
          <p
            style={{
              fontSize: ".94rem",
              color: "var(--text-light)",
              lineHeight: "1.8",
              maxWidth: "560px",
            }}
          >
            Your presence is the greatest gift. However, if you wish to bless us
            further, monetary gifts are warmly appreciated.
          </p>
        </div>

        <div className="gift-card reveal" ref={cardRef}>
          <div>
            <div className="gift-icon">💛</div>
            <div className="gift-title">Bank Transfer</div>
            <p className="gift-text">
              Send your gift directly to our account. Every contribution is
              deeply appreciated and will help us build our new home together.
            </p>
            <div className="account-box">
              <div className="account-row">
                <span className="account-label">Bank</span>
                <span className="account-value">Access Bank</span>
              </div>
              <div className="account-row">
                <span className="account-label">Account Name</span>
                <span className="account-value">Ayomide Deborah Smith</span>
              </div>
              <div className="account-row">
                <span className="account-label">Account Number</span>
                <span className="account-value">0694701478</span>
                <button
                  className="copy-btn"
                  onClick={copyAccount}
                  style={
                    copied ? { background: "var(--gold)", color: "#fff" } : {}
                  }
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
              padding: "48px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "22px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "3.5rem",
                color: "rgba(201,151,58,.6)",
                lineHeight: 1,
              }}
            >
              ✦
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.7rem",
                fontStyle: "italic",
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.45,
              }}
            >
              With love,
              <br />
              gratitude &amp;
              <br />
              blessings
            </div>
            <div
              style={{
                width: "36px",
                height: "1px",
                background: "rgba(201,151,58,.5)",
              }}
            ></div>
            <div
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: ".6rem",
                letterSpacing: "3px",
                color: "rgba(232,201,122,.85)",
              }}
            >
              #LOVEFOUNDTWOAS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
