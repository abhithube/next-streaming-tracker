# Trackit Streaming Tracker

Trackit is a JAMstack application that allows users to track movies and TV shows on popular streaming sites - Netflix, Hulu, Amazon Prime Video, Disney+, and HBO Max.

The app, hosted on Vercel, can be found at https://trackit.abhithube.com.

## Tech Stack

- TypeScript
- React
- Next.js

## Features

- Track today's most popular movies and TV shows
- Find results based on the services you're subscribed to (e.g. if you're subscribed to Netflix, you can limit content to only what's streaming on Netflix)
- Search for movies and TV shows with autocomplete suggestions
- Filter by genres

## How It Works

Trackit uses the [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction) to get movie and TV results. The details pages for the top 20 movies and TV shows are generated at build time using Next.js SSG (static site generation). Details pages for all other movies and shows are generated once during runtime when they are requested using ISG (incremental static generation) and then cached with the other pre-built pages. Furthermore, pages are regenerated at most once per day using ISR (incremental static regeneration) to keep the data up-to-date without having to rebuild the whole application.

The movie/TV list pages are primarily rendered client-side. The `react-query` data-fetching library is used to cache and prefetch data. The first set of paginated results are actually fetched at build-time using `react-query`, after which the cache is dehydrated and then rehydrated on the client. In other words, the cache client-side is populated immediately on render, which eliminates the need for a loading state. Also, the next page of results is prefetched, so the transition between pages requires no loading either.
