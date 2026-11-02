"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ContactModal from "../modals/ContactModal";
import ContactButton from "../ui/ContactButton";
import Button from "../ui/Button";
import {
  CONTACT_MODAL_EVENT,
  openContactModal,
} from "../modals/contactModalEvents";

const navItems = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Our Work", href: "/#work", id: "work" },
  { label: "Partners", href: "/#partners", id: "partners" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDarkHero = pathname === "/" && !isScrolled;

  /* ===============================
     Scroll Effect
  =============================== */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     Intersection Observer
  =============================== */
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          const id = visible[0].target.getAttribute("id");
          if (id) setActiveLink(id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ===============================
     Contact Modal Event Listener
  =============================== */
  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener(CONTACT_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(CONTACT_MODAL_EVENT, handleOpen);
  }, []);

  /* ===============================
     Lock Body Scroll When Menu Open
  =============================== */
  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpen, isModalOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          !isDarkHero
            ? "bg-cream/95 backdrop-blur-md shadow-lg border-b border-brown/20"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-40 md:h-14 md:w-48">
              <Image
                src="/LogoCantone–Alpha.webp"
                alt="Cantone Films logo"
                fill
                className={`object-contain scale-90 ${isDarkHero ? "brightness-0 invert" : ""}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-6 rounded-full px-5 py-2.5 transition-all duration-500 ${isDarkHero ? "border border-white/10 bg-white/[0.07] text-cream shadow-2xl backdrop-blur-md" : ""}`}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveLink(item.id)}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  activeLink === item.id
                    ? "text-gold"
                    : isDarkHero ? "text-cream/70 hover:text-cream" : "text-navy hover:text-gold"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    activeLink === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            <ContactButton
              variant="primary"
              size="sm"
              className={isDarkHero ? "bg-gold text-dark hover:bg-gold-l" : ""}
              onClick={openContactModal}
              label="Get in Touch"
            />
          </nav>

          {/* Mobile Toggle */}
          <Button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            variant="ghost"
            size="icon"
            className={`md:hidden h-11 w-11 border transition-colors ${isDarkHero ? "border-white/15 bg-white/10 text-cream hover:border-gold hover:text-gold-l" : "border-brown/20 bg-cream/80 text-navy hover:border-gold hover:text-gold"}`}
            ariaLabel="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </Button>
        </div>
      </header>

      {/* ===============================
           MOBILE MENU
      =============================== */}
      <div
        className={`md:hidden fixed inset-0 z-[70] ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[82vw] max-w-sm bg-cream border-l border-brown/20 z-10 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-brown/20">
            <span className="text-navy text-sm tracking-[0.3em]">
              MENU
            </span>
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-navy border border-brown/30 hover:border-gold hover:text-gold"
              ariaLabel="Close menu"
            >
              <X className="w-7 h-7" />
            </Button>
          </div>

          <nav className="flex flex-col gap-3 px-6 py-6 overflow-y-auto h-[calc(100%-76px)]">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveLink(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold transition-colors duration-200 ${
                  activeLink === item.id
                    ? "bg-navy/10 text-gold"
                    : "text-navy hover:bg-navy/5 hover:text-gold"
                }`}
              >
                {item.label}
                <span className="text-xs tracking-[0.3em] text-brown/60">
                  •
                </span>
              </Link>
            ))}

            <ContactButton
              variant="primary"
              size="md"
              fullWidth
              className="mt-3"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openContactModal();
              }}
              label="Get in Touch"
            />
          </nav>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
