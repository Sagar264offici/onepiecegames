# One Piece Game Zone — Funzone-inspired branch

This branch redesigns the existing React/Vite page with a multi-section gaming-zone layout inspired by the information architecture and polish of https://www.ps5funzone.in/ without copying its brand or business details.

## Design
- Dark console-lounge aesthetic with One Piece black / red / yellow visual identity
- Responsive top navigation, high-impact hero and service cards
- Filterable game library using the supplied title list
- Clear pricing for solo sessions, Crew Mode, extra controller and 10-hour pass
- Room gallery, FAQ accordion, enquiry form and mobile sticky booking CTA
- Scroll reveal, animated marquee, floating accents and hover transitions
- Reduced-motion support for accessibility

## Run locally
```bash
npm install
npm run dev
```

## Booking setup
Set `WHATSAPP_NUMBER` in `src/App.jsx` to the real business WhatsApp number in international format, digits only. It stays in demo mode until configured. Add a verified street address and hours before publishing as business contact details.

## Pricing in this build
- ₹100 / 45-minute solo play
- ₹120 / 1-hour solo play
- ₹200 / 1 hour for 3 players
- ₹250 / 1 hour for 4 players
- ₹50 extra controller
- ₹800 / 10-hour pass (₹80/hour)

The hero uses the supplied room photo at `public/images/zone-hero.webp`; the additional gallery and card photography are illustrative Unsplash stock images.
