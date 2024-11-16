import { create } from 'zustand'
import { Comment } from '../interfaces/comment';




interface State {
    isCommentMenuOpen: boolean;
    comment: Comment;
    openCommentMenu: () => void;
    closeCommentMenu: () => void;
    isAddComment: boolean;
    setIsEditComment: (comment: Comment) => void;
}
export const useCommentStore = create<State>()((set) => ({
    isAddComment: false,
    isCommentMenuOpen: false,
    comment: {
        author: "",
        content: "",
        createdAt: "",
        postId: "",
        _id: "",
    },
    openCommentMenu: () => set({ isCommentMenuOpen: true }),
    closeCommentMenu: () => set({ isCommentMenuOpen: false }),
    setOpenAddComment: () => set({ isAddComment: true }),
    setCloseAddComment: () => set({ isAddComment: false }),
    setIsEditComment: (comment) => set({ comment }),
}));