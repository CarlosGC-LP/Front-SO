import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSessionStore } from "../store/user-store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const initialForm = {
    email: "",
    password: "",
};

const apiUrl = import.meta.env.VITE_API_URL;

export const Login = () => {
    const login = useSessionStore((state) => state.login);
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!form.email || !form.password) {
            toast.warn("Por favor, completa todos los campos", { theme: "dark" });
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                toast.warn('Credenciales incorrectas o error en el servidor', { theme: "dark" });
                return;
            }

            const data = await response.json();

            login({ email: form.email, id: data.user.id, token: data.token });
            toast.success('¡Bienvenido a SocialWave!', { theme: "dark" });
            navigate('/feed');

        } catch (error) {
            console.error('Error:', error);
            toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#255873]">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <img className="w-20 h-20" src="https://img.icons8.com/office/40/chat--v1.png" alt="Logotipo SocialWave" />
                    <h2 className="text-2xl font-bold text-[#255873]">Inicia sesión en SocialWave</h2>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            onChange={handleChangeForm}
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Correo Electrónico"
                            className="pl-10 block w-full rounded-full border-gray-300 py-2 shadow-sm focus:ring-2 focus:ring-[#255873] sm:text-sm"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            onChange={handleChangeForm}
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Contraseña"
                            className="pl-10 block w-full rounded-full border-gray-300 py-2 shadow-sm focus:ring-2 focus:ring-[#255873] sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-center gap-4 mt-4">
                        <button type="submit" className="bg-[#255873] text-white px-4 py-2 rounded-full">Ingresar</button>
                        <Link to="/register" className="bg-[#255873] text-white px-4 py-2 rounded-full">Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
