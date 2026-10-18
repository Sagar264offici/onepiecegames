import { useEffect, useState } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Clock3, Crown, Gamepad2, Headphones, Menu, MonitorPlay, ShieldCheck,
  Sparkles, Swords, Users, X, Zap
} from "lucide-react";

// Set this to the business WhatsApp number (international format, digits only)
// when the owner shares it. Leave blank for the demo preview.
const CONTACT_WHATSAPP = "";

const photos = {
  hero: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1800&q=88",
  console: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1000&q=85",
  controller: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?auto=format&fit=crop&w=1000&q=85",
  room: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85",
  racing: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",
  gamer: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=1000&q=85",
  party: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85"
};

const plans = [
  { id: "solo45", tag: "QUICK MATCH", name: "Solo play", detail: "45 minutes", price: "₹100", suffix: "/ session", icon: Gamepad2, points: ["Your own console", "Pick your game", "Perfect for a quick break"] },
  { id: "solo60", tag: "MOST PLAYED", name: "Solo play", detail: "1 full hour", price: "₹120", suffix: "/ hour", icon: Zap, hot: true, points: ["Full 60-minute session", "Premium console experience", "No crew needed"] },
  { id: "pass", tag: "BEST VALUE", name: "Game pass", detail: "10 hours total", price: "₹800", suffix: "/ pass", icon: Crown, points: ["Works out to ₹80/hour", "Spread sessions across your week", "Save ₹400 vs ten 1-hour sessions"] }
];

const crewPlans = [
  { id: "crew3", members: "3 MEMBERS", price: "₹200", note: "1 hour · bring your crew" },
  { id: "crew4", members: "4 MEMBERS", price: "₹250", note: "1 hour · maximum chaos" }
];

const tags = ["All games", "Action", "Sports", "Racing", "Adventure"];
const games = [
  { title: "Adventure mode", type: "Adventure", line: "Explore worlds. Write your story.", image: photos.controller, number: "01" },
  { title: "Sports arena", type: "Sports", line: "Friendly rivalry starts here.", image: photos.console, number: "02" },
  { title: "Speed run", type: "Racing", line: "Fast laps. Big bragging rights.", image: photos.racing, number: "03" },
  { title: "Boss fight", type: "Action", line: "One more try. You got this.", image: photos.gamer, number: "04" }
];

