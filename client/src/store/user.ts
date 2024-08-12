import { create } from 'zustand';

interface UserState {
	user: string | null;
	setUser: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	setUser: (name) => set(() => ({ user: name })),
}));
