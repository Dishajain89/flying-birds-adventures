import React from "react";
import Link from "next/link";
import styles from "./[slug].module.scss";

import { client } from "@/sanity/lib/client";
import { tripBySlugQuery } from "@/sanity/lib/queries";
import PackageDetailsClient from "./PackageDetailsClient";
import CustomizedConnect from "@/components/ui/CustomizedConnect/CustomizedConnect";

export default async function PackageDetailsPage({ params }) {
  const { slug } = await params;

  // Fetch trip from Sanity
  const trip = await client.fetch(tripBySlugQuery, { slug });

  // Agar trip ki details Sanity me nahi mili
  if (!trip) {
    const formattedDestination = decodeURIComponent(slug).replace(/-/g, " ");

    return (
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Breadcrumb Fallback */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link> &gt;{" "}
            <Link href="/packages">Packages</Link> &gt;{" "}
            <span style={{ textTransform: "capitalize" }}>{formattedDestination}</span>
          </nav>

          {/* Fallback Header Block */}
          <div style={{ textAlign: "center", margin: "40px auto 30px auto", maxWidth: "680px" }}>
            <span style={{ color: "#f2a900", fontWeight: "700", letterSpacing: "2px", fontSize: "0.85rem", textTransform: "uppercase" }}>
              🦅 CUSTOM EXPEDITION
            </span>
            <h1 style={{ color: "#ffffff", fontSize: "2.4rem", fontWeight: "800", textTransform: "capitalize", margin: "12px 0" }}>
              Plan Your Custom Journey To {formattedDestination}
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.72)", fontSize: "1rem", lineHeight: "1.6" }}>
              Currently, scheduled fixed group batches for this location are not active, but our certified captains can craft a tailor-made private itinerary for your group!
            </p>
          </div>

          {/* Direct Customized Connect Component */}
          <CustomizedConnect defaultDestination={formattedDestination} />
        </div>
      </main>
    );
  }

  // Agar trip data available hai
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt;{" "}
          <Link href="/packages">Packages</Link> &gt;{" "}
          <span>{trip.title}</span>
        </nav>

        {/* Trip Detail Client Section */}
        <PackageDetailsClient trip={trip} />
      </div>
    </main>
  );
}