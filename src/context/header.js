import { create } from 'zustand';

const useHeaderStore = create((set) => ({
    total_price: 0,
    addPrice: (value) => set((state) => ({ total_price: state.total_price + value })),
    finish: () => set({ total_price: 0 }),
}));

export default useHeaderStore;
