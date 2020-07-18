export default class Hero {
	constructor(name, attack, defense, level, speciality, skills) {
		this.name = name;
		this.attack = attack;
		this.defense = defense;
		this.level = level;
		this.speciality = speciality;
		this.skills = skills;
	}

	get offenseBonus() {
		if (!this.skills.offense) return 0;

		return this.skills.offense * 0.1;
	}

	get offenseSpecialityBonus() {
		if (this.hasOffenseSpeciality) return 0.05 * this.offenseBonus * this.level;

		return 0;
	}

	get archeryBonus() {
		if (!this.skills.archery) return 0;

		const archeryIncreaseMap = {
			1: 0.1,
			2: 0.25,
			3: 0.5,
		};

		return archeryIncreaseMap[this.skills.archery];
	}

	get archerySpecialtyBonus() {
		if (this.hasArcherySpeciality) return 0.05 * this.archeryBonus * this.level;

		return 0;
	}

	get armorerBonus() {
		if (!this.skills.armorer) return 0;

		return this.skills.armorer * 0.05;
	}

	get armorerSpecialityBonus() {
		if (this.hasArmorerSpeciality) return 0.05 * this.armorerBonus * this.level;

		return 0;
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

	get hasBlessSpeciality() {
		return this.speciality === 'bless';
	}
}
