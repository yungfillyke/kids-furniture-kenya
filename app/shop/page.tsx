"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, Heart, ShoppingBag, Menu, X, ChevronRight, SlidersHorizontal, MessageCircle, ShieldCheck, Truck, Sparkles, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";

type Category = "Beds" | "Study" | "Storage" | "Playroom";
type Item = { id:number; name:string; category:Category; image:string; description:string; tag:string };
const items:Item[] = [
 {id:1,name:"Dreamy Kids Bed",category:"Beds",image:"https://images.pexels.com/photos/4682146/pexels-photo-4682146.jpeg?auto=compress&cs=tinysrgb&w=1000",description:"A cosy bedroom idea with room for bedtime stories and growing dreams.",tag:"BEDROOM"},
 {id:2,name:"Space-Saving Bunk Bed",category:"Beds",image:"https://images.pexels.com/photos/5008397/pexels-photo-5008397.jpeg?auto=compress&cs=tinysrgb&w=1000",description:"A clever shared-room idea that leaves more room to play.",tag:"BEDROOM"},
 {id:3,name:"Little Learner Desk",category:"Study",image:"https://images.pexels.com/photos/9328035/pexels-photo-9328035.jpeg?auto=compress&cs=tinysrgb&w=1000",description:"A dedicated corner for homework, drawing and big ideas.",tag:"STUDY"},
 {id:4,name:"Toy & Clothes Storage",category:"Storage",image:"https://images.pexels.com/photos/7045947/pexels-photo-7045947.jpeg?auto=compress&cs=tinysrgb&w=1000",description:"Ideas for keeping everyday essentials organised and close at hand.",tag:"STORAGE"},
 {id:5,name:"Growing-Up Wardrobe",category:"Storage",image:"https://images.pexels.com/photos/7587810/pexels-photo-7587810.jpeg?auto=compress&cs=tinysrgb&w=1000",description:"A practical storage idea for a child's changing needs.",tag:"STORAGE"},
 {id:6,name:"Playroom Chair",category:"Playroom",image:"https://images.pexels.com/photos/8923989/pexels-photo-8923989.jpeg?auto=compress&cs=tinysrgb&w=1000",description:"A playful place to read, create and relax.",tag:"PLAYROOM"}
];
const categories:{name:Category;sub:string;image:string}[]=[
 {name:"Beds",sub:"Sleep & dream",image:items[0].image},{name:"Study",sub:"Learn & create",image:items[2].image},{name:"Storage",sub:"Everything in its place",image:items[3].image},{name:"Playroom",sub:"Room to play",image:items[5].image}
];
function Brand(){return <a className="brand" href="/" aria-label="Kids Furniture Kenya home"><span className="brand-kids">KIDS</span><span className="brand-furniture">FÜRNITÜRE</span><span className="brand-kenya">KENYA</span></a>}
function WhatsApp({selected}:{selected:Item[]}){const message=selected.length? "Hello Kids Furniture Kenya, I would like to enquire about these designs:\\n"+selected.map(x=>"• "+x.name).join("\\n")+"\\nPlease share available options and a quotation.":"Hello Kids Furniture Kenya! I'd like to enquire about your children's furniture and custom options.";return <a className="store-primary" href={"https://wa.me/?text="+encodeURIComponent(message)} target="_blank" rel="noreferrer">Send enquiry <ArrowRight size={16}/></a>}
export default function ShopPage(){
 const [page,setPage]=useState<"home"|"shop"|"saved"|"detail"|"cart"|"profile">("home");
 const [category,setCategory]=useState<Category|"All">("All");
 const [query,setQuery]=useState("");
 const [active,setActive]=useState<Item>(items[0]);
 const [saved,setSaved]=useState<number[]>([]);
 const [cart,setCart]=useState<number[]>([]);
 const [menu,setMenu]=useState(false);
 const [filters,setFilters]=useState(false);
 const [sort,setSort]=useState("Featured");
 const list=useMemo(()=>{let a=items.filter(x=>(category==="All"||x.category===category)&&(!query||[x.name,x.category,x.description].join(" ").toLowerCase().includes(query.toLowerCase())));if(sort==="A–Z")a=[...a].sort((x,y)=>x.name.localeCompare(y.name));return a},[category,query,sort]);
 const chosen=items.filter(x=>cart.includes(x.id));
 const goShop=(c:Category|"All"="All")=>{setCategory(c);setQuery("");setPage("shop");setMenu(false);window.scrollTo({top:0,behavior:"smooth"})};
 const toggle=(id:number,arr:number[],setter:(v:number[])=>void)=>setter(arr.includes(id)?arr.filter(x=>x!==id):[...arr,id]);
 const detail=(x:Item)=>{setActive(x);setPage("detail");window.scrollTo({top:0,behavior:"smooth"})};
 const cards=(arr:Item[])=> <div className="store-grid">{arr.map(x=><article className="store-card" key={x.id}><div className="store-card-photo"><button className="store-photo-open" onClick={()=>detail(x)}><img src={x.image} alt={x.name}/></button><span className="store-tag">{x.tag}</span><button className={"store-heart "+(saved.includes(x.id)?"is-saved":"")} onClick={()=>toggle(x.id,saved,setSaved)} aria-label="Save item"><Heart size={17} fill={saved.includes(x.id)?"currentColor":"none"}/></button></div><div className="store-card-info"><small>{x.category}</small><button className="store-card-name" onClick={()=>detail(x)}>{x.name}</button><p>Ask for sizes, finishes & a quote</p><button className="store-add" onClick={()=>toggle(x.id,cart,setCart)}>{cart.includes(x.id)?"Added to enquiry list":"Add to enquiry list"} <Plus size={14}/></button></div></article>)}</div>;
 return <main className="storefront">
  <div className="store-strip">Thoughtful furniture for little people <span>♥</span> Proudly Kenyan</div>
  <header className="store-header"><a href="/" className="store-logo"><Brand/></a><nav className={menu?"store-nav nav-open":"store-nav"}><button onClick={()=>{setPage("home");setMenu(false)}}>Home</button><button onClick={()=>goShop()}>Shop all</button>{categories.map(c=><button key={c.name} onClick={()=>goShop(c.name)}>{c.name}</button>)}</nav><div className="store-actions"><button aria-label="Saved" onClick={()=>setPage("saved")}><Heart/><span>{saved.length}</span></button><button aria-label="Enquiry basket" onClick={()=>setPage("cart")}><ShoppingBag/><span>{cart.length}</span></button></div><button className="store-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></header>
  {page==="home"&&<>
   <section className="store-hero"><div className="store-hero-copy"><h1>Make room for<br/><em>little wonders.</em></h1><p>Discover thoughtful furniture ideas for growing minds, cosy nights and everyday adventures.</p><button className="store-primary" onClick={()=>goShop()}>Explore our products <ArrowRight size={16}/></button></div></section>  <nav className="store-bottom-nav" aria-label="Main navigation"><button className={page==="home"?"active":""} onClick={()=>setPage("home")}><span className="store-nav-icon">⌂</span><small>Home</small></button><button className={page==="saved"?"active":""} onClick={()=>setPage("saved")}><Heart/><small>Favorites</small></button><button className={page==="shop"?"active":""} onClick={()=>goShop()}><Search/><small>Search</small></button><button className={page==="profile"?"active":""} onClick={()=>setPage("profile")}><span className="store-nav-icon"><span className="store-profile-icon">●</span></span><small>Profile</small></button></nav><div className="store-actions"><button aria-label="Saved" onClick={()=>setPage("saved")}><Heart/><span>{saved.length}</span></button><button aria-label="Enquiry basket" onClick={()=>setPage("cart")}><ShoppingBag/><span>{cart.length}</span></button></div><button className="store-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></header>
  {page==="home"&&<>
   <section className="store-hero"><div className="store-hero-copy"><h1>Make room for<br/><em>little wonders.</em></h1><p>Discover thoughtful furniture ideas for growing minds, cosy nights and everyday adventures.</p><button className="store-primary" onClick={()=>goShop()}>Explore our products <ArrowRight size={16}/></button></div></section>  {page==="profile"&&<section className="store-page"><div className="store-breadcrumb"><button onClick={()=>setPage("home")}><ArrowLeft size={14}/> Home</button><ChevronRight size={13}/> Profile</div><div className="store-heading"><div><small>KIDS FURNITURE KENYA</small><h2>Your space</h2><p>Welcome. Explore our designs or get in touch with our team.</p></div></div><div className="store-profile-panel"><h3>How can we help?</h3><p>Ask about furniture designs, available options, custom requests and delivery.</p><WhatsApp selected={[]}/><button className="store-profile-link" onClick={()=>setPage("cart")}>View your enquiry basket <ArrowRight size={15}/></button></div></section>}

