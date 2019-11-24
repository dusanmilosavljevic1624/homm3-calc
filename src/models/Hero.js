export default class Hero {
	constructor(name, attack, defense, level, speciality, skills) {
		this.name = name;
		this.attack = attack;
		this.defense = defense;
		this.level = level;
		this.speciality = speciality;
		this.skills = skills;
	}

	get hasOffenseSpeciality() {
		return this.speciality === 'offense';
	}

	get hasArcherySpeciality() {
		return this.speciality === 'archery';
	}

	get hasArmorerSpeciality() {
		return this.speciality === 'armorer';
	}
}