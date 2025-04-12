import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imagePath = searchParams.get("path");

  if (!imagePath) {
    return new NextResponse("Image path is required", { status: 400 });
  }

  try {
    // Construct the full URL to your local backend
    const imageUrl = `${process.env.NEXT_PUBLIC_IMG_CDN}/${imagePath}`;

    // Fetch the image from your local backend
    const response = await fetch(imageUrl, {
      // No credentials needed for public images, but add if required
      // credentials: 'include',
      headers: {
        // Add any headers your backend might require
      },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, {
        status: response.status,
      });
    }

    // Get the image data as an array buffer
    const imageBuffer = await response.arrayBuffer();

    // Get the content type
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache", // During development, better to not cache
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
