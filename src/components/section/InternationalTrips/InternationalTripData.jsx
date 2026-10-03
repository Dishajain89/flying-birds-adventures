import { client } from "@/sanity/lib/client";
import { internationalTripsQuery } from "@/sanity/lib/queries";
import InternationalTrips from "./InternationalTrips";

export default async function InternationalTripsData() {
  const sanityTrips = (await client.fetch(internationalTripsQuery)) || [];

  const trips = sanityTrips.map((trip) => {
    // 1. Slug (Direct string ho ya object, dono handle honge)
    const tripSlug =
      typeof trip.slug === "string"
        ? trip.slug
        : trip.slug?.current || trip._id;

    // 2. Price (Query ka resolved price ya raw startingPrice)
    const tripPrice = trip.price ?? trip.startingPrice ?? 0;

    // 3. Image (Query ka direct URL string ya fallback)
    const tripImage =
      trip.image ||
      (trip.coverImage?.asset ? trip.coverImage.asset.url : null) ||
      "/images/destinations/default.jpg";

    return {
      id: trip._id,
      slug: tripSlug,
      name: trip.name || trip.title,
      country: trip.state || trip.destination || "",
      duration: trip.duration || "Flexible",
      price: tripPrice,
      image: tripImage,
      badge: trip.badge || null,
    };
  });

  return <InternationalTrips trips={trips} />;
}