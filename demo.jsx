import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ShoppingBag, Search, User, Menu, X, Plus, Minus, ChevronRight, ChevronLeft,
  Truck, RotateCcw, ShieldCheck, Leaf, Star, Phone, Mail, MapPin, Check,
  Package, Instagram, Facebook, Twitter, ArrowRight, CreditCard, Wallet, Banknote
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* TOKENS                                                                  */
/* ---------------------------------------------------------------------- */
const C = {
  ink: "#211D1B",
  cream: "#F5F0E6",
  cream2: "#ECE3D2",
  oxblood: "#6B1E2A",
  oxbloodDark: "#4E1620",
  bottle: "#1F3B2C",
  gold: "#A6813C",
  goldLight: "#C9A96A",
  line: "rgba(33,29,27,0.12)",
};

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */
const CATEGORIES = [
  { id: "bell", label: "Bell Sleeve", type: "kurti", swatch: C.oxblood },
  { id: "square", label: "Square Neck", type: "kurti", swatch: C.bottle },
  { id: "halter", label: "Halter Neck", type: "kurti", swatch: C.gold },
  { id: "corset", label: "Corset Back", type: "kurti", swatch: "#3A2E5C" },
  { id: "sets", label: "Co-ord Sets", type: "set", swatch: "#2F2A1E" },
  { id: "bottoms", label: "Bottoms", type: "pant", swatch: "#4A4E2E" },
];

const PRODUCTS = [
  { id: 1, name: "Meera Bell-Sleeve Kurti", cat: "bell", type: "kurti", price: 1299, mrp: 1799, tag: "Bestseller", swatch: C.oxblood },
  { id: 2, name: "Anika Square Neck Kurti", cat: "square", type: "kurti", price: 1199, mrp: 1599, tag: "New", swatch: C.bottle },
  { id: 3, name: "Kiara Halter Neck Kurti", cat: "halter", type: "kurti", price: 999, mrp: 1399, tag: "New", swatch: C.gold },
  { id: 4, name: "Devika Corset-Back Kurti", cat: "corset", type: "kurti", price: 1399, mrp: 1899, tag: "Most Wanted", swatch: "#3A2E5C" },
  { id: 5, name: "Ira Boat Neck Kurti", cat: "square", type: "kurti", price: 1099, mrp: 1499, tag: null, swatch: "#7A3B12" },
  { id: 6, name: "Sana Straight Sleeve Kurti", cat: "bell", type: "kurti", price: 999, mrp: 1299, tag: null, swatch: "#234E52" },
  { id: 7, name: "Ruhi Sleeveless Kurti", cat: "square", type: "kurti", price: 899, mrp: 1199, tag: "New", swatch: "#5C1A3D" },
  { id: 8, name: "Tara Cotton Co-ord Set", cat: "sets", type: "set", price: 1899, mrp: 2499, tag: "Bestseller", swatch: "#2F2A1E" },
  { id: 9, name: "Naina Palazzo Set", cat: "sets", type: "set", price: 1799, mrp: 2299, tag: null, swatch: "#4B2E39" },
  { id: 10, name: "Off-White Linen Pants", cat: "bottoms", type: "pant", price: 1099, mrp: 1499, tag: null, swatch: "#B9A98A" },
  { id: 11, name: "Black Relaxed Fit Pants", cat: "bottoms", type: "pant", price: 999, mrp: 1399, tag: null, swatch: "#1A1A1A" },
  { id: 12, name: "Olive Wide-Leg Pants", cat: "bottoms", type: "pant", price: 1049, mrp: 1399, tag: null, swatch: "#4A4E2E" },
  { id: 13, name: "Ahana Essential Solid Kurti", cat: "corset", type: "kurti", price: 899, mrp: 1199, tag: null, swatch: "#8B2E2E" },
  { id: 14, name: "Zara Mustard Solid Kurti", cat: "halter", type: "kurti", price: 899, mrp: 1199, tag: null, swatch: "#A6813C" },
  { id: 15, name: "Vira Printed A-Line Kurti", cat: "bell", type: "kurti", price: 1249, mrp: 1699, tag: "New", swatch: "#234E3A" },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

/* ---------------------------------------------------------------------- */
/* GARMENT ART — SVG placeholder in place of real product photography     */
/* ---------------------------------------------------------------------- */
function GarmentArt({ product, className, style }) {
  const { type, swatch } = product;
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(160deg, ${swatch}22, ${C.cream2})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        ...style,
      }}
    >
      <svg viewBox="0 0 120 150" width="46%" style={{ opacity: 0.92 }}>
        {type === "pant" ? (
          <path
            d="M40 10 H80 L84 60 L100 140 H82 L66 75 L60 140 L60 75 L54 140 H36 L52 60 Z"
            fill={swatch}
          />
        ) : type === "set" ? (
          <g>
            <path d="M30 10 L60 25 L90 10 L98 45 L80 55 L80 100 H40 V55 L20 45 Z" fill={swatch} />
            <path d="M42 108 H78 L82 145 H38 Z" fill={swatch} opacity="0.7" />
          </g>
        ) : (
          <path
            d="M35 8 L60 22 L85 8 L96 40 L80 50 V145 H40 V50 L24 40 Z"
            fill={swatch}
          />
        )}
      </svg>
      <div style={{
        position: "absolute", top: 10, left: 10, width: 8, height: 8,
        borderRadius: "50%", background: swatch, opacity: 0.5
      }} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SMALL UI PRIMITIVES                                                     */
