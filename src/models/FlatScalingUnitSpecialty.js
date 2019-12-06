import UnitSpecialty from '../models/UnitSpecialty';

export default class FlatScalingUnitSpecialty extends UnitSpecialty {
  constructor(slug, name, image, scalingStats) {
    super(slug, name, image, 'flat');
    this.scalingStats = scalingStats;
  }
}