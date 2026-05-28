import React, { useState } from 'react';
import { X, Code2, Database, Network, Scaling, Palette, FolderGit2 } from 'lucide-react';

export default function DevDocsPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('architecture');

  if (!isOpen) return null;

  const tabs = [
    { id: 'architecture', label: 'Architecture', icon: Network },
    { id: 'folders', label: 'Folder Structure', icon: FolderGit2 },
    { id: 'database', label: 'DB Schema', icon: Database },
    { id: 'api', label: 'API Endpoints', icon: Code2 },
    { id: 'design', label: 'Design System', icon: Palette },
    { id: 'scaling', label: 'SaaS Scale', icon: Scaling },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[650px] z-50 glassmorphism shadow-glass-glow flex flex-col border-l border-white/10 animate-slide-in">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-obsidian-light">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
          <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">SSP CARS — Dev Spec Center</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-luxury border border-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-black/40 border-b border-white/5 overflow-x-auto scrollbar-none shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 font-mono text-xs font-semibold border-b-2 transition-luxury uppercase whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-accent-cyan text-accent-cyan bg-white/3'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/1'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 font-sans text-sm space-y-6">
        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <h4 className="font-luxury font-bold text-lg text-white">1. Full Project Architecture</h4>
            <p className="text-gray-400 leading-relaxed text-xs">
              Designed as a decoupled multi-tiered SaaS application. Ready for low latency, secure transactions, and high availability.
            </p>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-3 font-mono text-xs text-gray-300 leading-relaxed">
              <div><strong className="text-accent-cyan">Client Tier:</strong> Next.js 14 Web Framework deployed on Vercel CDN. Generates static listing pages (SSG) for perfect SEO indexes, combined with client components (React/Framer) for config selectors.</div>
              <div><strong className="text-accent-green">Authentication:</strong> Clerk API middleware. Provides instant JWT token decryption, multi-tenant roles (buyer, dealer), and social logins.</div>
              <div><strong className="text-accent-purple">API Tier:</strong> Express.js Node backend hosting RESTful services. Utilizes JWT session interceptors and API rate limits.</div>
              <div><strong className="text-accent-neon">Data Tier:</strong> PostgreSQL instances hosted on Supabase + PGVector index representing semantic user profiles for LLM recommendation feeds. Cached via Upstash Redis.</div>
            </div>
          </div>
        )}

        {activeTab === 'folders' && (
          <div className="space-y-4">
            <h4 className="font-luxury font-bold text-lg text-white">2. Folder Structure Catalog</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Standard directory tree representing a production architecture splitting app layers:
            </p>
            <pre className="bg-black/50 p-4 rounded-2xl border border-white/5 font-mono text-xs text-accent-green leading-normal overflow-x-auto">
{`ssp-cars/
├── frontend/             # Next.js App Router root
│   ├── src/
│   │   ├── app/          # Navigation Routes (layout.js, page.js)
│   │   ├── components/   # Shared UI (Header, Card, Calculator)
│   │   ├── context/      # Wishlist & Comparison Contexts
│   │   ├── data/         # Mock Static Models
│   │   └── styles/       # Global CSS + Tailwind config
│   ├── tailwind.config.js
│   └── package.json
├── backend/              # Express API Server
│   ├── src/
│   │   ├── controllers/  # Route handler controllers (carController.js)
│   │   ├── middleware/   # Clerk Auth check + Rate Limiters
│   │   ├── routes/       # Endpoint binding (cars.js, users.js)
│   │   └── app.js        # Express init script
│   ├── prisma/           # Prisma DB schema migrations
│   └── tsconfig.json
└── README.md`}
            </pre>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-4">
            <h4 className="font-luxury font-bold text-lg text-white">3. Database Schema Suggested (SQL)</h4>
            <p className="text-gray-400 text-xs">
              Relational layout designed for high integrity, indexing search terms and favorite catalogs:
            </p>
            <pre className="bg-black/50 p-4 rounded-2xl border border-white/5 font-mono text-xs text-gray-300 leading-normal overflow-x-auto">
{`CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY, -- Synced with Clerk
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'buyer', -- buyer, dealer, admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE car_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID REFERENCES dealer_profiles(id),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  specs JSONB, -- 0-60mph, range, battery, topSpeed
  ai_summary TEXT, -- Pre-generated description
  status VARCHAR(50) DEFAULT 'available'
);

CREATE TABLE favorites (
  user_id VARCHAR(255) REFERENCES users(id),
  listing_id UUID REFERENCES car_listings(id),
  PRIMARY KEY (user_id, listing_id)
);`}
            </pre>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-4">
            <h4 className="font-luxury font-bold text-lg text-white">4. API Endpoint Specifications</h4>
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/40">
              <table className="w-full text-left font-mono text-xs text-gray-300">
                <thead className="bg-white/5 border-b border-white/10 text-white uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Verb</th>
                    <th className="p-3">Endpoint</th>
                    <th className="p-3">Role Required</th>
                    <th className="p-3">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 text-accent-cyan font-bold">GET</td>
                    <td className="p-3">/api/cars</td>
                    <td className="p-3 text-gray-500">None</td>
                    <td className="p-3">Fetch cars with mileage/price filters</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-accent-cyan font-bold">GET</td>
                    <td className="p-3">/api/cars/:id</td>
                    <td className="p-3 text-gray-500">None</td>
                    <td className="p-3">Load spec sheet + AI summary</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-accent-green font-bold">POST</td>
                    <td className="p-3">/api/cars</td>
                    <td className="p-3 text-accent-purple font-semibold">Dealer</td>
                    <td className="p-3">Publish a new car listing</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-accent-neon font-bold">POST</td>
                    <td className="p-3">/api/ai/recommend</td>
                    <td className="p-3 text-gray-500">None</td>
                    <td className="p-3">Compute matches from preferences</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-accent-cyan font-bold">GET</td>
                    <td className="p-3">/api/users/favorites</td>
                    <td className="p-3 text-accent-cyan font-semibold">Buyer</td>
                    <td className="p-3">Load user bookmarked wishlist</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-4">
            <h4 className="font-luxury font-bold text-lg text-white">5. Design Tokens & Palette</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-[#0a0a0c] text-center">
                <span className="block text-xs font-bold text-white mb-2">Rich Obsidian</span>
                <span className="font-mono text-[10px] text-gray-500">#0A0A0C</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#141419] text-center">
                <span className="block text-xs font-bold text-white mb-2">Muted Onyx</span>
                <span className="font-mono text-[10px] text-gray-500">#141419</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#00ffff] text-center text-black">
                <span className="block text-xs font-bold font-bold mb-2">Electric Cyan</span>
                <span className="font-mono text-[10px] text-gray-800">#00FFFF</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#00ffaa] text-center text-black">
                <span className="block text-xs font-bold font-bold mb-2">Cyber Green</span>
                <span className="font-mono text-[10px] text-gray-800">#00FFAA</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#bd00ff] text-center">
                <span className="block text-xs font-bold text-white mb-2">Neon Purple</span>
                <span className="font-mono text-[10px] text-gray-400">#BD00FF</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#ff0055] text-center">
                <span className="block text-xs font-bold text-white mb-2">Coral Pink</span>
                <span className="font-mono text-[10px] text-gray-400">#FF0055</span>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs text-gray-400">
              <div><strong className="text-white">Typography:</strong> Header: <span className="font-luxury text-white font-semibold">Outfit</span>, Body: <span className="text-white">Inter</span>. Gives clean readability matching luxury automotive interfaces.</div>
              <div><strong className="text-white">Effects:</strong> Glassmorphism cards with border opacity controls, smooth blur filters (`backdrop-filter: blur(20px)`), and radial glow shadows.</div>
            </div>
          </div>
        )}

        {activeTab === 'scaling' && (
          <div className="space-y-4">
            <h4 className="font-luxury font-bold text-lg text-white">6. Future Scale Implementation Rules</h4>
            <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                <h5 className="font-luxury font-bold text-white text-sm mb-1">PGVector Embedding Match</h5>
                To scale recommendations, user survey metrics (Driving habits, cargo requirements, family sizes) are converted to high-dimensional embeddings using OpenAI `text-embedding-3-small`. They are stored in PostgreSQL using `pgvector` and {"queried using cosine distance operators (<=>) for lightning fast listing matches."}
              </div>
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                <h5 className="font-luxury font-bold text-white text-sm mb-1">Stripe Escrow Workflows</h5>
                To allow users to buy cars directly: Stripe connects dealer accounts with platform escrow routing. Initial earnest deposits are charged securely, and funds are held in escrow pending structural title transfer verified by dealer APIs.
              </div>
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                <h5 className="font-luxury font-bold text-white text-sm mb-1">WebSocket Live Bid Engine</h5>
                Dealer auction boards utilize Socket.io triggers running inside Express API nodes. Bids are stored in high-performance Redis cache clusters before being written to PostgreSQL to prevent database lock bottlenecks.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
