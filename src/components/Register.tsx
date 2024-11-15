import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const initialForm = {
    email: "",
    password: "",
    username: "",
};

export const Register = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/auth/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                toast.warn('Error al registrarse', { theme: "dark" });
                return;
            }
            const data = await response.json();
            console.log(data);
            toast.success('Registro exitoso', {
                theme: "dark"
            });
            navigate('/login');

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
                    <img className="w-20 h-20" src="https://img.icons8.com/office/40/chat--v1.png" alt="Logotipo" />
                    <h2 className="text-2xl font-bold text-[#255873]">Regístrate en SocialWave</h2>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            title="email"
                            onChange={handleChangeForm}
                            name="email"
                            type="email"
                            placeholder="Correo Electrónico"
                            required
                            className="pl-10 block w-full rounded-full border-gray-300 py-2 shadow-sm focus:ring-2 focus:ring-[#255873] sm:text-sm"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            title="Username"
                            onChange={handleChangeForm}
                            name="username"
                            type="text"
                            placeholder="username"
                            required
                            className="pl-10 block w-full rounded-full border-gray-300 py-2 shadow-sm focus:ring-2 focus:ring-[#255873] sm:text-sm"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            title="password"
                            onChange={handleChangeForm}
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            required
                            className="pl-10 block w-full rounded-full border-gray-300 py-2 shadow-sm focus:ring-2 focus:ring-[#255873] sm:text-sm"
                        />
                    </div>

                    <button type="submit" className="w-full font-bold bg-yellow-300 px-4 py-2 text-black rounded-full">Registrarse</button>
                </form>
            </div>
        </div>
    );
};
