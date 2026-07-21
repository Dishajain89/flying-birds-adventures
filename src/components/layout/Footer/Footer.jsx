"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.scss";

// Dummy Instagram Feed Data
const instaFeed = [
  { id: 1, img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80", link: "#" },
  { id: 2, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80", link: "#" },
  { id: 3, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80", link: "#" },
  { id: 4, img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80", link: "#" },
  { id: 5, img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=300&q=80", link: "#" },
  { id: 6, img: "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=300&q=80", link: "#" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const eagleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Staggered Reveal Animation for Footer Elements
    const elements = footerRef.current.querySelectorAll(`.${styles.reveal}`);
    
    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );

    // Flying Eagle Motion along viewport trigger
    gsap.fromTo(
      eagleRef.current,
      { x: "-10vw", y: 100, opacity: 0, scale: 0.5 },
      {
        x: "105vw",
        y: -50,
        opacity: 0.8,
        scale: 1.2,
        duration: 4,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1.5,
        },
      }
    );
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      {/* 🌌 Twinkling Stars Background */}
      <div className={styles.starsContainer}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
      </div>

      {/* 🦅 Animated Flying Eagle */}
      <div ref={eagleRef} className={styles.flyingEagle}>
        🦅
      </div>

      {/* 🏔️ SVG Mountain Silhouette Divider Header */}
      <div className={styles.mountainWrapper}>
        <svg
          className={styles.mountainSvg}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L150,90 L300,30 L450,105 L600,20 L750,95 L900,40 L1050,85 L1200,0 L1200,120 L0,120 Z"
            fill="#0a0a0a"
          />
          <path
            d="M0,40 L200,110 L400,50 L650,115 L850,60 L1050,110 L1200,30 L1200,120 L0,120 Z"
            fill="#0f0f0f"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Brand + Moon Glow */}
          <div className={styles.reveal}>
            <div className={styles.logoContainer}>
              <div className={styles.moonGlow} />
              <h2 className={styles.logo}>Flying Birds Adventure</h2>
            </div>

            <p className={styles.text}>
              Explore India's most breathtaking landscapes with unforgettable
              guided adventures, group tours, and tailored weekend getaways.
            </p>

            <div className={styles.socials}>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://wa.me/919876543210" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.reveal}>
            <h4>Quick Links</h4>
            <div className={styles.linkList}>
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/packages">Packages</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className={styles.reveal}>
            <h4>Popular Destinations</h4>
            <div className={styles.linkList}>
              <Link href="#">Manali</Link>
              <Link href="#">Kasol</Link>
              <Link href="#">Leh Ladakh</Link>
              <Link href="#">Goa</Link>
              <Link href="#">Spiti Valley</Link>
            </div>
          </div>

          {/* 📸 Live Instagram Gallery Grid */}
          <div className={styles.reveal}>
            <h4>@FlyingBirdsAdventure</h4>
            <div className={styles.instaGrid}>
              {instaFeed.map((item) => (
                <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className={styles.instaItem}>
                  <Image src={item.img} alt="Instagram Post" width={80} height={80} unoptimized />
                  <div className={styles.instaOverlay}>
                    <FaInstagram />
                  </div>
                </a>
              ))}
            </div>

            {/* Contact Snip */}
            <div className={styles.contactCompact}>
              <div className={styles.info}>
                <FaMapMarkerAlt /> <span>Indore, Madhya Pradesh</span>
              </div>
              <div className={styles.info}>
                <FaPhoneAlt /> <span>+91 9876543210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomFlex}>
            <p>© {new Date().getFullYear()} Flying Birds Adventure. All Rights Reserved.</p>
            <p>Made with ❤️ in India</p>
          </div>
        </div>
      </div>

      {/* 💬 Floating WhatsApp Quick Chat */}
      <a
        href="https://wa.me/919876543210?text=Hello!%20I%20want%20to%20plan%20an%20adventure."
        target="_blank"
        rel="noreferrer"
        className={styles.floatingWhatsapp}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
        <span className={styles.tooltip}>Chat with us</span>
      </a>
    </footer>
  );
}