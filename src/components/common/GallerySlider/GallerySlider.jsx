"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiUsers, FiMapPin } from "react-icons/fi";
import styles from "./GallerySlider.module.scss";
import { urlFor } from "@/sanity/lib/image";

export default function GallerySlider() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/gallery");

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const data = await response.json();

        setGallery(data);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  // Create groups of 5 photos
  const clusters = [];

  for (let i = 0; i < gallery.length; i += 5) {
    const group = gallery.slice(i, i + 5);

    // Mosaic requires exactly 5 photos
    if (group.length === 5) {
      clusters.push({
        id: `cluster-${i}`,

        hero: group[0],

        topStacked: group[1],

        bottomStacked: group[2],

        tallPortrait: group[3],

        bottomWide: group[4],
      });
    }
  }

  // Don't render anything while loading
  if (loading) {
    return null;
  }

  // If there are less than 5 photos
  if (clusters.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallerySection}>
      <div className={styles.header}>
        <div className={styles.tagBadge}>
          <span className={styles.dot} />
          <span>EXPLORE WITH US</span>
        </div>

        <h2 className={styles.title}>
          5,000+ Explorers. Countless Real Stories.
        </h2>
      </div>

      <div className={styles.scrollWrapper}>
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        <div className={styles.marqueeTrack}>
          {[...clusters, ...clusters].map((cluster, index) => (
            <div
              key={`${cluster.id}-${index}`}
              className={styles.mosaicGroup}
            >
              {/* =========================
                  COLUMN 1
              ========================== */}

              <div className={styles.colOne}>
                {/* Hero Photo */}
                <div
                  className={`${styles.photoBox} ${styles.heroPhoto}`}
                >
                  <Image
                    src={urlFor(cluster.hero.image)
                      .width(900)
                      .quality(80)
                      .url()}
                    alt={
                      cluster.hero.title ||
                      "Flying Birds Adventure"
                    }
                    fill
                    sizes="(max-width: 768px) 80vw, 30vw"
                    className={styles.img}
                  />

                  <div className={styles.overlay}>
                    <span>
                      <FiMapPin />
                      {cluster.hero.location}
                    </span>
                  </div>
                </div>

                {/* Bottom Wide Photo */}
                <div
                  className={`${styles.photoBox} ${styles.bottomWidePhoto}`}
                >
                  <Image
                    src={urlFor(cluster.bottomWide.image)
                      .width(800)
                      .quality(80)
                      .url()}
                    alt={
                      cluster.bottomWide.title ||
                      "Flying Birds Adventure"
                    }
                    fill
                    sizes="(max-width: 768px) 80vw, 30vw"
                    className={styles.img}
                  />

                  <div className={styles.overlay}>
                    <span>
                      <FiMapPin />
                      {cluster.bottomWide.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* =========================
                  COLUMN 2
              ========================== */}

              <div className={styles.colTwo}>
                {/* Top Photo */}
                <div
                  className={`${styles.photoBox} ${styles.stackedPhoto}`}
                >
                  <Image
                    src={urlFor(cluster.topStacked.image)
                      .width(700)
                      .quality(80)
                      .url()}
                    alt={
                      cluster.topStacked.title ||
                      "Flying Birds Adventure"
                    }
                    fill
                    sizes="(max-width: 768px) 60vw, 20vw"
                    className={styles.img}
                  />

                  <div className={styles.overlay}>
                    <span>
                      <FiMapPin />
                      {cluster.topStacked.location}
                    </span>
                  </div>
                </div>

                {/* Bottom Photo */}
                <div
                  className={`${styles.photoBox} ${styles.stackedPhoto}`}
                >
                  <Image
                    src={urlFor(cluster.bottomStacked.image)
                      .width(700)
                      .quality(80)
                      .url()}
                    alt={
                      cluster.bottomStacked.title ||
                      "Flying Birds Adventure"
                    }
                    fill
                    sizes="(max-width: 768px) 60vw, 20vw"
                    className={styles.img}
                  />

                  <div className={styles.overlay}>
                    <span>
                      <FiMapPin />
                      {cluster.bottomStacked.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* =========================
                  COLUMN 3
              ========================== */}

              <div className={styles.colThree}>
                <div
                  className={`${styles.photoBox} ${styles.tallPortraitPhoto}`}
                >
                  <Image
                    src={urlFor(cluster.tallPortrait.image)
                      .width(700)
                      .quality(80)
                      .url()}
                    alt={
                      cluster.tallPortrait.title ||
                      "Flying Birds Adventure"
                    }
                    fill
                    sizes="(max-width: 768px) 60vw, 20vw"
                    className={styles.img}
                  />

                  <div className={styles.overlay}>
                    <span>
                      <FiUsers />
                      {cluster.tallPortrait.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}