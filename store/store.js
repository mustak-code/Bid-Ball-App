import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const useStore = create(
    persist(
        (set) => ({
            user: {},
            currentPlayerSelected: "",
            setUser: (user) => set({ user: user }),
            setCurrectPlayerSelected: (id) =>
                set({ currentPlayerSelected: id }),
        }),
        {
            name: "user-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useStore;
