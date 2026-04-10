import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Transform a Supabase song row into the nested shape components expect
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
      albumName: row.album_title || "",
      previews: [{ url: row.audio_url }],
    },
    hub: {
      actions: [{ type: "uri", uri: row.audio_url }],
    },
    duration: row.duration,
    playCount: row.play_count,
    albumId: row.album_id,
  };
}

// Transform a chart view row (has extra joined fields)
function transformChartSong(row) {
  return {
    ...transformSong(row),
    chartRank: row.chart_rank,
  };
}

// Transform a Supabase artist row
function transformArtist(row) {
  return {
    key: row.id,
    title: "Artist",
    subtitle: row.name,
    artists: [{ adamid: row.id }],
    genres: { primary: row.bio || "" },
    images: {
      coverart: row.avatar_url,
      background: row.avatar_url,
    },
    attributes: {
      name: row.name,
      artwork: { url: row.avatar_url },
      genreNames: [],
    },
    totalPlays: row.total_plays,
    songCount: row.song_count,
    artistRank: row.artist_rank,
  };
}

// Transform album row
function transformAlbum(row) {
  return {
    key: row.id,
    title: row.title,
    artistName: row.artist_name,
    artistId: row.artist_id,
    coverUrl: row.cover_url,
    releaseDate: row.release_date,
    totalPlays: row.total_plays,
    songCount: row.song_count,
    albumRank: row.album_rank,
  };
}

// ============================================
// Song hooks
// ============================================

// Fetch songs, optionally filtered by genre slug
export function useSongs(genreSlug) {
  return useQuery({
    queryKey: ["songs", genreSlug],
    queryFn: async () => {
      let query = supabase
        .from("songs")
        .select("*, albums(title)")
        .order("play_count", { ascending: false });

      if (genreSlug) {
        // Match against the category slug
        const { data: cat } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", genreSlug)
          .single();

        if (cat) {
          query = query.eq("category_id", cat.id);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data.map((row) => transformSong({ ...row, album_title: row.albums?.title }));
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
        .select("*, albums(title)")
        .eq("id", songId)
        .single();
      if (error) throw error;

      const song = transformSong({ ...data, album_title: data.albums?.title });
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
      const { data: current, error: currentError } = await supabase
        .from("songs")
        .select("genre")
        .eq("id", songId)
        .single();
      if (currentError) throw currentError;

      const { data, error } = await supabase
        .from("songs")
        .select("*, albums(title)")
        .ilike("genre", current.genre)
        .neq("id", songId)
        .order("play_count", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data.map((row) => transformSong({ ...row, album_title: row.albums?.title }));
    },
    enabled: !!songId,
  });
}

// Search songs by title or artist name
export function useSearchSongs(searchTerm) {
  return useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*, albums(title)")
        .or(`title.ilike.%${searchTerm}%,artist_name.ilike.%${searchTerm}%`)
        .order("play_count", { ascending: false });
      if (error) throw error;
      return data.map((row) => transformSong({ ...row, album_title: row.albums?.title }));
    },
    enabled: !!searchTerm,
  });
}

// Increment play count when a song is played
export function useTrackPlay() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (songId) => {
      const { error } = await supabase.rpc("increment_play_count", { p_song_id: songId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      queryClient.invalidateQueries({ queryKey: ["topArtists"] });
      queryClient.invalidateQueries({ queryKey: ["topAlbums"] });
    },
  });
}

// ============================================
// Chart hooks (using views)
// ============================================

// Top Charts — songs ranked by play_count
export function useChartSongs() {
  return useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_charts")
        .select("*")
        .limit(20);
      if (error) throw error;
      return data.map(transformChartSong);
    },
  });
}

// Top Artists — ranked by total plays across all songs
export function useTopArtists() {
  return useQuery({
    queryKey: ["topArtists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_artists")
        .select("*")
        .limit(20);
      if (error) throw error;
      return data.map(transformArtist);
    },
  });
}

// Top Albums — ranked by total plays across album songs
export function useTopAlbums() {
  return useQuery({
    queryKey: ["topAlbums"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_albums")
        .select("*")
        .limit(20);
      if (error) throw error;
      return data.map(transformAlbum);
    },
  });
}

// ============================================
// Artist hooks
// ============================================

// Fetch all artists (uses top_artists view for ranking)
export function useArtists() {
  return useQuery({
    queryKey: ["topArtists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_artists")
        .select("*");
      if (error) throw error;
      return data.map(transformArtist);
    },
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

      // Also fetch the artist's categories
      const { data: cats } = await supabase
        .from("artist_categories")
        .select("categories(name)")
        .eq("artist_id", artistId);

      const genreNames = cats?.map((c) => c.categories.name) || [];
      const artist = transformArtist(data);
      artist.attributes.genreNames = genreNames;
      artist.genres = { primary: genreNames[0] || "" };
      return { data: [artist] };
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
        .select("*, albums(title)")
        .eq("artist_id", artistId)
        .order("play_count", { ascending: false });
      if (error) throw error;
      return data.map((row) => transformSong({ ...row, album_title: row.albums?.title }));
    },
    enabled: !!artistId,
  });
}

// ============================================
// Album hooks
// ============================================

// Fetch a single album with its songs
export function useAlbumDetail(albumId) {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: async () => {
      const { data: album, error: albumError } = await supabase
        .from("albums")
        .select("*, artists(name, avatar_url)")
        .eq("id", albumId)
        .single();
      if (albumError) throw albumError;

      const { data: songs, error: songsError } = await supabase
        .from("songs")
        .select("*, albums(title)")
        .eq("album_id", albumId)
        .order("created_at");
      if (songsError) throw songsError;

      return {
        album: {
          ...album,
          artistName: album.artists?.name,
          artistAvatarUrl: album.artists?.avatar_url,
        },
        songs: songs.map((row) => transformSong({ ...row, album_title: row.albums?.title })),
      };
    },
    enabled: !!albumId,
  });
}

// ============================================
// Category hooks
// ============================================

// Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });
}

// ============================================
// Liked songs hooks
// ============================================

export function useLikedSongs() {
  return useQuery({
    queryKey: ["likedSongs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*, songs(*, albums(title))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((row) =>
        transformSong({ ...row.songs, album_title: row.songs.albums?.title })
      );
    },
  });
}

export function useLikeSong() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (songId) => {
      const { error } = await supabase
        .from("liked_songs")
        .insert({ song_id: songId });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likedSongs"] }),
  });
}

export function useUnlikeSong() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (songId) => {
      const { error } = await supabase
        .from("liked_songs")
        .delete()
        .eq("song_id", songId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likedSongs"] }),
  });
}