function Brand() {
  return <a className="brand" href="#home" aria-label="One Piece Game Zone home">
    <span className="brand-mark"><Swords size={21} strokeWidth={2.5} /></span>
    <span className="brand-type"><strong>ONE PIECE</strong><small>GAME ZONE</small></span>
  </a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameFilter, setGameFilter] = useState("All games");
  const [chosen, setChosen] = useState("solo60");
  const [form, setForm] = useState({ name: "", date: "", session: "1-hour solo session" });
  const [notice, setNotice] = useState("");

  // Soft reveal-on-scroll motion; content remains visible when motion APIs are unavailable.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const selector = ".hero-copy, .hero-art, .section-head, .feature-card, .game-card, .price-card, .controller-addon, .crew-photo, .crew-copy, .gallery-card, .booking-form, .book-promise";
    const nodes = Array.from(document.querySelectorAll(selector));
    nodes.forEach((node, index) => {
      node.classList.add("motion-reveal");
      node.style.setProperty("--reveal-delay", (index % 4) * 85 + "ms");
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const visibleGames = gameFilter === "All games" ? games : games.filter(function (game) { return game.type === gameFilter; });

  function choosePlan(id) {
    setChosen(id);
    const session = id === "crew3" ? "Crew mode · 3 players" :
      id === "crew4" ? "Crew mode · 4 players" :
      id === "pass" ? "10-hour game pass" :
      id === "solo45" ? "45-minute solo session" : "1-hour solo session";
    setForm(function (old) { return { ...old, session: session }; });
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  function submitBooking(event) {
    event.preventDefault();
    const message = "Hi One Piece Game Zone! I'd like to enquire about a session. Name: " +
      (form.name || "Not provided") + ". Plan: " + form.session + ". Preferred date: " +
      (form.date || "Flexible") + ".";
    if (CONTACT_WHATSAPP) {
      window.open("https://wa.me/" + CONTACT_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
      setNotice("Your WhatsApp message is ready in a new tab. Send it there to confirm your enquiry.");
    } else {
      setNotice("Demo preview: add the business WhatsApp number in src/App.jsx to send this enquiry directly.");
    }
  }

  function closeMenu() { setMenuOpen(false); }

  return <main>
    <div className="top-strip"><span>✦</span> YOUR SAVE POINT FOR GOOD TIMES <span>✦</span><b>PLAY · RELAX · REPEAT</b></div>
    <header className="site-header">
      <div onClick={closeMenu}><Brand /></div>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#games" onClick={closeMenu}>Game library</a>
        <a href="#pricing" onClick={closeMenu}>Pricing</a>
        <a href="#crew" onClick={closeMenu}>Crew mode</a>
        <a className="nav-cta" href="#book" onClick={closeMenu}>Book a session <ArrowUpRight size={16} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section className="hero wrap" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><i /> HUB FOR YOUR NEXT HIGH SCORE</div>
        <h1>THE WORLD<br />IS YOUR <em>PLAYGROUND.</em></h1>
        <p className="hero-subtitle">Big-screen battles. Legendary adventures. One more round with your crew. Your next favourite gaming memory starts here.</p>
        <div className="hero-actions"><a className="button yellow" href="#pricing">Explore the prices <ArrowRight size={18} /></a><a className="text-link" href="#experience"><span className="play-icon">▶</span> Take a look around</a></div>
        <div className="hero-proof"><span className="proof-icon"><Gamepad2 size={20} /></span><div><strong>SOLO OR SQUAD</strong><small>Your game. Your pace. Your rules.</small></div><i className="proof-divider" /><div><strong>FROM ₹100</strong><small>Sessions that fit your day.</small></div></div>
        <div className="scribble">GOOD<br />GAME! <ArrowDownRight size={24} /></div>
      </div>
      <div className="hero-art">
        <div className="hero-frame"><img src={photos.hero} alt="Modern gaming setup with ambient lighting" /></div>
        <div className="hero-shade" />
        <div className="hero-label"><i /> PLAYER 01 · READY</div>
        <div className="hero-sticker"><span>YOUR</span><strong>CREW</strong><span>AWAITS!</span><Swords size={24} /></div>
        <span className="hero-orbit orbit-one" aria-hidden="true">✦</span><span className="hero-orbit orbit-two" aria-hidden="true">＋</span>
        <div className="hero-price"><span>START YOUR RUN</span><strong>₹100<span>*</span></strong><small>*45-minute solo play</small></div>
        <div className="hero-caption"><span>01 / THE GAME ZONE</span><span>PRESS START <ArrowUpRight size={14} /></span></div>
      </div>
      <div className="hero-bottom"><span>PRESS START TO BEGIN</span><i /><span>NO SKILL LEVEL REQUIRED</span></div>
    </section>

    <div className="ticker"><div>PLAY HARD <b>✦</b> STAY LEGENDARY <b>✦</b> BRING THE CREW <b>✦</b> ONE MORE ROUND <b>✦</b> PLAY HARD <b>✦</b> STAY LEGENDARY <b>✦</b></div></div>

    <section className="experience wrap" id="experience">
      <div className="section-head"><div><div className="eyebrow"><i /> NOT JUST A GAME SESSION</div><h2>GOOD GAMES.<br /><em>BETTER STORIES.</em></h2></div><p>Pull up for a quick solo run or make an afternoon of it with your friends. We bring the setup; you bring the energy.</p></div>
      <div className="feature-grid">
        <article className="feature-card feature-main"><img className="feature-photo" src={photos.room} alt="Gaming arena with screens" loading="lazy" /><span className="feature-num">01 / THE SETUP</span><span className="feature-icon"><MonitorPlay /></span><h3>Big-screen<br />immersion.</h3><p>Get close to the action with a console-first setup built for those cinematic moments.</p><a className="round-link" href="#pricing" aria-label="Explore prices"><ArrowUpRight /></a></article>
        <article className="feature-card feature-yellow"><span className="feature-num">02 / THE VIBE</span><span className="feature-icon dark"><Headphones /></span><h3>Lock in.<br />Zone out.</h3><p>Leave the scroll behind. Find your game, get comfortable, and settle in.</p><strong className="doodle">GG<span>!</span></strong><small className="feature-bottom">GOOD GAME ENERGY ONLY</small></article>
        <article className="feature-card feature-red"><span className="feature-num">03 / YOUR PEOPLE</span><span className="feature-icon"><Users /></span><h3>More players.<br />More chaos.</h3><p>Bring the crew for friendly rivalries, clutch wins, and stories you’ll retell.</p><a className="white-link" href="#crew">See crew mode <ArrowRight size={16} /></a><span className="red-spark">✳</span></article>
      </div>
    </section>

    <section className="games-section" id="games"><div className="wrap">
      <div className="section-head"><div><div className="eyebrow"><i /> CHOOSE YOUR QUEST</div><h2>WHAT ARE WE<br /><em>PLAYING TODAY?</em></h2></div><p>Go for the story. Chase the win. Challenge your friend. Pick a vibe and make it yours.</p></div>
      <div className="filters">{tags.map(tag => <button key={tag} className={gameFilter === tag ? "filter active" : "filter"} onClick={() => setGameFilter(tag)}>{tag}</button>)}</div>
      <div className="game-grid">{visibleGames.map(game => <article className="game-card" key={game.title}><div className="game-image"><img src={game.image} alt="" loading="lazy" /><span>{game.number}</span><i><ArrowUpRight /></i></div><div className="game-info"><div><small>{game.type.toUpperCase()}</small><h3>{game.title}</h3><p>{game.line}</p></div><ArrowUpRight className="game-arrow" /></div></article>)}</div>
      <div className="games-foot"><Sparkles size={17} /><span>Availability can vary by console and session. Ask what’s ready to play.</span><a href="#book">Ask about games <ArrowRight size={15} /></a></div>
    </div></section>

    <section className="pricing wrap" id="pricing">
      <div className="section-head"><div><div className="eyebrow"><i /> NO SECRET LEVELS HERE</div><h2>GOOD TIMES.<br /><em>CLEAR PRICES.</em></h2></div><p>Pick your play style. We keep the pricing straightforward, so you can focus on the match.</p></div>
      <div className="price-grid">{plans.map(plan => { const Icon = plan.icon; return <article className={"price-card " + (plan.hot ? "hot" : "")} key={plan.id}>
        {plan.hot && <div className="popular">PLAYER FAVOURITE <Sparkles size={13} /></div>}
        <div className="price-top"><small>{plan.tag}</small><span><Icon /></span></div><h3>{plan.name}</h3><p className="plan-detail">{plan.detail}</p><div className="amount">{plan.price}<small>{plan.suffix}</small></div><div className="rule" />
        <ul>{plan.points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul>
        <button className={plan.hot ? "button dark-button" : "button outline-button"} onClick={() => choosePlan(plan.id)}>Choose this plan <ArrowUpRight size={17} /></button>
      </article>; })}</div>
      <div className="controller-addon"><span><Gamepad2 /></span><div><strong>Need another controller?</strong><small>Add an extra controller to the fun.</small></div><b>₹50 <small>/ extra controller</small></b></div>
    </section>

    <section className="crew-section" id="crew">
      <div className="crew-photo"><img src={photos.party} alt="Friends sharing a gaming session" loading="lazy" /><strong>SQUAD / 04</strong></div>
      <div className="crew-copy"><div className="eyebrow"><i /> SQUAD UP</div><h2>THE CREW<br />IS THE <em>CONTENT.</em></h2><p>Trash talk, last-second wins, and the “run it back” moment. Crew Mode is for the stories you can’t get playing alone.</p>
        <div className="crew-options">{crewPlans.map(plan => <button className={"crew-option " + (chosen === plan.id ? "selected" : "")} onClick={() => choosePlan(plan.id)} key={plan.id}><small>{plan.members}</small><strong>{plan.price}</strong><span>{plan.note}</span><ArrowUpRight /></button>)}</div>
        <div className="crew-note"><Users size={17} /> Extra controller available for ₹50. Ask about larger groups.</div>
      </div>
    </section>

    <section className="gallery wrap"><div className="gallery-head"><div><div className="eyebrow"><i /> COME FOR THE GAME</div><h2>STAY FOR THE <em>VIBE.</em></h2></div><small>THE ZONE / 001—003</small></div>
      <div className="gallery-grid"><article className="gallery-card wide"><img src={photos.room} alt="Gaming arena ambience" loading="lazy" /><b>01</b><strong>Big-screen energy</strong><ArrowUpRight /></article><article className="gallery-card"><img src={photos.party} alt="Gaming with friends" loading="lazy" /><b>02</b><strong>Bring your crew</strong><ArrowUpRight /></article><article className="gallery-card"><img src={photos.console} alt="Gaming console" loading="lazy" /><b>03</b><strong>Console time</strong><ArrowUpRight /></article></div>
      <p className="gallery-note">Visual previews use illustrative stock photography. Actual room, console and game availability can differ.</p>
    </section>

    <section className="book-section" id="book"><div className="book-mark">START</div><div className="wrap book-layout">
      <div className="book-copy"><div className="eyebrow"><i /> READY PLAYER ONE?</div><h2>YOUR NEXT<br /><em>ROUND STARTS</em><br />HERE.</h2><p>Choose your plan and send a session enquiry. Bring a friend, bring your crew, or come ready to beat your own score.</p><div className="book-promise"><ShieldCheck /><span><strong>Easy session enquiry</strong><small>No payment collected on this demo website.</small></span></div></div>
      <form className="booking-form" onSubmit={submitBooking}><div className="form-head"><span>SESSION REQUEST</span><i /></div>
        <label>Your name<input required placeholder="Player name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
        <label>Choose a session<div className="select-wrap"><select value={form.session} onChange={e => setForm({ ...form, session: e.target.value, })}><option>1-hour solo session</option><option>45-minute solo session</option><option>Crew mode · 3 players</option><option>Crew mode · 4 players</option><option>10-hour game pass</option></select><ChevronDown /></div></label>
        <label>Preferred date<input type="date" value={form.date} min={new Date().toISOString().slice(0, 10)} onChange={e => setForm({ ...form, date: e.target.value })} /></label>
        <button type="submit" className="button yellow submit-button">Start my enquiry <ArrowRight size={18} /></button>
        {notice && <p className="notice" role="status">{notice}</p>}
        <p className="fineprint">Submitting prepares an enquiry only; your session is not confirmed until the team responds.</p>
      </form>
    </div></section>

    <footer><div className="footer-main wrap"><Brand /><p>Play together. Make it legendary.</p><nav><a href="#experience">Experience</a><a href="#games">Games</a><a href="#pricing">Pricing</a><a href="#book">Enquire</a></nav><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={15} /></a></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} One Piece Game Zone</span><span>BUILT FOR THE LOVE OF PLAY <b>✦</b></span><span>PRICES IN INR</span></div></footer>
  </main>;
}
