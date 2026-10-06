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
  { id: 1, img: "/images/thumb1.jpg", link: "https://www.instagram.com/p/Dcdpha9SdOs/" },
  { id: 2, img: "/images/thumb2.jpg", link: "https://www.instagram.com/p/DcWEgKmSn35/" },
  { id: 3, img: "/images/thumb3.jpg", link: "https://www.instagram.com/p/DbvofGJgvMj/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
  { id: 4, img: "/images/thumb4.jpg", link: "https://www.instagram.com/reel/DZyxKRkAevL/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
  { id: 5, img: "/images/thumb5.jpg", link: "https://www.instagram.com/p/DZc1q6fmEcQ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
  { id: 6, img: "/images/thumb6.jpg", link: "https://www.instagram.com/reel/DZFW2OfArfF/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
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
      {/* <div ref={eagleRef} className={styles.flyingEagle}>
        🦅
      </div> */}

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
              <h2 className={styles.logo}>Flying Birds Adventures</h2>
            </div>

            <p className={styles.text}>
              Explore India's most breathtaking landscapes with unforgettable
              guided adventures, group tours, and tailored weekend getaways.
            </p>

            <div className={styles.socials}>
              <a href="https://www.instagram.com/flying_birds_adventures/" aria-label="Instagram" target="_blank"><FaInstagram /></a>
              <a href="https://www.facebook.com/people/flying_birds_adventures/100077349084017/"  aria-label="Facebook" target="_blank"><FaFacebookF /></a>
              <a href="https://wa.me/919977995057" aria-label="WhatsApp" target="_blank" rel="noreferrer">
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
              <Link href="/domestic">Packages</Link>
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
            <h4>@flying_birds_adventures</h4>
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
                <FaMapMarkerAlt /> <span>Sapna Sangeeta Rd, Loha Mandi, Snehnagar, Indore, Madhya Pradesh 452001</span>
              </div>
              <div className={styles.info}>
                <FaPhoneAlt /> <span> +91 9977995057, +91 9977995058 </span> 
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Footer Bottom Bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomFlex}>
            <p>© {new Date().getFullYear()} Flying Birds Adventures. All Rights Reserved.</p>
            
            <p className={styles.developerCredit}>
              Developed by{" "}
              <a
                href="https://www.instagram.com/dizzytech_byd/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DizzyTech
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* 💬 Floating WhatsApp Quick Chat */}
      <a
        href="https://wa.me/919977995080?text=Hello!%20I%20want%20to%20plan%20an%20Trip."
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