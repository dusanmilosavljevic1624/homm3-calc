import UnitSpecialty from './UnitSpecialty';

export default class LevelScalingUnitSpecialty extends UnitSpecialty {
	constructor(
		slug,
		name,
		image,
		scalingStartLevel,
		description,
		affectedUnits
	) {
		super(slug, name, image, 'level', description, affectedUnits);
		this.scalingStartLevel = scalingStartLevel;
		this.affectedUnits = affectedUnits;
	}
}
