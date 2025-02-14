import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) {
                    setIsAuthenticated(false);
                    return;
                }

                const response = await axios.get(
                    "http://localhost:8080/playlists/validate", {
                        headers: {
                            "X-User-Id": userId
                        }
                    }

                );

                setIsAuthenticated(response.data.valid);
                console.log("Usuário autenticado:", response.data.valid);
            } catch (error) {
                console.error("Erro na validação de autenticação:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Carregando...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
