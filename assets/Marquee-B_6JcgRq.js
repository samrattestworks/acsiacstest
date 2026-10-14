import{j as e}from"./motion-vendor-Db-5-sUg.js";import{a as s}from"./index-DRf1I6Go.js";const r=[{symbol:"H",number:1,name:"Hydrogen"},{symbol:"He",number:2,name:"Helium"},{symbol:"C",number:6,name:"Carbon"},{symbol:"N",number:7,name:"Nitrogen"},{symbol:"O",number:8,name:"Oxygen"},{symbol:"Na",number:11,name:"Sodium"},{symbol:"Si",number:14,name:"Silicon"},{symbol:"P",number:15,name:"Phosphorus"},{symbol:"S",number:16,name:"Sulfur"},{symbol:"Fe",number:26,name:"Iron"},{symbol:"Cu",number:29,name:"Copper"},{symbol:"Ru",number:44,name:"Ruthenium"},{symbol:"Pt",number:78,name:"Platinum"},{symbol:"Au",number:79,name:"Gold"}],i=({className:a,speedSeconds:o=35})=>e.jsxs("div",{className:s("relative w-full overflow-hidden border-y border-border/60 bg-surface/40 backdrop-blur-xs py-3 select-none",a),role:"region","aria-label":"Periodic elements marquee banner",children:[e.jsx("div",{className:"pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10"}),e.jsx("div",{className:"pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10"}),e.jsx("div",{className:"flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee hover:[animation-play-state:paused]",style:{animation:`marquee ${o}s linear infinite`},children:[...r,...r].map((n,m)=>e.jsxs("div",{className:"flex items-center gap-3 px-3 py-1 rounded-lg bg-surface/50 border border-border/40 hover:border-accent/40 transition-colors",children:[e.jsx("span",{className:"font-mono text-[10px] text-muted",children:n.number}),e.jsx("span",{className:"font-display font-bold text-sm text-foreground tracking-wide",children:n.symbol}),e.jsx("span",{className:"text-xs font-mono text-muted/80",children:n.name})]},`${n.symbol}-${m}`))}),e.jsx("style",{children:`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `})]});export{i as M};
