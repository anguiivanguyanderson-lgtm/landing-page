import { useEffect, useState } from "react";

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 32 });
  const [orders, setOrders] = useState(12473);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 900
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else { hours = 5; minutes = 47; seconds = 32; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live orders
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setOrders(o => o + 1);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleOrder = () => {
    setShowCheckoutForm(true);
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
`Bonjour ! Je souhaite commander le Pack CapCut Pro + Canva Pro à Vie.

👤 Nom : ${formData.name}
📧 Email : ${formData.email}
📱 Téléphone : ${formData.phone}
💰 Montant : 900 FCFA

Modes de paiement acceptés :
• MTN Mobile Money / Wave : +225 0596570361
• Orange Money : +225 0758716338

Je suis prêt(e) à effectuer le paiement maintenant !`
    );
    window.open(`https://wa.me/2250596570361?text=${message}`, '_blank');
    setShowCheckoutForm(false);
    setPaymentStatus('success');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden relative">
      {/* Background effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#020617] to-[#020617]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[180px] pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top urgency bar */}
      <div className="relative z-50 bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium sticky top-0">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            OFFRE FLASH
          </span>
          <span className="hidden sm:inline">•</span>
          <span>{orders.toLocaleString('fr-FR')} personnes ont déjà commandé</span>
          <span className="hidden sm:inline">•</span>
          <span className="font-bold">Se termine dans {String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}</span>
        </div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="relative order-2 lg:order-1">
              {/* Glow behind */}
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl" />
              
              <div className="relative">
                {/* Neon circle */}
                <svg className="absolute -left-10 top-10 w-[120%] h-[120%] -z-10" viewBox="0 0 500 500">
                  <defs>
                    <linearGradient id="neon" x1="0" x2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <circle cx="250" cy="250" r="230" fill="none" stroke="url(#neon)" strokeWidth="2" opacity="0.5" strokeDasharray="10 10">
                    <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="20s" repeatCount="indefinite"/>
                  </circle>
                </svg>

                <img 
                  src="/images/hero-woman.png" 
                  alt="Femme heureuse avec CapCut et Canva"
                  className="relative z-10 w-full max-w-[520px] mx-auto drop-shadow-2xl"
                />

                {/* Floating CapCut */}
                <div className="absolute top-[15%] -left-2 sm:left-0 z-20 animate-float">
                  <div className="bg-white rounded-[20px] p-3 shadow-2xl shadow-black/50 backdrop-blur-sm border border-white/20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="currentColor">
                        <path d="M20.5 4.5L15 9l-1.5-1.5L19 2h3v3l-1.5 1.5zM5 20.5l5.5-5.5L9 13.5 3.5 19v3H7l-2 1.5zM13.5 9L9 13.5 3.5 8 8 3.5 12.5 8 8 12.5l1.5 1.5L14 9.5l5.5 5.5-4.5 4.5 1.5 1.5 6-6-5.5-5.5z"/>
                      </svg>
                    </div>
                    <p className="text-black font-bold text-xs mt-1 text-center">CapCut</p>
                  </div>
                </div>

                {/* Floating Canva */}
                <div className="absolute top-[28%] left-12 sm:left-16 z-20 animate-float-delayed">
                  <div className="bg-gradient-to-br from-[#00c4cc] to-[#7d2ae8] rounded-[20px] p-3 shadow-2xl shadow-purple-900/50 backdrop-blur-sm">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl italic" style={{fontFamily: 'system-ui'}}>Canva</span>
                    </div>
                  </div>
                </div>

                {/* Price tag - Mobile */}
                <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-[320px]">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[24px] blur-lg opacity-70" />
                    <div className="relative bg-[#040b2c]/90 backdrop-blur-xl border border-blue-500/50 rounded-[24px] p-4 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="inline-block bg-[#00a8ff] text-black text-[10px] font-black px-2.5 py-1 rounded-full mb-1">PRIX UNIQUE</div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black tracking-tight">900</span>
                            <span className="text-[#00a8ff] font-bold text-xl">FR</span>
                          </div>
                        </div>
                        <button onClick={handleOrder} className="bg-gradient-to-b from-amber-400 to-orange-500 text-black font-black px-4 py-3 rounded-xl shadow-lg active:scale-95 transition">
                          ACHETER
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              {/* Headline */}
              <div className="text-center lg:text-left">
                <h1 className="font-black leading-[0.9] tracking-tight">
                  <span className="block text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px]">CAPCUT PRO</span>
                  <span className="inline-block mt-2 mb-3 px-5 sm:px-7 py-2 sm:py-2.5 bg-[#00a8ff] text-black text-2xl sm:text-3xl lg:text-[36px] font-black rounded-xl shadow-[0_0_40px_rgba(0,168,255,0.5)] -rotate-1">ILLIMITÉ</span>
                  <span className="block text-3xl sm:text-4xl my-1 font-bold">+</span>
                  <span className="block text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px]">CANVA PRO</span>
                  <span className="inline-block mt-2 px-5 sm:px-7 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-[#4c1d95] text-white text-2xl sm:text-3xl lg:text-[36px] font-black rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.5)] rotate-1">À VIE</span>
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0">
                  Accès complet aux versions Premium. <span className="text-white font-semibold">Sans abonnement mensuel.</span> Paiement unique, utilisation à vie.
                </p>
              </div>

              {/* Desktop Price */}
              <div className="hidden lg:block mt-8">
                <div className="relative max-w-[420px]">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 rounded-[28px] blur-xl opacity-60 animate-pulse" />
                  <div className="relative bg-[#040b2c]/80 backdrop-blur-2xl border border-blue-400/40 rounded-[28px] p-6 shadow-2xl">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 bg-[#00a8ff] text-black text-xs font-black px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                          Prix unique aujourd'hui
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[84px] font-black leading-none tracking-tighter">900</span>
                          <span className="text-[#00a8ff] font-black text-3xl mb-3">FR</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-slate-500 line-through text-xl">15 000 FR</span>
                          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">-94%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-slate-400 uppercase tracking-widest mb-1">Économisez</div>
                        <div className="text-2xl font-bold text-emerald-400">14 100 FR</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonuses */}
              <div className="mt-8 lg:mt-10">
                <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg>
                  </div>
                  <span className="bg-amber-400 text-black text-xs sm:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wide">Bonus offerts aujourd'hui</span>
                </div>

                <div className="relative max-w-[520px] mx-auto lg:mx-0">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 to-blue-600/50 rounded-[24px] blur" />
                  <div className="relative bg-[#0b1133]/70 backdrop-blur-xl border border-violet-500/30 rounded-[24px] overflow-hidden">
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                      <div className="p-5 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/50">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479L12 21l-6.825-3.943a12.083 12.083 0 01.665-6.479L12 14z"/></svg>
                        </div>
                        <div>
                          <div className="text-3xl font-black leading-none">+400</div>
                          <div className="text-[13px] font-bold uppercase tracking-wide mt-1">Formations Premium</div>
                          <div className="text-[11px] text-amber-300 font-semibold mt-0.5">AVEC DROIT DE REVENTE</div>
                        </div>
                      </div>
                      <div className="p-5 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a8ff] to-blue-700 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/50">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-black leading-none">65</span>
                            <span className="text-[13px] font-bold uppercase tracking-wide">Pack</span>
                          </div>
                          <div className="text-[13px] font-bold uppercase tracking-wide text-[#00a8ff] mt-1">Exclusif</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Templates, LUTs, Fonts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 max-w-[520px] mx-auto lg:mx-0">
                <button 
                  onClick={handleOrder}
                  className="group relative w-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-3 bg-gradient-to-b from-amber-300 via-amber-400 to-orange-500 text-black font-black text-lg sm:text-xl px-8 py-4 sm:py-5 rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.4)] group-hover:shadow-[0_10px_50px_rgba(245,158,11,0.6)] group-active:scale-[0.98] transition-all">
                    <span className="tracking-wide">COMMANDER MAINTENANT</span>
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                  </div>
                </button>
                
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-[13px] text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span className="font-medium">OFFRE LIMITÉE – Profitez maintenant !</span>
                </div>
              </div>

              {/* Payments */}
              <div className="mt-6 max-w-[520px] mx-auto lg:mx-0">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center justify-between gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
                    {[
                      { name: 'MTN', color: '#ffcc00', text: 'black', sub: 'Mobile Money' },
                      { name: 'wave', color: '#1e3a8a', text: 'white', sub: '' },
                      { name: 'Orange', color: '#ff7900', text: 'white', sub: 'Money' },
                      { name: 'Moov', color: '#0066cc', text: 'white', sub: 'Money' },
                      { name: 'VISA', color: '#1a1f71', text: 'white', sub: '' },
                      { name: 'MC', color: '#eb001b', text: 'white', sub: '' },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center gap-1.5 shrink-0">
                        <div className="h-8 px-2.5 rounded-lg flex items-center justify-center" style={{backgroundColor: p.color}}>
                          <span className="font-black text-[11px] tracking-tight" style={{color: p.text}}>{p.name}</span>
                        </div>
                        {p.sub && <span className="text-[10px] leading-tight text-slate-600 hidden sm:block font-medium">{p.sub}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg> Paiement sécurisé</span>
                  <span className="flex items-center gap-1"><svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg> Accès instantané</span>
                  <span className="flex items-center gap-1"><svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg> Garantie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: '12 473+', label: 'Clients satisfaits' },
                { value: '4.9/5', label: 'Note moyenne', stars: true },
                { value: '< 2 min', label: 'Livraison instantanée' },
                { value: '24/7', label: 'Support WhatsApp' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white">{item.value}</span>
                    {item.stars && <div className="flex ml-1">{[...Array(5)].map((_,i)=><svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}</div>}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">Tout ce que vous obtenez <span className="text-[#00a8ff]">pour 900 FR</span></h2>
            <p className="mt-4 text-slate-300 text-lg">Un pack complet pour créer du contenu professionnel sans limites</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* CapCut */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[28px] blur-xl opacity-30 group-hover:opacity-50 transition" />
              <div className="relative bg-[#0a1029]/80 backdrop-blur-xl border border-blue-500/20 rounded-[28px] p-8 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-black" fill="currentColor"><path d="M20.5 4.5L15 9l-1.5-1.5L19 2h3v3l-1.5 1.5zM5 20.5l5.5-5.5L9 13.5 3.5 19v3H7l-2 1.5zM13.5 9L9 13.5 3.5 8 8 3.5 12.5 8 8 12.5l1.5 1.5L14 9.5l5.5 5.5-4.5 4.5 1.5 1.5 6-6-5.5-5.5z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">CapCut Pro ILLIMITÉ</h3>
                    <p className="text-[#00a8ff] font-semibold">Valeur : 7 500 FR / an</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Export 4K sans filigrane',
                    '1000+ effets premium débloqués',
                    'Transitions pro & animations',
                    'Stock vidéo & audio illimité',
                    'IA : auto-captions, voix off, remove bg',
                    'Aucune pub, aucun watermark',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Canva */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-[28px] blur-xl opacity-30 group-hover:opacity-50 transition" />
              <div className="relative bg-[#0a1029]/80 backdrop-blur-xl border border-violet-500/20 rounded-[28px] p-8 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00c4cc] to-[#7d2ae8] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xl italic">Canva</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">Canva Pro À VIE</h3>
                    <p className="text-violet-400 font-semibold">Valeur : 8 000 FR / an</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    '100M+ photos, vidéos, éléments',
                    'Magic Studio IA complet',
                    'Brand Kit & redimensionnement',
                    '500+ polices premium',
                    'Stockage cloud 1TB',
                    'Accès à vie, mises à jour incluses',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bonuses detail */}
          <div className="mt-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-[28px] blur-2xl" />
            <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-600/10 backdrop-blur-xl border border-amber-500/30 rounded-[28px] p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-amber-400 text-black font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-3">
                    🎁 Bonus inclus
                  </div>
                  <h3 className="text-2xl font-black mb-2">+400 Formations Premium + 65 Packs Exclusifs</h3>
                  <p className="text-slate-300">Montage vidéo, design Canva, marketing digital, business en ligne... avec <span className="text-amber-300 font-bold">droit de revente 100%</span>. Revendez et gardez 100% des bénéfices.</p>
                </div>
                <div className="lg:text-right">
                  <div className="text-sm text-slate-400">Valeur bonus</div>
                  <div className="text-3xl font-black text-amber-400">25 000 FR</div>
                  <div className="text-xs text-emerald-400 font-semibold">OFFERT AUJOURD'HUI</div>
                </div>
              </div>

              {/* Bouton Voir le contenu */}
              <div className="mt-6">
                <button 
                  onClick={() => setShowContent(!showContent)}
                  className="group w-full flex items-center justify-between gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                    </div>
                    <span className="font-bold text-white group-hover:text-amber-300 transition">
                      {showContent ? 'Masquer le contenu' : 'Voir tout le contenu des formations & packs'}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center transition-transform ${showContent ? 'rotate-180' : ''}`}>
                    <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </button>

                {/* Contenu déroulant */}
                {showContent && (
                  <div className="mt-4 animate-fadeIn">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: '📚',
                          title: 'Éducation & Langues',
                          color: 'from-blue-500 to-cyan-500',
                          items: ['Dessins animés éducatifs (Anglais, Informatique, Bible, Coran)', '50+ cours d\'anglais complets avec tests']
                        },
                        {
                          icon: '💼',
                          title: 'Business & Entrepreneuriat',
                          color: 'from-emerald-500 to-teal-500',
                          items: ['Mega Pack Business (idées, business plans, kits pro)', '25+ stratégies de revenus', '100+ formations digitales & business en ligne', 'Affiliation marketing & Print on Demand', 'Création boutique Shopify rentable', 'Vente automatique via Mobile Money']
                        },
                        {
                          icon: '🏗️',
                          title: 'BTP & Architecture',
                          color: 'from-orange-500 to-amber-500',
                          items: ['Formation CAO & DAO + 1000 plans & bibliothèques', 'Initiation Revit & AutoCAD 2024', 'Gestion de projet + outils pro']
                        },
                        {
                          icon: '🎨',
                          title: 'Graphisme & Création',
                          color: 'from-violet-500 to-purple-500',
                          items: ['5 Mega Coffres-forts graphisme & montage vidéo (1 To+)', '15.000+ modèles PowerPoint & infographies', 'Canva Pro à vie + CapCut Pro + 150 templates', 'Formations montage vidéo (Premiere Pro, DaVinci, CapCut)', 'Pack métiers créatifs (graphisme, mixage, audio)']
                        },
                        {
                          icon: '💻',
                          title: 'Logiciels & Informatique',
                          color: 'from-indigo-500 to-blue-500',
                          items: ['Suite Adobe (Photoshop, Illustrator, After Effects…)', 'Microsoft Office + PowerBI + MS Project', 'Développement Web & Mobile (WordPress, Python, IA)', 'Formation maintenance informatique', '250+ formations en informatique (IA, Dev Web, Mobile)']
                        },
                        {
                          icon: '📢',
                          title: 'Marketing Digital',
                          color: 'from-pink-500 to-rose-500',
                          items: ['Publicité Facebook & Instagram (Ads Manager)', 'Percer sur TikTok, Instagram & YouTube en 30 jours', 'Email marketing & tunnels de vente', 'Lancements de produits à +100.000 €']
                        },
                        {
                          icon: '🤖',
                          title: 'Intelligence Artificielle',
                          color: 'from-cyan-500 to-blue-500',
                          items: ['10.000+ prompts IA + 17 formations IA + 245 outils', 'Automatiser ton business avec ChatGPT', 'Créer des visuels avec MidJourney', 'Optimiser ton temps avec ChatGPT + Excel']
                        },
                        {
                          icon: '🌍',
                          title: 'E-commerce & Import-Export',
                          color: 'from-green-500 to-emerald-500',
                          items: ['Formation import-export (Chine, Turquie, Nigéria, Dubaï, Afrique)', 'Formation complète Dropshipping', 'Stratégies E-commerce 2025 (nouveaux marchés)']
                        },
                        {
                          icon: '📑',
                          title: 'Comptabilité & Gestion',
                          color: 'from-slate-500 to-gray-500',
                          items: ['Formation complète comptabilité + Sage 100 i7', 'Pack bureautique (Word, Excel, PowerPoint)', 'Livres de finance & gestion']
                        },
                        {
                          icon: '🧑‍',
                          title: 'Formations Pratiques',
                          color: 'from-amber-500 to-yellow-500',
                          items: ['Formation coiffure femme & homme (125+ vidéos)', 'Formation maquillage, pédicure & manucure', 'Pâtisserie & cosmétique/savonnerie', 'Agriculture & élevage (80+ techniques modernes)', 'Kit complet gestion de centre de santé']
                        },
                      ].map((category) => (
                        <div key={category.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>{category.icon}</div>
                            <h4 className="font-bold text-white">{category.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {category.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-emerald-400 mt-0.5">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Bonus supplémentaires */}
                    <div className="mt-6 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-2xl p-6">
                      <h4 className="font-black text-white mb-4 flex items-center gap-2">
                        <span className="text-xl">✨</span> BONUS SUPPLÉMENTAIRES
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          '🎨 Création de visuels pros avec IA',
                          '📚 8.000 livres PDF de développement personnel',
                          ' 400 audiobooks inspirants',
                          '📣 Stratégies Facebook Ads (astuces & erreurs à éviter)'
                        ].map((bonus, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                            <span className="text-slate-200 text-sm font-medium">{bonus}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">Ils ont commandé et adorent</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Aminata K.', city: 'Abidjan', text: 'Reçu en 1 minute sur WhatsApp ! CapCut Pro marche nickel, plus de filigrane. Les 400 formations c\'est du lourd.', avatar: 'AK' },
                { name: 'Moussa D.', city: 'Dakar', text: '900 FR pour Canva à vie ? J\'ai cru à une arnaque mais c\'est réel. J\'ai déjà fait 3 logos clients.', avatar: 'MD' },
                { name: 'Fatou S.', city: 'Bamako', text: 'Paiement Wave en 10s, accès direct. Le pack de 65 templates m\'a fait gagner 5h cette semaine.', avatar: 'FS' },
              ].map((t) => (
                <div key={t.name} className="bg-[#0b1133]/60 backdrop-blur border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-sm">{t.avatar}</div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.city} • vérifié</div>
                    </div>
                  </div>
                  <div className="flex mb-2">{[...Array(5)].map((_,i)=><svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}</div>
                  <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Prêt à créer comme un pro ?
              </h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                Rejoignez 12 473 créateurs qui ont déjà débloqué CapCut Pro + Canva Pro à vie. Paiement unique de 900 FR.
              </p>

              <div className="mt-8 inline-block">
                <div className="flex items-center justify-center gap-2 text-amber-300 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span className="font-bold">Offre expire dans {String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}</span>
                </div>
                <button onClick={handleOrder} className="group relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition" />
                  <div className="relative bg-gradient-to-b from-amber-300 to-orange-500 text-black font-black text-xl px-12 py-5 rounded-full shadow-2xl flex items-center gap-3 group-hover:scale-105 transition-transform">
                    OBTENIR L'ACCÈS POUR 900 FR
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  </div>
                </button>
                <p className="mt-3 text-xs text-slate-500">Accès instantané • Garantie 7 jours • Support WhatsApp</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-[#020617]/90 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Prix aujourd'hui</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">900</span>
              <span className="text-[#00a8ff] font-bold">FR</span>
              <span className="text-xs line-through text-slate-500 ml-1">15 000</span>
            </div>
          </div>
          <button onClick={handleOrder} className="bg-gradient-to-b from-amber-400 to-orange-500 text-black font-black px-6 py-3.5 rounded-2xl shadow-lg active:scale-95 transition">
            COMMANDER
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0a1029] border border-blue-500/30 rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(59,130,246,0.2)] my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black">Finaliser la commande</h3>
              <button onClick={() => setShowCheckoutForm(false)} className="text-slate-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <form onSubmit={processPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nom Complet</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Jean Dupont"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition text-white placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="votre@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition text-white placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Téléphone</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="Ex: +2250700000000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition text-white placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Montant à payer</label>
                <div className="relative bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/50 rounded-2xl px-4 py-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white">900</span>
                    <span className="text-blue-400 font-bold uppercase text-sm">FCFA</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    <span className="text-[11px] text-emerald-400 font-semibold">PRIX FIXE - OFFRE SPÉCIALE</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  PAYER MAINTENANT
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-3">
                  Paiement 100% sécurisé via <b>FedaPay</b>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Success Modal */}
      {paymentStatus === 'success' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0a1029] border border-emerald-500/30 rounded-[32px] p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="text-3xl font-black mb-3">Message envoyé ! ✅</h3>
            <p className="text-slate-300 mb-4 text-lg">Votre demande a été transmise sur WhatsApp.</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left space-y-3">
              <p className="text-sm font-bold text-white uppercase tracking-widest mb-2">Effectuez votre paiement :</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center font-black text-black text-xs">MTN</div>
                <div>
                  <p className="text-xs text-slate-400">MTN Mobile Money & Wave</p>
                  <p className="font-bold text-white">+225 0596570361</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white text-xs">OM</div>
                <div>
                  <p className="text-xs text-slate-400">Orange Money</p>
                  <p className="font-bold text-white">+225 0758716338</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-2 border-t border-white/10">Montant : <strong className="text-white">900 FCFA</strong> — Envoyez la capture de paiement sur WhatsApp pour recevoir vos accès.</p>
            </div>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg transition"
            >
              OK, COMPRIS !
            </button>
          </div>
        </div>
      )}

      {/* Payment Error Modal */}
      {paymentStatus === 'error' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0a1029] border border-red-500/30 rounded-[32px] p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <h3 className="text-3xl font-black mb-3">Erreur de Paiement</h3>
            <p className="text-slate-300 mb-8">La transaction n'a pas pu être finalisée. Veuillez vérifier votre solde ou essayer un autre mode de paiement.</p>
            <button 
              onClick={() => {
                setPaymentStatus('idle');
                setShowCheckoutForm(true);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl shadow-lg transition"
            >
              RÉESSAYER
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(2deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite 0.5s; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}