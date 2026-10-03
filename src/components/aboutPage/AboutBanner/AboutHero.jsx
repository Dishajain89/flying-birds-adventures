"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  FiCompass,
  FiAward,
  FiUsers,
  FiArrowRight,
  FiShield,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp, FaMountain } from "react-icons/fa";
import styles from "./AboutHero.module.scss";

export default function AboutHero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance GSAP Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(`.${styles.badge}`, { y: 20, opacity: 0, duration: 0.6 })
        .from(`.${styles.title}`, { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(
          `.${styles.missionDesc}`,
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.4",
        )
        .from(
          `.${styles.valueItem}`,
          { y: 25, opacity: 0, stagger: 0.15, duration: 0.6 },
          "-=0.3",
        )
        .from(
          `.${styles.ctaGroup}`,
          { y: 20, opacity: 0, duration: 0.5 },
          "-=0.3",
        )
        .from(
          `.${styles.logoStageCard}`,
          { scale: 0.9, opacity: 0, duration: 0.8 },
          "-=0.6",
        )
        .from(
          `.${styles.floatingPill}`,
          { y: 30, opacity: 0, stagger: 0.2, duration: 0.6 },
          "-=0.4",
        )
        .from(
          `.${styles.statsStrip}`,
          { y: 40, opacity: 0, duration: 0.8 },
          "-=0.4",
        );

      // 2. Animated Numerical Counters
      const animateCounter = (ref, target) => {
        if (!ref.current) return;
        const obj = { count: 0 };
        gsap.to(obj, {
          count: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.floor(obj.count);
          },
        });
      };

      animateCounter(stat1Ref, 100000);
      animateCounter(stat2Ref, 6);
      animateCounter(stat3Ref, 5);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 3. Interactive 3D Card Hover Perspective Physics
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const { left, top, width, height } =
      stageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(stageRef.current, {
      rotationY: x * 18,
      rotationX: -y * 18,
      transformPerspective: 900,
      ease: "power1.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!stageRef.current) return;
    gsap.to(stageRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <section className={styles.heroSection} ref={heroRef}>
      {/* Dynamic Animated Ambient Lights */}
      <div className={styles.radialGlow} />
      <div className={styles.ambientPulse} />

      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt; <span>Our Story</span>
        </nav>

        {/* Master Content & Stage Grid */}
        <div className={styles.mainGrid}>
          {/* LEFT: Manifesto & Pillars */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🦅</span>
              <span>BORN IN INDORE • BUILT FOR THE WILD</span>
            </div>

            <h1 className={styles.title}>
              We Help You <br />
              <span className={styles.highlightText}>Fly Beyond</span> Your
              Limits.
            </h1>

           <p className={styles.missionDesc}>
  <span className={styles.boldHighlight}>Flying Birds Adventures</span>{" "}
  was started with a simple dream — to turn a{" "}
  <span className={styles.boldHighlight}>friend’s dream into reality</span>{" "}
  and make{" "}
  <span className={styles.boldHighlight}>travel affordable for everyone.</span>{" "}
  Our goal is to help people{" "}
  <span className={styles.boldHighlight}>travel more, explore more</span>{" "}
  and create{" "}
  <span className={styles.boldHighlight}>unforgettable memories</span>{" "}
  without spending a fortune.
  <br />
  We’re not just a travel company — we’re building a{" "}
  <span className={styles.boldHighlight}>
    community where strangers become friends
  </span>{" "}
  and{" "}
  <span className={styles.boldHighlight}>
    every journey becomes a story.
  </span>
  <br />
  <span className={styles.boldHighlight}>
    Safety, comfort and a welcoming environment are our priority
  </span>
  , especially for girls travelling with us. 💙
</p>

            <h4 className={styles.highlightTagline}>
              Travel More. Spend Less. Live More. ❤️
            </h4>

            <div className={styles.valuesGrid}>
              <div className={styles.valueItem}>
                <div className={styles.iconBox}>
                  <FiCompass />
                </div>
                <div>
                  <h4>Offbeat Expeditions</h4>
                  <p>Beyond crowded tourist spots</p>
                </div>
              </div>

              <div className={styles.valueItem}>
                <div className={styles.iconBox}>
                  <FiShield />
                </div>
                <div>
                  <h4>Certified Captains</h4>
                  <p>Certified mountaineering leads</p>
                </div>
              </div>
            </div>

            {/* <div className={styles.ctaGroup}>
              <Link href="/packages" className={styles.primaryBtn}>
                <span>Explore Expeditions</span>
                <FiArrowRight className={styles.arrow} />
              </Link>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className={styles.waBtn}
              >
                <FaWhatsapp className={styles.waIcon} />
                <span>Talk to a Captain</span>
              </a>
            </div> */}
          </div>

          {/* RIGHT: 3D Interactive Visual Stage with Solar Halo */}
          <div
            className={styles.visualStage}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.logoStageCard} ref={stageRef}>
              {/* Rotating Atmospheric Sun Ring */}
              <div className={styles.sunHaloRing} />
              <div className={styles.sunBackdrop} />

              {/* Logo Core with Floating Animation */}
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/logo2.jpeg"
                  alt="Flying Birds Adventure Logo"
                  width={320}
                  height={320}
                  priority
                  className={styles.brandLogo}
                />
              </div>

              {/* Floating Interactive Glass Pills */}
              <div className={`${styles.floatingPill} ${styles.topPill}`}>
                <div className={styles.pillIconBox}>
                  <FaMountain />
                </div>
                <div>
                  <strong>500+</strong>
                  <span>Successful Trips</span>
                </div>
              </div>

              <div className={`${styles.floatingPill} ${styles.bottomPill}`}>
                <div className={styles.pillIconBox}>
                  <FiUsers />
                </div>
                <div>
                  <strong>30,000+</strong>
                  <span>Happy Travelers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Live Counter Stats Ribbon */}
        <div className={styles.statsStrip}>
          <div className={styles.statBox}>
            <h3>
              <span ref={stat1Ref}>0</span>+
            </h3>
            <p>Community Members</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.statBox}>
            <h3>
              <span ref={stat2Ref}>0</span>+
            </h3>
            <p>Years Of Experience</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.statBox}>
            <h3>
              <span ref={stat3Ref}>0</span>★
            </h3>
            <p>Google Customer Rating</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.statBox}>
            <h3>100%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
