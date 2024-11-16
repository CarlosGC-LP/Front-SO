import React, { useRef, useState } from 'react'
import { Comment } from '../interfaces/comment';
import { ActionsComment } from './ActionsComment';
import { useCommentStore } from '../store/comment-store';
import { useSessionStore } from '../store/user-store';
import { toast } from 'react-toastify';
import { usePostStore } from '../store/post-store';
interface Props {
    commentsData: Comment[]
    postId:string
}
const apiUrl = import.meta.env.VITE_API_URL;
export const Comments = ({ commentsData,postId }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isResponseOpen, setIsResponseOpen] = useState(false);
    const setIsEditComment = useCommentStore((state) => state.setIsEditComment);
    const posts = usePostStore((state) => state.posts);
    const setPosts = usePostStore((state) => state.setPosts);
    const selectedComment = useCommentStore((state) => state.comment);
    const closeCommentMenu = useCommentStore((state) => state.closeCommentMenu);
    const user = useSessionStore((state) => state.user);
    const inputRef = useRef<HTMLInputElement>(null);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const toggleCreateResponse = () => {
        setIsResponseOpen(!isResponseOpen);
    }

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsEditComment({ ...selectedComment, content: e.target.value });
    }

    const cleanComment = () => {
        setIsEditComment({
            _id: "",
            author: "",
            content: "",
            createdAt: "",
            postId: "",
        })
        closeCommentMenu();
        toggleCreateResponse();
    }

    const onSubmitUpdateComment = async () => {

        try {
            const response = await fetch(`${apiUrl}/api/posts/${selectedComment.postId}/comments/${selectedComment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    content: selectedComment.content,
                }),
            });

            if (!response.ok) {
                toast.warn('No se pudo actualziar el comentario', { theme: "dark" });
                return;

            }

            const data = await response.json();

            const updatedPost = posts.map((post) => post._id === selectedComment.postId ? {
                ...post, comments: post.comments.map((comment) => comment._id === selectedComment._id ? { ...comment, content: data.content } : comment)
            } : post)
            setPosts(updatedPost);
            toast.success('Comentario actualizado  en SocialWave!', { theme: "dark" });
            cleanComment();

        } catch (err) {
            toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
        }


    }



    const onSubmitCreateComment = async () => {
        const inputValue = inputRef.current?.value;
        if (!inputValue) {
            toast.warn('Debes agregar un comentario', { theme: "dark" });
            return;
        }
        const comment = {
            content: inputValue,
        };

        try {
            const response = await fetch(`${apiUrl}/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                toast.warn('No se pudo crear el mensaje', { theme: "dark" });
                return;

            }

            const data = await response.json();

            const updatedPost = posts.map((post) => post._id === postId ? {
                ...post, comments: [...post.comments, {
                    author: data.author,
                    content: data.content,
                    createdAt: data.createdAt,
                    _id: data._id,
                    postId: data.postId,
                }]
            } : post)

            setPosts(updatedPost);



            inputRef.current!.value = "";
            toast.success('Comentario creado  en SocialWave!', { theme: "dark" });
            cleanComment();

        } catch (err) {
            toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
        }


    }


    return (
        <>
            <div>
                <button onClick={toggleCreateResponse} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Responder</button>
            </div>
            {isResponseOpen &&
                <>
                    <input ref={inputRef} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Agrega un comentario" />
                    <div className='flex justify-end'>
                        <button onClick={onSubmitCreateComment} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Responder</button>
                        <button onClick={cleanComment} type="button" className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                    </div>

                </>
            }
            <div  id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button onClick={toggleAccordion} type="button" className="flex items-center justify-between w-full p-4 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                        <span>Respuestas</span>
                        <svg data-accordion-icon className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                            }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
            </div>
            <div id="accordion-collapse-body-1" className={`${isOpen ? "block" : "hidden"}`} aria-labelledby="accordion-collapse-heading-1">
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                    <h3>Comentarios:</h3>
                    <ul>
                        {commentsData.map((comment) => (
                            <li className='py-12 px-4  mb-4 relative flex flex-col gap-2' key={comment._id}>
                                <p><em>Por: {comment.author} - {new Date(comment.createdAt).toLocaleString()}</em></p>
                                {comment._id === selectedComment._id ? <>
                                    <input name='comment_message' defaultValue={comment.content} onChange={handleChangeComment} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Agrega un comentario" />
                                    <div className='flex justify-end'>
                                        <button onClick={onSubmitUpdateComment} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                                        <button onClick={cleanComment} type="button" className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                                    </div>
                                </> :
                                    <>
                                        <ActionsComment selectedComment={comment} />
                                        <p>{comment.content}</p>
                                    </>
                                }

                            </li>
                        ))}
                    </ul>

                </div>
            </div>

        </>


    )
}
