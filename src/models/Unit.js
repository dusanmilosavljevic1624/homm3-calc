export default class Unit {
  constructor({
    name,
    count = 1,
    level = 1,
    attack = 0,
    defense = 0,
    minDamage = 0,
    maxDamage = 0,
    health = 1,
    speed = 1,
    growth = 1,
    aiValue = 1,
    cost = 1,
    isRanged = false,
    spells = {},
    specials = []
  }) {
    this.name = name;
    this.count = count;
    this.level = level;
    this.attack = attack;
    this.defense = defense;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.health = health;
    this.speed = speed;
    this.growth = growth;
    this.aiValue = aiValue;
    this.cost = cost;
    this.isRanged = isRanged;
    this.spells = spells;
    this.specials = specials;
  }

  get blessedBaseDamage() {
    return this.maxDamage + 1;
  }

  get minBaseDamage() {
    if (this.spells.bless) return this.blessedBaseDamage;

    return this.minDamage < 1 ? 1 : this.minDamage;
  }

  get maxBaseDamage() {
    if (this.spells.bless) return this.blessedBaseDamage;

    return this.maxDamage;
  }

  get minTotalDamage() {
    if (this.spells.bless) return this.spellDamageBonus + this.maxDamage;

    return this.spellDamageBonus + this.minDamage;
  }

  get maxTotalDamage() {
    return this.spellDamageBonus + this.maxDamage;
  }

  get image() {
    return `./img/${this.name.replace(' ', '_')}.gif`;
  }

  get slug() {
    return this.name.replace(' ', '_').toUpperCase();
  }

  get meleePenalty() {
    if (!this.isRanged) return 0;
    if (this.specials.length > 0 && !this.specials.indexOf('no_melee_penalty') !== -1) return 0;

    return 0.5;
  }

  get totalAttackSkill() {
    return this.spellAttackBonus + this.attack;
  }

  get totalDefenseSkill() {
    return this.spellDefenseBonus + this.defense;
  }

  get spellDamageBonus() {
    return this.spells.bless ? 1 : 0;
  }

  get spellAttackBonus() {
    if (this.isRanged) {
      return this.spells.precision ? 6 : 0;
    }

    return this.spells.bloodlust ? 6 : 0;
  }

  get spellDefenseBonus() {
    if (this.spells.stoneskin) return 6;
    return 0;
  }
}
