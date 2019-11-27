import randomInRange from '../helpers/randomInRange';
import logAttack from '../helpers/logAttack';

export default class Unit {
	constructor({name, count, level, attack, defense, minDamage, maxDamage, health, speed, growth, aiValue, cost, isRanged, spells}) {
		this.name = name;
		this.count = count || 1;
		this.level = level || 1;
		this.attack = attack || 0;
		this.defense = defense || 0;
		this.minDamage = minDamage || 0;
		this.maxDamage = maxDamage || 0;
		this.health = health || 1;
		this.speed = speed || 1;
		this.growth = growth || 1;
		this.aiValue = aiValue || 1;
		this.cost = cost || 1;
		this.isRanged = isRanged || false;
		this.spells = spells || {};
	}

	get minTotalDamage() {
		if(this.spells.bless) return this.spellDamageBonus + this.maxDamage;

		return this.spellDamageBonus + this.minDamage;
	}

	get maxTotalDamage() {
		return this.spellDamageBonus + this.maxDamage;
	}

	get image() {
		return `./img/castle/${this.name.replace(' ', '_')}.gif`;
	}

	get slug() {
		return this.name.replace(' ', '_').toUpperCase();
	}

	get totalAttackSkill() {
		return this.spellAttackBonus + this.attack;
	}

	get totalDefenseSkill() {
		return this.spellDefenseBonus + this.defense;
	}

	get spellDamageBonus() {
		if(this.spells.bless) {
			return 1;
		} else {
			return 0;
		}
	}

	get spellAttackBonus() {
		if(this.isRanged) {
			return this.spells.precision ? 6 : 0;
		}

		return this.spells.bloodlust ? 6 : 0;
	}

	get spellDefenseBonus() {
		if(this.spells.stoneskin) return 6;
		return 0;
	}

	attackUnit(attacker, defender, unit, isRangedAttack) {
		const baseDamage = calculateBaseDamage(this.count, this.minDamage, this.maxDamage, this.spells.bless);

		const attackSkillBonus = calculateAttackSkillBonus(attacker.attack, this.totalAttackSkill, defender.defense, unit.totalDefenseSkill);
		const offenseBonus = calculateDamageModifierBonus(attacker.skills.offense, attacker.hasOffenseSpeciality, attacker.level);
		const archeryBonus = calculateDamageModifierBonus(attacker.skills.archery, attacker.hasArcherySpeciality, attacker.level);
		const attackModifierBonus = isRangedAttack ? archeryBonus : offenseBonus;
		const blessSpecialityBonus = calculateBlessSpecialityBonus(this.spells.bless, attacker.hasBlessSpeciality, attacker.level, this.level);

		const damageBonuses = 1 + attackSkillBonus + attackModifierBonus + blessSpecialityBonus;

		const defenseSkillReduction = calculateDefenseSkillReduction(this.attack, defender.defense, unit.totalDefenseSkill);
		const defenseModifierReduction = calculateDefenseModifierReduction(defender.skills.armorer, defender.hasArmorerSpeciality, defender.level);
		const shieldSpellReduction = calculateShieldSpellReduction(unit.spells.shield);
		const damageReductions = 1 - defenseSkillReduction - defenseModifierReduction - shieldSpellReduction;

		const damage = baseDamage * damageBonuses * damageReductions; 

		logAttack(attacker, defender, this, unit, damage);

		return {
			attackSkillBonus,
			offenseBonus,
			archeryBonus,
			attackModifierBonus,
			blessSpecialityBonus,
			totalBonus: damageBonuses,

			defenseSkillReduction,
			defenseModifierReduction,
			shieldSpellReduction,
			totalReduction: damageReductions,

			damage
		};
	}
}

function calculateBaseDamage(unitCount, minDamage, maxDamage, blessLevel = 0) {
	if(blessLevel === 1) {
		return unitCount * maxDamage;
	}

	if(blessLevel > 1) {
		return unitCount * (maxDamage + 1);
	}

	let totalDamage = 0;
	let counter = unitCount > 10 ? 10 : unitCount;

	for(let i = 0; i < counter; i++) {
		totalDamage += calculateSingleUnitDamage(minDamage, maxDamage);
	}

	return unitCount >= 10 ? Math.floor(totalDamage * (unitCount / 10)) : totalDamage;
}

function calculateAttackSkillBonus(attackersHeroAttack, attackersAttack, defendersHeroDefense, defendersDefense) {
	const bonus =  0.05 * ((attackersHeroAttack + attackersAttack) - (defendersHeroDefense + defendersDefense));

	if(bonus < 0) return 0;

	return bonus > 3 ? 3 : bonus;
}

function calculateBlessSpecialityBonus(isBlessed, hasBlessSpeciality, heroLevel, unitLevel) {
	if(!isBlessed || !hasBlessSpeciality) return 0;

	return 0.03 * heroLevel / unitLevel;
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

function calculateDefenseSkillReduction(attackSkill, heroDefense, defenseSkill) {
	const reduction = 0.025 * ((heroDefense + defenseSkill) - attackSkill);

	if(reduction > 0.7) return 0.7;

	return reduction < 0 ? 0 : reduction; 
}

function calculateShieldSpellReduction(spellLevel = 0) {
	if(spellLevel === 0) return 0;
	return spellLevel > 1 ? 0.3 : 0.15;
}

function calculateSingleUnitDamage(minDamage, maxDamage) {
	return randomInRange(minDamage, maxDamage);
}