import SPECIALITYS from '../data/heroSpellSpeciality';

class SpellSpecialityService {
	constructor() {
		this.specialitys = SPECIALITYS;
		this.specialitysByType = mapSpecialitysByType(this.specialitys);
	}

	getSpecialitys() {
		return this.specialitys;
	}

	getSpecialitysByType(type) {
		return this.specialitysByType[type];
	}
}

function mapSpecialitysByType(specialitys) {
	return Object.keys(specialitys).reduce((acc, specialityKey) => {
		const spell = specialitys[specialityKey];

		acc[spell.type] = acc[spell.type] || {};
		acc[spell.type][specialityKey] = spell;

		return acc;
	}, {});
}

export default new SpellSpecialityService();
