import TOWNS from '../data/towns';
import Unit from '../models/Unit';

class UnitService {
	constructor() {
		this.units = createUnitMap();
		this.townUnits = createTownMap();
	}

	getUnit(unitSlug) {
		return this.units[unitSlug];
	}

	getTownUnits(townSlug) {
		return this.townUnits[townSlug];
	}
}

function createTownMap() {
	return Object.keys(TOWNS).reduce((acc, townKey) => {
		const { units } = TOWNS[townKey];

		Object.keys(units).forEach((unitKey) => {
			acc[townKey] = acc[townKey] || [];
			acc[townKey][unitKey] = new Unit(units[unitKey]);
		});

		return acc;
	}, {});
}

function createUnitMap() {
	return Object.keys(TOWNS).reduce((acc, townKey) => {
		Object.keys(TOWNS[townKey].units).forEach((unitKey) => {
			const unit = new Unit(TOWNS[townKey].units[unitKey]);

			acc[unit.slug] = unit;
		});

		return acc;
	}, {});
}

export default new UnitService();
