import { useState, useEffect, useRef } from "react";

// 🔁 REPLACE THIS with your Google Apps Script URL
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyOGYp-5tt5byFbx0v3w6YGLRjVBkBY8GKE9Nsgb6FXP2ABMIPnICrD0SQcTxslqIk/exec";

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

function Modal({ show, onClose, guest, delivery, contact }) {
  const isEmail = delivery === "email";
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains("modal-overlay")) onClose();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <div className={`modal-overlay${show ? " active" : ""}`}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-icon">🎉</div>
        <h3 className="modal-title">You're Confirmed!</h3>
        <p className="modal-guest-name">HELLO {guest}</p>
        <p
          style={{
            fontSize: ".88rem",
            color: "var(--text-light)",
            marginBottom: "14px",
            lineHeight: "1.65",
          }}
        >
          Thank you for confirming your attendance at the wedding of{" "}
          <strong style={{ color: "var(--navy)" }}>
            Ayomide &amp; Adedayo
          </strong>
          .
        </p>
        <div
          style={{
            background: "var(--ivory)",
            padding: "18px 20px",
            margin: "14px 0",
            textAlign: "left",
            border: "1px solid rgba(201,151,58,.15)",
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: ".6rem",
              letterSpacing: "2px",
              color: "var(--gold)",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            The Garden Wedding
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.35rem",
              color: "var(--navy)",
            }}
          >
            Sunday · 5th April 2025
          </div>
          <div
            style={{
              fontSize: ".8rem",
              color: "var(--text-light)",
              marginTop: "4px",
            }}
          >
            3:00 PM (WAT)
          </div>
          <div
            style={{
              fontSize: ".8rem",
              color: "var(--text-mid)",
              marginTop: "8px",
              lineHeight: "1.55",
            }}
          >
            Bay Water Park
            <br />
            8B Wole Olateju Crescent, Lekki Phase 1, Lagos
          </div>
        </div>
        <div className="modal-delivery-box">
          <div className="modal-delivery-icon">{isEmail ? "📧" : "💬"}</div>
          <p className="modal-delivery-label">Your QR Code is on its way</p>
          <p className="modal-delivery-text">
            {isEmail
              ? `Your unique entry QR code will be sent to ${contact} shortly. Please check your inbox and present it at the venue entrance on the day.`
              : `Your unique entry QR code will be sent to your WhatsApp (${contact}) shortly. Please save it and present it at the venue entrance on the day.`}
          </p>
        </div>
        <p className="modal-note">
          Keep an eye out — your QR code will be{" "}
          <strong>scanned at the entrance</strong> on the day. Save it to your
          phone or print it out when it arrives.
        </p>
      </div>
    </div>
  );
}

export default function RSVP() {
  const titleRef = useReveal();
  const noticeRef = useReveal();
  const formRef = useReveal();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [delivery, setDelivery] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const handleDelivery = (val) => {
    setDelivery(val);
    setContact("");
  };

  const handleSubmit = async () => {
    if (!fname || !lname) {
      alert("Please fill in your first and last name.");
      return;
    }
  
    if (!delivery) {
      alert("Please choose how you would like to receive your QR code.");
      return;
    }
  
    if (!contact) {
      alert(
        delivery === "email"
          ? "Please enter your email address."
          : "Please enter your WhatsApp number."
      );
      return;
    }
  
    setLoading(true);
  
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          fname,
          lname,
          delivery,
          contact,
        }),
      });
    } catch (err) {
      console.warn("Sheets error:", err);
    }
  
    setLoading(false);
    setModal(true);
  
    setFname("");
    setLname("");
    setDelivery("");
    setContact("");
  };

  return (
    <>
      <section className="rsvp-section" id="rsvp">
        <div className="container">
          <div className="reveal" ref={titleRef}>
            <span className="section-tag">Kindly Respond</span>
            <h2 className="section-title">
              Reserve Your <em style={{ color: "var(--gold-light)" }}>Seat</em>
            </h2>
            <div className="divider"></div>
            <p>
              Please confirm your attendance by filling in the form below. Your
              unique QR code will be sent to you via your chosen delivery method
              — check your email or WhatsApp after confirming.
            </p>
          </div>

          <div className="how-it-works-notice reveal" ref={noticeRef}>
            <strong>🎟️ How it works:</strong> After submitting, your personal QR
            code will be sent to you via <strong>email or WhatsApp</strong> —
            whichever you choose. Present it at the venue entrance on the day.
          </div>

          <div className="rsvp-form reveal" ref={formRef}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="Kayode"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="Adeyemi"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                How would you like to receive your QR code?{" "}
                <span style={{ color: "var(--gold)" }}>*</span>
              </label>
              <div className="delivery-options">
                <label
                  className={`delivery-option${
                    delivery === "email" ? " selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="email"
                    onChange={() => handleDelivery("email")}
                  />
                  <span className="delivery-label">📧 Email</span>
                </label>
                <label
                  className={`delivery-option${
                    delivery === "whatsapp" ? " selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="whatsapp"
                    onChange={() => handleDelivery("whatsapp")}
                  />
                  <span className="delivery-label">💬 WhatsApp</span>
                </label>
              </div>
            </div>

            {delivery && (
              <div className="form-group contact-field-wrap">
                <label>
                  {delivery === "email" ? "Email Address" : "WhatsApp Number"}
                </label>
                <input
                  type={delivery === "email" ? "email" : "tel"}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={
                    delivery === "email"
                      ? "your@email.com"
                      : "+234 800 000 0000"
                  }
                  autoFocus
                />
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              <span>{loading ? "Confirming..." : "Confirm Attendance"}</span>
              {!loading && <span>→</span>}
            </button>
          </div>
        </div>
      </section>

      <Modal
        show={modal}
        onClose={() => setModal(false)}
        guest={fname ? fname.toUpperCase() : "GUEST"}
        delivery={delivery}
        contact={contact}
      />
    </>
  );
}
