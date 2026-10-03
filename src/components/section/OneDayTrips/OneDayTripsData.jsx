import { client } from "@/sanity/lib/client";
import { oneDayTripsQuery } from "@/sanity/lib/queries";
import OneDayTrips from "./OneDayTrips";

export default async function OneDayTripsData() {
  const sanityTrips = (await client.fetch(oneDayTripsQuery)) || [];

  const trips = sanityTrips.map((trip) => {
    // 1. Slug (Direct string ho ya object, dono handle honge)
    const tripSlug =
      typeof trip.slug === "string"
        ? trip.slug
        : trip.slug?.current || trip._id;

    // 2. Price (Query ka price ya raw startingPrice)
    const tripPrice = trip.price ?? trip.startingPrice ?? 0;

    // 3. Image (Query se direct resolved URL milega)
    const tripImage =
      trip.image ||
      (trip.coverImage?.asset ? trip.coverImage.asset.url : null) ||
      "/images/destinations/default.jpg";

    return {
      id: trip._id,
      slug: tripSlug,
      name: trip.name || trip.title,
      state: trip.state || trip.destination,
      duration: trip.duration || "1 Day",
      price: tripPrice,
      image: tripImage,
      badge: trip.badge || null,
    };
  });

  return <OneDayTrips trips={trips} />;
}