import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"; // ✅ Corrigido

const Login = () => {
    const [popup, setPopup] = useState<Window | null>(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const url = "http://localhost:8080/auth/google";
        const newPopup = window.open(
            url,
            "OAuthPopup",
            `width=${width},height=${height},top=${top},left=${left}`
        );
        setPopup(newPopup);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== "http://localhost:8080") return;

            const {user} = event.data;

            if (user) {

                localStorage.setItem("user_id", user.id);
                localStorage.setItem("user_name", user.name);

                if (popup && !popup.closed) {
                    popup.close();
                }

                navigate("/dashboard");
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [popup, navigate]);
    return (
        <div className="vw-100 vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div
                className="h-25 w-25 bg-body-secondary d-flex align-items-center justify-content-center flex-column rounded">
                <h1>Bem-vindo</h1>
                <button onClick={handleLogin} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
