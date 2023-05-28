import axios from "axios";
import { reactive, computed, ref } from "vue";

const state = reactive({
	items: [],
	pagination: {},
	initialized: false,
	loading: false,
	contextLoading: {},
	selected: null,
});

const url = ref<string>("");

export default function useMediaStore(config: object = {}) {
	console.log(config);

	const store = async (formData: FormData, config: object = {}) => {
        try {
            
            const response = await axios.post(url.value, formData, config);
            console.log(response);
        } catch (error) {
            throw error;
        }
	};

	const fetch = async (params: object = {}) => {
        state.loading = true;
		try {
			const response = await axios.get(url.value, { params });
            state.loading = false;
			if (response.data) {
				if (response.data["items"]) {
					state.items = response.data["items"];
				}

                if(response.data['pagination']){
                    state.pagination = response.data['pagination'];
                }
			}
		} catch (error) {
            state.loading = false;
			console.log(error);
		}
	};

	const fetchOnce = (params: object = {}) => {
		// console.log(state.initialized);
		if (!state.initialized) {
			fetch(params);
		}
	};

	return {
		collection: computed(() => state.items),
		state,
		store,
		fetch,
		fetchOnce,
		setUrl: (val: string) => (url.value = val),
	};
}
