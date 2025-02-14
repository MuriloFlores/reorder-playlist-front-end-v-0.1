// playlistService.ts
import axios from 'axios';

export interface Playlist {
    id: string;
    title: string;
    description: string;
}

export interface PlaylistAction {
    userId: string;
    playlistId: string;
    criteria: string;
}

export const getPlaylist = async (): Promise<Playlist[]> => {
    try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            throw new Error("User id não encontrado no localStorage.");
        }
        const response = await axios.get<Playlist[]>(
            'http://localhost:8080/playlists/all', {
                headers: {
                    "X-User-Id": userId
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error ao buscar playlist: ', error);
        throw error;
    }
};

export const reorderPlaylist = async (action: PlaylistAction): Promise<void> => {
    try {
        await axios.post('http://localhost:8080/playlists/reorder',
            { playlist_id: action.playlistId, criteria: action.criteria },
            {
                headers: {
                    "X-User-Id": action.userId
                }
            }
        );
    } catch (error) {
        console.error('Error ao reordenar playlist: ', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        localStorage.removeItem("user_id");
        await axios.get('http://localhost:8080/logout');
    } catch (error) {
        console.error('Error ao efetuar logout: ', error);
        throw error;
    }
};
