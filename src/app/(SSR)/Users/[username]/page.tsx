import { UnsplashUser } from "@/models/unsplash-user"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { cache } from "react";
import { Alert } from "@/components/bootstrap";

interface UserProps {
    params: { username: string },
}

async function getUser(username: string): Promise<UnsplashUser> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_API_KEY}`)
    
    if (response.status === 404) notFound();

    return await response.json()
}

//const getUserCached = cache(getUser) use if you are not using native fetch

export async function generateMetadata({ params: { username } }: UserProps): Promise<Metadata> {
    const user = await getUser(username);

    return {
        title: ([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username) + " - NextJS Img Gallary"
    }
}

export default async function UserPage({ params: { username } }: UserProps) {
    const user = await getUser(username);

    return (
        <div>
            <Alert key="light" variant="light" className="text-center">
                <h3>User Profile</h3>
                This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong> dynamically from the API response
            </Alert>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={"https://unsplash.com/" + user.username}>Unsplash Profile</a>
        </div>
    )

}