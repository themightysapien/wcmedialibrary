import axios from "axios";
import { reactive, computed, ref } from "vue";
import { humanFileSize, extractErrorMessage } from "../helpers";
import useToasts from "./useToast";

const template = {
	items: [],
	pagination: {},
	initialized: false,
	loading: false,
	contextLoading: {},
	selected: [],
	active: null,
	multiple: false,
};

const mediaStore = reactive({
	default: { ...template },
});

export interface SelectedMedia {
	id: number|string;
	thumb_url: string;
	url: string;
	mime_type?: string;
	file_name?: string;
	size?: string|number;
	created_at?: string|number;
}

const url = ref<string>("");
// const key = ref<string>("default");

export default function useMediaStore(key = "default") {
	const state = mediaStore[key];
	// console.log(config);

	const store = async (formData: FormData, config: object = {}) => {
		const { success, error } = useToasts(key);
		try {
			const response = await axios.post(url.value, formData, config);
			// console.log(response);
			if (response.data) {
				success(response.data['message'] || "Uploaded");
				if (response.data["items"]) {
					state.initialized = true;
					let items = response.data["items"].map(readableSizeMap);
					state.items = items.concat(state.items);
					updateSelected(items);
				}
			}
			return response;
		} catch (er) {
			// console.log(er);
			error(extractErrorMessage(er));
			throw er;
		}
	};

	const updateSelected = (items: object[]) => {
		// console.log(key);
		if (state.multiple) {
			state.selected = items.map((item) => item["id"]).concat(state.selected);
			state.active = items[0]["id"];
		} else {
			state.selected = items[0]["id"];
			state.active = items[0]["id"];
		}
		// console.log(state);
	};

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
			// console.log(error);
		}
	};

	const fetchOnce = (params: object = {}) => {
		// console.log(state.initialized);
		if (!state.initialized) {
			fetch(params);
		}
	};

	const remove = async (id: number | string) => {
		const { success, error } = useToasts(key);
		try {
			const response = await axios.delete(`${url.value}/${id}`);
			if (response.data["success"]) {
				success(response.data['message'] || "Removed");
				let index = state.items.findIndex((item) => item.id == id);

				if (index >= 0) {
					state.items.splice(index, 1);
				}
			}
			return response;
		} catch (er) {
			error(extractErrorMessage(er));
			throw er;
		}
	};

	const toggleActive = (id) => {
		setTimeout(() => {
			if (state.active == id) {
				/* if its multiple(checkbox) and there are still items selected,
			 activate the last one in the selection */
				if (state.multiple && state.selected.length > 0) {
					state.active = state.selected[state.selected.length - 1];
					return;
				}

				/* if its single(radio) and user clicks the same item twice */
				if (state.selected == state.active) {
					return;
				}

				state.active = null;
				return;
			}

			/* activate only if the id is in or equal to selected */
			if (
				(state.multiple &&
					state.selected.findIndex((selected: number) => id == selected) >= 0) ||
				state.selected == id
			) {
				state.active = id;
			}
		}, 100);

		// console.log(state);
	};

	const activeItem = computed(() => {
		const state = mediaStore[key];

		if (state.active) {
			return state.items.find((item) => item.id == state.active);
		}

		return null;
	});

	const selectedItems = computed(() => {
		const state = mediaStore[key];
		let ids = state.selected instanceof Array ? state.selected : [state.selected];

		if (ids.filter((id) => id).length == 0) {
			return null;
		}

		return ids.map((id) => state.items.find((media) => media.id == id));
	});

	return {
		initStore: (fullurl: string, key: string, multiple: boolean) => {
			url.value = fullurl;
			if (!mediaStore[key]) {
				mediaStore[key] = { ...template };
			}
			mediaStore[key]["multiple"] = multiple;
			mediaStore[key]["selected"] = multiple ? [] : null;
		},
		state,
		store,
		fetch,
		fetchOnce,
		remove,
		toggleActive,
		activeItem,
		selectedItems,
	};
}
