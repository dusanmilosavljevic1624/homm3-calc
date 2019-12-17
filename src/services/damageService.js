import specialityService from './specialityService';

class DamageService {
  detailedTotalDamageCalculation(attackingHero, defendingHero, attackingUnit, defendingUnit) {
    const attackerSpecialtyAttackBonus = this.calculateSpecialtyAttackBonus(attackingHero, attackingUnit);
    const defenderSpecialtyAttackBonus = this.calculateSpecialtyAttackBonus(defendingHero, defendingUnit);

    const attackerSpecialtyDefenseBonus = this.calculateSpecialtyDefenseBonus(attackingHero, attackingUnit);
    const defenderSpecialtyDefenseBonus = this.calculateSpecialtyDefenseBonus(defendingHero, defendingUnit);

    const totalAttack = attackingHero.attack + attackingUnit.totalAttackSkill + attackerSpecialtyAttackBonus;
    const totalDefense = defendingHero.defense + defendingUnit.totalDefenseSkill + defenderSpecialtyDefenseBonus;

    let { minBaseDamage, maxBaseDamage } = attackingUnit;
    minBaseDamage *= this.calculateBlessSpecialityBonus(attackingHero, attackingUnit);
    maxBaseDamage *= this.calculateBlessSpecialityBonus(attackingHero, attackingUnit);

    const attackSkillBonus = this.calculateAttackSkillBonus(totalAttack, totalDefense);

    const {
      offenseBonus, offenseSpecialityBonus, archeryBonus, archerySpecialtyBonus
    } = attackingHero;

    const defenseSkillReduction = this.calculateDefenseSkillReduction(totalAttack, totalDefense);
    const armorerReduction = defendingHero.armorerBonus;
    const { armorerSpecialityBonus } = defendingHero;
    const shieldSpellReduction = this.calculateShieldSpellReduction(defendingUnit.spells.shield ? 3 : 0);
    const airShieldSpellReduction = this.calculateAirShieldSpellReduction(defendingUnit.spells.airshield ? 3 : 0);
    const meleePenaltyReduction = attackingUnit.meleePenalty;

    const minTotalDamage = attackingUnit.count * minBaseDamage * (1 + attackSkillBonus + offenseBonus + offenseSpecialityBonus) * (1 - defenseSkillReduction) * (1 - armorerReduction) * (1 - armorerSpecialityBonus) * (1 - shieldSpellReduction) * (1 - meleePenaltyReduction);
    const maxTotalDamage = attackingUnit.count * maxBaseDamage * (1 + attackSkillBonus + offenseBonus + offenseSpecialityBonus) * (1 - defenseSkillReduction) * (1 - armorerReduction) * (1 - armorerSpecialityBonus) * (1 - shieldSpellReduction) * (1 - meleePenaltyReduction);

    let minTotalRangedDamage = 0;
    let maxTotalRangedDamage = 0;

    if (attackingUnit.isRanged) {
      minTotalRangedDamage = attackingUnit.count * minBaseDamage * (1 + attackSkillBonus + archeryBonus + archerySpecialtyBonus) * (1 - defenseSkillReduction) * (1 - armorerReduction) * (1 - armorerSpecialityBonus) * (1 - airShieldSpellReduction);
      maxTotalRangedDamage = attackingUnit.count * maxBaseDamage * (1 + attackSkillBonus + archeryBonus + archerySpecialtyBonus) * (1 - defenseSkillReduction) * (1 - armorerReduction) * (1 - armorerSpecialityBonus) * (1 - airShieldSpellReduction);
    }

    const kills = this.calculateKills(minTotalDamage, maxTotalDamage, defendingUnit.health);
    const rangedKills = this.calculateKills(minTotalRangedDamage, maxTotalRangedDamage, defendingUnit.health);

    return {
      attackerCount: attackingUnit.count,
      defenderCount: defendingUnit.count,
      minTotalDamage,
      maxTotalDamage,
      minTotalRangedDamage,
      maxTotalRangedDamage,
      kills,
      rangedKills,
      attackerSpecialtyAttackBonus,
      attackerSpecialtyDefenseBonus,
      defenderSpecialtyAttackBonus,
      defenderSpecialtyDefenseBonus,
      attackSkillBonus,
      offenseBonus,
      offenseSpecialityBonus,
      archeryBonus: attackingHero.archeryBonus,
      archerySpecialtyBonus: attackingHero.archerySpecialtyBonus,
      defenseSkillReduction,
      armorerReduction,
      armorerSpecialityBonus,
      meleePenaltyReduction
    };
  }

  calculateSpecialtyAttackBonus(hero, unit) {
    const { speciality: specialitySlug } = hero;
    const { slug: unitSlug } = unit;

    const specialty = specialityService.getSpeciality(specialitySlug);

    if (specialty.type !== 'unit') return 0;

    const affectsUnit = specialty.affectsUnit(unitSlug);
    if (!affectsUnit) return 0;

    if (specialty.scalingType === 'flat') {
      return specialty.scalingStats.attack || 0;
    }

    if (specialty.scalingType === 'level') {
      const { scalingStartLevel } = specialty;
      if (hero.level <= scalingStartLevel) return 0;

      const levelDifference = hero.level - scalingStartLevel;

      return Math.ceil(unit.attack * (0.05 * (levelDifference)));
    }
  }

  calculateSpecialtyDefenseBonus(hero, unit) {
    const { speciality: specialitySlug } = hero;
    const { slug: unitSlug } = unit;

    const specialty = specialityService.getSpeciality(specialitySlug);

    if (specialty.type !== 'unit') return 0;

    const affectsUnit = specialty.affectsUnit(unitSlug);
    if (!affectsUnit) return 0;

    if (specialty.scalingType === 'flat') {
      return specialty.scalingStats.defense || 0;
    }

    if (specialty.scalingType === 'level') {
      const { scalingStartLevel } = specialty;
      if (hero.level <= scalingStartLevel) return 0;

      const levelDifference = hero.level - scalingStartLevel;

      return Math.ceil(unit.attack * (0.05 * (levelDifference)));
    }
  }

  calculateBlessSpecialityBonus(attackingHero, attackingUnit) {
    if (attackingHero.hasBlessSpeciality && attackingUnit.spells.bless) {
      return 1 + ((attackingHero.level / attackingUnit.level) * 0.03);
    }

    return 1;
  }

  calculateKills(minTotalDamage, maxTotalDamage, unitHealth) {
    const minKills = Math.floor(minTotalDamage / unitHealth);
    const maxKills = Math.floor(maxTotalDamage / unitHealth);

    return {
      min: minKills,
      max: maxKills
    };
  }

  calculateAttackSkillBonus(attack, defense) {
    const bonus = 0.05 * (attack - defense);

    if (bonus < 0) return 0;

    return bonus > 3 ? 3 : bonus;
  }

  calculateDefenseSkillReduction(attack, defense) {
    const reduction = 0.025 * (defense - attack);

    if (reduction > 0.7) return 0.7;

    return reduction < 0 ? 0 : reduction;
  }

  calculateAirShieldSpellReduction(spellLevel = 0) {
    if (spellLevel === 0) return 0;
    return spellLevel > 1 ? 0.5 : 0.25;
  }

  calculateShieldSpellReduction(spellLevel = 0) {
    if (spellLevel === 0) return 0;
    return spellLevel > 1 ? 0.3 : 0.15;
  }
}

export default new DamageService();