/* ---------------------------------------------------------------------- */
function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em",
      textTransform: "uppercase", color: C.oxblood, fontWeight: 600,
    }}>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, style, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 text-sm tracking-wide transition-all duration-200"
      style={{
        background: disabled ? "#a0a0a0" : C.oxblood,
        color: C.cream,
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        letterSpacing: "0.03em",
        borderRadius: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = C.oxbloodDark; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = C.oxblood; }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 text-sm tracking-wide transition-colors duration-200"
      style={{
        background: "transparent",
        color: C.ink,
        border: `1px solid ${C.ink}`,
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        borderRadius: 2,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* PRODUCT CARD                                                            */
/* ---------------------------------------------------------------------- */
function ProductCard({ product, onAdd, onQuick }) {
  const [hover, setHover] = useState(false);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer" }}
    >
      <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: 3 }}>
        <GarmentArt product={product} className="w-full h-full" />
        {product.tag && (
          <span style={{
            position: "absolute", top: 10, left: 10, background: C.ink, color: C.cream,
            fontSize: 10, letterSpacing: "0.08em", padding: "4px 9px", fontFamily: "Inter, sans-serif",
            fontWeight: 600, borderRadius: 2, textTransform: "uppercase",
          }}>
            {product.tag}
          </span>
        )}
        <div
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            transform: hover ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.25s ease", padding: 8,
          }}
        >
          <button
            onClick={() => onAdd(product)}
            style={{
              width: "100%", background: C.cream, color: C.ink, border: "none",
              padding: "10px 0", fontFamily: "Inter, sans-serif", fontSize: 12.5,
              fontWeight: 600, letterSpacing: "0.04em", borderRadius: 2, cursor: "pointer",
            }}
          >
            + QUICK ADD
          </button>
        </div>
      </div>
      <div className="pt-3" onClick={() => onQuick(product)}>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, color: C.ink }}>{product.name}</div>
        <div className="flex items-center gap-2 pt-1">
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: C.ink }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#9c9088", textDecoration: "line-through" }}>
            ₹{product.mrp.toLocaleString("en-IN")}
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.oxblood, fontWeight: 600 }}>
            {discount}% off
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* HEADER                                                                   */
/* ---------------------------------------------------------------------- */
function Header({ page, setPage, cartCount, setCartOpen, setLoginOpen, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "products", label: "Shop" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    { id: "track", label: "Track Order" },
  ];
  return (
    <>
      <div style={{ background: C.ink, color: C.cream, fontFamily: "Inter, sans-serif" }}
           className="text-center text-[11px] tracking-wide py-2 px-4">
        Loved by 40,000+ women across India &nbsp;·&nbsp; Free shipping over ₹1,299 &nbsp;·&nbsp; COD available
      </div>
      <header style={{ background: C.cream, borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, zIndex: 40 }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={22} color={C.ink} />
          </button>

          <button onClick={() => setPage("home")} style={{ fontFamily: "Fraunces, serif", fontSize: 26, letterSpacing: "0.02em", color: C.ink }}>
            Aavaran
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13.5, letterSpacing: "0.02em",
                  color: page === l.id ? C.oxblood : C.ink,
                  borderBottom: page === l.id ? `1px solid ${C.oxblood}` : "1px solid transparent",
                  paddingBottom: 3, fontWeight: 500,
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <Search size={19} color={C.ink} className="hidden sm:block" />
            <button onClick={() => setLoginOpen(true)} className="flex items-center gap-1">
              <User size={19} color={isLoggedIn ? C.oxblood : C.ink} />
            </button>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative" }}>
              <ShoppingBag size={19} color={C.ink} />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -8, right: -9, background: C.oxblood, color: C.cream,
                  fontSize: 10, fontFamily: "Inter, sans-serif", fontWeight: 700, borderRadius: "50%",
                  width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: C.cream }} className="md:hidden">
          <div className="flex justify-between items-center px-5 h-16 border-b" style={{ borderColor: C.line }}>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 22 }}>Aavaran</span>
            <button onClick={() => setMenuOpen(false)}><X size={22} color={C.ink} /></button>
          </div>
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setMenuOpen(false); }}
                style={{ fontFamily: "Fraunces, serif", fontSize: 22, color: C.ink, textAlign: "left" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* CART DRAWER                                                             */
/* ---------------------------------------------------------------------- */
function CartDrawer({ open, onClose, cart, updateQty, removeItem, subtotal, goCheckout }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(33,29,27,0.45)" }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "min(420px, 100%)",
        background: C.cream, display: "flex", flexDirection: "column",
      }}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: C.line }}>
          <span style={{ fontFamily: "Fraunces, serif", fontSize: 20 }}>Your Bag ({cart.length})</span>
          <button onClick={onClose}><X size={20} color={C.ink} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16" style={{ fontFamily: "Inter, sans-serif", color: "#8a8078" }}>
              Your bag is empty.
            </div>
          ) : cart.map((item, i) => (
            <div key={i} className="flex gap-4 py-4 border-b" style={{ borderColor: C.line }}>
              <div style={{ width: 72, height: 90, flexShrink: 0 }}>
                <GarmentArt product={item} className="w-full h-full rounded-sm" />
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 15 }}>{item.name}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8a8078" }}>Size: {item.size}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 600, marginTop: 4 }}>
                  ₹{item.price.toLocaleString("en-IN")}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateQty(i, -1)} style={{ border: `1px solid ${C.line}`, padding: 3 }}><Minus size={12} /></button>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>{item.qty}</span>
                  <button onClick={() => updateQty(i, 1)} style={{ border: `1px solid ${C.line}`, padding: 3 }}><Plus size={12} /></button>
                  <button onClick={() => removeItem(i)} style={{ marginLeft: "auto", fontSize: 12, color: C.oxblood, fontFamily: "Inter, sans-serif" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: C.line }}>
            <div className="flex justify-between mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              <span style={{ color: "#8a8078", fontSize: 13.5 }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <PrimaryButton style={{ width: "100%" }} onClick={goCheckout}>PROCEED TO CHECKOUT</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LOGIN / OTP MODAL                                                       */
