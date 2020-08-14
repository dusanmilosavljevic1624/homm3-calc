import Specialty from './Specialty';

export default class UnitSpecialty extends Specialty {
	constructor(slug, name, image, scalingType, description, affectedUnits) {
		super(slug, name, image, description, 'unit');
		this.scalingType = scalingType;
		this.affectedUnits = affectedUnits;
	}

	affectsUnit(unitSlug) {
		return this.affectedUnits.indexOf(unitSlug.toLowerCase()) !== -1;
	}
}
