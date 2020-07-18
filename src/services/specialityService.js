import unitSpecialitys from './unitSpecialityService';
import spellSpecialitys from './spellSpecialityService';
import skillSpecialtys from './skillSpecialityService';

export default {
	getSpecialitys() {
		return {
			...unitSpecialitys.getSpecialitys(),
			...spellSpecialitys.getSpecialitys(),
			...skillSpecialtys.getSpecialitys(),
		};
	},

	getSpeciality(specialitySlug) {
		return this.getSpecialitys()[specialitySlug.toUpperCase()];
	},
};
