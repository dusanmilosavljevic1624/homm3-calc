import SOD_TOWNS from '../data/shadow_of_death/towns';
import HOTA_TOWNS from '../data/horn_of_the_abyss/towns';

import Unit from '../models/Unit';

class UnitService {
	constructor() {
		this.gameVersion = 'SOD';
		this.units = createUnitMap();
		this.townUnits = createTownMap();
	}

	getUnit(unitSlug) {
		return this.units[this.gameVersion][unitSlug];
	}

	getTownUnits(townSlug) {
		return this.townUnits[this.gameVersion][townSlug];
	}

	getTowns() {
		const versionMap = {
			SOD: SOD_TOWNS,
			HOTA: HOTA_TOWNS,
		};

		return versionMap[this.gameVersion];
	}
}

function createTownMap() {
	const sodTowns = Object.keys(SOD_TOWNS).reduce((acc, townKey) => {
		const { units } = SOD_TOWNS[townKey];

		Object.keys(units).forEach((unitKey) => {
			acc[townKey] = acc[townKey] || [];
			acc[townKey][unitKey] = new Unit(units[unitKey]);
		});

		return acc;
	}, {});

	const hotaTowns = Object.keys(HOTA_TOWNS).reduce((acc, townKey) => {
		const { units } = HOTA_TOWNS[townKey];

		Object.keys(units).forEach((unitKey) => {
			acc[townKey] = acc[townKey] || [];
			acc[townKey][unitKey] = new Unit(units[unitKey]);
		});

		return acc;
	}, {});

	return {
		SOD: sodTowns,
		HOTA: hotaTowns,
	};
}

function createUnitMap() {
	const sodUnits = Object.keys(SOD_TOWNS).reduce((acc, townKey) => {
		Object.keys(SOD_TOWNS[townKey].units).forEach((unitKey) => {
			const unit = new Unit(SOD_TOWNS[townKey].units[unitKey]);

			acc[unit.slug] = unit;
		});

		return acc;
	}, {});

	const hotaUnits = Object.keys(HOTA_TOWNS).reduce((acc, townKey) => {
		Object.keys(HOTA_TOWNS[townKey].units).forEach((unitKey) => {
			const unit = new Unit(HOTA_TOWNS[townKey].units[unitKey]);

			acc[unit.slug] = unit;
		});

		return acc;
	}, {});

	return {
		SOD: sodUnits,
		HOTA: hotaUnits,
	};
}

export default new UnitService();
