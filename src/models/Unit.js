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

	attackUnit(hero, unit, isRangedAttack) {
		const baseDamage = calculateBaseDamage(this.count, this.minDamage, this.maxDamage);
		console.log('base damage: ', baseDamage);
		const damageReductions = 1;

		const attackSkillBonus = calculateAttackSkillBonus(this.attack, unit.defense);
		const offenseBonus = calculateAttackModifierBonus(hero.skills.offense, hero.hasOffenseSpeciality, hero.level);
		console.log('offense bonus: ', offenseBonus);
		const archeryBonus = calculateAttackModifierBonus(hero.skills.archery, hero.hasArcherySpeciality, hero.level);
		console.log('archery bonus: ', archeryBonus);

		const attackModifierSpecialityBonus = isRangedAttack ? archeryBonus : offenseBonus;

		const damageBonuses = 1 + attackSkillBonus + attackModifierSpecialityBonus;

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

function calculateAttackSkillBonus(attackersAttack, defendersDefense) {
	const bonus =  0.05 * (attackersAttack - defendersDefense);

	if(bonus < 0) return 0;

	return bonus > 3 ? 3 : bonus;
}

function calculateAttackModifierBonus(modifierLevel, modifierSpeciality, heroLevel) {
	const levelBonus = modifierLevel * 0.1;
	const specialityBonus = modifierSpeciality ? 0.05 * heroLevel + 1 : 1;

	return modifierSpeciality ? levelBonus * specialityBonus : levelBonus;
}

function calculateSingleUnitDamage(minDamage, maxDamage) {
	return randomInRange(minDamage, maxDamage);
}