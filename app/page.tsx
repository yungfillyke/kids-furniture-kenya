"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Menu, X, Heart, ShieldCheck, Truck, MessageCircle, Sparkles } from "lucide-react";

// Temporary inspiration photography from Pexels. These are not confirmed Kids Furniture Kenya products.
const products = [
  { name: "Dreamy Kids Beds", category: "Beds", tag: "Made for sweet dreams", image: "https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Space-Saving Bunk Beds", category: "Beds", tag: "More room to play", image: "https://images.pexels.com/photos/5008397/pexels-photo-5008397.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Little Learner Desks", category: "Study", tag: "Big ideas start here", image: "https://images.pexels.com/photos/9328035/pexels-photo-9328035.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Toy & Clothes Storage", category: "Storage", tag: "A place for everything", image: "https://images.pexels.com/photos/7045947/pexels-photo-7045947.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Kids' Wardrobes", category: "Storage", tag: "Made for growing up", image: "https://images.pexels.com/photos/7587810/pexels-photo-7587810.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Chairs & Playroom Pieces", category: "Playroom", tag: "Room for imagination", image: "https://images.pexels.com/photos/8923989/pexels-photo-8923989.jpeg?auto=compress&cs=tinysrgb&w=900" },
];
const categories = ["All", "Beds", "Study", "Storage", "Playroom"];
const enquiryOptions = ["Kids bed", "Bunk bed", "Study desk or chair", "Toy or clothes storage", "Wardrobe", "Playroom furniture", "Custom furniture", "Something else"];

function Brand() {
  return <a className="brand" href="#" aria-label="Kids Furniture Kenya home"><span className="brand-kids">KIDS</span><span className="brand-furniture">FÜRNITÜRE</span><span className="brand-kenya">KENYA</span></a>;
}

