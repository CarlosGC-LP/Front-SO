import { useEffect, useRef } from 'react'
import { Post } from '../interfaces/post';
import { toast, ToastContainer } from 'react-toastify';
import { useSessionStore } from '../store/user-store';
import { CreatePost } from './CreatePost';
import { ActionsPost } from './ActionsPost';
import { usePostStore } from '../store/post-store';
import { Comments } from './Comments';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSms } from '@fortawesome/free-solid-svg-icons';
import { DetailsAuthor } from './DetailsAuthor';
const apiUrl = import.meta.env.VITE_API_URL;
export const Posts = () => {
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const user = useSessionStore((state) => state.user);
  const postToEdit = usePostStore((state) => state.post);
  const setIsCancelEdit = usePostStore((state) => state.setIsCancelEdit);
  const setCloseModal = usePostStore((state) => state.setCloseModal);
  const setIsEdit = usePostStore((state) => state.setIsEdit);
  const logout = useSessionStore((state) => state.logout);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
      }
    };

    fetchPosts();
  }, []);


  const onClean = () => {
    setIsCancelEdit();
    setCloseModal();
  }

  const onSubmitUpdatePost = async () => {

    try {
      const response = await fetch(`${apiUrl}/api/posts/${postToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`, // Agrega el token si es necesario
        },
        body: JSON.stringify({
          title: postToEdit.title,
          content: postToEdit.content,
        }),
      });

      if (!response.ok) {
        toast.warn('No se pudo actualizar el post', { theme: "dark" });
        return;

      }

      const data = await response.json();
      const updatedPost = posts.map((post) => post._id === data._id ? data : post)
      setPosts(updatedPost);
      toast.success('Post actualizado  en SocialWave!', { theme: "dark" });
      onClean()

    } catch (err) {
      toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
    }

  }


  const handleChangePost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsEdit({ ...postToEdit, [name]: value });
  };






  return (
    <div className='container mx-auto px-4 py-16'>
      <ToastContainer />
      {!user?.token ? (<div className='mb-4 max-w-[1000px] mx-auto flex justify-between'>
        <h1 className='text-4xl font-semibold mb-4'>Inicia sesión para crear o comentar los posts</h1>
        <Link to='/login' className="block text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ingresar</Link>
      </div>) : (
        <div className='max-w-[1000px] mx-auto'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-4xl font-semibold text-center mb-4'>Bienvenido a SocialWave {user.email}</h1>
            <button onClick={() => logout()} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cerrar sesion</button>
          </div>
          <CreatePost />

        </div>
      )}

      <div>
        <h1 className='text-4xl text-center font-semibold mb-8'>Feed de SocialWave</h1>
        <ul className='flex flex-col gap-2'>
          {posts.map((post) => (
            <li key={post._id} className='flex items-center justify-center'>
              <div className="max-w-[1000px] w-full px-4 py-8 bg-white border rounded-lg shadow-md relative">
                <DetailsAuthor authorId={post.author} />
                {postToEdit._id === post._id ? (
                  <>
                    <input required onChange={handleChangePost} name='title' type="text" defaultValue={post.title} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hoy es viernes!" />
                    <textarea required onChange={handleChangePost} name='content' defaultValue={post.content} rows={3} className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="¿Que estas pensando?"></textarea>
                    <div className='flex justify-end'>
                      <button onClick={onSubmitUpdatePost} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                      <button onClick={onClean} type="button" className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong className='text-black'># {post.title}</strong>
                    <br />
                    <p className='text-black'>{post.content}</p>
                   { user?.id === post.author && <ActionsPost selectedPost={post} />}
                  </>
                )}
                <div className="flex items-center mt-4 space-x-6 mb-4">
                  <div className="flex items-center text-gray-600">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FontAwesomeIcon className='mr-2' icon={faCommentSms} />
                      Comentarios
                    </button>
                    <span className="ml-1 text-[16px] text-blue-500">{post.comments.length}</span>
                  </div>
                </div>
                <Comments postId={post._id} commentsData={post.comments} />
              </div>

            </li>
          ))}

        </ul>
      </div>

    </div>
  )
}


{/* <li key={post._id} className='relative  px-4 py-8 flex flex-col gap-2 rounded-xl border-2'>
<h2><strong>Autor:</strong> {post.author}</h2>
{postToEdit._id === post._id ? (
  <>
    <input required onChange={handleChangePost} name='title' type="text" defaultValue={post.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hoy es viernes!" />
    <textarea required onChange={handleChangePost} name='content' defaultValue={post.content} rows={3} className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="¿Que estas pensando?"></textarea>
    <div className='flex justify-end'>
      <button onClick={onSubmitUpdatePost} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
      <button onClick={onClean} type="button" className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
    </div>
  </>
) : (
  <>
    <p>{post.title}</p>
    <p>{post.content}</p>
    <ActionsPost selectedPost={post} />
  </>
)}
<Comments postId={post._id} commentsData={post.comments} />
</li> */}