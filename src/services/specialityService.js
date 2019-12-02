import unitSpecialitys from './unitSpecialityService';
import spellSpecialitys from './spellSpecialityService';
import skillSpecialtys from './skillSpecialityService';

class SpecialityService {
  constructor() {
    this.unitSpecialitys = unitSpecialitys.getSpecialitys();
    this.spellSpecialitys = spellSpecialitys.getSpecialitys();
    this.skillSpecialtys = skillSpecialtys.getSpecialitys();
  }

  getSpecialitys() {
    return {
      ...unitSpecialitys.getSpecialitys(),
      ...spellSpecialitys.getSpecialitys(),
      ...skillSpecialtys.getSpecialitys()
    };
  }

  getSpeciality(specialitySlug) {
    return this.getSpecialitys()[specialitySlug.toUpperCase()];
  }
}

export default new SpecialityService();