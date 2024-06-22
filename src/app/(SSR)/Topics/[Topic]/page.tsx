import { UnsplashImg } from "@/models/unsplash-img";
import { Metadata } from "next";
import Image from "next/image";
import styles from "./Topic.module.css"
import { Alert } from "@/components/bootstrap"

interface TopicPageProps {
    params: { Topic: string },
    //searchParams: { [key: string]: string | string[] | undefined } anything after a url ?, used for filtering/querying
}

//export const revalidate = 15;

export function generateMetadata({ params: { Topic } }: TopicPageProps): Metadata {
    return {title: Topic + " - NextJS Img Gallary"}
}


//export const dynamicParams = false; Set to false if you want nothing other then the generateStaticParams ones

//SSG: Prerendered
export function generateStaticParams() {
    return ["Islam", "Weightlifting", "Coding"].map(Topic => ({ Topic }));
}

export default async function TopicPage({ params: { Topic } }: TopicPageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${Topic}&count=30&client_id=${process.env.UNSPLASH_API_KEY}`, {
        //next: {revalidate: 15}
    });
    const imgs: UnsplashImg[] = await response.json();

    return (
        <div>
            <Alert key="light" variant="light">
                <h3 className="text-center">Dynamic Params</h3>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
                Pages that are not included in generateStaticParams will be feteched and rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled)
            </Alert>
            <h1>{Topic}</h1>
            {imgs.map(img => (
                <Image
                    src={img.urls.raw}
                    width={250}
                    height={250} 
                    alt={img.description}
                    key={img.urls.raw}
                    className={styles.image}
                />
            ))}
        </div>
    )
}