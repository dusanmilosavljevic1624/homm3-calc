import SPECIALITYS from '../data/heroUnitSpeciality';

class UnitSpecialityService {
  constructor() {
    this.specialitys = SPECIALITYS;
  }

  getSpecialitys() {
    return this.specialitys;
  }
}

export default new UnitSpecialityService();