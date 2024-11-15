import React, { Dispatch, useState } from 'react'
import { toast } from 'react-toastify';
import { useSessionStore } from '../store/user-store';
import { Post } from '../interfaces/post';
const initialForm = {
    title: "",
    content: "",
};

const apiUrl = import.meta.env.VITE_API_URL;
export const CreatePost = ({ setPosts }: { setPosts: Dispatch<React.SetStateAction<Post[]>> }) => {
    const [form, setForm] = useState(initialForm);
    const user = useSessionStore((state) => state.user);


    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`, // Agrega el token si es necesario
                },
                body: JSON.stringify({
                    title: form.title,
                    content: form.content,
                    userId: user?.id, // Cambia esto según el contexto
                }),
            });

            if (!response.ok) {
                toast.warn('No se pudo crear un post', { theme: "dark" });
                return;

            }

            const data = await response.json();
            console.log(data)
            setForm(initialForm);

            setPosts((prevState: Post[]) => [...prevState, data]);
            toast.success('Post creado  en SocialWave!', { theme: "dark" });

        } catch (err) {
            toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
        }
    };
    const onCancel = () => {
        setForm(initialForm);
    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <h4 className='text-xl'>Agrega un post</h4>
            <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agrega un titulo del Post</label>
                <input required onChange={handleChangeForm} type="text" name='title' id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hoy es viernes!" />
            </div>
            <div>
                <label htmlFor="message" className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Agrega un mensaje del post</label>
                <textarea required id="message" onChange={handleChangeForm} name='content' rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="¿Que estas pensando?"></textarea>
            </div>
            <div className='flex justify-end'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Postear</button>
                <button onClick={onCancel} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
            </div>
        </form>
    )
}