/* ---------------------------------------------------------------------- */
function LoginModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (open) { setStep("phone"); setPhone(""); setOtp(""); setError(""); } }, [open]);

  if (!open) return null;

  const sendOtp = () => {
    if (phone.replace(/\D/g, "").length !== 10) { setError("Enter a valid 10-digit mobile number"); return; }
    setError(""); setStep("otp");
  };
  const verify = () => {
    if (otp.length !== 6) { setError("Enter the 6-digit code"); return; }
    setStep("success");
    setTimeout(() => { onSuccess(phone); onClose(); }, 900);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(33,29,27,0.5)" }} />
      <div style={{ position: "relative", background: C.cream, width: 380, maxWidth: "100%", padding: 32, borderRadius: 3 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16 }}><X size={18} /></button>
        <Eyebrow>Welcome to Aavaran</Eyebrow>
        <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 26, marginTop: 6, marginBottom: 20 }}>
          {step === "success" ? "You're in" : "Sign in with OTP"}
        </h3>

        {step === "phone" && (
          <>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8a8078" }}>Mobile number</label>
            <div className="flex items-center mt-2 mb-1" style={{ border: `1px solid ${C.line}`, borderRadius: 2 }}>
              <span style={{ padding: "12px 12px", fontFamily: "Inter, sans-serif", fontSize: 14, borderRight: `1px solid ${C.line}` }}>+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                style={{ flex: 1, padding: "12px", fontFamily: "Inter, sans-serif", fontSize: 14, background: "transparent", outline: "none" }}
              />
            </div>
            {error && <div style={{ color: C.oxblood, fontSize: 12, fontFamily: "Inter, sans-serif", marginBottom: 8 }}>{error}</div>}
            <PrimaryButton style={{ width: "100%", marginTop: 12 }} onClick={sendOtp}>SEND OTP</PrimaryButton>
          </>
        )}

        {step === "otp" && (
          <>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8a8078", marginBottom: 12 }}>
              Demo mode — enter any 6 digits to continue. Code sent to +91 {phone}
            </div>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="• • • • • •"
              style={{
                width: "100%", padding: "12px", fontFamily: "Inter, sans-serif", fontSize: 20,
                letterSpacing: "0.4em", textAlign: "center", border: `1px solid ${C.line}`, borderRadius: 2, outline: "none",
              }}
            />
            {error && <div style={{ color: C.oxblood, fontSize: 12, fontFamily: "Inter, sans-serif", margin: "8px 0" }}>{error}</div>}
            <PrimaryButton style={{ width: "100%", marginTop: 14 }} onClick={verify}>VERIFY &amp; CONTINUE</PrimaryButton>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-6">
            <div style={{ background: C.bottle, borderRadius: "50%", padding: 14, marginBottom: 14 }}>
              <Check color={C.cream} size={24} />
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#8a8078" }}>Signed in successfully</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* HOME PAGE                                                               */
/* ---------------------------------------------------------------------- */
function HomePage({ addToCart, quickView, setPage }) {
  const bestsellers = PRODUCTS.filter((p) => p.tag === "Bestseller" || p.tag === "Most Wanted").slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.tag === "New").slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="grid md:grid-cols-2" style={{ minHeight: "78vh" }}>
        <div style={{ background: C.bottle, color: C.cream }} className="flex flex-col justify-center px-8 md:px-16 py-16 order-2 md:order-1">
          <Eyebrow>
            <span style={{ color: C.goldLight }}>The Autumn Weave — 2026</span>
          </Eyebrow>
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(38px,5vw,64px)", lineHeight: 1.05, marginTop: 14, fontWeight: 500 }}>
            Cotton, cut<br />with intent.
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#D9D2C4", marginTop: 20, maxWidth: 380, lineHeight: 1.6 }}>
            Hand-finished kurtis and sets in breathable cotton, built for Jaipur afternoons and everything after. 15 silhouettes, one standard: made to last.
          </p>
          <div className="flex gap-4 mt-8">
            <PrimaryButton style={{ background: C.gold, color: C.ink }} onClick={() => setPage("products")}>
              SHOP THE EDIT
            </PrimaryButton>
            <button onClick={() => setPage("about")} style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: C.cream, borderBottom: `1px solid ${C.goldLight}`, paddingBottom: 3 }}>
              Our story
            </button>
          </div>
        </div>
        <div style={{ background: `linear-gradient(150deg, ${C.oxblood}, ${C.oxbloodDark})` }} className="order-1 md:order-2 flex items-center justify-center py-16">
          <svg viewBox="0 0 200 260" width="52%" style={{ opacity: 0.95 }}>
            <path d="M60 15 L100 40 L140 15 L160 70 L128 88 V245 H72 V88 L40 70 Z" fill={C.goldLight} opacity="0.92" />
            <circle cx="100" cy="30" r="16" fill={C.cream} opacity="0.15" />
          </svg>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ background: C.cream2, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [Leaf, "100% Pure Cotton"],
            [Truck, "Free shipping over ₹1,299"],
            [Banknote, "Cash on delivery"],
            [RotateCcw, "7-day easy returns"],
          ].map(([Icon, label], i) => (
            <div key={i} className="flex items-center gap-3">
              <Icon size={20} color={C.oxblood} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.ink, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY STYLE — signature fabric-swatch selector */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <Eyebrow>Six silhouettes</Eyebrow>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 34, marginTop: 8, marginBottom: 32 }}>Shop by style</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setPage("products")} className="flex flex-col items-center gap-3 group">
              <div style={{
                width: 76, height: 76, borderRadius: "50%",
                background: `conic-gradient(${cat.swatch}, ${cat.swatch}cc, ${C.gold}, ${cat.swatch})`,
                padding: 4,
              }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "60%", height: "60%", borderRadius: "50%", background: cat.swatch }} />
                </div>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, textAlign: "center", color: C.ink }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Eyebrow>Fresh this week</Eyebrow>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 34, marginTop: 8 }}>New arrivals</h2>
          </div>
          <button onClick={() => setPage("products")} className="hidden sm:flex items-center gap-1" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.oxblood, fontWeight: 600 }}>
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} onAdd={addToCart} onQuick={quickView} />)}
        </div>
      </section>

      {/* BESTSELLERS — dark band */}
      <section style={{ background: C.ink, color: C.cream }} className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Eyebrow><span style={{ color: C.goldLight }}>Loved on repeat</span></Eyebrow>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 34, marginTop: 8, marginBottom: 32, color: C.cream }}>Bestsellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {bestsellers.map((p) => (
              <div key={p.id}>
                <ProductCard product={p} onAdd={addToCart} onQuick={quickView} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {[1,2,3,4,5].map((i) => <Star key={i} size={18} fill={C.gold} color={C.gold} />)}
        </div>
        <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 26, marginBottom: 6 }}>4.7 rated by 6,200+ women</h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8a8078" }}>"Fabric feels genuinely premium, and it still looks new after ten washes." — a real kind of feedback, once your reviews come in.</p>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: C.cream2 }} className="py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 26, marginBottom: 8 }}>Get early access</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#8a8078", marginBottom: 20 }}>New drops, first look. No spam, ever.</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input placeholder="you@email.com" style={{ flex: 1, padding: "12px 14px", border: `1px solid ${C.line}`, borderRadius: 2, fontFamily: "Inter, sans-serif", fontSize: 13.5, outline: "none", background: C.cream }} />
            <PrimaryButton>JOIN</PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PRODUCTS PAGE                                                           */
