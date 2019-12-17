import UnitSpecialty from './UnitSpecialty';

export default class LevelScalingUnitSpecialty extends UnitSpecialty {
  constructor(slug, name, image, scalingStartLevel, affectedUnits) {
    super(slug, name, image, 'level', affectedUnits);
    this.scalingStartLevel = scalingStartLevel;
    this.affectedUnits = affectedUnits;
  }
}
