// usePlaylists.ts
import { useEffect, useState, useCallback } from "react";
import { getPlaylist, Playlist } from "../services/playlistService";

export const usePlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaylist = useCallback(async (): Promise<void> => {
        try {
            const data: Playlist[] = await getPlaylist();
            setPlaylists(data);
        } catch (err: unknown) {
            let errMessage = 'Something went wrong';
            if (err instanceof Error) {
                errMessage = err.message;
            }
            setError(errMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPlaylist();
    }, [fetchPlaylist]);

    return { playlists, loading, error, refreshPlaylists: fetchPlaylist };
};
