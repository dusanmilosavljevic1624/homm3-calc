import './styles/index.scss';

import Unit from './models/Unit';
import Hero from './models/Hero';

import UnitsView from './views/units';

document.addEventListener('DOMContentLoaded', () => {
	UnitsView.init('units');
});
