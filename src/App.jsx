import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck,
  Check, ChevronDown, Clock3, Gamepad2, Headphones, MapPin, Menu,
  Monitor, PartyPopper, Play, ShieldCheck, Sparkles, Swords, Trophy,
  Users, X, Zap
} from "lucide-react";

const WHATSAPP_NUMBER = ""; // Add the business WhatsApp number in international format, digits only.
const base = import.meta.env.BASE_URL;
const roomPhoto = base + "images/zone-hero.webp";
const stock = {
  screen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85",
  console: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1000&q=82",
  controller: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?auto=format&fit=crop&w=1000&q=82",
  team: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=82",
  arcade: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=82",
  retro: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=82"
};

const experiences = [
  { number: "01", icon: Gamepad2, title: "PS5 gaming", short: "Pick your title. Pick your pace.", detail: "Settle into a console session with a big screen, DualSense controls, and a library built for one-more-round energy.", price: "₹100", unit: "45 min", image: stock.console, type: "Solo / duo" },
  { number: "02", icon: Users, title: "Crew mode", short: "Rivals today. Stories tomorrow.", detail: "Bring your friends for head-to-head matches, co-op quests, football rivalries, and rematches that never stay at one.", price: "₹200", unit: "3 players · 1 hr", image: stock.team, type: "Group play" },
  { number: "03", icon: Trophy, title: "Game pass", short: "For players who always come back.", detail: "Lock in ten hours of play for ₹800. That is ₹80 per hour for players who prefer a longer run.", price: "₹800", unit: "10 hours", image: stock.controller, type: "Best value" }
];

const genres = ["All games", "Sports", "Action", "Racing", "Adventure", "Wrestling"];
const library = [
  { name: "EA SPORTS FC 26", genre: "Sports", label: "MATCH DAY", image: stock.team },
  { name: "Cricket 26", genre: "Sports", label: "INDIAN EDITION", image: stock.controller },
  { name: "WWE 2K26", genre: "Wrestling", label: "MAIN EVENT", image: stock.retro },
  { name: "Grand Theft Auto V", genre: "Action", label: "OPEN WORLD", image: stock.screen },
  { name: "Far Cry 6", genre: "Action", label: "ACTION", image: stock.arcade },
  { name: "Assassin's Creed", genre: "Adventure", label: "ADVENTURE", image: stock.console },
  { name: "God of War", genre: "Adventure", label: "EPIC QUEST", image: stock.retro },
  { name: "Ghost of Tsushima", genre: "Adventure", label: "STORY MODE", image: stock.team },
  { name: "Need for Speed", genre: "Racing", label: "RACING", image: stock.arcade },
  { name: "Gran Turismo", genre: "Racing", label: "SIM / RACING", image: stock.screen },
  { name: "Spider-Man 2", genre: "Action", label: "HERO MODE", image: stock.console },
  { name: "Hogwarts Legacy", genre: "Adventure", label: "FANTASY", image: stock.controller }
];

const faqs = [
  { q: "How much does a session cost?", a: "Solo play is ₹100 for 45 minutes or ₹120 for one hour. Crew Mode is ₹200 for three players or ₹250 for four players per hour. The ten-hour pass is ₹800." },
  { q: "Can I bring friends?", a: "Yes. Crew Mode pricing is designed for three or four players. An extra controller is listed at ₹50." },
  { q: "What games can I play?", a: "The game library shown here is a guide based on the titles supplied for this page. Ask the team to confirm that a specific game is installed and available before visiting." },
  { q: "How does the ten-hour pass work?", a: "The listed pass includes ten hours for ₹800, averaging ₹80 per hour. Ask the team about session scheduling and any validity conditions before purchasing." },
  { q: "Where is the gaming zone located?", a: "The address and business contact details were not included in the supplied information. Add the verified location before publishing this section as a live business listing." }
];

function Brand() {
  return <a className="brand" href="#home" aria-label="One Piece Game Zone home">
    <span className="brand-logo"><Swords size={21} strokeWidth={2.3} /></span>
    <span className="brand-name"><strong>ONE PIECE</strong><small>GAME ZONE</small></span>
  </a>;
}

