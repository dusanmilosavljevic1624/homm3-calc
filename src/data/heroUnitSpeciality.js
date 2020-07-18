import FlatScalingUnitSpecialty from '../models/FlatScalingUnitSpecialty';
import LevelScalingUnitSpecialty from '../models/LevelScalingUnitSpecialty';

/*
  LevelScalingUnitSpecialty: { slug, name, image, scalingLevelStarts }
  FlatScalingUnitSpecialty: { slug, name, image, scalingStats }
*/

export default {
	ARCHERS: new LevelScalingUnitSpecialty(
		'archers',
		'Archers',
		'Archer.gif',
		2,
		['archer', 'marksman']
	),
	BASILISKS: new LevelScalingUnitSpecialty(
		'basilisks',
		'Basilisks',
		'Basilisk.gif',
		4,
		['basilisk', 'greater_basilisk']
	),
	BEHEMOTHS: new FlatScalingUnitSpecialty(
		'behemoths',
		'Behemoths',
		'Behemoth.gif',
		{
			attack: 5,
			defense: 5,
			minDamage: 10,
			maxDamage: 10,
		},
		['behemoth', 'ancient_behemoth']
	),
	BEHOLDERS: new LevelScalingUnitSpecialty(
		'beholders',
		'Beholders',
		'Beholder.gif',
		2,
		['beholder', 'evil_eye']
	),
	BLACK_KNIGHTS: new LevelScalingUnitSpecialty(
		'black_knights',
		'Black Knights',
		'Black_Knight.gif',
		6,
		['black_knight', 'dread_knight']
	),
	CAVALIERS: new LevelScalingUnitSpecialty(
		'cavaliers',
		'Cavaliers',
		'Cavalier.gif',
		6,
		['cavalier', 'champion']
	),
	CYCLOPS: new LevelScalingUnitSpecialty(
		'cyclops',
		'Cyclops',
		'Cyclops.gif',
		6,
		['cyclops', 'cyclops_king']
	),
	DEMONS: new LevelScalingUnitSpecialty('demons', 'Demons', 'Demon.gif', 4, [
		'demon',
		'horned_demon',
	]),
	DENDROIDS: new LevelScalingUnitSpecialty(
		'dendroids',
		'Dendroids',
		'Dendroid_Guard.gif',
		5,
		['dendroid_guard', 'dendroid_soldier']
	),
	DEVILS: new FlatScalingUnitSpecialty(
		'devils',
		'Devils',
		'Devil.gif',
		{ attack: 4, defense: 2, speed: 1 },
		['devil', 'arch_devil']
	),
	DRAGONS: new FlatScalingUnitSpecialty(
		'dragons',
		'Dragons',
		'Black_Dragon.gif',
		{ attack: 5, defense: 5 },
		[
			'red_dragon',
			'black_dragon',
			'green_dragon',
			'gold_dragon',
			'bone_dragon',
			'ghost_dragon',
		]
	),
	DWARVES: new LevelScalingUnitSpecialty('dwarves', 'Dwarves', 'Dwarf.gif', 2, [
		'dwarf',
		'battle_dwarf',
	]),
	EARTH_ELEMENTALS: new FlatScalingUnitSpecialty(
		'earth_elementals',
		'Earth Elementals',
		'Earth_Elemental.gif',
		{
			attack: 2,
			defense: 1,
			minDamage: 5,
			maxDamage: 5,
		},
		['earth_elemental', 'magma_elemental']
	),
	EFREETI: new LevelScalingUnitSpecialty(
		'efreeti',
		'Efreeti',
		'Efreet.gif',
		6,
		['efreet', 'efreet_sultan']
	),
	ELVES: new LevelScalingUnitSpecialty('elves', 'Elves', 'Wood_Elf.gif', 3, [
		'elf',
		'grand_elf',
	]),
	FIRE_ELEMENTALS: new FlatScalingUnitSpecialty(
		'fire_elementals',
		'Fire Elementals',
		'Fire_Elemental.gif',
		{
			attack: 1,
			defense: 2,
			minDamage: 2,
			maxDamage: 2,
		},
		['fire_elemental', 'energy_elemental']
	),
	GARGOYLES: new LevelScalingUnitSpecialty(
		'gargoyles',
		'Gargoyles',
		'Stone_Gargoyle.gif',
		2,
		['stone_gargoyle', 'obsidian_gargoyle']
	),
	GENIES: new LevelScalingUnitSpecialty('genies', 'Genies', 'Genie.gif', 5, [
		'genie',
		'master_genie',
	]),
	GNOLLS: new LevelScalingUnitSpecialty('gnolls', 'Gnolls', 'Gnoll.gif', 1, [
		'gnoll',
		'gnoll_marauder',
	]),
	GOBLINS: new LevelScalingUnitSpecialty(
		'goblins',
		'Goblins',
		'Goblin.gif',
		1,
		['goblin', 'hobgoblin']
	),
	GOGS: new LevelScalingUnitSpecialty('gogs', 'Gogs', 'Gog.gif', 2, [
		'gog',
		'magog',
	]),
	GOLEMS: new LevelScalingUnitSpecialty(
		'golems',
		'Golems',
		'Stone_Golem.gif',
		3,
		['stone_golem', 'iron_golem']
	),
	GORGONS: new LevelScalingUnitSpecialty(
		'gorgons',
		'Gorgons',
		'Gorgon.gif',
		5,
		['gorgon', 'mighty_gorgon']
	),
	GRIFFINS: new LevelScalingUnitSpecialty(
		'griffins',
		'Griffins',
		'Griffin.gif',
		3,
		['griffin', 'royal_griffin']
	),
	HARPIES: new LevelScalingUnitSpecialty('harpies', 'Harpies', 'Harpy.gif', 2, [
		'harpy',
		'harpy_hag',
	]),
	HELL_HOUNDS: new LevelScalingUnitSpecialty(
		'hell_hounds',
		'Hell Hounds',
		'Hell_Hound.gif',
		3,
		['cerberi', ['hell_hound']]
	),
	IMPS: new LevelScalingUnitSpecialty('imps', 'Imps', 'Imp.gif', 1, [
		'imp',
		'familiar',
	]),
	LICHES: new LevelScalingUnitSpecialty('liches', 'Liches', 'Lich.gif', 5, [
		'lich',
		'power_lich',
	]),
	LIZARDMEN: new LevelScalingUnitSpecialty(
		'lizardmen',
		'Lizardmen',
		'Lizardman.gif',
		2,
		['lizardman', 'lizardman_warrior']
	),
	MAGI: new LevelScalingUnitSpecialty('magi', 'Magi', 'Mage.gif', 4, [
		'mage',
		'arch_mage',
	]),
	MANTICORES: new LevelScalingUnitSpecialty(
		'manticores',
		'Manticores',
		'Manticore.gif',
		6,
		['manticore', 'scorpicore']
	),
	MINOTAURS: new LevelScalingUnitSpecialty(
		'minotaurs',
		'Minotaurs',
		'Minotaur.gif',
		5,
		['minotaur', 'minotaur_king']
	),
	MONKS: new LevelScalingUnitSpecialty('monks', 'Monks', 'Monk.gif', 5, [
		'monk',
		'zealot',
	]),
	NAGAS: new LevelScalingUnitSpecialty('nagas', 'Nagas', 'Naga.gif', 6, [
		'naga',
		'naga-queen',
	]),
	OGRES: new LevelScalingUnitSpecialty('ogres', 'Ogres', 'Ogre.gif', 4, [
		'ogre',
		'ogre_magi',
	]),
	PEGASI: new LevelScalingUnitSpecialty('pegasi', 'Pegasi', 'Pegasus.gif', 4, [
		'pegasus',
		'silver_pegasus',
	]),
	PIT_FIENDS: new LevelScalingUnitSpecialty(
		'pit_fiends',
		'Pit Fiends',
		'Pit_Fiend.gif',
		5,
		['pit_fiend', 'pit_lord']
	),
	PSYCHIC_ELEMENTALS: new FlatScalingUnitSpecialty(
		'psychic_elementals',
		'Psychic Elementals',
		'Psychic_Elemental.gif',
		{ attack: 3, defense: 3 },
		['psychic_elemental', 'magic_elemental']
	),
	ROCS: new LevelScalingUnitSpecialty('rocs', 'Rocs', 'Roc.gif', 5, [
		'roc',
		'thunderbird',
	]),
	SERPENT_FLIES: new LevelScalingUnitSpecialty(
		'serpent_flies',
		'Serpent Flies',
		'Serpent_Fly.gif',
		3,
		['serpent_fly', 'dragon_fly']
	),
	SKELETONS: new LevelScalingUnitSpecialty(
		'skeletons',
		'Skeletons',
		'Skeleton.gif',
		1,
		['skeleton', 'skeleton_warrior']
	),
	SWORDSMEN: new LevelScalingUnitSpecialty(
		'swordsmen',
		'Swordsmen',
		'Swordsman.gif',
		4,
		['swordsman', 'crusader']
	),
	TROGLODYTES: new LevelScalingUnitSpecialty(
		'troglodytes',
		'Troglodytes',
		'Troglodyte.gif',
		1,
		['troglodyte', 'infernal_troglodyte']
	),
	UNICORNS: new LevelScalingUnitSpecialty(
		'unicorns',
		'Unicorns',
		'Unicorn.gif',
		6,
		['unicorn', 'war_unicorn']
	),
	VAMPIRES: new LevelScalingUnitSpecialty(
		'vampires',
		'Vampires',
		'Vampire.gif',
		4,
		['vampire', 'vampire_lord']
	),
	WALKING_DEAD: new LevelScalingUnitSpecialty(
		'walking_dead',
		'Walking Dead',
		'Walking_Dead.gif',
		2,
		['walking_dead', 'zombie']
	),
	WATER_ELEMENTALS: new FlatScalingUnitSpecialty(
		'water_elementals',
		'Water Elementals',
		'Water_Elemental.gif',
		{ attack: 2 },
		['water_elemental', 'ice_elemental']
	),
	WIGHTS: new LevelScalingUnitSpecialty('wights', 'Wights', 'Wight.gif', 3, [
		'wight',
		'wrath',
	]),
	WOLF_RIDERS: new LevelScalingUnitSpecialty(
		'wolf_riders',
		'Wolf Riders',
		'Wolf_Rider.gif',
		2,
		['wolf_rider', 'wolf_raider']
	),
	WYWERNS: new LevelScalingUnitSpecialty(
		'wyverns',
		'Wyverns',
		'Wyvern.gif',
		6,
		['wyvern', 'wyvern_monarch']
	),
};
