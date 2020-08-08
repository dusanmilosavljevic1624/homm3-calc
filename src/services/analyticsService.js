const { ga } = window;

export default {
	logEvent(eventCategory, eventLabel) {
		if (!ga) return;

		ga('send', 'event', eventCategory, eventLabel);
	},
};
