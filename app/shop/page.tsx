"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, Search, SlidersHorizontal, Heart, ShoppingBag,
  Home, Grid2X2, UserRound, Menu, X, ChevronRight, Check, MessageCircle,
  Sparkles, ShieldCheck, Truck, RotateCcw, Star, Plus, Minus
} from "lucide-react";

type Category = "Beds" | "Study" | "Storage" | "Playroom";
type Inspiration = {
  id: number; name: string; category: Category; description: string;
  image: string; note: string;
};

const inspirations: Inspiration[] = [
  { id: 1, name: "Dreamy Kids Bed", category: "Beds", description: "A cosy bedroom idea with room for bedtime stories and growing dreams.", image: "https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=1000", note: "Bedroom inspiration" },
  { id: 2, name: "Space-Saving Bunk Bed", category: "Beds", description: "A clever way to think about shared rooms and making more room to play.", image: "https://images.pexels.com/photos/5008397/pexels-photo-5008397.jpeg?auto=compress&cs=tinysrgb&w=1000", note: "Bedroom inspiration" },
  { id: 3, name: "Little Learner Desk", category: "Study", description: "A dedicated corner for homework, drawing and big ideas.", image: "https://images.pexels.com/photos/9328035/pexels-photo-9328035.jpeg?auto=compress&cs=tinysrgb&w=1000", note: "Study-space inspiration" },
  { id: 4, name: "Toy & Clothes Storage", category: "Storage", description: "Ideas for keeping everyday essentials organised and close at hand.", image: "https://images.pexels.com/photos/7045947/pexels-photo-7045947.jpeg?auto=compress&cs=tinysrgb&w=1000", note: "Storage inspiration" },
  { id: 5, name: "Growing-Up Wardrobe", category: "Storage", description: "A practical storage idea for a child's changing needs.", image: "https://images.pexels.com/photos/7587810/pexels-photo-7587810.jpeg?auto=compress&cs=tinysrgb&w=1000", note: "Storage inspiration" },
  { id: 6, name: "Playroom Chair", category: "Playroom", description: "A playful seating idea for reading, creating and relaxing.", image: "https://images.pexels.com/photos/8923989/pexels-photo-8923989.jpeg?auto=compress&cs=tinysrgb&w=1000", note: "Playroom inspiration" },
];

