import { client } from "@/sanity/lib/client";
import { domesticTripsQuery } from "@/sanity/lib/queries";
import TripCards from "./TripCards";

export default async function DomesticCardsData({ tagline, title, subtitle }) {
  const sanityTrips = await client.fetch(
    domesticTripsQuery,
    {},
    { next: { revalidate: 0 } }
  );

  const trips = (sanityTrips || []).map((trip) => ({
    id: trip._id,
    slug: trip.slug,
    name: trip.name || trip.title,
    state: trip.state,
    duration: trip.duration,
    price: trip.price,
    image: trip.image,
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