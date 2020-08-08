const { gtag } = window;

export default {
	logEvent(eventCategory, eventLabel) {
		if (!gtag) return;

		gtag('event', eventLabel, {
			event_category: eventCategory,
		});
	},
};
