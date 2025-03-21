import { create } from 'zustand';

const useModalStore = create((set) => ({
    modals: {
        product_list: { isOpen: false, props: {} },
        debt: { isOpen: false, props: {} },
        snackbar: { isOpen: false, props: {} },
    }, // Açık modal'ları burada saklıyoruz

    openModal: (id, props = {}) =>
        set((state) => ({
            modals: {
                ...state.modals,
                [id]: { props, isOpen: true },
            },
        })),

    closeModal: (id) =>
        set((state) => {
            const newModals = { ...state.modals };
            newModals[id] = { isOpen: false, props: {} };
            return { modals: newModals };
        }),
}));

export default useModalStore;
