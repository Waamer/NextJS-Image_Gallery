import { UnsplashImg } from "@/models/unsplash-img";
import type { Metadata } from "next";
import Image from "next/image"
import Link from "next/link"
import { Alert } from "@/components/bootstrap"

export const metadata: Metadata = {
    title: "Incremental Static Regeneration Rendering - NextJS Img Gallary",
};

export const revalidate = 15;

export default async function DynamicPage() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_API_KEY, {
        //next: {revalidate: 15}
    });
    const img: UnsplashImg = await response.json();

    const width = Math.min(500, img.width);
    const height = (width / img.width) * img.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert key="light" variant="light">
                <h3 className="text-center">Incremental Static Regeneration Rendering</h3>
                This page uses <strong>ISR (Incremental Static Regeneration) </strong>
                A new image is fetched every 15 seconds (after refreshing the page) for all users and then served from the cache for that duration.
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