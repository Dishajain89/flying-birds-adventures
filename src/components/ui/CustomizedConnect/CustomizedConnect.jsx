'use client';

import React from 'react';
import { FiPhoneCall, FiCompass } from 'react-icons/fi';
import { FaWhatsapp, FaHandPointer } from 'react-icons/fa';
import styles from './CustomizedConnect.module.scss';

export default function CustomizedConnect({
  phone = '+919999999999',
  whatsapp = '919999999999',
}) {
  const waMessage = encodeURIComponent(
    'Hi Flying Birds Adventure! I want to plan a customized trip. Please connect me with a trip captain.'
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.bannerCard}>
          
          {/* Subtle Golden Outer Border Glow */}
          <div className={styles.outerGlow} />

          {/* Topographic Contour Background Mesh */}
          <div className={styles.topographicMesh} />

          {/* Left Text Block */}
          <div className={styles.textBlock}>
            <div className={styles.titleWrap}>
              <h3 className={styles.title}>
                <span className={styles.goldText}>Want to Customized</span>
                <span className={styles.whiteText}>Your Trip?</span>
              </h3>
              <FiCompass className={styles.compassAccent} />
            </div>

            <p className={styles.subtitle}>
              Connect with us now and create your dream adventure!
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className={styles.actionBlock}>
            
            {/* Call Action */}
            <div className={styles.btnGroup}>
              <a href={`tel:${phone}`} className={styles.callBtn}>
                <FiPhoneCall className={styles.btnIcon} />
                <span>CALL NOW</span>
              </a>
              <small className={styles.helperText}>Talk to our Expert Captain</small>
            </div>

            {/* WhatsApp Action with Hand Pointer Icon */}
            <div className={styles.btnGroup}>
              <a
                href={`https://wa.me/${whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <FaWhatsapp className={styles.btnIcon} />
                <span>WHATSAPP</span>
                <FaHandPointer className={styles.handIcon} />
              </a>
              <small className={styles.helperText}>Start Planning on Chat</small>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}