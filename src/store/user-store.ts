// src/stores/userSessionStore.ts
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';


interface User {
    email: string
    id: string
    token:string
}
interface SessionState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}


// Creamos el store con `zustand` usando `persist`
export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user: User) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'session-storage', // Nombre del almacenamiento en localStorage
        } as PersistOptions<SessionState>
    )
);
