import { client } from "@/sanity/lib/client";
import { oneDayTripsQuery } from "@/sanity/lib/queries";
import OnedayCards from "./OneDayCards";

export const dynamic = "force-dynamic";

export default async function OneDayCardsData() {
  const sanityTrips = await client.fetch(
    oneDayTripsQuery,
    {},
    { next: { revalidate: 0 }, cache: "no-store" }
  );

  const trips = (sanityTrips || []).map((trip) => ({
    id: trip._id,
    slug: trip.slug,
    name: trip.name || trip.title,
    state: trip.state,
    duration: trip.duration || "1 Day",
    price: trip.price,
    image: trip.image, // Direct Sanity CDN URL
    badge: trip.badge || "Sunday Expedition Pass",
  }));

  return <OnedayCards trips={trips} />;
}