export function humanFileSize(size) {
	if (size == 0) {
		return 0;
	}
    
	var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	return (
		(size / Math.pow(1024, i)).toFixed(2) * 1 +
		" " +
		["B", "kB", "MB", "GB", "TB"][i]
	);
}

export function extractErrorMessage(axiosError){
	let message = axiosError.message;

	if(axiosError.response && axiosError.response.data && axiosError.response.data.message){
		message = axiosError.response.data.message;
	}

	return message;
}