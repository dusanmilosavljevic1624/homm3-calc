import SkillSpecialty from '../models/Specialty';

export default {
	OFFENSE: new SkillSpecialty(
		'offense',
		'Offense',
		'Basic_Offense.png',
		'Receives a 5% per level bonus to Offense skill percentage.'
	),
	ARMORER: new SkillSpecialty(
		'armorer',
		'Armorer',
		'Basic_Armorer.png',
		'Receives a 5% per level bonus to Armorer skill percentage.'
	),
	ARCHERY: new SkillSpecialty(
		'archery',
		'Archery',
		'Basic_Archery.png',
		'Receives a 5% per level bonus to Archery skill percentage.'
	),
};
