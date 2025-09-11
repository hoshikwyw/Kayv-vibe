import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '569e84436amshf9e2b2888bc499ep10c414jsne17550357488');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getChartTracks: builder.query({
      query: ({ genre }) => `charts/genre-world?genre_code=${genre}&country_code=DZ`,
    }),
    // getSongDetail: builder.query({
    //   query: ({ songid }) => `/songs/get-details?key=${songid}`
    // }),
    // getRelateSong: builder.query({
    //   query: ({ artistId }) => `/songs/get-related-artist?key=${artistId}&l=en-US`
    // }),
    // getArtistDetail: builder.query({
    //   query: ({ artistId }) => `/artists/get-details?id=${artistId}&l=en-US`
    // }),
    // searchSong: builder.query({
    //   query: ({ searchTerm }) => `search?term=${searchTerm}&l=en-US`
    // }),

  })
});

export const { useGetChartTracksQuery, useGetSongDetailQuery, useGetRelateSongQuery, useGetArtistDetailQuery, useSearchSongQuery } = shazamApi;


export const fetchCities = createApi({
  reducerPath: 'citiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '569e84436amshf9e2b2888bc499ep10c414jsne17550357488');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCities: builder.query({
      query: () => '/frame/cities',
      transformResponse: (response) => {
        console.log('Cities API Response:', response);
        return response;
      },
    }),
  }),
});

export const { useGetCitiesQuery } = fetchCities;