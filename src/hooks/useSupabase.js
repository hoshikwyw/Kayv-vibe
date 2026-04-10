import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Transform a flat Supabase song row into the nested shape components expect
function transformSong(row) {
  return {
    key: row.id,
    title: row.title,
    subtitle: row.artist_name,
    artists: [{ adamid: row.artist_id }],
    genres: { primary: row.genre },
    images: {
      coverart: row.cover_url,
      background: row.cover_url,
    },
    attributes: {
      name: row.title,
      artwork: { url: row.cover_url },
      artistName: row.artist_name,
      previews: [{ url: row.audio_url }],
    },
    hub: {
      actions: [{ type: "uri", uri: row.audio_url }],
    },
  };
}

// Transform a flat Supabase artist row
function transformArtist(row) {
  return {
    key: row.id,
    title: "Artist",
    subtitle: row.name,
    artists: [{ adamid: row.id }],
    genres: { primary: row.genre },
    images: {
      coverart: row.avatar_url,
      background: row.avatar_url,
    },
    attributes: {
      name: row.name,
      artwork: { url: row.avatar_url },
      genreNames: [row.genre],
    },
  };
}

// Fetch songs, optionally filtered by genre
export function useSongs(genre) {
  return useQuery({
    queryKey: ["songs", genre],
    queryFn: async () => {
      let query = supabase.from("songs").select("*").order("created_at", { ascending: false });
      if (genre) {
        query = query.ilike("genre", genre);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data.map(transformSong);
    },
  });
}

// Fetch a single song by ID
export function useSongDetail(songId) {
  return useQuery({
    queryKey: ["song", songId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", songId)
        .single();
      if (error) throw error;

      const song = transformSong(data);
      // Add lyrics section for SongDetail page
      song.sections = [
        {},
        data.lyrics?.length
          ? { type: "LYRICS", text: data.lyrics }
          : { type: "NO_LYRICS", text: [] },
      ];
      return song;
    },
    enabled: !!songId,
  });
}

// Fetch related songs (same genre, excluding current)
export function useRelatedSongs(songId) {
  return useQuery({
    queryKey: ["relatedSongs", songId],
    queryFn: async () => {
      // First get the current song's genre
      const { data: current, error: currentError } = await supabase
        .from("songs")
        .select("genre")
        .eq("id", songId)
        .single();
      if (currentError) throw currentError;

      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .ilike("genre", current.genre)
        .neq("id", songId)
        .limit(10);
      if (error) throw error;
      return data.map(transformSong);
    },
    enabled: !!songId,
  });
}

// Fetch a single artist by ID
export function useArtistDetail(artistId) {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("id", artistId)
        .single();
      if (error) throw error;
      return { data: [transformArtist(data)] };
    },
    enabled: !!artistId,
  });
}

// Fetch songs by artist
export function useArtistSongs(artistId) {
  return useQuery({
    queryKey: ["artistSongs", artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("artist_id", artistId);
      if (error) throw error;
      return data.map(transformSong);
    },
    enabled: !!artistId,
  });
}

// Search songs by title or artist name
export function useSearchSongs(searchTerm) {
  return useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .or(`title.ilike.%${searchTerm}%,artist_name.ilike.%${searchTerm}%`);
      if (error) throw error;
      return data.map(transformSong);
    },
    enabled: !!searchTerm,
  });
}

// Fetch all artists
export function useArtists() {
  return useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .order("name");
      if (error) throw error;
      return data.map(transformArtist);
    },
  });
}

// Fetch chart songs (top songs ordered by play count or ranking)
export function useChartSongs() {
  return useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(20);
      if (error) throw error;
      return data.map(transformSong);
    },
  });
}

// Fetch liked songs
export function useLikedSongs() {
  return useQuery({
    queryKey: ["likedSongs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*, songs(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((row) => transformSong(row.songs));
    },
  });
}
