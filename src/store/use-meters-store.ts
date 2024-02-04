import { Meter } from '@/types/meters';
import { create } from 'zustand';

type MetersStore = {
	state: {
		currentMeter: Meter | null;
	};
	actions: {
		setCurrentMeter: (currentMeter: Meter | null) => void;
	};
};

export const useMetersStore = create<MetersStore>()((set) => ({
	state: {
		currentMeter: null,
	},
	actions: {
		setCurrentMeter(currentMeter: Meter | null) {
			return set((state) => ({
				...state,
				state: { ...state.state, currentMeter },
			}));
		},
	},
}));
