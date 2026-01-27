export const sleep = (seconds: number) => {
	return new Promise((res) => {
		setTimeout(() => {
			res(true);
		}, seconds * 1000);
	});
};
