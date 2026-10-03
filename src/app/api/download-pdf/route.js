export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const pdfUrl = searchParams.get("url");
    const fileName = searchParams.get("name") || "itinerary";

    if (!pdfUrl) {
      return new Response("PDF URL is required", { status: 400 });
    }

    const response = await fetch(pdfUrl);

    if (!response.ok) {
      return new Response("Failed to fetch PDF", { status: 500 });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Safe filename
    const safeFileName = fileName
      .replace(/[^a-z0-9\s-]/gi, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF download error:", error);

    return new Response("Failed to download PDF", {
      status: 500,
    });
  }
}