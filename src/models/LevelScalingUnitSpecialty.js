import UnitSpecialty from './UnitSpecialty';

export default class LevelScalingUnitSpecialty extends UnitSpecialty {
  constructor(slug, name, image, scalingStartLevel) {
    super(slug, name, image, 'level');
    this.scalingStartLevel = scalingStartLevel;
  }
}