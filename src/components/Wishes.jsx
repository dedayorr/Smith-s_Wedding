import { useState, useEffect, useRef } from "react";
// import { initializeApp } from 'firebase/app';
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
// } from 'firebase/firestore';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDW1eDa7HlxVzLE2nHLsdO5Le19uPkIVOU",
  authDomain: "wedding-app-49201.firebaseapp.com",
  projectId: "wedding-app-49201",
  storageBucket: "wedding-app-49201.firebasestorage.app",
  messagingSenderId: "1023391558535",
  appId: "1:1023391558535:web:3fbb659a046da13e564122",
  measurementId: "G-486QL5GS77",
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
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

// ─── Single wish card ─────────────────────────────────────────────────────────
function WishCard({ text, author, from: relation, isNew }) {
  const ref = useReveal();
  return (
    <div
      className="wish-card reveal"
      ref={ref}
      style={isNew ? { animation: "fadeUp .5s ease forwards" } : {}}
    >
      <p className="wish-text">{text}</p>
      <div className="wish-author">{author}</div>
      <div className="wish-from-label">{relation}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Wishes() {
  const titleRef = useReveal();
  const formRef = useReveal();

  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [rel, setRel] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── Real-time listener — new wishes appear instantly for everyone ──────────
  useEffect(() => {
    const q = query(
      collection(db, "wishes"),
      orderBy("createdAt", "desc") // newest first
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Mark brand-new docs (added < 2 s ago) for the slide-in animation
        isNew: doc.metadata.hasPendingWrites,
      }));
      setWishes(docs);
    });

    return () => unsubscribe(); // clean up listener on unmount
  }, []);

  // ── Submit handler ────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      alert("Please enter your name and a message.");
      return;
    }
    setSubmitting(true);

    try {
      await addDoc(collection(db, "wishes"), {
        author: name.trim(),
        from: rel.trim() || "Guest",
        text: message.trim(),
        createdAt: serverTimestamp(), // server-side timestamp — reliable ordering
      });

      setName("");
      setRel("");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4500);
    } catch (err) {
      console.error("Firebase write error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="wishes-section" id="wishes">
      <div className="container">
        {/* Heading */}
        <div className="reveal" ref={titleRef}>
          <span className="section-tag">From the Heart</span>
          <h2 className="section-title">
            Well <em>Wishes</em>
          </h2>
          <div className="divider"></div>
          <p
            style={{
              fontSize: ".94rem",
              color: "var(--text-light)",
              lineHeight: "1.8",
              maxWidth: "520px",
              marginBottom: 0,
            }}
          >
            Leave a message of love and celebration for the couple. Your words
            will be treasured forever.
          </p>
        </div>

        {/* Wishes grid — newest wish slides in at the top */}
        <div className="wishes-grid">
          {wishes.length === 0 && (
            <p
              style={{
                color: "var(--text-light)",
                fontSize: ".9rem",
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "2rem 0",
              }}
            >
              Be the first to leave a wish! ✦
            </p>
          )}
          {wishes.map((w, i) => (
            <WishCard key={w.id ?? i} {...w} />
          ))}
        </div>

        {/* Form */}
        <div className="wish-form-wrap reveal" ref={formRef}>
          <span className="section-tag">Leave a Message</span>
          <h3 className="section-title">
            Send Your <em style={{ color: "var(--gold-light)" }}>Wishes</em>
          </h3>
          <div className="divider"></div>

          <div className="wish-inputs">
            <div className="wish-fg">
              <label>Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amaka Osei"
              />
            </div>
            <div className="wish-fg">
              <label>Relationship to Couple</label>
              <input
                type="text"
                value={rel}
                onChange={(e) => setRel(e.target.value)}
                placeholder="e.g. College friend, Cousin…"
              />
            </div>
            <div className="wish-fg wish-full">
              <label>Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt message to Ayomide & Adedayo…"
              />
            </div>
          </div>

          <button
            className="btn-wish"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send My Wishes ✦"}
          </button>

          {success && (
            <p className="wish-success">
              ✓ Your message has been sent with love! Thank you.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
