import Specialty from './Specialty';

export default class UnitSpecialty extends Specialty {
  constructor(slug, name, image, scalingType, affectedUnits) {
    super(slug, name, image, 'unit');
    this.scalingType = scalingType;
    this.affectedUnits = affectedUnits;
  }

  affectsUnit(unitSlug) {
    return this.affectedUnits.indexOf(unitSlug.toLowerCase()) !== -1;
  }
}
