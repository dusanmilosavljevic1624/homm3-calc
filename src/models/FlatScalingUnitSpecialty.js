import UnitSpecialty from './UnitSpecialty';

export default class FlatScalingUnitSpecialty extends UnitSpecialty {
	constructor(slug, name, image, scalingStats, description, affectedUnits) {
		super(slug, name, image, 'flat', description, affectedUnits);
		this.scalingStats = scalingStats;
	}
}
