import { client } from "@/sanity/lib/client";
import { allTripsQuery } from "@/sanity/lib/queries";

export default async function SanityTestPage() {
  const trips = await client.fetch(allTripsQuery);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Sanity Trips Test</h1>

      <pre>{JSON.stringify(trips, null, 2)}</pre>
    </main>
  );
}