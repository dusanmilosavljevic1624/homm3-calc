/* eslint-disable-next-line arrow-body-style */
export default (min, max) => {
	return (
		Math.floor(Math.random() * (max - Math.ceil(min) + 1)) + Math.ceil(min)
	);
};
