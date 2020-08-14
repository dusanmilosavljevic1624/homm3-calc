import Specialty from './Specialty';

export default class SpellSpecialty extends Specialty {
	constructor(slug, name, image, spellType, description) {
		super(slug, name, image, description, 'spell');
		this.spellType = spellType;
	}
}
