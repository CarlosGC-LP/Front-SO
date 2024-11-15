// src/stores/userSessionStore.ts
import { create } from 'zustand';
interface Post {
    id: string;
    title: string;
    content: string;
}
interface State {
    modalIsVisible: boolean;
    post: Post;
    setIsCancelEdit: () => void;
    setIsEdit: (post: Post) => void;
    setOpenModal: () => void;
    setCloseModal: () => void;
}


// Creamos el store con `zustand` usando `persist`
export const usePostStore = create<State>()((set) => ({
    modalIsVisible: false,
    post: {
        id: "",
        title: "",
        content: "",
    },
    setIsEdit: (post: Post) => set({ post: post }),
    setIsCancelEdit: () => set({
        post: {
            id: "",
            title: "",
            content: "",
        }
    }),
    setOpenModal: () => set({ modalIsVisible:true }),
    setCloseModal: () => set({ modalIsVisible: false }),
}));

