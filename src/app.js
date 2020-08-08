import tippy from 'tippy.js';
import introJs from 'intro.js';

import './styles/index.scss';

import UnitsView from './views/units';
import TownsView from './views/towns';
import DamageCalculatorView from './views/damageCalculator';

import unitService from './services/unitService';
import analyticsService from './services/analyticsService';

document.addEventListener('DOMContentLoaded', () => {
	const unitsView = new UnitsView();
	const townsView = new TownsView();
	const damageCalculatorView = new DamageCalculatorView();

	init();
	tippy('.tooltip-btn');

	const welcomeModal = document.getElementById('welcome-modal');
	const startTutorialButton = document.getElementById('start-tutorial-btn');
	const declineTutorialButton = document.getElementById('decline-tutorial-btn');

	startTutorialButton.addEventListener('click', () => {
		welcomeModal.classList.remove('shown');
		showIntro();
	});

	declineTutorialButton.addEventListener('click', () => {
		welcomeModal.classList.remove('shown');

		analyticsService.logEvent('Tutorial', 'declined');

		if (!window.localStorage) return;

		window.localStorage.setItem('tutorial-declined', true);
	});

	setTimeout(() => {
		if (shouldShowWelcome()) {
			welcomeModal.classList.add('shown');
		}
	}, 5000);

	const versionSwitchers = document.querySelectorAll(
		'#version-switches .tooltip-btn'
	);

	/* eslint-disable-next-line no-restricted-syntax */
	for (const switcher of versionSwitchers) {
		switcher.addEventListener('click', () => {
			const switchers = document.querySelectorAll(
				'#version-switches .tooltip-btn'
			);

			/* eslint-disable-next-line no-restricted-syntax */
			for (const switcherImg of switchers) {
				switcherImg.classList.remove('selected');
			}

			switcher.classList.add('selected');
			unitService.gameVersion = switcher.dataset.version;
			init();
		});
	}

	function init() {
		unitsView.init('units');
		damageCalculatorView.init('damage-calculator');
		unitsView.onUnitSelected = damageCalculatorView.selectUnit.bind(
			damageCalculatorView
		);

		townsView.init('towns', unitsView.showUnits.bind(unitsView));
	}
});

function shouldShowWelcome() {
	const { localStorage } = window;
	if (!localStorage) return;

	const tutorialDeclined = localStorage.getItem('tutorial-declined');
	const tutorialShown = localStorage.getItem('tutorial-shown');

	/* eslint-disable-next-line consistent-return */
	return tutorialDeclined !== 'true' && tutorialShown !== 'true';
}

function showIntro() {
	analyticsService.logEvent('Tutorial', 'shown');

	const intro = introJs();
	intro.setOptions({
		showStepNumbers: false,
		showProgress: true,
		hidePrev: 'yes',
		hideNext: true,
	});

	intro.addStep({
		element: document.getElementById('towns'),
		intro: 'First, select a town from the town list.',
		position: 'right',
	});

	intro.addStep({
		element: document.getElementById('units-container'),
		intro: 'Then hover over a unit to set it as attacker or defender.',
		position: 'right',
	});

	intro.addStep({
		element: document.getElementById('attacker-hero'),
		intro:
			'This is your hero screen, you can set your hero stats, specialty & skills here.',
		position: 'bottom',
	});

	intro.addStep({
		element: document.querySelector('#attacker .content'),
		intro: 'See how your heroes stats & skills affect your unit.',
		position: 'left',
	});

	intro.addStep({
		element: document.querySelector('#attacker .spells'),
		intro: 'Here you can activate & deactivate spells on your unit.',
		position: 'left',
	});

	intro.addStep({
		element: document.getElementById('results'),
		intro:
			'This table will show how much damage your unit will dish out and how many of the defending units will die.',
		position: 'left',
	});

	intro.oncomplete(() => {
		analyticsService.logEvent('Tutorial', 'completed');

		if (window.localStorage) {
			window.localStorage.setItem('tutorial-shown', true);
		}
	});

	intro.start();
}
