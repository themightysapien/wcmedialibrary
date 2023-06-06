import axios from "axios";
import { reactive, computed, ref } from "vue";
import {
	humanFileSize,
	extractErrorMessage,
	sortByKeyDesc,
	sortByKey,
} from "../helpers";
import useToasts from "./useToast";

const list = reactive({
	items: [],
	pagination: {},
	initialized: false,
});

const template = {
	// items: [],
	// pagination: {},
	loading: false,
	contextLoading: {},
	selected: [],
	active: null,
	multiple: false,
	filter: {
		keyword: "",
		sort: "latest",
		files: 0,
	},
};

const mediaStore = reactive({
	default: { ...template },
});

export interface SelectedMedia {
	id: number | string;
	thumb_url: string;
	url: string;
	mime_type?: string;
	file_name?: string;
	created_at?: string | number;
	size?: string | number;
	size_readable?: string;
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
				success(response.data["message"] || "Uploaded");
				if (response.data["items"]) {
					list.initialized = true;
					let items = response.data["items"].map(readableSizeMap);
					list.items = items.concat(list.items);
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
					list.initialized = true;
					list.items = response.data["items"].map(readableSizeMap);
				}

				if (response.data["pagination"]) {
					list.pagination = response.data["pagination"];
				}
			}
		} catch (error) {
			state.loading = false;
			list.initialized = false;
			// console.log(error);
		}
	};

	const fetchOnce = (params: object = {}) => {
		// console.log(list.initialized);
		if (!list.initialized) {
			fetch(params);
		}
	};

	const remove = async (id: number | string) => {
		const { success, error } = useToasts(key);
		try {
			const response = await axios.delete(`${url.value}/${id}`);
			if (response.data["success"]) {
				success(response.data["message"] || "Removed");
				let index = list.items.findIndex((item) => item.id == id);

				if (index >= 0) {
					list.items.splice(index, 1);
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
			return list.items.find((item) => item.id == state.active);
		}

		return null;
	});

	const selectedItems = computed(() => {
		const state = mediaStore[key];
		let ids = state.selected instanceof Array ? state.selected : [state.selected];

		if (ids.filter((id) => id).length == 0) {
			return null;
		}

		return ids
			.map((id) => list.items.find((media) => media.id == id))
			.filter((item) => item)
			.map((item) => {
				const { id, thumb_url, url, file_name, mime_type, size, size_readable } =
					item;

				return {
					id,
					thumb_url,
					url,
					file_name,
					mime_type,
					size,
					size_readable,
				} as SelectedMedia;
			});
	});

	const filterItems = (item: any) => {
		if (!state.filter.keyword) {
			return item;
		}

		let keyword = state.filter.keyword.toString().toLowerCase();

		return (
			item.file_name.toString().toLowerCase().includes(keyword) ||
			item.mime_type.toString().toLowerCase().includes(keyword)
		);
	};

	const fileTypeFilter = (item: any) => {
		if (state.filter.files) {
			return item;
		}

		return item.mime_type.indexOf("image") >= 0;
	};

	const items = computed(() => {
		// const state = mediaStore[key];

		let items = list.items;
		switch (state.filter.sort) {
			case "oldest":
				items = sortByKey(items, "created_at");
				break;

			case "alphabetical":
				items = sortByKey(items, "file_name");
				break;

			default:
				items = sortByKeyDesc(items, "created_at");
		}

		return items
			.filter(fileTypeFilter)
			.filter(filterItems)
			.slice(0, state.filter.limit);
	});

	const resetFilter = () => {
		state.filter = {
			keyword: "",
			sort: "latest",
		};
	};

	const initSelected = (items: number[]) => {
		state.selected = state.multiple ? items: items[0];
	};

	return {
		initStore: (config: {
			url: string;
			key: string;
			multiple: boolean;
			allowFiles: boolean | number;
			limit: number;
		}) => {
			// console.log(config);
			url.value = config.url;
			if (!mediaStore[key]) {
				mediaStore[key] = JSON.parse(JSON.stringify(template));
			}
			const state = mediaStore[key];
			state["multiple"] = config.multiple;
			state["selected"] = config.multiple ? [] : null;
			state["filter"]["files"] = Number(config.allowFiles);
			state["filter"]["limit"] = Number(config.limit);

			// console.log(mediaStore);
		},
		initSelected,
		state,
		list,
		items,
		store,
		fetch,
		fetchOnce,
		remove,
		toggleActive,
		activeItem,
		selectedItems,
		resetFilter,
	};
}
