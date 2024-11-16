// src/stores/userSessionStore.ts
import { create } from 'zustand';
import { Post } from '../interfaces/post';

interface State {
    modalIsVisible: boolean;
    post: Post;
    posts: Post[];
    setIsCancelEdit: () => void;
    setIsEdit: (post: Post) => void;
    setOpenModal: () => void;
    setCloseModal: () => void;
    setPosts: (posts: Post[]) => void;
}


// Creamos el store con `zustand` usando `persist`
export const usePostStore = create<State>()((set) => ({
    modalIsVisible: false,
    posts: [],
    post: {
        _id: "",
        title: "",
        content: "",
        author: "",
        comments: [],
        createdAt: "",
        __v: 0
    },
    setPosts: (posts: Post[]) => set({ posts: posts }),
    setIsEdit: (post: Post) => set({ post: post }),
    setIsCancelEdit: () => set({
        post: {
            _id: "",
            title: "",
            content: "",
            author: "",
            comments: [],
            createdAt: "",
            __v: 0
        }
    }),
    setOpenModal: () => set({ modalIsVisible: true }),
    setCloseModal: () => set({ modalIsVisible: false }),
}));

