import { useEffect, useState } from 'react'
import { Post } from '../interfaces/post';
import { toast, ToastContainer } from 'react-toastify';
import { useSessionStore } from '../store/user-store';
import { CreatePost } from './CreatePost';
import { ActionsPost } from './ActionsPost';
import { usePostStore } from '../store/post-store';
import { Comments } from './Comments';
const apiUrl = import.meta.env.VITE_API_URL;
export const Posts = () => {
  // Estado para los posts
  const [posts, setPosts] = useState<Post[]>([]);
  const user = useSessionStore((state) => state.user);
  const postToEdit = usePostStore((state) => state.post);
  const setIsCancelEdit = usePostStore((state) => state.setIsCancelEdit);
  const setCloseModal = usePostStore((state) => state.setCloseModal);
  const setIsEdit = usePostStore((state) => state.setIsEdit);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user?.token}`
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
      const response = await fetch(`${apiUrl}/api/posts/${postToEdit.id}`, {
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
      console.log(data)
      setPosts((prevState: Post[]) => prevState.map((post) => post._id === data._id ? data : post));
      toast.success('Post actualizado  en SocialWave!', { theme: "dark" });
      onClean()

    } catch (err) {
      toast.error('Ocurrió un problema, inténtalo de nuevo más tarde', { theme: "dark" });
    }

  }


  const handleChangeValuesUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsEdit({ ...postToEdit, [name]: value });
  };


  return (
    <div>
      <ToastContainer />
      <CreatePost setPosts={setPosts} />
      <div>
        <h1 className='text-xl mb-4'>Listado de posts</h1>
        <ul className='flex flex-col gap-2'>
          {posts.map((post) => (
            <li key={post._id} className='relative  px-4 py-8 flex flex-col gap-2 rounded-xl border-2'>
              <h2><strong>Autor:</strong> {post.author}</h2>
              {postToEdit.id === post._id ? (
                <>
                  <input required onChange={handleChangeValuesUpdate} name='title' type="text" value={postToEdit.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hoy es viernes!" />
                  <textarea required onChange={handleChangeValuesUpdate} value={postToEdit.content} name='content' rows={3} className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="¿Que estas pensando?"></textarea>
                  <div className='flex justify-end'>
                    <button onClick={onSubmitUpdatePost} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                    <button onClick={onClean} type="button" className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                </>
              )}
              <div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Responder</button>
              </div>

              {/* <h3>Comentarios:</h3>
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment.commentId}>
                    <p>{comment.content}</p>
                    <p><em>Por: {comment.author} - {new Date(comment.createdAt).toLocaleString()}</em></p>
                  </li>
                ))}
              </ul> */}
              {(user?.id === post.author && !postToEdit.id) && <ActionsPost setPosts={setPosts} selectedPost={post} />}
              <Comments/>

            </li>
          ))}

        </ul>
      </div>


    </div>
  )
}