const categories: { name: Category | "All"; caption: string; image: string }[] = [
  { name: "All", caption: "Everything", image: "https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { name: "Beds", caption: "Sleep & dream", image: "https://images.pexels.com/photos/5008397/pexels-photo-5008397.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { name: "Study", caption: "Learn & create", image: "https://images.pexels.com/photos/9328035/pexels-photo-9328035.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { name: "Storage", caption: "Tidy little spaces", image: "https://images.pexels.com/photos/7045947/pexels-photo-7045947.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { name: "Playroom", caption: "Room to play", image: "https://images.pexels.com/photos/8923989/pexels-photo-8923989.jpeg?auto=compress&cs=tinysrgb&w=300" },
];

function Brand() {
  return <a className="brand" href="/" aria-label="Kids Furniture Kenya home"><span className="brand-kids">KIDS</span><span className="brand-furniture">FÜRNITÜRE</span><span className="brand-kenya">KENYA</span></a>;
}

function makeEnquiry(item?: Inspiration) {
  const message = item
    ? `Hello Kids Furniture Kenya! I'm interested in the ${item.name} (${item.category}) design inspiration on your website. Could you please share the available designs, customisation options and a quotation?`
    : "Hello Kids Furniture Kenya! I'd like to ask about your children's furniture designs and available options.";
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

export default function ShopPage() {
  const [view, setView] = useState<"home" | "browse" | "detail" | "saved">("home");
  const [category, setCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inspiration>(inspirations[0]);
  const [saved, setSaved] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("Recommended");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("category");
    const collection = params.get("collection");
    if (requested && ["Beds", "Study", "Storage", "Playroom"].includes(requested)) {
      setCategory(requested as Category);
      setView("browse");
    }
    if (collection) {
      const found = inspirations.find(item => item.name === collection || item.category === requested);
      if (found) setSelected(found);
      setView("browse");
    }
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const items = inspirations.filter(item =>
      (category === "All" || item.category === category) &&
      (!term || `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(term))
    );
    return sort === "A to Z" ? [...items].sort((a, b) => a.name.localeCompare(b.name)) : items;
  }, [category, search, sort]);

  const openBrowse = (next: Category | "All" = "All") => {
    setCategory(next); setSearch(""); setView("browse"); setFilterOpen(false);
    window.history.replaceState({}, "", next === "All" ? "/shop" : `/shop?category=${encodeURIComponent(next)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openDetail = (item: Inspiration) => {
    setSelected(item); setView("detail"); window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleSaved = (id: number) => setSaved(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  const savedItems = inspirations.filter(item => saved.includes(item.id));

  return <main className="marketplace">
    <div className="market-topline">Thoughtful furniture for little people <span>♥</span> Proudly Kenyan</div>
    <header className="market-header">
      <a className="market-brand" href="/" aria-label="Kids Furniture Kenya home"><Brand /></a>
      <nav className={mobileMenu ? "market-nav market-nav-open" : "market-nav"}>
        <button className={view === "home" ? "market-nav-active" : ""} onClick={() => {setView("home");setMobileMenu(false);}}>Home</button>
        <button className={view === "browse" ? "market-nav-active" : ""} onClick={() => {openBrowse("All");setMobileMenu(false);}}>Shop</button>
        <a href="/#about">Our story</a>
        <a href="/#enquiry">Custom furniture</a>
      </nav>
      <div className="market-header-actions">
        <button className="market-icon-button saved-header" aria-label="Saved designs" onClick={() => setView("saved")}><Heart size={19}/>{saved.length > 0 && <span>{saved.length}</span>}</button>
        <button className="market-header-enquire" onClick={() => makeEnquiry()}>Talk to us <ArrowRight size={15}/></button>
      </div>
      <button className="market-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button>
    </header>

    {view === "home" && <>
      <section className="market-home-hero">
        <div className="market-home-copy">
          <div className="market-kicker"><Sparkles size={14}/> LITTLE SPACES. BIG DREAMS.</div>
          <h1>Make room for<br/><span>little</span> wonders.</h1>
          <p>Thoughtful furniture ideas for growing minds, cosy nights and everyday adventures. Find inspiration for every little corner.</p>
          <button className="market-primary-button" onClick={() => openBrowse("All")}>Explore furniture <ArrowRight size={17}/></button>
          <div className="market-home-assurance"><ShieldCheck size={17}/> Personal guidance for your little one's space</div>
        </div>
        <div className="market-home-visual">
          <img src="https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=1300" alt="Children's bedroom furniture inspiration"/>
          <div className="market-visual-caption"><span className="market-caption-dot"/> Spaces made for growing</div>
          <div className="market-visual-spark">✳</div>
        </div>
      </section>

      <section className="market-search-row" aria-label="Search furniture inspiration">
        <label className="market-search-box"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && openBrowse("All")} placeholder="Search beds, desks, storage..."/><button onClick={() => openBrowse("All")} aria-label="Search"><ArrowRight size={18}/></button></label>
        <button className="market-filter-shortcut" onClick={() => {openBrowse("All");setFilterOpen(true);}} aria-label="Open filters"><SlidersHorizontal size={19}/></button>
      </section>

      <section className="market-category-section">
        <div className="market-section-title"><div><span className="market-eyebrow">FIND THEIR LITTLE FAVOURITE</span><h2>Shop by <em>category</em></h2></div><button onClick={() => openBrowse("All")}>View all <ArrowRight size={15}/></button></div>
        <div className="market-category-list">
          {categories.map(item => <button key={item.name} className="market-category-tile" onClick={() => openBrowse(item.name)}><span className="market-category-photo"><img src={item.image} alt=""/></span><span className="market-category-name">{item.name === "All" ? "All furniture" : item.name}</span><small>{item.caption}</small></button>)}
        </div>
      </section>

      <section className="market-popular-section">
        <div className="market-section-title"><div><span className="market-eyebrow">A FEW IDEAS TO GET YOU STARTED</span><h2>Popular <em>inspiration</em></h2></div><button onClick={() => openBrowse("All")}>Explore all <ArrowRight size={15}/></button></div>
        <div className="market-product-grid market-home-products">
          {inspirations.slice(0, 4).map(item => <article className="market-product-card" key={item.id}>
            <button className={saved.includes(item.id) ? "market-favourite is-saved" : "market-favourite"} onClick={() => toggleSaved(item.id)} aria-label={saved.includes(item.id) ? "Remove from saved" : "Save design"}><Heart size={17} fill={saved.includes(item.id) ? "currentColor" : "none"}/></button>
            <button className="market-product-photo" onClick={() => openDetail(item)}><img src={item.image} alt={item.name + " design inspiration"}/><span>DESIGN INSPIRATION</span></button>
            <div className="market-product-meta"><span>{item.category}</span><button onClick={() => openDetail(item)} aria-label={"View " + item.name}><ArrowRight size={16}/></button></div>
            <button className="market-product-name" onClick={() => openDetail(item)}>{item.name}</button>
            <p>Ask us about designs & options</p>
          </article>)}
        </div>
      </section>

      <section className="market-benefits">
        <div><ShieldCheck/><span><b>Made with care</b><small>Thoughtful furniture ideas</small></span></div>
        <div><Truck/><span><b>Kenya, made personal</b><small>Speak directly with our team</small></span></div>
        <div><RotateCcw/><span><b>Made around your needs</b><small>Ask about custom options</small></span></div>
      </section>
      <section className="market-custom-banner"><div><span className="market-eyebrow">HAVE SOMETHING SPECIAL IN MIND?</span><h2>Let's make their space <em>their own.</em></h2><p>Share your measurements, ideas or a reference photo with our team.</p></div><a href="/#enquiry" className="market-primary-button">Request a custom piece <ArrowRight size={17}/></a></section>
    </>}

    {view === "browse" && <section className="market-browse-page">
      <div className="market-breadcrumb"><button onClick={() => setView("home")}><ArrowLeft size={15}/> Home</button><ChevronRight size={13}/> Furniture</div>
      <div className="market-browse-heading"><div><span className="market-eyebrow">THE KIDS FURNITURE KENYA COLLECTION</span><h1>{category === "All" ? "Find their little favourite." : category + " for little spaces."}</h1><p>Explore design inspiration and tell us what you'd like made for your space.</p></div><div className="market-browse-count">{filtered.length}<small>ideas to explore</small></div></div>
      <div className="market-browse-tools">
        <label className="market-search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search furniture inspiration..."/></label>
        <button className={filterOpen ? "market-tool-button tool-active" : "market-tool-button"} onClick={() => setFilterOpen(!filterOpen)}><SlidersHorizontal size={16}/> Filter</button>
        <label className="market-sort-select">Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option>Recommended</option><option>A to Z</option></select></label>
      </div>
      {filterOpen && <div className="market-filter-panel"><b>Categories</b>{categories.map(item => <button key={item.name} className={category === item.name ? "market-filter-chip selected" : "market-filter-chip"} onClick={() => setCategory(item.name)}>{item.name === "All" ? "All furniture" : item.name}{category === item.name && <Check size={13}/>}</button>)}</div>}
      <div className="market-category-pills">{categories.map(item => <button key={item.name} className={category === item.name ? "selected" : ""} onClick={() => setCategory(item.name)}>{item.name === "All" ? "All" : item.name}</button>)}</div>
      {filtered.length ? <div className="market-product-grid market-browse-grid">{filtered.map(item => <article className="market-product-card" key={item.id}>
        <button className={saved.includes(item.id) ? "market-favourite is-saved" : "market-favourite"} onClick={() => toggleSaved(item.id)} aria-label="Save design"><Heart size={17} fill={saved.includes(item.id) ? "currentColor" : "none"}/></button>
        <button className="market-product-photo" onClick={() => openDetail(item)}><img src={item.image} alt={item.name + " design inspiration"}/><span>DESIGN INSPIRATION</span></button>
        <div className="market-product-meta"><span>{item.category}</span><button onClick={() => openDetail(item)} aria-label={"View " + item.name}><ArrowRight size={16}/></button></div>
        <button className="market-product-name" onClick={() => openDetail(item)}>{item.name}</button>
        <p>Ask us about designs & options</p>
      </article>)}</div> : <div className="market-no-results"><Search size={27}/><h3>No matching inspiration found</h3><p>Try another search or choose a different category.</p><button onClick={() => {setSearch("");setCategory("All");}}>Clear search & filters</button></div>}
      <p className="market-disclaimer">Images are for design inspiration only. They are not confirmed products or current stock. Materials, dimensions, finishes, availability and prices must be confirmed with Kids Furniture Kenya.</p>
    </section>}

    {view === "detail" && <section className="market-detail-page">
      <div className="market-breadcrumb"><button onClick={() => setView("browse")}><ArrowLeft size={15}/> Back to furniture</button><ChevronRight size={13}/>{selected.category}</div>
      <div className="market-detail-layout"><div className="market-detail-image"><img src={selected.image} alt={selected.name + " inspiration"}/><span>DESIGN INSPIRATION</span></div>
        <div className="market-detail-copy"><span className="market-eyebrow">{selected.category.toUpperCase()} COLLECTION</span><h1>{selected.name}</h1><div className="market-detail-rating"><span>✳</span> A starting point for your own design</div><p>{selected.description}</p><div className="market-detail-rule"/><h3>Make it yours</h3><p>Like this look? Ask our team about possible sizes, materials, colours and custom design options for your space.</p><div className="market-detail-note"><ShieldCheck size={18}/><span><b>Made personal</b><small>Details and quotation confirmed directly with our team.</small></span></div><button className="market-primary-button market-detail-cta" onClick={() => makeEnquiry(selected)}>Enquire about this design <ArrowRight size={17}/></button><button className="market-save-detail" onClick={() => toggleSaved(selected.id)}><Heart size={17} fill={saved.includes(selected.id) ? "currentColor" : "none"}/>{saved.includes(selected.id) ? "Saved to favourites" : "Save this inspiration"}</button></div>
      </div>
      <div className="market-related"><div className="market-section-title"><div><span className="market-eyebrow">KEEP EXPLORING</span><h2>More little <em>ideas</em></h2></div><button onClick={() => openBrowse(selected.category)}>View category <ArrowRight size={15}/></button></div><div className="market-product-grid">{inspirations.filter(item => item.id !== selected.id).slice(0, 3).map(item => <article className="market-product-card" key={item.id}><button className="market-product-photo" onClick={() => openDetail(item)}><img src={item.image} alt={item.name}/><span>DESIGN INSPIRATION</span></button><div className="market-product-meta"><span>{item.category}</span></div><button className="market-product-name" onClick={() => openDetail(item)}>{item.name}</button></article>)}</div></div>
    </section>}

    {view === "saved" && <section className="market-browse-page"><div className="market-breadcrumb"><button onClick={() => setView("home")}><ArrowLeft size={15}/> Home</button><ChevronRight size={13}/> Saved inspiration</div><div className="market-browse-heading"><div><span className="market-eyebrow">YOUR LITTLE WISHLIST</span><h1>Saved inspiration.</h1><p>Keep the ideas you love close while you plan their space.</p></div></div>{savedItems.length ? <div className="market-product-grid market-browse-grid">{savedItems.map(item => <article className="market-product-card" key={item.id}><button className="market-favourite is-saved" onClick={() => toggleSaved(item.id)} aria-label="Remove saved design"><Heart size={17} fill="currentColor"/></button><button className="market-product-photo" onClick={() => openDetail(item)}><img src={item.image} alt={item.name}/><span>DESIGN INSPIRATION</span></button><div className="market-product-meta"><span>{item.category}</span></div><button className="market-product-name" onClick={() => openDetail(item)}>{item.name}</button></article>)}</div> : <div className="market-no-results"><Heart size={27}/><h3>No saved designs yet</h3><p>Tap the heart on any inspiration to keep it here.</p><button onClick={() => openBrowse("All")}>Explore furniture</button></div>}</section>}

    <footer className="market-footer"><div className="market-footer-main"><Brand/><p>Little spaces. Big dreams.<br/>Furniture for their little world.</p><a href="/#enquiry">Talk to our team <ArrowRight size={15}/></a></div><div className="market-footer-bottom"><span>© {new Date().getFullYear()} Kids Furniture Kenya</span><span>Made with care in Kenya <b>♥</b></span></div></footer>
    <nav className="market-mobile-nav" aria-label="Marketplace navigation"><button className={view === "home" ? "active" : ""} onClick={() => setView("home")}><Home size={19}/><span>Home</span></button><button className={view === "browse" ? "active" : ""} onClick={() => openBrowse("All")}><Grid2X2 size={19}/><span>Shop</span></button><button className={view === "saved" ? "active" : ""} onClick={() => setView("saved")}><Heart size={19}/><span>Saved</span></button><button onClick={() => makeEnquiry()}><MessageCircle size={19}/><span>Enquire</span></button></nav>
  </main>;
}
