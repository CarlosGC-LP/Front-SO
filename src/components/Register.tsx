import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useSessionStore } from "../store/user-store";
import { useNavigate } from "react-router-dom";

const initialForm = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
};

export const Register = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();
    const login = useSessionStore((state) => state.login);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        fetch(`${apiUrl}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(response => {
                if (!response.ok) {
                    toast.warn('Error en el registro', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                        transition: Bounce,
                    });
                    throw new Error('Error en el registro');
                }

                return response.json();
            })
            .then(data => {
                toast.success('Registro exitoso', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
                });
                login({
                    email: form.email,
                    id: data.user.id,
                    token: data.token,
                });
                navigate('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                            title="first name"
                            onChange={handleChangeForm}
                            name="first_name"
                            type="text"
                            placeholder="Nombres"
                            required
                            className="pl-10 block w-full rounded-full border-gray-300 py-2 shadow-sm focus:ring-2 focus:ring-[#255873] sm:text-sm"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            title="last name"
                            onChange={handleChangeForm}
                            name="last_name"
                            type="text"
                            placeholder="Apellidos"
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
