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

	get blessedBaseDamage() {
		return this.maxDamage + 1;
	}

	get minBaseDamage() {
		if(this.spells.bless) return this.blessedBaseDamage;

		return this.minDamage < 1 ? 1 : this.minDamage;
	}

	get maxBaseDamage() {
		if(this.spells.bless) return this.blessedBaseDamage;

		return this.maxDamage;
	}

	get minTotalDamage() {
		if(this.spells.bless) return this.spellDamageBonus + this.maxDamage;

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
		if(this.isRanged) {
			return this.spells.precision ? 6 : 0;
		}

		return this.spells.bloodlust ? 6 : 0;
	}

	get spellDefenseBonus() {
		if(this.spells.stoneskin) return 6;
		return 0;
	}
}
