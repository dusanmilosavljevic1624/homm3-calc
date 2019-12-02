import SPECIALITYS from '../data/heroSkillSpeciality';

class SkillSpecialtyService {
  constructor() {
    this.specialitys = SPECIALITYS;
  }

  getSpecialitys() {
    return this.specialitys;
  }
}

export default new SkillSpecialtyService();