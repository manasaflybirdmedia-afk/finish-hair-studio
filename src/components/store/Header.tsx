import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  {
    label: "Hair Systems",
    to: "/products?category=Hair%20Systems",
    children: [
      { label: "Mono System", to: "/products?category=Hair%20Systems&sub=Mono" },
      { label: "Silk System", to: "/products?category=Hair%20Systems&sub=Silk" },
      { label: "Lace System", to: "/products?category=Hair%20Systems&sub=Lace" },
      { label: "Full Poly", to: "/products?category=Hair%20Systems&sub=Poly" },
      { label: "Premium", to: "/products?category=Hair%20Systems&sub=Premium" },
    ],
  },
  {
    label: "Accessories",
    to: "/accessories",
    children: [
      { label: "Glue", to: "/accessories" },
      { label: "Tape", to: "/accessories" },
      { label: "Clips", to: "/accessories" },
      { label: "Scalp Protector", to: "/accessories" },
      { label: "Care Kits", to: "/accessories" },
    ],
  },
  { label: "Premium", to: "/products?category=Hair%20Systems&sub=Premium" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>("Hair Systems");

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-background border-b border-gold/30 shadow-elegant">
      <div className="container flex items-center justify-between h-16 py-2">
        <button className="lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Finix Hair Studio" className="h-10 w-auto invert" />
          <span className="font-display text-xl font-bold tracking-wide text-gold hidden sm:block">Finix Hair Studio</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setDesktopOpen(item.label)} onMouseLeave={() => setDesktopOpen(null)}>
              <Link
                to={item.to}
                onClick={() => setDesktopOpen(desktopOpen === item.label ? null : item.label)}
                className="flex items-center gap-1.5 text-xs font-body font-semibold text-background/80 hover:text-gold transition-colors tracking-wide"
              >
                {item.label}
                {item.children && <ChevronDown className={`w-3 h-3 transition-transform ${desktopOpen === item.label ? "rotate-180" : ""}`} />}
              </Link>
              {item.children && desktopOpen === item.label && (
                <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-5">
                  <div className="rounded border border-gold/30 bg-charcoal shadow-elegant py-2">
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.to} className="block px-5 py-3 font-body text-xs text-background/75 hover:bg-gold/10 hover:text-gold transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <Search className="w-5 h-5 hover:text-gold transition-colors" />
          </button>
          <Link to="/account" className="hidden sm:block" aria-label="Account">
            <User className="w-5 h-5 hover:text-gold transition-colors" />
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="relative" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 hover:text-gold transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-semibold">
                {totalItems}
              </span>
            )}
          </button>
          <Link to="/consultation" className="hidden xl:inline-flex bg-gold text-accent-foreground px-4 py-2 rounded font-body text-xs font-bold hover:bg-gold-dark transition-colors">
            Book Consultation
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gold/20 p-4 animate-fade-in">
          <div className="container max-w-xl mx-auto">
            <div className="flex items-center bg-background text-foreground rounded px-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input type="text" placeholder="Search hair systems, accessories, services..." className="flex-1 bg-transparent p-3 text-sm font-body outline-none" autoFocus />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search"><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden border-t border-gold/20 bg-charcoal animate-fade-in">
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-background/10 last:border-b-0">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-3 px-4 font-body font-medium text-background/80 hover:text-gold rounded"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === item.label ? "rotate-180 text-gold" : ""}`} />
                    </button>
                    {mobileAccordion === item.label && (
                      <div className="pb-3 pl-5 space-y-1">
                        <Link to={item.to} onClick={closeMobileMenu} className="block py-2 px-4 font-body text-sm text-gold">
                          View All {item.label}
                        </Link>
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.to} onClick={closeMobileMenu} className="block py-2 px-4 font-body text-sm text-background/65 hover:text-gold">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.to} onClick={closeMobileMenu} className="block py-3 px-4 font-body font-medium text-background/80 hover:text-gold rounded">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/consultation" onClick={closeMobileMenu} className="block py-3 px-4 font-body font-semibold text-gold">
              Book Consultation
            </Link>
            <Link to="/account" onClick={closeMobileMenu} className="block py-3 px-4 font-body font-medium text-background/80 hover:text-gold rounded">
              Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
