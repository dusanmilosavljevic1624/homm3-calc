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
		specials = [],
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
		return this.spells.bless > 1 ? this.maxDamage + 1 : this.maxDamage;
	}

	get cursedBaseDamage() {
		const dmg = this.spells.curse > 1 ? this.minDamage - 1 : this.minDamage;
		return dmg > 0 ? dmg : 1;
	}

	get minBaseDamage() {
		if (this.spells.curse) return this.cursedBaseDamage;
		if (this.spells.bless) return this.blessedBaseDamage;

		return this.minDamage < 1 ? 1 : this.minDamage;
	}

	get maxBaseDamage() {
		if (this.spells.curse) return this.cursedBaseDamage;
		if (this.spells.bless) return this.blessedBaseDamage;

		return this.maxDamage;
	}

	get minTotalDamage() {
		if (this.spells.curse) return this.cursedBaseDamage;
		if (this.spells.bless) return this.blessedBaseDamage;

		return this.spellDamageBonus + this.minDamage;
	}

	get maxTotalDamage() {
		if (this.spells.curse) return this.cursedBaseDamage;
		return this.spellDamageBonus + this.maxDamage;
	}

	get image() {
		let splitWords = this.name.split(' ');
		const hasMultipleWords = splitWords.length > 1;

		if (!hasMultipleWords) return `${this.name}.gif`;

		splitWords = splitWords.map(
			(word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`
		);

		return `${splitWords.join('_')}.gif`;
	}

	get slug() {
		return this.name.replace(' ', '_').toUpperCase();
	}

	get meleePenalty() {
		if (!this.isRanged) return 0;

		/* eslint-disable-next-line operator-linebreak */
		const isImmuneToMeleePenalty =
			!this.specials.indexOf('no_melee_penalty') !== -1;

		if (isImmuneToMeleePenalty) return 0;

		return 0.5;
	}

	get totalAttackSkill() {
		const totalAttack = this.spellAttackBonus + this.attack;
		return totalAttack < 0 ? 0 : totalAttack;
	}

	get totalDefenseSkill() {
		if (this.spells.frenzy) return 0;
		return this.spellDefenseBonus + this.defense;
	}

	get spellDamageBonus() {
		if (this.spells.curse) return this.spells.curse > 1 ? -1 : 0;
		return this.spells.bless && this.spells.bless > 1 ? 1 : 0;
	}

	get spellAttackBonus() {
		let total = 0;

		if (this.isRanged) {
			const precisionBonus = this.spells.precision > 1 ? 6 : 3;
			total += this.spells.precision ? precisionBonus : 0;
		}

		if (this.spells.bloodlust) {
			total += this.spells.bloodlust > 1 ? 6 : 3;
		}

		if (this.spells.prayer) {
			total += this.spells.prayer > 1 ? 4 : 2;
		}

		if (this.spells.weakness) {
			total -= this.spells.weakness > 1 ? 6 : 3;
		}

		if (this.spells.frenzy) {
			const multipliersBySpellLevel = {
				1: 1,
				2: 1.5,
				3: 2,
			};

			const totalDefense = this.spellDefenseBonus + this.defense;
			total += totalDefense * multipliersBySpellLevel[this.spells.frenzy];
		}

		return total;
	}

	get spellDefenseBonus() {
		let total = 0;

		if (this.spells.stoneskin) total += this.spells.stoneskin > 1 ? 6 : 3;

		if (this.spells.prayer) {
			total += this.spells.prayer > 1 ? 4 : 2;
		}

		return total;
	}
}
