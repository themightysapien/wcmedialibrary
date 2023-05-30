import { reactive } from "vue";

interface Toast {
	message: string;
	type: string;
  active: boolean;
}
const toastStore = reactive<{ [key: string]: Toast[] }>({
	default: [],
});

export default function useToasts(key = "default", timer = 5000) {
	const state = toastStore[key];
	// const state = reactive({
	//   status: val,
	//   contextStatus: {}
	// })

	const success = (message: string) => {
		state.push({
			message,
			type: "success",
      active: false
		});
		clear(state.length - 1);
	};
	const error = (message: string) => {
		state.push({
			message,
			type: "error",
      active: false
		});
		clear(state.length - 1);
	};

	const clear = (index: number) => {
    setTimeout(() => {
      state[index].active = true
    }, 500);
		setTimeout(() => {
			state.splice(index, 1);
		}, timer);
	};



	return {
		initStore: (key: string) => {
			if (!toastStore[key]) {
				toastStore[key] = [];
			}
		},
    state,
		success,
    error
	};
}
