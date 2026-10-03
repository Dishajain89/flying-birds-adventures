"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./Navbar.module.scss";
import { NAV_LINKS } from "@/constants/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Search Submit Handler
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    const slug = query.replace(/\s+/g, "-");
    setSearchOpen(false);
    setMenuOpen(false);
    setSearchTerm("");
    router.push(`/packages/${slug}`);
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.jpeg"
              alt="Flying Birds Logo"
              width={60}
              height={60}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`${styles.nav} ${
              menuOpen ? styles.navOpen : ""
            }`}
          >
            {/* Searchbar inside mobile drawer */}
            <form className={styles.drawerSearch} onSubmit={handleSearch}>
              <FiSearch className={styles.drawerSearchIcon} />
              <input
                type="text"
                placeholder="Search destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.active : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Drawer CTA */}
            <a
              href="https://wa.me/919977995057"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.drawerCta}
            >
              Plan My Trip
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className={styles.rightActions}>
            {/* Desktop WhatsApp CTA */}
            <a
              href="https://wa.me/919977995057"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              Plan My Trip
            </a>

            {/* Mobile/Tablet Search Toggle Button */}
            <button
              type="button"
              className={styles.mobileSearchBtn}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle Search"
            >
              {searchOpen ? <FiX /> : <FiSearch />}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Dropdown Searchbar for Mobile & Tablet */}
      {searchOpen && (
        <div className={styles.dropdownSearchWrapper}>
          <div className="container">
            <form className={styles.dropdownSearchForm} onSubmit={handleSearch}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search Goa, Manali, Kashmir..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button type="submit" className={styles.searchSubmitBtn}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}