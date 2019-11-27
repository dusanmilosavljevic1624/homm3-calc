import randomInRange from '../helpers/randomInRange';

class DamageService {
  calculateTotalDamage(attacker, defender, attackingUnit, defendingUnit, isRangedAttack) {
		const baseDamage = this.calculateBaseDamage(attackingUnit.count, attackingUnit.minDamage, attackingUnit.maxDamage, attackingUnit.spells.bless);

		const attackSkillBonus = this.calculateAttackSkillBonus(attacker.attack, attackingUnit.totalAttackSkill, defender.defense, defendingUnit.totalDefenseSkill);
		const offenseBonus = this.calculateDamageModifierBonus(attacker.skills.offense, attacker.hasOffenseSpeciality, attacker.level);
		const archeryBonus = this.calculateDamageModifierBonus(attacker.skills.archery, attacker.hasArcherySpeciality, attacker.level);
		const attackModifierBonus = isRangedAttack ? archeryBonus : offenseBonus;
		const blessSpecialityBonus = this.calculateBlessSpecialityBonus(attackingUnit.spells.bless, attacker.hasBlessSpeciality, attacker.level, attackingUnit.level);

		const damageBonuses = 1 + attackSkillBonus + attackModifierBonus + blessSpecialityBonus;

		const defenseSkillReduction = this.calculateDefenseSkillReduction(attackingUnit.attack, defender.defense, defendingUnit.totalDefenseSkill);
		const defenseModifierReduction = this.calculateDefenseModifierReduction(defender.skills.armorer, defender.hasArmorerSpeciality, defender.level);
		const shieldSpellReduction = this.calculateShieldSpellReduction(defendingUnit.spells.shield);
		const damageReductions = 1 - defenseSkillReduction - defenseModifierReduction - shieldSpellReduction;

    const damage = baseDamage * damageBonuses * damageReductions;
    
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

  calculateBaseDamage(unitCount, minDamage, maxDamage, blessLevel = 0) {
    if(blessLevel === 1) {
      return unitCount * maxDamage;
    }
  
    if(blessLevel > 1) {
      return unitCount * (maxDamage + 1);
    }
  
    let totalDamage = 0;
    let counter = unitCount > 10 ? 10 : unitCount;
  
    for(let i = 0; i < counter; i++) {
      totalDamage += this.calculateSingleUnitDamage(minDamage, maxDamage);
    }
  
    return unitCount >= 10 ? Math.floor(totalDamage * (unitCount / 10)) : totalDamage;
  }
  
  calculateAttackSkillBonus(attackersHeroAttack, attackersAttack, defendersHeroDefense, defendersDefense) {
    const bonus =  0.05 * ((attackersHeroAttack + attackersAttack) - (defendersHeroDefense + defendersDefense));
  
    if(bonus < 0) return 0;
  
    return bonus > 3 ? 3 : bonus;
  }
  
  calculateBlessSpecialityBonus(isBlessed, hasBlessSpeciality, heroLevel, unitLevel) {
    if(!isBlessed || !hasBlessSpeciality) return 0;
  
    return 0.03 * heroLevel / unitLevel;
  }
  
  calculateDamageModifierBonus(modifierLevel = 0, modifierSpeciality, heroLevel) {
    const levelBonus = modifierLevel * 0.1;
    const specialityBonus = modifierSpeciality ? 0.05 * heroLevel + 1 : 1;
  
    return modifierSpeciality ? levelBonus * specialityBonus : levelBonus;
  }
  
  calculateDefenseModifierReduction(modifierLevel = 0, modifierSpeciality, heroLevel) {
    const levelBonus = modifierLevel * 0.05;
    const specialityBonus = modifierSpeciality ? 0.05 * heroLevel + 1 : 0;
  
    return modifierSpeciality ? levelBonus * specialityBonus : levelBonus;
  }
  
  calculateDefenseSkillReduction(attackSkill, heroDefense, defenseSkill) {
    const reduction = 0.025 * ((heroDefense + defenseSkill) - attackSkill);
  
    if(reduction > 0.7) return 0.7;
  
    return reduction < 0 ? 0 : reduction; 
  }
  
  calculateShieldSpellReduction(spellLevel = 0) {
    if(spellLevel === 0) return 0;
    return spellLevel > 1 ? 0.3 : 0.15;
  }
  
  calculateSingleUnitDamage(minDamage, maxDamage) {
    return randomInRange(minDamage, maxDamage);
  }
}

export default new DamageService();
