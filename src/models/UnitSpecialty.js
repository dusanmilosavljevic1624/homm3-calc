import Specialty from './Specialty';

export default class UnitSpecialty extends Specialty {
  constructor(slug, name, image, scalingType) {
    super(slug, name, image, 'unit');
    this.scalingType = scalingType;
  }
}