export default function Home() {
  const [active, setActive] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState("");
  const visible = useMemo(() => active === "All" ? products : products.filter(p => p.category === active), [active]);

  function sendEnquiry(formData: FormData) {
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const interest = String(formData.get("interest") || "");
    const message = String(formData.get("message") || "");
    const text = `Hello Kids Furniture Kenya! My name is ${name}. My phone number is ${phone}. I'm interested in: ${interest}. ${message}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return <main id="top">
    <div className="announcement">Thoughtful furniture for little people <span>♡</span> Proudly Kenyan</div>
    <header className="header">
      <Brand />
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? "nav nav-open" : "nav"}>
        <a href="#collections" onClick={() => setMenuOpen(false)}>Shop furniture</a>
        <a href="#why-us" onClick={() => setMenuOpen(false)}>Why choose us</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
        <a className="nav-cta" href="#enquiry" onClick={() => setMenuOpen(false)}>Get a quote <ArrowRight size={16}/></a>
      </nav>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={15}/> LITTLE SPACES. BIG DREAMS.</div>
        <h1>Furniture for<br/><span>their little</span> <em>world.</em></h1>
        <p>Make room for big imaginations, cosy nights and everyday adventures. Find furniture made with little people in mind.</p>
        <div className="hero-actions"><a className="button button-blue" href="#collections">Explore the collection <ArrowRight size={18}/></a><a className="text-link" href="#enquiry">Request a custom piece</a></div>
        <div className="hero-note"><span className="paw">✦</span> Made for childhood. Chosen by you.</div>
      </div>
      <div className="hero-art">
        <div className="hero-photo"><img src="https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Warm, thoughtfully styled children's bedroom"/></div>
        <div className="floating-note"><span className="note-icon">♡</span><span><b>Room to grow</b><small>Beautiful beginnings start here</small></span></div>
        <div className="sun-shape"></div>
      </div>
      <div className="hero-doodle">✳</div>
    </section>

    <section className="trust-strip" id="why-us">
      <div><ShieldCheck/><span><b>Made with care</b><small>Thoughtful pieces for children</small></span></div>
      <div><Heart/><span><b>Designed for little lives</b><small>Comfort meets imagination</small></span></div>
      <div><Truck/><span><b>Kenya, made personal</b><small>Talk to us about your needs</small></span></div>
      <div><MessageCircle/><span><b>Here to help</b><small>Friendly, personal enquiries</small></span></div>
    </section>

    <section className="collections section" id="collections">
      <div className="section-heading"><div><div className="eyebrow">A LITTLE SOMETHING FOR EVERY ROOM</div><h2>Find their <span>happy place.</span></h2></div><p>From bedtime to playtime and everything in between, explore furniture for every little corner.</p></div>
      <div className="filters" role="group" aria-label="Filter furniture categories">{categories.map(c => <button key={c} className={active === c ? "filter active" : "filter"} aria-pressed={active === c} onClick={() => setActive(c)}>{c}</button>)}</div>
      <div className="product-grid">{visible.map((p, i) => <article className="product-card" key={p.name}>
        <a href="#enquiry" className="product-image" onClick={() => setInterest(p.name.includes("Bunk") ? "Bunk bed" : p.name.includes("Bed") ? "Kids bed" : p.name.includes("Desk") ? "Study desk or chair" : p.name.includes("Wardrobe") ? "Wardrobe" : p.category === "Storage" ? "Toy or clothes storage" : "Playroom furniture")}><img src={p.image} alt={p.name + " inspiration"} loading="lazy" decoding="async"/><span className="product-number">0{i+1}</span><span className="image-arrow"><ArrowRight size={18}/></span></a>
        <div className="product-info"><div><span className="product-category">{p.category}</span><h3>{p.name}</h3><p>{p.tag}</p></div><a href="#enquiry" aria-label={`Enquire about ${p.name}`} className="round-arrow" onClick={() => setInterest(p.name.includes("Bunk") ? "Bunk bed" : p.name.includes("Bed") ? "Kids bed" : p.name.includes("Desk") ? "Study desk or chair" : p.name.includes("Wardrobe") ? "Wardrobe" : p.category === "Storage" ? "Toy or clothes storage" : "Playroom furniture")}><ArrowRight size={18}/></a></div>
        <div className="price-note">Ask us for options & pricing</div>
      </article>)}</div>
      <p className="image-disclaimer">Photos are for design inspiration only and may not show the exact furniture we make. Ask us about available designs and custom options.</p>
      <div className="center-cta"><a href="#enquiry" className="button button-outline">Have something special in mind? <ArrowRight size={17}/></a></div>
    </section>

    <section className="feature" id="about">
      <div className="feature-image"><img src="https://images.pexels.com/photos/8535156/pexels-photo-8535156.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Cosy and colourful home interior"/></div>
      <div className="feature-copy"><div className="eyebrow">A WORLD BUILT AROUND THEM</div><h2>Childhood is a big adventure. <span>Give it room.</span></h2><p>We believe children&apos;s spaces should be joyful, practical and full of possibility. Kids Furniture Kenya is here to help you create a room your little one will love growing up in.</p><a className="text-link" href="#enquiry">Let&apos;s create something lovely <ArrowRight size={17}/></a><div className="feature-stamp">MADE WITH<br/>LITTLE ONES<br/>IN MIND <span>✳</span></div></div>
    </section>

    <section className="enquiry section" id="enquiry">
      <div className="enquiry-copy"><div className="eyebrow">LET'S MAKE THEIR SPACE SPECIAL</div><h2>Have a little idea? <span>Let&apos;s build on it.</span></h2><p>Looking for a particular size, colour or design? Tell us what you have in mind and start a conversation with our team.</p><div className="enquiry-promise"><span>♡</span> Your idea, your space, let's talk.</div></div>
      <form className="enquiry-form" onSubmit={e => { e.preventDefault(); sendEnquiry(new FormData(e.currentTarget)); }}>
        <div className="form-title">Tell us what you're dreaming of <span>✳</span></div>
        <label>Your name<input name="name" placeholder="e.g. Jane" required/></label>
        <label>Phone number<input name="phone" type="tel" placeholder="e.g. 07XX XXX XXX" required/></label>
        <label>What are you interested in?<select name="interest" value={interest} onChange={e => setInterest(e.target.value)} required><option value="" disabled>Choose a furniture type</option>{enquiryOptions.map(option => <option key={option}>{option}</option>)}</select></label>
        <label>Tell us a little more<textarea name="message" rows={3} placeholder="Sizes, colours, ideas or questions..."/></label>
        <button className="button button-blue submit-button" type="submit">Send enquiry on WhatsApp <ArrowRight size={18}/></button>
        {sent && <p className="success-message">Your enquiry has been prepared in WhatsApp. Send it there to reach us.</p>}
        <small className="form-footnote">This opens WhatsApp so you can send your enquiry directly.</small>
      </form>
    </section>

    <footer className="footer"><div className="footer-top"><Brand/><p>Little spaces. Big dreams.<br/>Furniture for their little world.</p><a href="#enquiry" className="footer-contact">Start an enquiry <ArrowRight size={17}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kids Furniture Kenya</span><span>Made with care in Kenya <b>♥</b></span></div></footer>
  </main>;
}
