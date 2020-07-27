import SOD_TOWNS from '../data/shadow_of_death/towns';
import HOTA_TOWNS from '../data/horn_of_the_abyss/towns';

import Unit from '../models/Unit';

class UnitService {
	constructor() {
		this.gameVersion = 'HOTA';
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

	get allDragonUnits() {
		return [
			this.getUnit('GREEN_DRAGON'),
			this.getUnit('GOLD_DRAGON'),
			this.getUnit('BONE_DRAGON'),
			this.getUnit('GHOST_DRAGON'),
			this.getUnit('RED_DRAGON'),
			this.getUnit('BLACK_DRAGON'),
			this.getUnit('FAERIE_DRAGON'),
			this.getUnit('RUST_DRAGON'),
			this.getUnit('AZURE_DRAGON'),
			this.getUnit('CRYSTAL_DRAGON'),
		];
	}

	get allBehemothUnits() {
		return [this.getUnit('BEHEMOTH'), this.getUnit('ANCIENT_BEHEMOTH')];
	}

	get allHydraUnits() {
		return [this.getUnit('HYDRA'), this.getUnit('CHAOS_HYDRA')];
	}

	get allPhoenixUnits() {
		return [this.getUnit('FIREBIRD'), this.getUnit('PHOENIX')];
	}

	get allHaspidUnits() {
		return this.gameVersion === 'HOTA'
			? [this.getUnit('SEA_SERPENT'), this.getUnit('HASPID')]
			: [];
	}

	get allDevilUnits() {
		return [this.getUnit('DEVIL'), this.getUnit('ARCH_DEVIL')];
	}

	get allAngelUnits() {
		return [this.getUnit('ANGEL'), this.getUnit('ARCHANGEL')];
	}

	get allGiantUnits() {
		return [this.getUnit('GIANT'), this.getUnit('TITAN')];
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
