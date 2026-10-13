'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './BirdPageTransition.module.scss';

export default function BirdPageTransition() {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Har route switch par clean transition trigger karein
    setAnimating(true);
    setIsClosing(false);

    // 1.2s par smooth exit fade shuru
    const exitTimer = setTimeout(() => {
      setIsClosing(true);
    }, 1900);

    // 1.6s par component DOM se remove
    const finishTimer = setTimeout(() => {
      setAnimating(false);
      setIsClosing(false);
    }, 2400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname]);

  if (!animating) return null;

  return (
    <aside
      className={`${styles.transitionOverlay} ${isClosing ? styles.fadeExit : ''}`}
      aria-label="Loading page transition"
    >
      {/* Cinematic Ambient Glow */}
      <div className={styles.ambientGlow} />

      {/* Center Cinematic Stage */}
      <div className={styles.stage}>
        <div className={styles.birdHero}>
          {/* Eagle Flight GIF */}
          <div className={styles.birdImgWrap}>
            <Image
              src="/images/eagle-flying.gif"
              alt="Flying Bird"
              width={160}
              height={120}
              className={styles.eagleGif}
              priority
              unoptimized
            />
          </div>
          {/* Subtle Wing Shadow below bird */}
          <div className={styles.birdShadow} />
        </div>

        {/* Brand Typography */}
        <div className={styles.brandContent}>
          <span className={styles.brandSubtitle}>ADVENTURE AWAITS</span>
          <h2 className={styles.brandTitle}>FLYING BIRDS</h2>

          {/* Minimal Golden Progress Line */}
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} />
          </div>
        </div>
      </div>
    </aside>
  );
}