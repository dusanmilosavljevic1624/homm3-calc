export default {
	GREMLIN: {
		name: 'Gremlin',
		level: 1,
		attack: 3,
		defense: 3,
		minDamage: 1,
		maxDamage: 2,
		health: 4,
		speed: 4,
		growth: 16,
		aiValue: 44,
		cost: 30,
	},
	MASTER_GREMLIN: {
		name: 'Master Gremlin',
		level: 1,
		attack: 4,
		defense: 4,
		minDamage: 1,
		maxDamage: 2,
		health: 4,
		speed: 5,
		growth: 16,
		aiValue: 66,
		cost: 40,
		isRanged: true,
	},
	STONE_GARGOYLE: {
		name: 'Stone Gargoyle',
		level: 2,
		attack: 6,
		defense: 6,
		minDamage: 2,
		maxDamage: 3,
		health: 16,
		speed: 6,
		growth: 9,
		aiValue: 165,
		cost: 130,
	},
	OBSIDIAN_GARGOYLE: {
		name: 'Obsidian Gargoyle',
		level: 2,
		attack: 7,
		defense: 7,
		minDamage: 2,
		maxDamage: 3,
		health: 16,
		speed: 9,
		growth: 9,
		aiValue: 201,
		cost: 160,
	},
	STONE_GOLEM: {
		name: 'Stone Golem',
		level: 3,
		attack: 7,
		defense: 10,
		minDamage: 4,
		maxDamage: 5,
		health: 30,
		speed: 3,
		growth: 6,
		aiValue: 250,
		cost: 150,
	},
	IRON_GOLEM: {
		name: 'Iron Golem',
		level: 3,
		attack: 9,
		defense: 10,
		minDamage: 4,
		maxDamage: 5,
		health: 35,
		speed: 5,
		growth: 6,
		aiValue: 412,
		cost: 200,
	},
	MAGE: {
		name: 'Mage',
		level: 4,
		attack: 11,
		defense: 8,
		minDamage: 7,
		maxDamage: 9,
		health: 25,
		speed: 5,
		growth: 4,
		aiValue: 570,
		cost: 350,
		isRanged: true,
		specials: ['no_melee_penalty'],
	},
	ARCH_MAGE: {
		name: 'Arch Mage',
		level: 4,
		attack: 12,
		defense: 9,
		minDamage: 7,
		maxDamage: 9,
		health: 30,
		speed: 7,
		growth: 4,
		aiValue: 680,
		cost: 450,
		isRanged: true,
		specials: ['no_melee_penalty'],
	},
	GENIE: {
		name: 'Genie',
		level: 5,
		attack: 12,
		defense: 12,
		minDamage: 13,
		maxDamage: 16,
		health: 40,
		speed: 7,
		growth: 3,
		aiValue: 884,
		cost: 550,
	},
	MASTER_GENIE: {
		name: 'Master Genie',
		level: 5,
		attack: 12,
		defense: 12,
		minDamage: 13,
		maxDamage: 16,
		health: 40,
		speed: 11,
		growth: 3,
		aiValue: 942,
		cost: 600,
	},
	NAGA: {
		name: 'Naga',
		level: 6,
		attack: 16,
		defense: 13,
		minDamage: 20,
		maxDamage: 20,
		health: 110,
		speed: 5,
		growth: 2,
		aiValue: 2016,
		cost: 1100,
	},
	NAGA_QUEEN: {
		name: 'Naga Queen',
		level: 6,
		attack: 16,
		defense: 13,
		minDamage: 30,
		maxDamage: 30,
		health: 110,
		speed: 7,
		growth: 2,
		aiValue: 2840,
		cost: 1600,
	},
	GIANT: {
		name: 'Giant',
		level: 7,
		attack: 19,
		defense: 16,
		minDamage: 40,
		maxDamage: 60,
		health: 150,
		speed: 7,
		growth: 1,
		aiValue: 3718,
		cost: 2000,
	},
	TITAN: {
		name: 'Titan',
		level: 7,
		attack: 24,
		defense: 24,
		minDamage: 40,
		maxDamage: 60,
		health: 300,
		speed: 11,
		growth: 1,
		aiValue: 7500,
		cost: 5000,
		isRanged: true,
		specials: ['no_melee_penalty'],
	},
};
