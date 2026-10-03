'use client';

import React from 'react';
import Image from 'next/image';
import { FiInstagram, FiCompass, FiAward } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import styles from './Founder.module.scss';

// Co-Founders & Directors Data
const LEADERSHIP_TEAM = [
  {
    name: 'Sumit Pawar',
    role: 'Co-Founder',
    image: '/images/aboutFba/co-founder.jpeg',
    desc: 'Ensuring seamless logistics, high-altitude safety protocols, and personalized attention across all domestic expeditions.',
    insta: 'https://www.instagram.com/fly_with_sumitt/',
  },
  {
    name: 'Pari Solanki',
    role: 'Director & Strategic Growth',
    image: '/images/aboutFba/pari.jpeg',
    desc: 'Driving adventure community expansion, curated weekend itineraries, and premium hospitality standards for all groups.',
    insta: 'https://www.instagram.com/solankipari126/?hl=en',
  },
];

export default function Founder() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Ambient Warm Glow */}
        <div className={styles.ambientGlow} />

        {/* =========================================
            1. MAIN FOUNDER CINEMATIC SPOTLIGHT CARD
            ========================================= */}
        <div className={styles.founderCard}>
          <div className={styles.grid}>
            {/* LEFT: Founder Portrait Stage */}
            <div className={styles.imageColumn}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/aboutFba/founder.jpeg"
                  alt="Founder of Flying Birds Adventure"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className={styles.founderImg}
                  priority
                />
                <div className={styles.imageOverlay} />

                <div className={styles.expPill}>
                  <FiCompass className={styles.expIcon} />
                  <div>
                    <strong>8+ Years</strong>
                    <span>Wilderness Leading</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Founder Bio */}
            <div className={styles.contentColumn}>
              <span className={styles.tagline}>🦅 MEET THE CAPTAIN</span>
              <h2 className={styles.name}>Jay Pawar</h2>
              <span className={styles.designation}>Founder &amp; CEO</span>

              <div className={styles.quoteBox}>
                <FaQuoteLeft className={styles.quoteIcon} />
                <p className={styles.quoteText}>
                  “I don’t just want to travel the world, I want to help others live their travel dreams too. ✈️🌍”
                </p>
              </div>

              <p className={styles.bioDesc}>
                Travel, trekking, exploring jungles and sports have always been my passion. ❤️ I started this company because I wanted to turn my hobbies into something meaningful — a platform where everyone can travel, explore and fulfil their dreams within a budget. <br />
                I believe dreams should not be limited by money, and everyone deserves to experience the beauty of travel. 🌍
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <FiAward className={styles.statIcon} />
                  <div>
                    <h4>1000+</h4>
                    <p>Trip Lead</p>
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.statItem}>
                  <FiCompass className={styles.statIcon} />
                  <div>
                    <h4>18,000 ft</h4>
                    <p>Highest Summit</p>
                  </div>
                </div>
              </div>

              <div className={styles.actionRow}>
                <div className={styles.socialGroup}>
                  <a
                    href="https://www.instagram.com/mr_jay5154/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Founder Instagram"
                  >
                    <FiInstagram />
                  </a>
                  <span className={styles.socialLabel}>Connect with Jay</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            2. CO-FOUNDER & DIRECTOR TEAM SECTION
            ========================================= */}
        <div className={styles.teamHeader}>
          <span className={styles.subTagline}>THE PILLARS OF OUR JOURNEY</span>
          <h3 className={styles.subHeading}>Leadership &amp; Operations</h3>
        </div>

        <div className={styles.teamList}>
          {LEADERSHIP_TEAM.map((member, index) => (
            <div key={index} className={styles.horizontalCard}>
              {/* Photo Area */}
              <div className={styles.memberPhotoStage}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className={styles.memberPhoto}
                />
                <div className={styles.photoVignette} />
              </div>

              {/* Bio & Details Area */}
              <div className={styles.memberInfo}>
                <div className={styles.memberHeader}>
                  <span className={styles.roleTag}>{member.role}</span>
                  <h4 className={styles.memberName}>{member.name}</h4>
                </div>

                <p className={styles.memberBioText}>{member.desc}</p>

                <div className={styles.memberAction}>
                  {member.insta && (
                    <a
                      href={member.insta}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Instagram`}
                      className={styles.instaBtn}
                    >
                      <FiInstagram />
                      <span>Follow on Instagram</span>
                    </a>
                  )}
                  <span className={styles.fbaTag}>Core Pillar</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}