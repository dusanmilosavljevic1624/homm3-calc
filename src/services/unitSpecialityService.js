import SPECIALITYS from '../data/heroUnitSpeciality';

class UnitSpecialityService {
  constructor() {
    this.specialitys = SPECIALITYS;
    this.specialtysByUnit = mapSpecialtysByUnit(this.specialitys);
  }

  getSpecialitys() {
    return this.specialitys;
  }
}

function mapSpecialtysByUnit(specialtys) {
  return Object.keys(specialtys).reduce((acc, specialtyKey) => {
    specialtys[specialtyKey].affectedUnits.forEach(unit => {
      acc[unit] = specialtys[specialtyKey];
    });

    return acc;
  }, { });
}

export default new UnitSpecialityService();