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

    </div>
  );
}
