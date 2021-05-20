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

Trackit uses the [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction) to get movie and TV results. The details pages for the top 20 movies and TV shows are generated at build time using Next.js SSG (static site generation). Details pages for all other content are generated once during runtime when they are requested using ISG (incremental static generation) and then cached with the other pre-built pages. Furthermore, pages are regenerated at most once per day using ISR (incremental static regeneration) to keep the data up-to-date without having to rebuild the whole application.

The movie/TV list pages are client-side rendered. Because the data is paginated and changing every day, a newly released popular movie would cause the entire list to be outdated if it was generated at build time. For this reason, the `react-query` data-fetching library was used to fetch and render the data client-side. The first set of paginated results is pre-rendered to prevent a hard loading state, and the 'next' page is prefetched to further improve the user experience.
