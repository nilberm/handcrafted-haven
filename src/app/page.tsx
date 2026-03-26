export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e3e6e6", fontFamily: "Arial, sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ backgroundColor: "#375e21", color: "white" }}>

        {/* Top bar */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: 16 }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ color: "#bdd2ff", fontWeight: "bold", fontSize: 20 }}>Handcrafted Haven</div>
          </a>

          {/* Search bar */}
          <div style={{ flex: 1, display: "flex", maxWidth: 600 }}>
            <input
              type="text"
              placeholder="Search handcrafted items..."
              style={{ flex: 1, padding: "8px 12px", fontSize: 14, border: "none", outline: "none", color: "#333" }}
            />
            <button style={{ backgroundColor: "#bdd2ff", color: "#375e21", padding: "0 16px", border: "none", cursor: "pointer", fontSize: 14 }}>
              Search
            </button>
          </div>

          {/* Account + Cart */}
          <div style={{ display: "flex", gap: 20, marginLeft: "auto" }}>
            <a href="/account" style={{ color: "white", textDecoration: "none", fontSize: 14 }}>Sign In</a>
            <a href="/sell"    style={{ color: "white", textDecoration: "none", fontSize: 14 }}>Sell</a>
            <a href="/cart"    style={{ color: "white", textDecoration: "none", fontSize: 14 }}>Cart</a>
          </div>
        </div>

        {/* Nav bar */}
        <nav style={{ backgroundColor: "#2d4f1b" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "6px 16px", display: "flex", gap: 20, overflowX: "auto" }}>
            {["All Categories", "Jewelry", "Woodwork", "Pottery", "Textiles", "Paintings", "Home Decor", "Artisans", "About"].map((label) => (
              <a key={label} href="#" style={{ color: "white", textDecoration: "none", fontSize: 13, whiteSpace: "nowrap" }}>
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main style={{ minHeight: 400 }} />

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}

      {/* Back to top */}
      {/* <a href="#" style={{
        display: "block", backgroundColor: "#4a7a2b", color: "white",
        textAlign: "center", padding: "14px", fontSize: 13, textDecoration: "none"
      }}>
        Back to top
      </a>

      <footer style={{ backgroundColor: "#375e21", color: "#bdd2ff" }}>

        { Main footer links }
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "40px 16px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32
        }}>

          <div>
            <h4 style={{ color: "white", fontWeight: "bold", marginBottom: 12, fontSize: 14, margin: "0 0 12px" }}>
              Get to Know Us
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["About Us", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#bdd2ff", textDecoration: "none", fontSize: 13 }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "white", fontWeight: "bold", marginBottom: 12, fontSize: 14, margin: "0 0 12px" }}>
              Shop
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["All Products", "Artisans", "New Arrivals", "Best Sellers"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#bdd2ff", textDecoration: "none", fontSize: 13 }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "white", fontWeight: "bold", marginBottom: 12, fontSize: 14, margin: "0 0 12px" }}>
              Sell
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Start Selling", "Seller Guide", "Seller Dashboard", "Fees & Pricing"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#bdd2ff", textDecoration: "none", fontSize: 13 }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "white", fontWeight: "bold", marginBottom: 12, fontSize: 14, margin: "0 0 12px" }}>
              Help
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["FAQ", "Contact Us", "Returns", "Accessibility"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#bdd2ff", textDecoration: "none", fontSize: 13 }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        { Footer bottom }
        <div style={{ borderTop: "1px solid #2d4f1b" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            { Logo }
            <div style={{ color: "#bdd2ff", fontWeight: "bold", fontSize: 18 }}>
              Handcrafted Haven
            </div>
            { Legal links }
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#bdd2ff" }}>
              {["Privacy Policy", "Terms of Use", "Cookies"].map((item) => (
                <a key={item} href="#" style={{ color: "#bdd2ff", textDecoration: "none" }}>{item}</a>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#7a9f6a", textAlign: "center" }}>
              © 2026 Handcrafted Haven — Team 06 · Bruce Melendez Lozano · Nilber Moreira Mota · Eric Ferreira
            </div>
          </div>
        </div>

      </footer> */}

    </div>
  );
}
