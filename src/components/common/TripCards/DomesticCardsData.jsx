import { client } from "@/sanity/lib/client";
import { domesticTripsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import TripCards from "./TripCards";

export default async function DomesticCardsData({ tagline, title, subtitle }) {
  const sanityTrips = await client.fetch(domesticTripsQuery);

  const trips = sanityTrips.map((trip) => ({
    id: trip._id,
    slug: trip.slug?.current,

    // Basic Info
    name: trip.title,
    state: trip.destination,

    // Trip Details
    duration: trip.duration,
    price: trip.startingPrice,

    // Image
    image: trip.coverImage
      ? urlFor(trip.coverImage).width(1200).url()
      : null,

    // Badge
    badge: trip.badge,
  }));

  return (
    <TripCards
      tagline={tagline}
      title={title}
      subtitle={subtitle}
      trips={trips}
    />
  );
}