/* ---------------------------------------------------------------------- */
function ProductsPage({ addToCart, quickView }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
      <Eyebrow>The full edit</Eyebrow>
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 38, marginTop: 8, marginBottom: 24 }}>Shop all</h1>

      <div className="flex gap-2 overflow-x-auto pb-6 mb-6" style={{ borderBottom: `1px solid ${C.line}` }}>
        {[{ id: "all", label: "All" }, ...CATEGORIES].map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            style={{
              padding: "8px 16px", fontFamily: "Inter, sans-serif", fontSize: 12.5, whiteSpace: "nowrap",
              borderRadius: 20, border: `1px solid ${filter === c.id ? C.oxblood : C.line}`,
              background: filter === c.id ? C.oxblood : "transparent",
              color: filter === c.id ? C.cream : C.ink, fontWeight: 500,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filtered.map((p) => <ProductCard key={p.id} product={p} onAdd={addToCart} onQuick={quickView} />)}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* QUICK VIEW MODAL                                                        */
/* ---------------------------------------------------------------------- */
function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState("M");
  if (!product) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 65, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(33,29,27,0.5)" }} />
      <div style={{ position: "relative", background: C.cream, maxWidth: 720, width: "100%", borderRadius: 3, overflow: "hidden" }} className="grid md:grid-cols-2">
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}><X size={20} color={C.cream} /></button>
        <GarmentArt product={product} className="w-full" style={{ minHeight: 280 }} />
        <div className="p-8">
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 26 }}>{product.name}</h3>
          <div className="flex items-center gap-2 mt-2 mb-5">
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18 }}>₹{product.price.toLocaleString("en-IN")}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9c9088", textDecoration: "line-through" }}>₹{product.mrp.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8a8078", marginBottom: 10 }}>SELECT SIZE</div>
          <div className="flex gap-2 mb-8">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} style={{
                width: 40, height: 40, borderRadius: "50%", fontFamily: "Inter, sans-serif", fontSize: 12.5,
                border: `1px solid ${size === s ? C.oxblood : C.line}`,
                background: size === s ? C.oxblood : "transparent",
                color: size === s ? C.cream : C.ink,
              }}>
                {s}
              </button>
            ))}
          </div>
          <PrimaryButton style={{ width: "100%" }} onClick={() => { onAdd({ ...product, size }); onClose(); }}>
            ADD TO BAG
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ABOUT PAGE                                                              */
/* ---------------------------------------------------------------------- */
function AboutPage() {
  return (
    <div>
      <section style={{ background: C.bottle, color: C.cream }} className="py-24 px-6 text-center">
        <Eyebrow><span style={{ color: C.goldLight }}>Since 2024, Jaipur</span></Eyebrow>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(32px,5vw,52px)", marginTop: 12, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
          We make clothes the way our grandmothers checked fabric — by hand, before anything else.
        </h1>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 22, marginBottom: 12 }}>Our fabric</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5, color: "#5c534c", lineHeight: 1.7 }}>
            Every piece starts as 100% cotton, sourced for breathability first. We test each batch against Jaipur's summer before it reaches a rack — if it doesn't hold up here, it doesn't ship.
          </p>
        </div>
        <div>
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 22, marginBottom: 12 }}>Our promise</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5, color: "#5c534c", lineHeight: 1.7 }}>
            Fair pricing, honest sizing, and a 7-day return window with no interrogation. If it doesn't fit right, send it back — we'll make it right.
          </p>
        </div>
      </section>
      <section style={{ background: C.cream2 }} className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {[["40k+", "women dressed"], ["15", "core silhouettes"], ["7 days", "hassle-free returns"]].map(([n, l], i) => (
            <div key={i}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 34, color: C.oxblood }}>{n}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8a8078", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CONTACT PAGE                                                            */
/* ---------------------------------------------------------------------- */
function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
      <div>
        <Eyebrow>Get in touch</Eyebrow>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 36, marginTop: 8, marginBottom: 20 }}>We'd love to hear from you</h1>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Phone size={17} color={C.oxblood} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14 }}>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={17} color={C.oxblood} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14 }}>hello@aavaran.in</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={17} color={C.oxblood} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14 }}>C-Scheme, Jaipur, Rajasthan 302001</span>
          </div>
        </div>
      </div>
      <div>
        {sent ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <Check size={28} color={C.bottle} />
            <p style={{ fontFamily: "Fraunces, serif", fontSize: 20, marginTop: 12 }}>Message sent</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8a8078", marginTop: 4 }}>We'll get back within 24 hours.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {["Name", "Email"].map((ph) => (
              <input key={ph} placeholder={ph} style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.line}`, borderRadius: 2, fontFamily: "Inter, sans-serif", fontSize: 13.5, background: "transparent", outline: "none" }} />
            ))}
            <textarea placeholder="Message" rows={5} style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.line}`, borderRadius: 2, fontFamily: "Inter, sans-serif", fontSize: 13.5, background: "transparent", outline: "none" }} />
            <PrimaryButton onClick={() => setSent(true)}>SEND MESSAGE</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CHECKOUT PAGE                                                           */