function SectionLabel({ children, number }) {
  return <div className="section-label"><span>{number}</span><i />{children}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genre, setGenre] = useState("All games");
  const [activeFaq, setActiveFaq] = useState(0);
  const [form, setForm] = useState({ name: "", date: "", session: "1-hour solo session", players: "1 player" });
  const [feedback, setFeedback] = useState("");
  const filteredGames = useMemo(() => genre === "All games" ? library : library.filter(game => game.genre === genre), [genre]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const items = [...document.querySelectorAll("[data-reveal]")];
    items.forEach((el, i) => {
      el.classList.add("reveal-ready");
      el.style.setProperty("--reveal-delay", (i % 4) * 70 + "ms");
    });
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      }
    }), { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  function closeMenu() { setMenuOpen(false); }
  function pickSession(session) {
    setForm(prev => ({ ...prev, session }));
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  }
  function submitBooking(event) {
    event.preventDefault();
    const msg = "Hi One Piece Game Zone! I'd like to enquire about a gaming session. Name: " +
      (form.name || "Not provided") + ". Session: " + form.session + ". Players: " + form.players +
      ". Preferred date: " + (form.date || "Flexible") + ".";
    if (WHATSAPP_NUMBER) {
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
      setFeedback("Your enquiry is ready in WhatsApp. Send the message to request confirmation.");
    } else {
      setFeedback("Demo mode: add the verified business WhatsApp number to WHATSAPP_NUMBER in src/App.jsx to enable direct booking.");
    }
  }

  return <main id="home">
    <div className="announce"><span className="announce-star">✳</span><span>YOUR NEXT FAVOURITE GAME NIGHT STARTS HERE</span><b>PLAY · RELAX · REPEAT</b><span className="announce-star">✳</span></div>
    <header className="header">
      <Brand />
      <button className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? "navigation open" : "navigation"}>
        <a href="#experiences" onClick={closeMenu}>Experiences</a>
        <a href="#games" onClick={closeMenu}>Game library</a>
        <a href="#pricing" onClick={closeMenu}>Pricing</a>
        <a href="#gallery" onClick={closeMenu}>The zone</a>
        <a className="nav-book" href="#book" onClick={closeMenu}>Book a session <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <section className="hero container">
      <div className="hero-content" data-reveal>
        <SectionLabel number="LEVEL 01">WELCOME TO THE ZONE</SectionLabel>
        <h1>YOUR GAME.<br />YOUR RULES.<br /><em>YOUR LEGEND.</em></h1>
        <p className="hero-intro">A screen that pulls you in. A controller that feels right. Friends who never let you win quietly. This is your next gaming hangout.</p>
        <div className="hero-ctas"><a className="button button-yellow" href="#pricing">Find your session <ArrowRight size={17} /></a><a className="play-link" href="#experiences"><span><Play size={13} fill="currentColor" /></span> Explore the zone</a></div>
        <div className="hero-stats">
          <div><strong>₹100</strong><span>45-MIN SOLO PLAY</span></div><i />
          <div><strong>₹200</strong><span>CREW FROM 3</span></div><i />
          <div><strong>₹80<span>/hr</span></strong><span>10-HR PASS RATE</span></div>
        </div>
      </div>
      <div className="hero-visual" data-reveal>
        <div className="hero-image"><img src={roomPhoto} alt="The One Piece Game Zone with PlayStation stations, bean bags and colorful ambient lighting" fetchPriority="high" onError={e => { e.currentTarget.src = stock.screen; }} /></div>
        <div className="hero-gradient" />
        <div className="hero-image-top"><span className="live-dot" /> INSIDE THE GAME ZONE <span>01 / 04</span></div>
        <div className="hero-image-bottom"><div><small>ONE MORE ROUND?</small><strong>ALWAYS.</strong></div><a href="#gallery" aria-label="View the gaming zone"><ArrowDownRight size={26} /></a></div>
        <div className="floating-stamp"><span>GOOD</span><strong>GAME!</strong><Swords size={24} /></div>
        <div className="floating-chip"><Gamepad2 size={18} /><span>PLAYER 01<br /><b>READY TO PLAY</b></span></div>
        <div className="visual-spark spark-a">✳</div><div className="visual-spark spark-b">✦</div>
      </div>
      <a className="scroll-cue" href="#experiences"><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /></a>
    </section>

    <div className="marquee" aria-label="Play solo, bring the crew, have a good game"><div>PLAY SOLO <b>✳</b> BRING THE CREW <b>✳</b> FIND YOUR NEXT FAVOURITE <b>✳</b> PRESS START <b>✳</b> PLAY SOLO <b>✳</b> BRING THE CREW <b>✳</b> FIND YOUR NEXT FAVOURITE <b>✳</b> PRESS START <b>✳</b></div></div>

    <section className="section container experiences" id="experiences">
      <div className="section-heading" data-reveal><div><SectionLabel number="01">WHAT WE'RE ABOUT</SectionLabel><h2>BUILT FOR THE<br /><em>“ONE MORE GAME”</em><br />MOMENT.</h2></div><p>From a quick solo session to a full crew takeover, make the time count. Choose your kind of fun and let the match begin.</p></div>
      <div className="experience-grid">{experiences.map((item, index) => { const Icon = item.icon; return <article className={"experience-card exp-" + index} data-reveal key={item.number}>
        <div className="experience-photo"><img src={item.number === "01" ? roomPhoto : item.image} alt={item.title + " experience"} loading="lazy" onError={e => { e.currentTarget.src = item.image; }} /><span className="experience-num">{item.number}</span><span className="photo-arrow"><ArrowUpRight size={17} /></span></div>
        <div className="experience-text"><div className="exp-type"><Icon size={15} /> {item.type}</div><h3>{item.title}</h3><p className="exp-short">{item.short}</p><p className="exp-detail">{item.detail}</p><div className="exp-foot"><div><strong>{item.price}</strong><small>{item.unit}</small></div><button aria-label={"Ask about " + item.title} onClick={() => pickSession(item.number === "02" ? "Crew mode · 3 players" : item.number === "03" ? "10-hour game pass" : "1-hour solo session")}><ArrowRight size={17} /></button></div></div>
      </article>; })}</div>
    </section>

    <section className="library-section" id="games"><div className="container section">
      <div className="section-heading" data-reveal><div><SectionLabel number="02">PICK YOUR QUEST</SectionLabel><h2>PLAY WHAT'S<br /><em>CALLING YOU.</em></h2></div><p>Football, racing, action, adventure and more. Find your next obsession—or challenge your friend to a rematch.</p></div>
      <div className="genre-row" role="group" aria-label="Filter games by genre">{genres.map(item => <button className={genre === item ? "genre-pill active" : "genre-pill"} key={item} onClick={() => setGenre(item)}>{item}</button>)}</div>
      <div className="games-grid">{filteredGames.map((game, index) => <article className="game-tile" data-reveal key={game.name}><div className="game-tile-image"><img src={game.image} alt="" loading="lazy" /><span className="game-index">{String(index + 1).padStart(2, "0")}</span><span className="game-category">{game.label}</span><div className="game-hover"><Gamepad2 size={21} /><span>ASK IF AVAILABLE</span></div></div><div className="game-tile-title"><div><h3>{game.name}</h3><span>{game.genre}</span></div><ArrowUpRight size={17} /></div></article>)}</div>
      <p className="library-note"><Sparkles size={15} /> The game list is a guide, not a live inventory. Confirm availability with the team before your visit.</p>
    </div></section>

    <section className="section container pricing" id="pricing">
      <div className="section-heading" data-reveal><div><SectionLabel number="03">SIMPLE, CLEAR PRICING</SectionLabel><h2>MORE PLAY.<br /><em>NO GUESSWORK.</em></h2></div><p>Solo time, crew chaos, or a pass for the regulars. Pick what fits your session; ask the team about booking details.</p></div>
      <div className="pricing-grid">
        <article className="price-card" data-reveal><div className="price-cap"><span>01 / QUICK RUN</span><Gamepad2 /></div><h3>Solo session</h3><p>Drop in and get straight into the action.</p><div className="price-options"><button className={form.session === "45-minute solo session" ? "price-option chosen" : "price-option"} onClick={() => pickSession("45-minute solo session")}><span>45 minutes</span><strong>₹100</strong><small>Quick match</small></button><button className={form.session === "1-hour solo session" ? "price-option chosen" : "price-option"} onClick={() => pickSession("1-hour solo session")}><span>1 hour</span><strong>₹120</strong><small>Full session</small></button></div><ul><li><Check /> One player</li><li><Check /> Choose your game</li><li><Check /> Extra controller available</li></ul><button className="button button-outline" onClick={() => pickSession(form.session === "45-minute solo session" ? "45-minute solo session" : "1-hour solo session")}>Choose solo play <ArrowRight size={16} /></button></article>
        <article className="price-card price-featured" data-reveal><div className="featured-badge"><Sparkles size={13} /> BEST VALUE</div><div className="price-cap"><span>02 / FOR THE REGULARS</span><Zap /></div><h3>Game pass</h3><p>For players who always ask for one more round.</p><div className="pass-price"><strong>₹800</strong><span>10 hours total</span></div><div className="saving-note"><span>YOUR EFFECTIVE RATE</span><strong>₹80 <small>/ HOUR</small></strong></div><ul><li><Check /> Ten hours of gaming</li><li><Check /> Use over multiple sessions*</li><li><Check /> Save versus ten 1-hour sessions</li></ul><button className="button button-dark" onClick={() => pickSession("10-hour game pass")}>Get the game pass <ArrowRight size={16} /></button><small className="terms">*Confirm pass validity and scheduling with the team.</small></article>
        <article className="price-card" data-reveal><div className="price-cap"><span>03 / SQUAD GOALS</span><Users /></div><h3>Crew mode</h3><p>Bring your people. Make it competitive.</p><div className="crew-prices"><button className={form.session === "Crew mode · 3 players" ? "crew-price chosen" : "crew-price"} onClick={() => { setForm(p => ({ ...p, session:"Crew mode · 3 players", players:"3 players" })); }}><span>3 players · 1 hour</span><strong>₹200</strong></button><button className={form.session === "Crew mode · 4 players" ? "crew-price chosen" : "crew-price"} onClick={() => { setForm(p => ({ ...p, session:"Crew mode · 4 players", players:"4 players" })); }}><span>4 players · 1 hour</span><strong>₹250</strong></button></div><div className="controller-addon"><Gamepad2 size={17} /><span>Extra controller</span><strong>₹50</strong></div><ul><li><Check /> Group session</li><li><Check /> Friendly rivalries</li><li><Check /> More players, more memories</li></ul><button className="button button-outline" onClick={() => pickSession(form.session.includes("4 players") ? "Crew mode · 4 players" : "Crew mode · 3 players")}>Build your squad <ArrowRight size={16} /></button></article>
      </div>
      <div className="pricing-foot"><ShieldCheck size={17} /><span>Prices shown are from the supplied menu. Check availability and session conditions before paying.</span></div>
    </section>

    <section className="inside-section" id="gallery"><div className="container section">
      <div className="section-heading" data-reveal><div><SectionLabel number="04">A LOOK INSIDE</SectionLabel><h2>LIGHTS LOW.<br /><em>GAME FACE ON.</em></h2></div><p>Colorful ambient lighting, big screens, bean bags and a wall full of game inspiration—built for getting lost in a session.</p></div>
      <div className="gallery-grid">
        <figure className="gallery-photo gallery-feature" data-reveal><img src={roomPhoto} alt="One Piece Game Zone room with gaming screens and relaxed seating" loading="lazy" onError={e => { e.currentTarget.src = stock.screen; }} /><figcaption><span>01 — THE ZONE</span><strong>Find your seat.</strong></figcaption></figure>
        <figure className="gallery-photo" data-reveal><img src={stock.team} alt="Gaming space with screens and PC station" loading="lazy" /><figcaption><span>02 — THE VIBE</span><strong>Bring your crew.</strong></figcaption></figure>
        <figure className="gallery-photo" data-reveal><img src={stock.console} alt="Console gaming setup" loading="lazy" /><figcaption><span>03 — THE SETUP</span><strong>Lock in.</strong></figcaption></figure>
        <figure className="gallery-photo gallery-wide" data-reveal><img src={stock.retro} alt="Colorful gaming and arcade atmosphere" loading="lazy" /><figcaption><span>04 — THE FEELING</span><strong>One more round?</strong></figcaption></figure>
      </div>
      <p className="gallery-disclaimer">The first image uses the supplied gaming-room photo. Other images are illustrative stock photography.</p>
    </div></section>

    <section className="crew-banner"><div className="container crew-layout" data-reveal><div className="crew-icon"><PartyPopper size={27} /></div><div className="crew-message"><SectionLabel number="BONUS LEVEL">MAKE A DAY OF IT</SectionLabel><h2>YOUR CREW. YOUR <em>RULES.</em></h2><p>Birthday plans, friendly tournaments, or a squad catch-up? Ask about group arrangements before you visit.</p></div><button className="button button-yellow" onClick={() => { setForm(p => ({ ...p, session:"Crew mode · 3 players", players:"3 players" })); document.querySelector("#book")?.scrollIntoView({ behavior:"smooth" }); }}>Plan a group session <ArrowUpRight size={17} /></button></div></section>

    <section className="section container faq-section" id="faq">
      <div className="section-heading" data-reveal><div><SectionLabel number="05">GOOD TO KNOW</SectionLabel><h2>QUESTIONS?<br /><em>WE GOT YOU.</em></h2></div><p>A few quick answers before you pick up a controller. For game availability or location, confirm with the team.</p></div>
      <div className="faq-list" data-reveal>{faqs.map((item,index) => <article className={activeFaq === index ? "faq-item faq-open" : "faq-item"} key={item.q}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span><small>{String(index + 1).padStart(2,"0")}</small>{item.q}</span><ChevronDown /></button>{activeFaq === index && <p>{item.a}</p>}</article>)}</div>
    </section>

    <section className="booking-section" id="book"><div className="container booking-layout"><div className="booking-copy" data-reveal><SectionLabel number="FINAL LEVEL">PLAYER, YOU'RE UP</SectionLabel><h2>READY TO<br /><em>PRESS START?</em></h2><p>Send your session preference and let the team know when you want to play. This form requests an enquiry; it does not confirm or charge for a booking.</p><div className="booking-detail"><span><Clock3 /></span><div><strong>Pick your session</strong><small>Solo · Crew Mode · Game Pass</small></div></div><div className="booking-detail"><span><BadgeCheck /></span><div><strong>Wait for confirmation</strong><small>Availability and location need to be confirmed.</small></div></div></div>
      <form className="booking-form" onSubmit={submitBooking} data-reveal><div className="booking-form-heading"><span>SESSION ENQUIRY</span><span className="live-indicator"><i /> PLAYER ONLINE?</span></div><label>Player name<input required value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))} placeholder="What should we call you?" /></label><label>Choose a session<select value={form.session} onChange={e => setForm(p => ({...p,session:e.target.value,players:e.target.value.includes("4 players")?"4 players":e.target.value.includes("3 players")?"3 players":"1 player"}))}><option>45-minute solo session</option><option>1-hour solo session</option><option>Crew mode · 3 players</option><option>Crew mode · 4 players</option><option>10-hour game pass</option></select></label><div className="form-two"><label>Players<select value={form.players} onChange={e => setForm(p => ({...p,players:e.target.value}))}><option>1 player</option><option>2 players</option><option>3 players</option><option>4 players</option><option>5+ players</option></select></label><label>Preferred date<input type="date" min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e => setForm(p => ({...p,date:e.target.value}))} /></label></div><button className="button button-yellow submit-button" type="submit">Send session enquiry <ArrowRight size={17} /></button>{feedback && <p className="form-feedback" role="status">{feedback}</p>}<small className="form-footnote">Booking is only confirmed after the business replies. No payment is collected here.</small></form>
    </div></section>

    <footer className="footer"><div className="container footer-top"><Brand /><p>Play together. Make it legendary.</p><nav><a href="#experiences">Experiences</a><a href="#games">Games</a><a href="#pricing">Pricing</a><a href="#gallery">The zone</a><a href="#faq">FAQs</a></nav><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={14} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} One Piece Game Zone</span><span>MADE FOR THE LOVE OF PLAY <b>✳</b></span><span>PRICES IN INR</span></div></footer>
    <a href="#book" className="mobile-book-bar"><Gamepad2 size={17} /> BOOK A SESSION <ArrowUpRight size={17} /></a>
  </main>;
}
