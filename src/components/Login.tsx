import { useState } from "react"
import { Bounce, toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useSessionStore } from "../store/user-store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const initialForm = {
    email: "",
    password: "",
}
const apiUrl = import.meta.env.VITE_API_URL;
export const Login = () => {
    const login = useSessionStore((state) => state.login); 
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm)
    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        setForm({ ...form, [name]: value })

    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${apiUrl}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(response => {
                if (!response.ok) {
                    toast.warn('Error en la autenticación', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                    throw new Error('Error en la autenticación');
                }

                return response.json();
            })
            .then(data => {

                login({
                    email:form.email,
                    id:data.user.id,
                    token:data.token,
                })
                navigate('/');
                toast.warn('Login exitoso', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });

                console.log('Login exitoso:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        <div className="h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
            <ToastContainer />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
                    <div className="flex flex-col items-center gap-2 justify-center">
                        <img className="w-20 h-20" src="https://img.icons8.com/office/40/shop.png" alt="Logotipo" />
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Inicia sesion</h2>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                        <div className="mt-2">
                            <input onChange={handleChangeForm} id="email" name="email" type="email" autoComplete="email" required className="px-4 block w-full rounded-full border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={handleChangeForm} id="password" name="password" type="password" autoComplete="current-password" required className="px-4 block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="flex justify-center font-bold gap-4">
                        <button type="submit" className="  bg-yellow-300 px-4 py-2   text-black rounded-full">Ingresar</button>
                        <Link to="/register" className="bg-yellow-300 px-4 py-2   text-black rounded-full">Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
