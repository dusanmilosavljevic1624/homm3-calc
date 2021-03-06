import SPELLS from '../data/spells';

class SpellService {
	constructor() {
		this.spells = SPELLS;
		this.spellsByType = mapSpellsByType(this.spells);
	}

	getSpells() {
		return this.spells;
	}

	getSpellsByType(type) {
		return this.spellsByType[type];
	}
}

function mapSpellsByType(spells) {
	return Object.keys(spells).reduce((acc, spellKey) => {
		const spell = spells[spellKey];

		if (spell.type === 'both') {
			acc.attacker = acc.attacker || {};
			acc.attacker[spellKey] = spell;

			acc.defender = acc.defender || {};
			acc.defender[spellKey] = spell;
		} else {
			acc[spell.type] = acc[spell.type] || {};
			acc[spell.type][spellKey] = spell;
		}

		return acc;
	}, {});
}

export default new SpellService();
