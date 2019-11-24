export default class Hero {
	constructor(attack, defense, level, speciality, skills) {
		this.attack = attack;
		this.defense = defense;
		this.level = level;
		this.specialty = speciality;
		this.skills = skills;
	}

	get hasOffenseSpeciality() {
		return this.specialty === 'offense';
	}

	get hasArcherySpeciality() {
		return this.specialty === 'archery';
	}
}