// PlaylistCard.tsx
import React, { useState } from 'react';
import { Playlist } from '../services/playlistService';

interface PlaylistCardProps {
    playlist: Playlist;
    onReorder?: (playlistId: string, criteria: string) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onReorder }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedCriteria, setSelectedCriteria] = useState("byTitle");

    // Ao clicar, exibe o dropdown de critérios
    const handleReorderClick = () => {
        setShowOptions(true);
    };

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCriteria(event.target.value);
    };

    const handleConfirm = () => {
        if (onReorder) {
            onReorder(playlist.id, selectedCriteria);
        }
        setShowOptions(false);
    };

    const handleCancel = () => {
        setShowOptions(false);
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            margin: '1rem',
            width: '300px',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
            <button onClick={handleReorderClick} style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
            }}>
                Reordenar
            </button>
            {showOptions && (
                <div style={{ marginTop: '1rem' }}>
                    <select value={selectedCriteria} onChange={handleCriteriaChange}>
                        <option value="byTitle">Por Título</option>
                        <option value="byPublishedAt">Por Data de Publicação</option>
                        <option value="byDuration">Por Duração</option>
                        <option value="byChannel">Por Canal</option>
                        <option value="byLanguage">Por Lingua</option>
                    </select>
                    <button onClick={handleConfirm} style={{ marginLeft: '0.5rem' }}>Confirmar</button>
                    <button onClick={handleCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default PlaylistCard;
