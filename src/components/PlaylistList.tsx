// PlaylistList.tsx
import React, { useState } from 'react';
import { usePlaylists } from '../hooks/usePlaylists';
import PlaylistCard from './PlaylistCard';
import { reorderPlaylist, Playlist, PlaylistAction } from '../services/playlistService';

const PlaylistList: React.FC = () => {
    const { playlists, loading, error, refreshPlaylists } = usePlaylists();
    const [reorderError, setReorderError] = useState<string | null>(null);

    const handleReorder = async (playlistId: string, criteria: string) => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                throw new Error("User id não encontrado no localStorage.");
            }
            const action: PlaylistAction = {
                userId,
                playlistId,
                criteria
            };

            console.log(playlistId)

            await reorderPlaylist(action);
            // Atualiza a lista após a reordenação
            refreshPlaylists();
        } catch (error: unknown) {
            let errMessage = 'Erro ao reordenar playlist';
            if (error instanceof Error) {
                errMessage = error.message;
            }
            setReorderError(errMessage);
        }
    };

    if (loading) return <p>Carregando playlists...</p>;
    if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;

    return (
        <div>
            {reorderError && <p style={{ color: 'red' }}>{reorderError}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {playlists.map(playlist => (
                    <PlaylistCard key={playlist.id} playlist={playlist} onReorder={handleReorder} />
                ))}
            </div>
        </div>
    );
};

export default PlaylistList;
