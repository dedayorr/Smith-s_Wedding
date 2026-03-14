import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// 🔑 Paste your Supabase credentials here
const SUPABASE_URL = 'https://agjoozvkowxomjgwzciy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnam9venZrb3d4b21qZ3d6Y2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDcyNDMsImV4cCI6MjA4ODMyMzI0M30.BlMf5iLLFeWZrt2uvAfHaFHrcAc4u8eyyLw2nPOw82E';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

const INITIAL_WISHES = [
  // { text: 'May your love story be the most beautiful chapter ever written. Wishing you both a lifetime of joy and togetherness.', author: 'Funke & Tunde', from: 'Family friends' },
  // { text: 'Watching you two together reminds us all that true love is real. Congratulations on your forever!', author: 'Adaeze Okonkwo', from: 'University bestie' },
  // { text: 'Two hearts, one beautiful journey. May every day bring you closer and fill your home with laughter and light.', author: 'The Adeyemi Family', from: 'Extended family' },
];

function WishCard({ text, author, from, animate }) {
  const ref = useReveal();
  return (
    <div className="wish-card reveal" ref={ref}
      style={animate ? { animation: 'fadeUp .5s ease forwards' } : {}}>
      <p className="wish-text">{text}</p>
      <div className="wish-author">{author}</div>
      <div className="wish-from-label">{from}</div>
    </div>
  );
}

export default function Wishes() {
  const titleRef = useReveal();
  const formRef = useReveal();

  const [userWishes, setUserWishes] = useState([]);
  const [name, setName] = useState('');
  const [rel, setRel] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load wishes from Supabase on mount
  useEffect(() => {
    async function fetchWishes() {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setUserWishes(data);
    }
    fetchWishes();
  }, []);

  const handleSubmit = async () => {
    if (!name || !message) { alert('Please enter your name and a message.'); return; }
    setSubmitting(true);

    const { data, error } = await supabase
      .from('wishes')
      .insert([{ author: name, from: rel || 'Guest', text: message }])
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
      return;
    }

    setUserWishes(prev => [{ ...data, isNew: true }, ...prev]);
    setName(''); setRel(''); setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4500);
  };

  const allWishes = [...userWishes, ...INITIAL_WISHES];

  return (
    <section className="wishes-section" id="wishes">
      <div className="container">
        <div className="reveal" ref={titleRef}>
          <span className="section-tag">From the Heart</span>
          <h2 className="section-title">Well <em>Wishes</em></h2>
          <div className="divider"></div>
          <p style={{ fontSize: '.94rem', color: 'var(--text-light)', lineHeight: '1.8', maxWidth: '520px', marginBottom: 0 }}>
            Leave a message of love and celebration for the couple. Your words will be treasured forever.
          </p>
        </div>

        <div className="wishes-grid">
          {allWishes.map((w, i) => (
            <WishCard key={w.id ?? i} {...w} animate={w.isNew} />
          ))}
        </div>

        <div className="wish-form-wrap reveal" ref={formRef}>
          <span className="section-tag">Leave a Message</span>
          <h3 className="section-title">Send Your <em style={{ color: 'var(--gold-light)' }}>Wishes</em></h3>
          <div className="divider"></div>
          <div className="wish-inputs">
            <div className="wish-fg">
              <label>Your Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Amaka Osei" />
            </div>
            <div className="wish-fg">
              <label>Relationship to Couple</label>
              <input type="text" value={rel} onChange={e => setRel(e.target.value)} placeholder="e.g. College friend, Cousin..." />
            </div>
            <div className="wish-fg wish-full">
              <label>Your Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your heartfelt message to Ayomide & Adedayo..." />
            </div>
          </div>
          <button className="btn-wish" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Sending...' : 'Send My Wishes ✦'}
          </button>
          {success && <p className="wish-success">✓ Your message has been sent with love! Thank you.</p>}
        </div>
      </div>
    </section>
  );
}
