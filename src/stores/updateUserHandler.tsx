import { create } from 'zustand';

interface UpdateUserState {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const useUpdateUserStore = create<UpdateUserState>((set) => ({
  isOpen: false,
  setOpen: (value) => set({ isOpen: value }),
}));

export default useUpdateUserStore;