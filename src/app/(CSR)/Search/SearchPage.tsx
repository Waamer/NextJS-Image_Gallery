"use client"

import { UnsplashImg } from "@/models/unsplash-img";
import { FormEvent, useState } from "react"
import { Button, Form, Spinner, Alert } from "react-bootstrap"
import Image from "next/image";
import styles from "./SearchPage.module.css"

export default function Searchpage() {
    const [searchResults, setSearchResults] = useState<UnsplashImg[] | null>(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if (query) {
            try {
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch("api/Search?query=" + query);
                const images: UnsplashImg[] = await response.json()
                setSearchResults(images);
            } catch (error) {
                console.error(error)
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }
        }
    }

    return (
        <div>
            <Alert key="light" variant="light">
                <h3 className="text-center">Search</h3>
                This page fetches data <strong>client-side.</strong> In order to not leak
                API credentials, the request is sent to a NextJs <strong>route
                handler</strong> that runs on the server. This route handler then
                fetches the data from the Unsplash API and returns it to
                the client.
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control name="query" placeholder="Ex. dogs, cats, apples...."></Form.Control>
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="border" />}
                {searchResultsLoadingIsError && <p>Something went wrong, please try again</p>}
                {searchResults?.length === 0 && <p>Nothing found, please try another query</p>}
            </div>
            {searchResults &&
                <>
                    {
                        searchResults.map(image => (
                            <Image
                                src={image.urls.raw}
                                width={250}
                                height={250}
                                alt={image.description}
                                key={image.urls.raw}
                                className={styles.image}
                            />
                        ))
                    }
                </>
            }
        </div>
    )
}