import Specialty from './Specialty';

export default class SkillSpecialty extends Specialty {
	constructor(slug, name, image) {
		super(slug, name, image, 'skill');
	}
}
