import tippy from 'tippy.js';

import './styles/index.scss';

import UnitsView from './views/units';
import TownsView from './views/towns';
import DamageCalculatorView from './views/damageCalculator';

import unitService from './services/unitService';

document.addEventListener('DOMContentLoaded', () => {
	const unitsView = new UnitsView();
	const townsView = new TownsView();
	const damageCalculatorView = new DamageCalculatorView();

	init();
	tippy('.tooltip-btn');

	const versionSwitchers = document.querySelectorAll('#version-switches img');

	/* eslint-disable-next-line no-restricted-syntax */
	for (const switcher of versionSwitchers) {
		switcher.addEventListener('click', (event) => {
			unitService.gameVersion = event.target.dataset.version;
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
