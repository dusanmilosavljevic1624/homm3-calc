export default {
	BLESS: {
		name: 'Bless',
		image: 'Bless.png',
		type: 'attacker',
		slug: 'bless',
		school: 'water_magic',
		effects: {
			BASIC:
				'Creatures in target allied troop inflict maximum damage when they attack.',
			ADVANCED:
				'Creatures in target allied troop inflict maximum damage +1 when they attack.',
			EXPERT:
				'All allied creatures inflict maximum damage +1 when they attack.',
		},
	},
	SHIELD: {
		name: 'Shield',
		image: 'Shield.png',
		type: 'defender',
		slug: 'shield',
		school: 'earth_magic',
		effects: {
			BASIC:
				'Hand-to-hand damage delivered to target, allied troop is reduced by 15%.',
			ADVANCED:
				'Hand-to-hand damage delivered to target, allied troop is reduced by 30%.',
			EXPERT:
				'Hand-to-hand damage delivered to all allied troops is reduced by 30%.',
		},
	},
	BLOODLUST: {
		name: 'Bloodlust',
		image: 'Bloodlust.png',
		type: 'attacker',
		slug: 'bloodlust',
		school: 'fire_magic',
		effects: {
			BASIC:
				'Target, allied troop receives a +3 attack rating bonus for hand-to-hand attacks.',
			ADVANCED:
				'Target, allied troop receives a +6 attack rating bonus for hand-to-hand attacks.',
			EXPERT:
				'All allied troops receive a +6 attack rating bonus for hand-to-hand attacks.',
		},
	},
	PRECISION: {
		name: 'Precision',
		image: 'Precision.png',
		type: 'attacker',
		slug: 'precision',
		school: 'air_magic',
		effects: {
			BASIC:
				'Target, allied troop with ranged attack has its attack rating increased by 3 when making ranged attacks.',
			ADVANCED:
				'Target, allied troop with ranged attack has its attack rating increased by 6 when making ranged attacks.',
			EXPERT:
				'All allied troops with ranged attack have their attack rating increased by 6 when making ranged attacks',
		},
	},
	STONE_SKIN: {
		name: 'Stone Skin',
		image: 'Stone_Skin.png',
		type: 'defender',
		slug: 'stoneskin',
		school: 'earth_magic',
		effects: {
			BASIC: 'Target, allied troop defense rating is increased by 3.',
			ADVANCED: 'Target, allied troop defense rating is increased by 6.',
			EXPERT: 'All allied troops defense ratings are increased by 6.',
		},
	},
	AIR_SHIELD: {
		name: 'Air shield',
		image: 'Air_Shield.png',
		type: 'defender',
		slug: 'airshield',
		school: 'air_magic',
		effects: {
			BASIC:
				'Target, allied troop with ranged attack has its attack rating increased by 3 when making ranged attacks.',
			ADVANCED:
				'Target, allied troop with ranged attack has its attack rating increased by 6 when making ranged attacks.',
			EXPERT:
				'All allied troops with ranged attack have their attack rating increased by 6 when making ranged attacks',
		},
	},
	PRAYER: {
		name: 'Prayer',
		image: 'Prayer.png',
		type: 'both',
		slug: 'prayer',
		school: 'water_magic',
		effects: {
			BASIC:
				"Target, allied troop's attack, defense, and speed (hexes per turn) ratings are increased by 2.",
			ADVANCED:
				"Target, allied troop's attack, defense, and speed (hexes per turn) ratings are increased by 4.",
			EXPERT:
				"All allied troop's attack, defense, and speed ratings are increased by 4.",
		},
	},
	CURSE: {
		name: 'Curse',
		image: 'Curse.png',
		type: 'attacker',
		slug: 'curse',
		school: 'fire_magic',
		effects: {
			BASIC: 'The targeted enemy unit delivers minimum damage when attacking.',
			ADVANCED:
				'The targeted enemy unit delivers (minimum damage - 1) when attacking. Base damage for each creature cannot be reduced to below 1.',
			EXPERT:
				'All enemy units deliver (minimum damage - 1) when attacking. Base damage for each creature cannot be reduced to below 1.',
		},
	},
	WEAKNESS: {
		name: 'Weakness',
		image: 'Weakness.png',
		type: 'attacker',
		slug: 'weakness',
		school: 'water_magic',
		effects: {
			BASIC: 'Target enemy troop attack rating is reduced by 3.',
			ADVANCED: 'Target enemy troop attack rating is reduced by 6.',
			EXPERT: 'All enemy troops attack ratings are reduced by 6.',
		},
	},
	SLAYER: {
		name: 'Slayer',
		image: 'Slayer.png',
		type: 'attacker',
		slug: 'slayer',
		school: 'fire_magic',
		effects: {
			BASIC:
				"Target, allied troop's attack rating is increased by eight against behemoths, dragons, hydras, phoenixes and haspids.",
			ADVANCED:
				'Same as basic effect, except that attack bonus also affects devils and angels.',
			EXPERT:
				'Same as advanced effect, except attack bonus also affects giants/titans.',
		},
	},
	FRENZY: {
		name: 'Frenzy',
		image: 'Frenzy.png',
		type: 'attacker',
		slug: 'frenzy',
		school: 'fire_magic',
		effects: {
			BASIC:
				'Target troop attack rating is increased by 100% of the troop defense rating, and its defense rating is reduced to zero.',
			ADVANCED:
				'Target troop attack rating is increased by 150% of the troop defense rating, and its defense rating is reduced to zero.',
			EXPERT:
				'Target troop attack rating is increased by 200% of the troop defense rating, and its defense rating is reduced to zero.',
		},
	},
};
