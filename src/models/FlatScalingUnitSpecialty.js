import UnitSpecialty from './UnitSpecialty';

export default class FlatScalingUnitSpecialty extends UnitSpecialty {
  constructor(slug, name, image, scalingStats, affectedUnits) {
    super(slug, name, image, 'flat', affectedUnits);
    this.scalingStats = scalingStats;
  }
}
