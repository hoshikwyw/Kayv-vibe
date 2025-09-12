import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tracksMock from "../../mocks/tracks.json";

const USE_MOCKS = true; // set to true to force mocks

// Custom baseQuery that falls back to mocks on rate limit or when USE_MOCKS
const realBaseQuery = fetchBaseQuery({
  baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
  prepareHeaders: (headers) => {
    headers.set('X-RapidAPI-Key', '569e84436amshf9e2b2888bc499ep10c414jsne17550357488');
    return headers;
  }
});

const mockableBaseQuery = async (args, api, extraOptions) => {
  if (USE_MOCKS) {
    return { data: tracksMock };
  }
  const result = await realBaseQuery(args, api, extraOptions);
  const status = result?.error?.status || result?.data?.status;
  if (status === 429 || result?.error) {
    return { data: tracksMock };
  }
  return result;
}

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: mockableBaseQuery,
  endpoints: (builder) => ({
    getChartTracks: builder.query({
      query: (arg) => {
        const genre = arg?.genre ?? 'POP';
        return `charts/genre-world?genre_code=${genre}&country_code=DZ`;
      },
      transformResponse: (response) => {
        if (USE_MOCKS || !response) {
          // Return plain array for broad compatibility (pages handle both)
          return tracksMock;
        }
        return response;
      },
    }),
    getArtistDetail: builder.query({
      query: ({ artistId }) => `/artists/get-details?id=${artistId}&l=en-US`,
      transformResponse: (response, meta, arg) => {
        if (USE_MOCKS || !response) {
          return {
            data: [
              {
                id: arg?.artistId ?? "1001",
                attributes: {
                  name: "Mock Artist",
                  artwork: { url: "https://picsum.photos/id/239/500/500" },
                  genreNames: ["Pop"],
                },
              },
            ],
          };
        }
        return response;
      },
    }),
    getSongDetail: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}`,
      transformResponse: (response, meta, arg) => {
        if (USE_MOCKS || !response) {
          const base = tracksMock[0] || {};
          return {
            key: arg?.songid ?? base.key ?? "1",
            title: base.title ?? "Mock Song One",
            subtitle: base.subtitle ?? "Mock Artist",
            images: { coverart: base.images?.coverart ?? "https://picsum.photos/id/237/400/400" },
            artists: base.artists ?? [{ adamid: "1001" }],
            genres: base.genres ?? { primary: "Pop" },
            sections: [
              {},
              { type: "LYRICS", text: ["Line 1", "Line 2", "Line 3"] },
            ],
          };
        }
        return response;
      },
    }),
    getRelateSong: builder.query({
      query: ({ songid }) => `/songs/get-related-artist?key=${songid}&l=en-US`,
      transformResponse: (response) => {
        if (USE_MOCKS || !response) {
          return tracksMock;
        }
        return response;
      },
    }),
    searchSong: builder.query({
      query: ({ searchTerm }) => `search?term=${searchTerm}&l=en-US`,
      transformResponse: (response, meta, arg) => {
        if (USE_MOCKS || !response) {
          // Shape to match Search.jsx usage: data.tracks.hits[].track
          return {
            tracks: {
              hits: tracksMock.map((t) => ({ track: t }))
            }
          };
        }
        return response;
      },
    }),

  })
});

export const { useGetChartTracksQuery, useGetArtistDetailQuery, useGetSongDetailQuery, useGetRelateSongQuery, useSearchSongQuery } = shazamApi;


export const fetchCities = createApi({
  reducerPath: 'citiesApi',
  baseQuery: mockableBaseQuery,
  endpoints: (builder) => ({
    getCities: builder.query({
      query: () => '/frame/cities',
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetCitiesQuery } = fetchCities;