import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeNav = () => setOpen(false);

  return (
    <nav>
      <a href="#home" className="nav-logo">
        <img
          className=""
          src="/wedding_logo.jpeg"
          alt="Ayomide & Adedayo"
          width="70"
          height="70"
          style={{ objectFit: "fit", borderRadius: "50%" }}
        />
        <span className="nav-logo-text">Ayomide &amp; Adedayo</span>
      </a>
      <ul className={`nav-links${open ? " open" : ""}`} id="navLinks">
        <li>
          <a href="#details" onClick={closeNav}>
            Details
          </a>
        </li>
        <li>
          <a href="#gallery" onClick={closeNav}>
            Gallery
          </a>
        </li>
        <li>
          <a href="#rsvp" onClick={closeNav}>
            RSVP
          </a>
        </li>
        <li>
          <a href="#wishes" onClick={closeNav}>
            Well Wishes
          </a>
        </li>
        <li>
          <a href="#gift" onClick={closeNav}>
            Gift
          </a>
        </li>
      </ul>
      <button
        className={`nav-hamburger${open ? " open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
