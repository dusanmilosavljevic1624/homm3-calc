import Specialty from './Specialty';

export default class SkillSpecialty extends Specialty {
	constructor(slug, name, image, description) {
		super(slug, name, image, description, 'skill');
	}
}
