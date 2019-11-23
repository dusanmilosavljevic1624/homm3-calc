import randomInRange from '../helpers/randomInRange';

export default class Unit {
	constructor(count = 1, attack = 0, defense = 0, minDamage = 0, maxDamage = 0, isRanged = false) {
		this.count = count;
		this.attack = attack;
		this.defense = defense;
		this.minDamage = minDamage;
		this.maxDamage = maxDamage;
	}

	attackUnit(unit) {
		const baseDamage = calculateBaseDamage(this.count, this.minDamage, this.maxDamage);
		console.log('base damage: ', baseDamage);
		const damageBonuses = calculateDamageBonuses(this.attack, unit.defense);
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

function calculateDamageBonuses(attackersAttack, defendersDefense) {
	const attackSkillBonus = calculateAttackSkillBonus(attackersAttack, defendersDefense);

	console.log('attack skill bonus: ', attackSkillBonus);
	return 1 + attackSkillBonus;
}

function calculateAttackSkillBonus(attackersAttack, defendersDefense) {
	const bonus =  0.05 * (attackersAttack - defendersDefense);

	if(bonus < 0) return 0;

	return bonus > 3 ? 3 : bonus;
}

function calculateSingleUnitDamage(minDamage, maxDamage) {
	return randomInRange(minDamage, maxDamage);
}