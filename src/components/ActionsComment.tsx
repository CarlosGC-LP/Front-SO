import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePostStore } from '../store/post-store'
import { useSessionStore } from '../store/user-store';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Comment } from '../interfaces/comment';
import { useCommentStore } from '../store/comment-store';


const apiUrl = import.meta.env.VITE_API_URL;
export const ActionsComment = ({ selectedComment }: { selectedComment: Comment }) => {
    const [isOpen, setIsOpen] = useState(false)
    const user = useSessionStore((state) => state.user);
    const posts = usePostStore((state) => state.posts);
    const setIsEditComment = useCommentStore((state) => state.setIsEditComment)
    const setPosts = usePostStore((state) => state.setPosts);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const onDeleteComment = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/posts/${selectedComment.postId}/comments/${selectedComment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`, // Agrega el token si es necesario
                }
            });
            console.log(response)

            if (!response.ok) {
                toast.warn('No se pudo eliminar el post', { theme: "dark" });
                return;
            }

            const data = await response.json();
            const updatePost = posts.map((post) => post._id === selectedComment.postId ? { ...post, comments: post.comments.filter((el) => el._id !== selectedComment._id) } : post)
            setPosts(updatePost);
            toast.success('Post Eliminado  en SocialWave!', { theme: "dark" });
            toggleModal()

        } catch (err) {
            toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
        }
    }

    const onEditComment = () => {
        setIsEditComment(selectedComment)
    }
    return (
        <div data-dial-init className="absolute end-6 top-6 group">
            <div id="speed-dial-menu-square" className={`flex-col  items-center ${isOpen ? "flex" : "hidden"} mb-4 space-y-2`}>
                <button onClick={onEditComment} type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" className="flex justify-center items-center  w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <FontAwesomeIcon icon={faEdit} className=" text-gray-400" />
                    <span className="sr-only">Edit</span>
                </button>
                <div id="tooltip-share" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Edit
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button onClick={onDeleteComment} type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left" className="flex justify-center items-center  w-10 h-10 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <FontAwesomeIcon icon={faDeleteLeft} className=" text-gray-400" />
                    <span className="sr-only">Delete</span>
                </button>
                <div id="tooltip-print" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Delete
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

            </div>
            <button onClick={toggleModal} type="button" data-dial-toggle="speed-dial-menu-square" aria-controls="speed-dial-menu-square" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-lg w-10 h-10 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg className={`w-4 h-4 transition-transform r ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>

    )
}
