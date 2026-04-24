import { Button } from "@/components/ui/button";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const { isScrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-ocid="header"
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "glass-dark shadow-elevated border-b border-border/60 py-3"
          : "bg-transparent py-5",
      ].join(" ")}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          data-ocid="header.logo_link"
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2.5 group"
          aria-label="Terait Technologies home"
        >
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-primary/15 border border-primary/30 group-hover:glow-primary transition-smooth">
            <Zap className="w-4 h-4 text-primary" fill="currentColor" />
            <div className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse-glow" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-base text-foreground tracking-tight">
              Terait
            </span>
            <span className="font-body text-[10px] text-muted-foreground tracking-widest uppercase">
              Technologies
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid={`header.nav_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-4 py-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/30 relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            data-ocid="header.cta_button"
            size="sm"
            onClick={() => handleNavClick("#contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-display font-semibold tracking-wide px-5 transition-smooth"
          >
            Request a Consultation
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          data-ocid="header.mobile_menu_toggle"
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile nav drawer */}
      <div
        data-ocid="header.mobile_menu"
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="glass-dark border-t border-border/40 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid={`header.mobile_nav_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="py-2.5 px-3 text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            data-ocid="header.mobile_cta_button"
            size="sm"
            onClick={() => handleNavClick("#contact")}
            className="mt-2 bg-primary text-primary-foreground font-display font-semibold"
          >
            Request a Consultation
          </Button>
        </nav>
      </div>
    </header>
  );
}
