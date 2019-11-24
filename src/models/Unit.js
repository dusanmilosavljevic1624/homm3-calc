import randomInRange from '../helpers/randomInRange';

export default class Unit {
	constructor(count, attack, defense, minDamage, maxDamage, isRanged) {
		this.count = count || 1;
		this.attack = attack || 0;
		this.defense = defense || 0;
		this.minDamage = minDamage || 0;
		this.maxDamage = maxDamage || 0;
		this.isRanged = isRanged || false;
	}

	attackUnit(hero, unit) {
		const baseDamage = calculateBaseDamage(this.count, this.minDamage, this.maxDamage);
		console.log('base damage: ', baseDamage);
		const damageBonuses = calculateDamageBonuses(this.attack, unit.defense, hero.skills.offense, hero.hasOffenseSpeciality, hero.level);
		console.log('damage bonuses: ', damageBonuses);
		const damageReductions = 1;

		console.log('total damage: ', baseDamage * damageBonuses * damageReductions);
		return baseDamage * damageBonuses * damageReductions;
	}
}

function calculateBaseDamage(unitCount, minDamage, maxDamage) {
	let totalDamage = 0;
	let counter = unitCount > 10 ? 10 : unitCount;

	for(let i = 0; i < counter; i++) {
		totalDamage += calculateSingleUnitDamage(minDamage, maxDamage);
	}

	return unitCount >= 10 ? Math.floor(totalDamage * (unitCount / 10)) : totalDamage;
}

function calculateDamageBonuses(attackersAttack, defendersDefense, offenseLevel, hasOffenseSpeciality, heroLevel) {
	const attackSkillBonus = calculateAttackSkillBonus(attackersAttack, defendersDefense);
	const offenseBonus = calculateOffenseBonus(offenseLevel, hasOffenseSpeciality, heroLevel);

	console.log('attack skill bonus: ', attackSkillBonus + offenseBonus);
	return 1 + attackSkillBonus + offenseBonus;
}

function calculateAttackSkillBonus(attackersAttack, defendersDefense) {
	const bonus =  0.05 * (attackersAttack - defendersDefense);

	if(bonus < 0) return 0;

	return bonus > 3 ? 3 : bonus;
}

function calculateOffenseBonus(offenseLevel = 0, offenseSpeciality = false, heroLevel = 1) {
	const levelBonus = offenseLevel * 0.1;
	const specialityBonus = offenseSpeciality ? 0.05 * heroLevel + 1 : 1;

	console.log('offense bonus: ', offenseSpeciality ? levelBonus * specialityBonus : levelBonus);
	return offenseSpeciality ? levelBonus * specialityBonus : levelBonus;
}

function calculateSingleUnitDamage(minDamage, maxDamage) {
	return randomInRange(minDamage, maxDamage);
}