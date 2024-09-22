import { create } from 'zustand'
interface State {
    isSidebarMenuOpen: boolean;
    openSidebarMenu: () => void;
    closeSidebarMenu: () => void;

}
export const useUIStore = create<State>()((set) => ({
    isSidebarMenuOpen: false,
    openSidebarMenu: () => set({ isSidebarMenuOpen: true }),
    closeSidebarMenu: () => set({ isSidebarMenuOpen: false }),
}));