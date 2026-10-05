import { client } from "@/sanity/lib/client";
import { oneDayTripsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import OnedayCards from "./OneDayCards";

export default async function OneDayCardsData() {
  const sanityTrips = await client.fetch(oneDayTripsQuery);

  const trips = sanityTrips.map((trip) => ({
    id: trip._id,
    slug: trip.slug?.current,
    name: trip.title,
    state: trip.destination,
    duration: trip.duration,
    price: trip.startingPrice,
    image: trip.coverImage
      ? urlFor(trip.coverImage).width(1200).url()
      : null,
    badge: trip.badge,
  }));

  return <OnedayCards trips={trips} />;
}