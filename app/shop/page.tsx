"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal, MessageCircle, Heart, Menu, X } from "lucide-react";

const collections = [
  { name: "Dreamy Kids Beds", category: "Beds", description: "Cosy bedroom inspiration for growing children.", image: "https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Space-Saving Bunk Beds", category: "Beds", description: "Ideas that make more room for play.", image: "https://images.pexels.com/photos/5008397/pexels-photo-5008397.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Little Learner Desks", category: "Study", description: "A bright corner for learning and creativity.", image: "https://images.pexels.com/photos/9328035/pexels-photo-9328035.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Toy & Clothes Storage", category: "Storage", description: "Storage ideas for everyday family life.", image: "https://images.pexels.com/photos/7045947/pexels-photo-7045947.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Kids' Wardrobes", category: "Storage", description: "Organised spaces with room to grow.", image: "https://images.pexels.com/photos/7587810/pexels-photo-7587810.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Chairs & Playroom Pieces", category: "Playroom", description: "Colourful ideas for little moments.", image: "https://images.pexels.com/photos/8923989/pexels-photo-8923989.jpeg?auto=compress&cs=tinysrgb&w=900" },
];

const categoryOptions = ["All furniture", "Beds", "Study", "Storage", "Playroom"];

function Brand() {
  return <a className="brand" href="/" aria-label="Kids Furniture Kenya home"><span className="brand-kids">KIDS</span><span className="brand-furniture">FÜRNITÜRE</span><span className="brand-kenya">KENYA</span></a>;
}

export default function ShopPage() {
  const [category, setCategory] = useState("All furniture");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("category");
    if (requested && categoryOptions.includes(requested)) setCategory(requested);
  }, []);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return collections.filter((item) => {
      const categoryMatch = category === "All furniture" || item.category === category;
      const searchMatch = !term || `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return <main className="shop-page">
    <div className="announcement">Thoughtful furniture for little people <span>♡</span> Proudly Kenyan</div>
    <header className="header shop-header">
      <Brand />
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? "nav nav-open" : "nav"}>
        <a href="/">Home</a>
        <a href="/#about">Our story</a>
        <a className="nav-cta" href="/#enquiry">Talk to our team <ArrowRight size={16}/></a>
      </nav>
    </header>

    <section className="shop-hero">
      <div className="shop-crumb"><a href="/"><ArrowLeft size={14}/> Back to home</a><span>/</span><span>Furniture collections</span></div>
      <div className="shop-hero-content">
        <div><div className="eyebrow">THE KIDS FURNITURE KENYA COLLECTION</div><h1>Find a little <span>inspiration.</span></h1><p>Explore ideas for their bedroom, study corner and play space. Found something you like? Talk to us about designs and custom options.</p></div>
        <div className="shop-hero-note"><span>✳</span><b>Made around your little one's world</b><small>Browse ideas, then make them yours.</small></div>
      </div>
    </section>

    <section className="shop-content">
      <div className="shop-toolbar">
        <div><div className="eyebrow">BROWSE THE RANGE</div><h2>Explore collections</h2><p>{visible.length} {visible.length === 1 ? "collection" : "collections"} to explore</p></div>
        <label className="shop-search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search beds, desks, storage..." aria-label="Search collections"/></label>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="sidebar-title"><SlidersHorizontal size={17}/> Categories</div>
          {categoryOptions.map(option => <button key={option} onClick={() => setCategory(option)} className={category === option ? "shop-category active" : "shop-category"}>{option}<span>{option === "All furniture" ? collections.length : collections.filter(item => item.category === option).length}</span></button>)}
          <div className="sidebar-help"><MessageCircle size={20}/><b>Need something custom?</b><p>Tell us what you have in mind. Our team can help you explore the options.</p><a href="/#enquiry">Make an enquiry <ArrowRight size={14}/></a></div>
        </aside>

        <div className="shop-results">
          <div className="shop-results-top"><span>Showing <b>{visible.length}</b> {visible.length === 1 ? "collection" : "collections"}</span><span className="sample-label">INSPIRATION GALLERY</span></div>
          {visible.length ? <div className="shop-grid">{visible.map(item => <article className="shop-card" key={item.name}>
            <a className="shop-card-image" href="/#enquiry" aria-label={`Enquire about ${item.name}`}><img src={item.image} alt={`${item.name} inspiration photo`} loading="lazy" decoding="async"/><span className="inspiration-tag">Design inspiration</span><span className="shop-card-arrow"><ArrowRight size={18}/></span></a>
            <div className="shop-card-body"><span className="product-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><div className="shop-card-bottom"><span>Ask about designs & pricing</span><a href="/#enquiry" aria-label={`Enquire about ${item.name}`}><MessageCircle size={16}/> Enquire</a></div></div>
          </article>)}</div> : <div className="shop-empty"><Search size={28}/><h3>No matching collections</h3><p>Try another search or choose a different category.</p><button onClick={() => {setSearch("");setCategory("All furniture");}}>Clear filters</button></div>}
          <p className="shop-disclaimer">These photos are examples for inspiration only. They are not confirmed products or current stock from Kids Furniture Kenya. Product designs, materials, sizes, availability and prices will be confirmed directly with the team.</p>
        </div>
      </div>
    </section>

    <section className="shop-bottom-cta"><div><div className="eyebrow">HAVE A DESIGN IN MIND?</div><h2>Let's create a space <span>they'll love.</span></h2><p>Share your idea, measurements or a reference photo and start a conversation with us.</p></div><a className="button button-blue" href="/#enquiry">Start an enquiry <ArrowRight size={18}/></a></section>
    <footer className="footer"><div className="footer-top"><Brand/><p>Little spaces. Big dreams.<br/>Furniture for their little world.</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kids Furniture Kenya</span><span>Made with care in Kenya <b>♥</b></span></div></footer>
  </main>;
}
