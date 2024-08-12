import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

interface UserState {
	user: string | null;
	setUser: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	setUser: (name) => set(() => ({ user: name })),
}));

// export const useUserStore = create<UserState>()(
// 	devtools(
// 		persist(
// 			(set) => ({
// 				user: null,
// 				setUser: (name) => set(() => ({ user: name })),
// 			}),
// 			{
// 				name: 'user-storage',
// 			}
// 		)
// 	)
// );
