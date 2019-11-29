class DamageService {
  detailedTotalDamageCalculation(attackingHero, defendingHero, attackingUnit, defendingUnit) {
    const totalAttack = attackingHero.attack + attackingUnit.totalAttackSkill;
    const totalDefense = defendingHero.defense + defendingUnit.totalDefenseSkill;

    const { minBaseDamage, maxBaseDamage } = attackingUnit;

    const attackSkillBonus = this.calculateAttackSkillBonus(totalAttack, totalDefense);
    const offenseBonus = attackingHero.offenseBonus;
    const offenseSpecialityBonus = attackingHero.offenseSpecialityBonus;

    const defenseSkillReduction = this.calculateDefenseSkillReduction(totalAttack, totalDefense);
    const armorerReduction = defendingHero.armorerBonus;
    const armorerSpecialityBonus = defendingHero.armorerSpecialityBonus
    const shieldSpellReduction = this.calculateShieldSpellReduction(defendingUnit.spells.shield ? 3 : 0);

    const minTotalDamage = minBaseDamage * (1 + attackSkillBonus + offenseBonus + offenseSpecialityBonus) * (1 - defenseSkillReduction) * (1 - armorerReduction) * (1 - armorerSpecialityBonus) * (1 - shieldSpellReduction);
    const maxTotalDamage = maxBaseDamage * (1 + attackSkillBonus + offenseBonus + offenseSpecialityBonus) * (1 - defenseSkillReduction) * (1 - armorerReduction) * (1 - armorerSpecialityBonus) * (1 - shieldSpellReduction);

    const kills = this.calculateKills(minTotalDamage, maxTotalDamage, defendingUnit.health);

    return {
      minTotalDamage,
      maxTotalDamage,
      kills,
      attackSkillBonus,
      offenseBonus,
      offenseSpecialityBonus,
      defenseSkillReduction,
      armorerReduction,
      armorerSpecialityBonus
    };
  }

  calculateKills(minTotalDamage, maxTotalDamage, unitHealth) {
    const minKills = Math.floor(minTotalDamage / unitHealth);
    const maxKills = Math.floor(maxTotalDamage / unitHealth);

    return {
      min: minKills,
      max: maxKills
    }
  }
  
  calculateAttackSkillBonus(attack, defense) {
    const bonus =  0.05 * (attack - defense);
  
    if(bonus < 0) return 0;
  
    return bonus > 3 ? 3 : bonus;
  }

  calculateDefenseSkillReduction(attack, defense) {
    const reduction = 0.025 * (defense - attack);
  
    if(reduction > 0.7) return 0.7;
  
    return reduction < 0 ? 0 : reduction; 
  }
  
  calculateShieldSpellReduction(spellLevel = 0) {
    if(spellLevel === 0) return 0;
    return spellLevel > 1 ? 0.3 : 0.15;
  }
}

export default new DamageService();
