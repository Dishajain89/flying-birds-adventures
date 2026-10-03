'use client';

import React from 'react';
import Image from 'next/image';
import { FiInstagram } from 'react-icons/fi';
import { TEAM_MEMBERS } from '@/data/teamData'; // 👈 Data file se import kiya
import styles from './OurTeam.module.scss';

export default function OurTeam() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>🦅 THE MOUNTAIN SOULS</span>
          <h2 className={styles.title}>Meet Our Expedition Captains</h2>
          <p className={styles.subtitle}>
            Certified mountaineers, wilderness medics, and lifelong storytellers dedicated to keeping you safe, energized, and inspired on every trail.
          </p>
        </div>

        {/* 4 Captains Grid */}
        <div className={styles.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className={styles.captainCard}>
              {/* Image & Overlay Wrapper */}
              <div className={styles.imageBox}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={styles.captainImg}
                />
                <div className={styles.overlay} />

                {/* Social Handle Floating Box */}
                {member.instaUrl && (
                  <div className={styles.socialStrip}>
                    <a
                      href={member.instaUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Instagram`}
                    >
                      <FiInstagram />
                    </a>
                  </div>
                )}
              </div>

              {/* Card Bottom Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.captainName}>{member.name}</h3>
                <span className={styles.captainRole}>{member.role}</span>
                <p className={styles.specialtyTag}>{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}