import axios from "axios";
import { reactive, computed, ref } from "vue";
import { humanFileSize } from "../helpers";

const state = reactive({
	items: [],
	pagination: {},
	initialized: false,
	loading: false,
	contextLoading: {},
	selected: [],
	active: null,
});

const url = ref<string>("");

export default function useMediaStore(config: object = {}) {
	// console.log(config);

	const store = async (formData: FormData, config: object = {}) => {
		try {
			const response = await axios.post(url.value, formData, config);
			// console.log(response);
			if (response.data) {
				if (response.data["items"]) {
					state.initialized = true;
					let items = response.data["items"].map(readableSizeMap);
					state.items = items.concat(state.items);
					updateSelected(items);
				}
			}
		} catch (error) {
			throw error;
		}
	};

    const updateSelected = (items) => {
        if (items.length > 1) {
            state.selected = items.map((item) => item.id);
            state.active = state.selected[0]['id'];
        } else {
            state.selected = items[0]["id"];
            state.active = items[0]["id"];
        }
    }

	const readableSizeMap = (item) => {
		item["size_readable"] = humanFileSize(item["size"]);
		return item;
	};

	const fetch = async (params: object = {}) => {
		state.loading = true;
		try {
			const response = await axios.get(url.value, { params });
			state.loading = false;
			if (response.data) {
				if (response.data["items"]) {
					state.initialized = true;
					state.items = response.data["items"].map(readableSizeMap);
				}

				if (response.data["pagination"]) {
					state.pagination = response.data["pagination"];
				}
			}
		} catch (error) {
			state.loading = false;
			state.initialized = false;
			console.log(error);
		}
	};

	const fetchOnce = (params: object = {}) => {
		// console.log(state.initialized);
		if (!state.initialized) {
			fetch(params);
		}
	};

	const activate = (id) => {
		if (state.active == id) {
			state.active = null;
			return;
		}

		state.active = id;
	};

	return {
		collection: computed(() => state.items),
		state,
		store,
		fetch,
		fetchOnce,
		setUrl: (val: string) => (url.value = val),
		activate,
		activeItem: computed(() => {
			if (state.active) {
				return state.items.find((item) => item.id == state.active);
			}

			return null;
		}),
		selectedItems: computed(() => {
			let ids =
				state.selected instanceof Array ? state.selected : [state.selected];

			if (ids.filter((id) => id).length == 0) {
				return null;
			}

			return ids.map((id) => state.items.find((media) => media.id == id));
		}),
	};
}
