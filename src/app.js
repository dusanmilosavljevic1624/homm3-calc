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
	townsView.init('towns', unitsView.showUnits.bind(unitsView));

	unitsView.showUnits(townsView.activeTown.units);
});
