import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const galleryQuery = `
  *[
    _type == "gallery" &&
    featured == true
  ] | order(_createdAt desc) {
    _id,
    title,
    location,
    image
  }
`;

export async function GET() {
  try {
    const gallery = await client.fetch(galleryQuery);

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Gallery API Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}