/* ---------------------------------------------------------------------- */
function CheckoutPage({ cart, subtotal, onPlaceOrder, orderPlaced, orderId }) {
  const [payMethod, setPayMethod] = useState("cod");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pin: "" });
  const shipping = subtotal >= 1299 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;
  const formValid = form.name && form.phone.length === 10 && form.address && form.city && form.pin.length === 6;

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div style={{ background: C.bottle, width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Check color={C.cream} size={26} />
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 28 }}>Order confirmed</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8a8078", marginTop: 8 }}>
          Order <b style={{ color: C.ink }}>#{orderId}</b> has been placed. A confirmation has been sent to your phone.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center" style={{ fontFamily: "Inter, sans-serif", color: "#8a8078" }}>
        Your bag is empty — add something from the shop first.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid md:grid-cols-5 gap-12">
      <div className="md:col-span-3">
        <Eyebrow>Checkout</Eyebrow>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 30, marginTop: 8, marginBottom: 24 }}>Delivery details</h1>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                 style={inputStyle} />
          <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g,"").slice(0,10) })}
                 style={inputStyle} />
        </div>
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
               style={{ ...inputStyle, width: "100%", marginBottom: 16 }} />
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle} />
          <input placeholder="PIN code" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g,"").slice(0,6) })} style={inputStyle} />
        </div>

        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8a8078", marginBottom: 10 }}>PAYMENT METHOD</div>
        <div className="space-y-3">
          {[
            { id: "cod", icon: Banknote, label: "Cash on Delivery", sub: "Pay when your order arrives" },
            { id: "upi", icon: Wallet, label: "UPI", sub: "Google Pay, PhonePe, Paytm & more" },
            { id: "card", icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setPayMethod(m.id)}
              className="flex items-center gap-4 w-full"
              style={{
                padding: "14px 16px", border: `1px solid ${payMethod === m.id ? C.oxblood : C.line}`,
                borderRadius: 3, background: payMethod === m.id ? `${C.oxblood}0d` : "transparent", textAlign: "left",
              }}
            >
              <m.icon size={19} color={C.oxblood} />
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#8a8078" }}>{m.sub}</div>
              </div>
              {payMethod === m.id && <Check size={16} color={C.oxblood} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <div style={{ background: C.cream2, borderRadius: 3, padding: 24 }}>
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 19, marginBottom: 16 }}>Order summary</h3>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>
              <span style={{ color: "#5c534c" }}>{item.name} × {item.qty} ({item.size})</span>
              <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="border-t my-4" style={{ borderColor: C.line }} />
          <div className="flex justify-between mb-2" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#5c534c" }}>
            <span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between mb-4" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#5c534c" }}>
            <span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="flex justify-between mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 700 }}>
            <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <PrimaryButton style={{ width: "100%" }} disabled={!formValid} onClick={() => onPlaceOrder(payMethod)}>
            PLACE ORDER
          </PrimaryButton>
          {!formValid && <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#8a8078", marginTop: 10, textAlign: "center" }}>Fill in all delivery details to continue</div>}
        </div>
      </div>
    </div>
  );
}
const inputStyle = { padding: "12px 14px", border: `1px solid ${C.line}`, borderRadius: 2, fontFamily: "Inter, sans-serif", fontSize: 13.5, background: "transparent", outline: "none" };

