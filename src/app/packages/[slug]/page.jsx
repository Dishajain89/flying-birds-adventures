import React from "react";
import Link from "next/link";
import styles from "./[slug].module.scss";

import { client } from "@/sanity/lib/client";
import { tripBySlugQuery } from "@/sanity/lib/queries";
import PackageDetailsClient from "./PackageDetailsClient";
import CustomizedConnect from "@/components/ui/CustomizedConnect/CustomizedConnect";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PackageDetailsPage({ params }) {
  const { slug } = await params;

  // Fetch trip from Sanity
  const trip = await client.fetch(
    tripBySlugQuery,
    { slug },
    { next: { revalidate: 0 }, cache: "no-store" }
  );

  // Agar trip ki details Sanity me nahi mili
  if (!trip) {
    const formattedDestination = decodeURIComponent(slug).replace(/-/g, " ");

    return (
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Breadcrumb Fallback */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link> &gt;{" "}
            <span>Custom Packages</span> &gt;{" "}
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

  // Dynamic category mapping based on tripType
  const categoryMap = {
    domestic: { name: "Domestic Trips", href: "/domestic" },
    international: { name: "International Trips", href: "/international" },
    oneDay: { name: "One Day Trips", href: "/oneDayTrips" },
  };

  const parentCategory = categoryMap[trip.tripType] || {
    name: "Trips",
    href: "/",
  };

  // Agar trip data available hai
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Dynamic Breadcrumbs */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link> &gt;{" "}
          <Link href={parentCategory.href}>{parentCategory.name}</Link> &gt;{" "}
          <span>{trip.title || trip.name}</span>
        </nav>

        {/* Trip Detail Client Section */}
        <PackageDetailsClient trip={trip} />
      </div>
    </main>
  );
}