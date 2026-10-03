"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiCamera,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import styles from "./Contact.module.scss";

// Vibrant Community Group Trips Photos
const COMMUNITY_PICS = [
  { src: "/images/groupPhotos/img1.JPG", caption: "Kasol" },
  { src: "/images/groupPhotos/img7.jpg", caption: "Panchmari" },
  {
    src: "/images/groupPhotos/img3.JPEG",
    caption: "Manikaran gurudwara,kosal",
  },
  { src: "/images/groupPhotos/img4.jpg", caption: "River Rafting , kulu" },
  {
    src: "/images/groupPhotos/img5.jpg",
    caption: "Manali, Himachal Pradesh",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelers: "1-2",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppDirect = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number");
      return;
    }

    const text = `Hello Flying Birds Adventure! 🦅\n\nI have a travel enquiry:\n\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n📧 *Email:* ${formData.email || "N/A"}\n📍 *Destination:* ${formData.destination || "Not decided"}\n👥 *Travelers:* ${formData.travelers}\n💬 *Message:* ${formData.message || "Need trip recommendations"}\n\nPlease get in touch with me!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919977995057?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt; <span>Contact Us</span>
        </nav>

        {/* Hero Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>🦅 LET'S CONNECT</span>
          <h1 className={styles.title}>Start Your Next Adventure</h1>
          <p className={styles.subtitle}>
            Have questions about custom itineraries, group batches, or corporate
            trips? Our adventure captains are ready to help you 24/7.
          </p>
        </div>

        {/* 📸 NEW: Community Trip Photos Mosaic Banner */}
        <div className={styles.communityBanner}>
          <div className={styles.communityHeader}>
            <span>
              <FiCamera /> Real Travelers, Real Vibes
            </span>
            <small>Join 5,000+ Happy Explorers</small>
          </div>
          <div className={styles.photosGrid}>
            {COMMUNITY_PICS.map((pic, idx) => (
              <div key={idx} className={styles.photoItem}>
                <Image
                  src={pic.src}
                  alt={pic.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className={styles.photoImg}
                />
                <div className={styles.photoOverlay}>
                  <span>{pic.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className={styles.quickCards}>
          <div className={styles.card}>
            <div className={styles.iconBox}>
              <FiPhone />
            </div>
            <h3>Call Us Directly</h3>
            <p>Mon - Sat from 10am to 8pm</p>
            <span>
              <a href="tel:+919977995057" className={styles.link}>
                +91 9977995057
              </a>{" "}
              ,
              <a href="tel:+919977995057" className={styles.link}>
                +91 9977995058
              </a>{" "}
              , <br />
              <a href="tel:+919977995080" className={styles.link}>
                +91 9977995080
              </a>{" "}
              ,
              <a href="tel:+919977995081" className={styles.link}>
                +91 9977995081
              </a>{" "}
              ,
            </span>
          </div>

          <div className={`${styles.card} ${styles.highlightCard}`}>
            <div className={`${styles.iconBox} ${styles.waIconBox}`}>
              <FaWhatsapp />
            </div>
            <h3>Instant WhatsApp</h3>
            <p>Fastest way to get batch updates</p>
            <a
              href="https://wa.me/919977995057"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waLink}
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className={styles.card}>
            <div className={styles.iconBox}>
              <FiMail />
            </div>
            <h3>Email Support</h3>
            <p>For corporate & B2B bookings</p>
            <a
              href="mailto:flyingbirdsadventures@gmail.com"
              className={styles.link}
            >
              flyingbirdsadventures@gmail.com
            </a>
          </div>
        </div>

        {/* Main Content Grid (Form + Office Info) */}
        <div className={styles.mainGrid}>
          {/* LEFT: Enquiry Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <p className={styles.formSubtitle}>
              Fill out the form below and we will tailor the best trip package
              for you.
            </p>

            {submitted ? (
              <div className={styles.successState}>
                <FiCheckCircle className={styles.successIcon} />
                <h3>Enquiry Sent Successfully!</h3>
                <p>Our team will connect with you on WhatsApp shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className={styles.resetBtn}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppDirect} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Preferred Destination</label>
                    <input
                      type="text"
                      name="destination"
                      placeholder="e.g. Manali, Ladakh, Spiti"
                      value={formData.destination}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Number of Travelers</label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                  >
                    <option value="Solo Traveler">Solo Traveler (1)</option>
                    <option value="Couple (2)">Couple (2)</option>
                    <option value="Small Group (3-5)">Small Group (3-5)</option>
                    <option value="Large Group (6-15)">
                      Large Group (6-15)
                    </option>
                    <option value="Corporate / College (15+)">
                      Corporate / College (15+)
                    </option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Your Message / Requirements</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your preferred travel dates, budget, or any special requests..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <FiSend /> Send Enquiry via WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: HQ Address & Socials */}
          <div className={styles.infoCard}>
            <div className={styles.infoBlock}>
              <div className={styles.infoTitle}>
                <FiMapPin className={styles.infoIcon} />
                <h3>Our Headquarters</h3>
              </div>
              <p className={styles.infoText}>
                Sapna Sangeeta Rd, Loha Mandi, Snehnagar,
                <br /> Indore, Madhya Pradesh 452001
              </p>
            </div>

            <div className={styles.infoBlock}>
              <div className={styles.infoTitle}>
                <FiClock className={styles.infoIcon} />
                <h3>Working Hours</h3>
              </div>
              <p className={styles.infoText}>
                Monday - Saturday: 10:00 AM – 08:00 PM
                <br />
                Sunday: Emergency & WhatsApp Support Only
              </p>
            </div>

            {/* Social Media Links */}
            <div className={styles.socialBlock}>
              <h3>Follow Our Journeys</h3>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.instagram.com/flying_birds_adventures/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/people/flying_birds_adventures/100077349084017/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://wa.me/919977995057"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className={styles.mapContainer}>
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.709543839145!2d75.8673574!3d22.701854099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd834e5a937b%3A0xb4a8932fef2d7971!2sFlying%20Birds%20Adventure!5e0!3m2!1sen!2sin!4v1790269274117!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
