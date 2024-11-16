import React, { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
export const DetailsAuthor = ({ authorId }: { authorId: string }) => {
    const [author, setAuthor] = useState({
        _id: '',
        username: '',
        email: '',
    });

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/auth/user/${authorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    setAuthor({
                        _id: '',
                        username: 'No encontrado',
                        email: 'No encontrado',
                    })
                    return;
                }

                const data = await response.json();
                setAuthor(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAuthorDetails();
    }, []);

    function getFirstLetterCapitalized(word: string | undefined | null): string {
        if (!word || word.trim() === '') {
            return ''; // Manejo de palabras vacías o valores nulos/indefinidos
        }
        return word.trim().charAt(0).toUpperCase(); // Obtiene y capitaliza la primera letra
    }

    return (
        <div className="flex items-center space-x-4 mb-4">
            <div
                className="w-12 h-12 rounded-full flex justify-center items-center text-black border-black border-2"
            >
                <span className="text-xl font-bold">{getFirstLetterCapitalized(author?.email)}</span>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-black">{author?.email}</h4>
                <p className="text-sm text-gray-500">@{author?.username}</p>
            </div>
        </div>
    );
};
