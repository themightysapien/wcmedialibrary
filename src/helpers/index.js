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

export function extractErrorMessage(axiosError) {
	let message = axiosError.message;

	if (
		axiosError.response &&
		axiosError.response.data &&
		axiosError.response.data.message
	) {
		message = axiosError.response.data.message;
	}

	return message;
}
export function debounce(func, timeout = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}


export function sortByKey(array, key) {
	// return array;
	return array.sort(function (a, b) {
	  var x = a[key];
	  var y = b[key];
  
	  // if(!x){
	  //     return -1;
	  // }
  
	  if (typeof x == "string") {
		x = ("" + x).toLowerCase();
	  }
	  if (typeof y == "string") {
		y = ("" + y).toLowerCase();
	  }
  
	  return x < y ? -1 : x > y ? 1 : 0;
	});
  }
  
  export function sortByKeyDesc(array, key) {
	return array.sort(function (a, b) {
	  var x = a[key];
	  var y = b[key];
  
	  // if(!x){
	  //     return 1;
	  // }
  
	  if (typeof x == "string") {
		x = ("" + x).toLowerCase();
	  }
	  if (typeof y == "string") {
		y = ("" + y).toLowerCase();
	  }
  
	  return x < y ? 1 : x > y ? -1 : 0;
	});
  }