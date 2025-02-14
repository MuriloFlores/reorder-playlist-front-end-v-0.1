import React from 'react';

interface HeaderProps {
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const handleLogout = async () => {
        if (onLogout) {
            onLogout();
        } else {
            // Exemplo: se não houver onLogout injetado, podemos chamar diretamente
            window.location.href = '/logout';
        }
    };

    return (
        <header style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <h2>Minha Aplicação</h2>
            <button onClick={handleLogout} style={{ background: '#f00', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                Logout
            </button>
        </header>
    );
};

export default Header;
