import { UnsplashImg } from "@/models/unsplash-img";
import type { Metadata } from "next";
import Image from "next/image"
import Link from "next/link"
import { Alert } from "@/components/bootstrap"

export const metadata: Metadata = {
    title: "Static Rendering - NextJS Img Gallary",
  };

export default async function StaticPage() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_API_KEY);
    const img: UnsplashImg = await response.json();

    const width = Math.min(500, img.width);
    const height = (width / img.width) * img.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert key="light" variant="light">
                <h3 className="text-center">Static Page Rendering</h3>
                This page <strong>fetches and caches data at build time. </strong>
                Even though the Unsplash API always returns with a new image, we see the same image after refreshing the page until we re-compile the project
            </Alert>
            <Image
            src={img.urls.raw}
            width={width}
            height={height} 
            alt={img.description}
            className="rounded shadow mw-100 h-100 mb-2"/>
            <p>by <Link href={"/Users/" + img.user.username}>{img.user.username}</Link></p>
        </div>
    )
}