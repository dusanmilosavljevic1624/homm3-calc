import './styles/index.scss';

import UnitsView from './views/units';
import TownsView from './views/towns';

document.addEventListener('DOMContentLoaded', () => {
	const unitsView = new UnitsView();
	const townsView = new TownsView();

	unitsView.init('units');
	townsView.init('towns', unitsView.showUnits.bind(unitsView));

	unitsView.showUnits(townsView.activeTown.units);
});
