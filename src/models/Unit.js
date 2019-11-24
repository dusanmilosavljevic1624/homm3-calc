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

	attackUnit(attacker, defender, unit, isRangedAttack) {
		const baseDamage = calculateBaseDamage(this.count, this.minDamage, this.maxDamage);
		console.log('base damage: ', baseDamage);
		console.log('attacker: ', attacker);
		console.log('defender: ', defender);


		const attackSkillBonus = calculateAttackSkillBonus(this.attack, unit.defense);
		const offenseBonus = calculateDamageModifierBonus(attacker.skills.offense, attacker.hasOffenseSpeciality, attacker.level);
		console.log('offense bonus: ', offenseBonus);
		const archeryBonus = calculateDamageModifierBonus(attacker.skills.archery, attacker.hasArcherySpeciality, attacker.level);
		console.log('archery bonus: ', archeryBonus);
		const attackModifierBonus = isRangedAttack ? archeryBonus : offenseBonus;

		const damageBonuses = 1 + attackSkillBonus + attackModifierBonus;

		const defenseSkillReduction = calculateDefenseSkillReduction(this.attack, unit.defense);
		console.log('defense skill reduction: ', defenseSkillReduction);
		const defenseModifierReduction = calculateDefenseModifierReduction(defender.skills.armorer, defender.hasArmorerSpeciality, defender.level);
		console.log('defense modifier reduction: ', defenseModifierReduction);

		const damageReductions = 1 - defenseSkillReduction - defenseModifierReduction;

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

function calculateDamageModifierBonus(modifierLevel = 0, modifierSpeciality, heroLevel) {
	const levelBonus = modifierLevel * 0.1;
	const specialityBonus = modifierSpeciality ? 0.05 * heroLevel + 1 : 1;

	return modifierSpeciality ? levelBonus * specialityBonus : levelBonus;
}

function calculateDefenseModifierReduction(modifierLevel = 0, modifierSpeciality, heroLevel) {
	const levelBonus = modifierLevel * 0.05;
	const specialityBonus = modifierSpeciality ? 0.05 * heroLevel + 1 : 0;

	return modifierSpeciality ? levelBonus * specialityBonus : levelBonus;
}

function calculateDefenseSkillReduction(attackSkill, defenseSkill) {
	const reduction = 0.025 * (defenseSkill - attackSkill);

	if(reduction > 0.7) return 0.7;

	return reduction < 0 ? 0 : reduction; 
}

function calculateSingleUnitDamage(minDamage, maxDamage) {
	return randomInRange(minDamage, maxDamage);
}