'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './BirdPageTransition.module.scss';

export default function BirdPageTransition() {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    // Route change ya initial load hone par animation trigger hoga
    setAnimating(true);

    const timer = setTimeout(() => {
      setAnimating(false);
    }, 12000); // 1.2s tak birds fly karengi fir page show hoga

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!animating) return null;

  return (
    <div className={`${styles.transitionOverlay} ${!animating ? styles.fadeExit : ''}`}>
      {/* Flight Path Birds */}
      <div className={styles.flockContainer}>
        <div className={`${styles.birdLeader} ${styles.bird}`}>
          <img src="/images/eagle-flying.gif" alt="Flying Bird" />
        </div>
        <div className={`${styles.birdCompanion1} ${styles.bird}`}>
          <img src="/images/eagle-flying.gif" alt="Flying Bird" />
        </div>
        <div className={`${styles.birdCompanion2} ${styles.bird}`}>
          <img src="/images/eagle-flying.gif" alt="Flying Bird" />
        </div>
      </div>

      {/* Brand Text Reveal */}
      <div className={styles.brandBadge}>
        <span>FLYING BIRDS ADVENTURE</span>
      </div>
    </div>
  );
}