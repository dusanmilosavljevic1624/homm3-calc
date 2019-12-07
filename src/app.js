import tippy from 'tippy.js';

import './styles/index.scss';

import UnitsView from './views/units';
import TownsView from './views/towns';
import DamageCalculatorView from './views/damageCalculator';

document.addEventListener('DOMContentLoaded', () => {
	const unitsView = new UnitsView();
	const townsView = new TownsView();
	const damageCalculatorView = new DamageCalculatorView(); 

	unitsView.init('units');
	damageCalculatorView.init('damage-calculator');
	unitsView.onUnitSelected = damageCalculatorView.selectUnit.bind(damageCalculatorView);

	townsView.init('towns', unitsView.showUnits.bind(unitsView));
});