/* ---------------------------------------------------------------------- */
/* TRACK ORDER PAGE                                                        */
/* ---------------------------------------------------------------------- */
function TrackOrderPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);

  const steps = [
    { label: "Order confirmed", done: true },
    { label: "Packed", done: true },
    { label: "Shipped", done: true },
    { label: "Out for delivery", done: false },
    { label: "Delivered", done: false },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <Eyebrow>Where's my order</Eyebrow>
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 32, marginTop: 8, marginBottom: 24 }}>Track your order</h1>
      <div className="flex gap-2 mb-10">
        <input placeholder="Order ID (e.g. AVR10234) or phone number" value={id} onChange={(e) => setId(e.target.value)}
               style={{ ...inputStyle, flex: 1 }} />
        <PrimaryButton onClick={() => setResult(id.trim() ? "found" : null)}>TRACK</PrimaryButton>
      </div>

      {result === "found" && (
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8a8078", marginBottom: 24 }}>
            Order <b style={{ color: C.ink }}>#{id.toUpperCase()}</b> · Expected delivery in 2 days
          </div>
          <div className="relative pl-8">
            <div style={{ position: "absolute", left: 9, top: 6, bottom: 6, width: 2, background: C.line }} />
            {steps.map((s, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                <div style={{
                  position: "absolute", left: -32, top: 0, width: 20, height: 20, borderRadius: "50%",
                  background: s.done ? C.bottle : C.cream, border: `2px solid ${s.done ? C.bottle : C.line}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s.done && <Check size={11} color={C.cream} />}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: s.done ? 600 : 400, color: s.done ? C.ink : "#9c9088" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {result === null && id === "" && (
        <div className="flex flex-col items-center py-10 text-center" style={{ color: "#9c9088" }}>
          <Package size={30} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, marginTop: 10 }}>Enter your order ID to see live status — this is a demo, any ID works.</p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* FOOTER                                                                   */
/* ---------------------------------------------------------------------- */
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.ink, color: C.cream }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, marginBottom: 12 }}>Aavaran</div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#a89f95", lineHeight: 1.6 }}>
            C-Scheme, Jaipur, Rajasthan 302001<br />GSTIN: 08AAAAA0000A1Z5
          </p>
          <div className="flex gap-4 mt-5">
            <Instagram size={16} /><Facebook size={16} /><Twitter size={16} />
          </div>
        </div>
        {[
          { title: "Support", items: [["About Us","about"],["Contact Us","contact"],["Track Your Order","track"]] },
          { title: "Shop", items: [["All Products","products"],["New Arrivals","products"],["Bestsellers","products"]] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 14, color: C.goldLight }}>{col.title.toUpperCase()}</div>
            <div className="flex flex-col gap-3">
              {col.items.map(([label, pg]) => (
                <button key={label} onClick={() => setPage(pg)} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#c9c1b7", textAlign: "left" }}>{label}</button>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 14, color: C.goldLight }}>POLICIES</div>
          <div className="flex flex-col gap-3">
            {["Privacy Policy","Shipping Policy","Refund Policy","Terms of Service"].map((t) => (
              <span key={t} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#c9c1b7" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(245,240,230,0.1)" }} className="text-center py-5">
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#8a8078" }}>© 2026 Aavaran — Demo built for pitch purposes</span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* TOAST                                                                    */
/* ---------------------------------------------------------------------- */
function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 80,
      background: C.ink, color: C.cream, padding: "12px 22px", borderRadius: 3,
      fontFamily: "Inter, sans-serif", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
    }}>
      <Check size={15} color={C.goldLight} /> {message}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* APP                                                                      */
/* ---------------------------------------------------------------------- */
export default function App() {
  const [page, setPageRaw] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quick, setQuick] = useState(null);
  const [toast, setToast] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => "AVR" + Math.floor(10000 + Math.random() * 89999));

  const setPage = (p) => { setPageRaw(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const flashToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const addToCart = (product, size = "M") => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === product.id && i.size === (product.size || size));
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], qty: copy[existingIdx].qty + 1 };
        return copy;
      }
      return [...prev, { ...product, size: product.size || size, qty: 1 }];
    });
    flashToast(`${product.name} added to bag`);
  };

  const updateQty = (idx, delta) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: Math.max(1, copy[idx].qty + delta) };
      return copy;
    });
  };
  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    flashToast("Order placed successfully");
  };

  return (
    <div style={{ background: C.cream, minHeight: "100vh", color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        button { cursor: pointer; }
        input::placeholder, textarea::placeholder { color: #a89f95; }
      `}</style>

      <Header page={page} setPage={setPage} cartCount={cartCount} setCartOpen={setCartOpen} setLoginOpen={setLoginOpen} isLoggedIn={isLoggedIn} />

      {page === "home" && <HomePage addToCart={addToCart} quickView={setQuick} setPage={setPage} />}
      {page === "products" && <ProductsPage addToCart={addToCart} quickView={setQuick} />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage />}
      {page === "track" && <TrackOrderPage />}
      {page === "checkout" && (
        <CheckoutPage
          cart={cart}
          subtotal={subtotal}
          onPlaceOrder={placeOrder}
          orderPlaced={orderPlaced}
          orderId={orderId}
        />
      )}

      <Footer setPage={setPage} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        subtotal={subtotal}
        goCheckout={() => { setCartOpen(false); setOrderPlaced(false); setPage("checkout"); }}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => setIsLoggedIn(true)} />
      <QuickView product={quick} onClose={() => setQuick(null)} onAdd={addToCart} />
      <Toast message={toast} />
    </div>
  );
}       