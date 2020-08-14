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
		'Increases the Attack and Defense skills of any Archers or Marksmen for each level attained after 2nd level.',
		['archer', 'marksman']
	),
	BASILISKS: new LevelScalingUnitSpecialty(
		'basilisks',
		'Basilisks',
		'Basilisk.gif',
		4,
		'Increases the Attack and Defense skills of any Basilisks or Greater Basilisks for each level attained after 4th level.',
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
		'Behemoths or Ancient Behemoths receive +5 Att, +5 Def, +10 Dmg.',
		['behemoth', 'ancient_behemoth']
	),
	BEHOLDERS: new LevelScalingUnitSpecialty(
		'beholders',
		'Beholders',
		'Beholder.gif',
		2,
		'Increases the Attack and Defense skills of any Beholders or Evil Eyes for each level attained after 2nd level.',
		['beholder', 'evil_eye']
	),
	BLACK_KNIGHTS: new LevelScalingUnitSpecialty(
		'black_knights',
		'Black Knights',
		'Black_Knight.gif',
		6,
		'Increases the Attack and Defense skills of any Black Knights or Dread Knights for each level attained after 6th level.',
		['black_knight', 'dread_knight']
	),
	CAVALIERS: new LevelScalingUnitSpecialty(
		'cavaliers',
		'Cavaliers',
		'Cavalier.gif',
		6,
		'Increases the Attack and Defense skills of any Cavaliers or Champions for each level attained after 6th level.',
		['cavalier', 'champion']
	),
	CYCLOPS: new LevelScalingUnitSpecialty(
		'cyclops',
		'Cyclops',
		'Cyclops.gif',
		6,
		'Increases the Attack and Defense skills of any Cyclopes or Cyclops Kings for each level attained after 6th level.',
		['cyclops', 'cyclops_king']
	),
	DEMONS: new LevelScalingUnitSpecialty(
		'demons',
		'Demons',
		'Demon.gif',
		4,
		'Increases the Attack and Defense skills of any Demons or Horned Demons for each level attained after 4th level.',
		['demon', 'horned_demon']
	),
	DENDROIDS: new LevelScalingUnitSpecialty(
		'dendroids',
		'Dendroids',
		'Dendroid_Guard.gif',
		5,
		'Increases the Attack and Defense skills of any Dendroid Guards or Dendroid Soldiers for each level attained after 5th level.',
		['dendroid_guard', 'dendroid_soldier']
	),
	DEVILS: new FlatScalingUnitSpecialty(
		'devils',
		'Devils',
		'Devil.gif',
		{ attack: 4, defense: 2, speed: 1 },
		'Devils and Arch Devils receive +4 Attack, +2 Defense, and +1 Speed.',
		['devil', 'arch_devil']
	),
	DRAGONS: new FlatScalingUnitSpecialty(
		'dragons',
		'Dragons',
		'Black_Dragon.gif',
		{ attack: 5, defense: 5 },
		'All dragons receive +5 Att, +5 Def.',
		[
			'red_dragon',
			'black_dragon',
			'green_dragon',
			'gold_dragon',
			'bone_dragon',
			'ghost_dragon',
		]
	),
	DWARVES: new LevelScalingUnitSpecialty(
		'dwarves',
		'Dwarves',
		'Dwarf.gif',
		2,
		'Increases the Attack and Defense skills of any Dwarves of Battle Dwarves for each level attained after 2nd level.',
		['dwarf', 'battle_dwarf']
	),
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
		'Earth and Magma Elementals receive +2 Att, +1 Def, and +5 Dmg.',
		['earth_elemental', 'magma_elemental']
	),
	EFREETI: new LevelScalingUnitSpecialty(
		'efreeti',
		'Efreeti',
		'Efreet.gif',
		6,
		'Increases the Attack and Defense skills of any Efreet or Efreet Sultans for each level attained after 6th level.',
		['efreet', 'efreet_sultan']
	),
	ELVES: new LevelScalingUnitSpecialty(
		'elves',
		'Elves',
		'Wood_Elf.gif',
		3,
		'Increases the Attack and Defense skills of any Wood Elves or Grand Elves for each level attained after 3rd level.',
		['elf', 'grand_elf']
	),
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
		'Fire and Energy Elementals receive +1 Att, +2 Def, and +2 Dmg.',
		['fire_elemental', 'energy_elemental']
	),
	GARGOYLES: new LevelScalingUnitSpecialty(
		'gargoyles',
		'Gargoyles',
		'Stone_Gargoyle.gif',
		2,
		'Increases the Attack and Defense skills of any Stone or Obsidian Gargoyles for each level attained after 2nd level.',
		['stone_gargoyle', 'obsidian_gargoyle']
	),
	GENIES: new LevelScalingUnitSpecialty(
		'genies',
		'Genies',
		'Genie.gif',
		5,
		'Increases the Attack and Defense skills of any Genies or Master Genies for each level attained after 5th level.',
		['genie', 'master_genie']
	),
	GNOLLS: new LevelScalingUnitSpecialty(
		'gnolls',
		'Gnolls',
		'Gnoll.gif',
		1,
		'Increases the Attack and Defense skills of any Gnolls or Gnoll Marauders for each level attained after 1st level.',
		['gnoll', 'gnoll_marauder']
	),
	GOBLINS: new LevelScalingUnitSpecialty(
		'goblins',
		'Goblins',
		'Goblin.gif',
		1,
		'Increases the Attack and Defense skills of any Goblins or Hobgoblins for each level attained after 1st level.',
		['goblin', 'hobgoblin']
	),
	GOGS: new LevelScalingUnitSpecialty(
		'gogs',
		'Gogs',
		'Gog.gif',
		2,
		'Increases the Attack and Defense skills of any Gogs or Magogs for each level attained after 2nd level.',
		['gog', 'magog']
	),
	GOLEMS: new LevelScalingUnitSpecialty(
		'golems',
		'Golems',
		'Stone_Golem.gif',
		3,
		'Increases the Attack and Defense skills of any Stone or Iron Golems for each level attained after 3rd level.',
		['stone_golem', 'iron_golem']
	),
	GORGONS: new LevelScalingUnitSpecialty(
		'gorgons',
		'Gorgons',
		'Gorgon.gif',
		5,
		'Increases the Attack and Defense skills of any Gorgons or Mighty Gorgons for each level attained after 5th level.',
		['gorgon', 'mighty_gorgon']
	),
	GRIFFINS: new LevelScalingUnitSpecialty(
		'griffins',
		'Griffins',
		'Griffin.gif',
		3,
		'Increases the Attack and Defense skills of any Griffins or Royal Griffins or each level attained after 3rd level.',
		['griffin', 'royal_griffin']
	),
	HARPIES: new LevelScalingUnitSpecialty(
		'harpies',
		'Harpies',
		'Harpy.gif',
		2,
		'Increases the Attack and Defense skills of any Harpies or Harpy Hags for each level attained after 2nd level.',
		['harpy', 'harpy_hag']
	),
	HELL_HOUNDS: new LevelScalingUnitSpecialty(
		'hell_hounds',
		'Hell Hounds',
		'Hell_Hound.gif',
		3,
		'Increases the Attack and Defense skills of any Hell Hounds or Cerberi for each level attained after 3rd level.',
		['cerberi', 'hell_hound']
	),
	IMPS: new LevelScalingUnitSpecialty(
		'imps',
		'Imps',
		'Imp.gif',
		1,
		'Increases the Attack and Defense skills of any Imps or Familiars for each level attained after 1st level.',
		['imp', 'familiar']
	),
	LICHES: new LevelScalingUnitSpecialty(
		'liches',
		'Liches',
		'Lich.gif',
		5,
		'Increases the Attack and Defense skills of any Liches or Power Liches for each level attained after 5th level.',
		['lich', 'power_lich']
	),
	LIZARDMEN: new LevelScalingUnitSpecialty(
		'lizardmen',
		'Lizardmen',
		'Lizardman.gif',
		2,
		'Increases the Attack and Defense skills of any Lizardmen or Lizard Warriors for each level attained after 2nd level.',
		['lizardman', 'lizardman_warrior']
	),
	MAGI: new LevelScalingUnitSpecialty(
		'magi',
		'Magi',
		'Mage.gif',
		4,
		'Increases the Attack and Defense skills of any Magi or Arch Magi for each level attained after 4th level.',
		['mage', 'arch_mage']
	),
	MANTICORES: new LevelScalingUnitSpecialty(
		'manticores',
		'Manticores',
		'Manticore.gif',
		6,
		'Increases the Attack and Defense skills of any Manticores or Scorpicores for each level attained after 6th level.',
		['manticore', 'scorpicore']
	),
	MINOTAURS: new LevelScalingUnitSpecialty(
		'minotaurs',
		'Minotaurs',
		'Minotaur.gif',
		5,
		'Increases the Attack and Defense skills of any Minotaurs or Minotaur Kings for each level attained after 5th level.',
		['minotaur', 'minotaur_king']
	),
	MONKS: new LevelScalingUnitSpecialty(
		'monks',
		'Monks',
		'Monk.gif',
		5,
		'Increases the Attack and Defense skills of any Minotaurs or Minotaur Kings for each level attained after 5th level.',
		['monk', 'zealot']
	),
	NAGAS: new LevelScalingUnitSpecialty(
		'nagas',
		'Nagas',
		'Naga.gif',
		6,
		'Increases the Attack and Defense skills of any Nagas or Naga Queens for each level attained after 6th level.',
		['naga', 'naga-queen']
	),
	OGRES: new LevelScalingUnitSpecialty(
		'ogres',
		'Ogres',
		'Ogre.gif',
		4,
		'Increases the Attack and Defense skills of any Ogre or Ogre Mage for each level attained after 4th level',
		['ogre', 'ogre_magi']
	),
	PEGASI: new LevelScalingUnitSpecialty(
		'pegasi',
		'Pegasi',
		'Pegasus.gif',
		4,
		'Increases the Attack and Defense skills of any Pegasi or Silver Pegasi for each level attained after 4th level.',
		['pegasus', 'silver_pegasus']
	),
	PIT_FIENDS: new LevelScalingUnitSpecialty(
		'pit_fiends',
		'Pit Fiends',
		'Pit_Fiend.gif',
		5,
		'Increases the Attack and Defense skills of any Pit Fiends or Pit Lords for each level attained after 5th level.',
		['pit_fiend', 'pit_lord']
	),
	PSYCHIC_ELEMENTALS: new FlatScalingUnitSpecialty(
		'psychic_elementals',
		'Psychic Elementals',
		'Psychic_Elemental.gif',
		{ attack: 3, defense: 3 },
		'Psychic and Magic Elementals receive +3 Att and +3 Def.',
		['psychic_elemental', 'magic_elemental']
	),
	ROCS: new LevelScalingUnitSpecialty(
		'rocs',
		'Rocs',
		'Roc.gif',
		5,
		'Increases the Attack and Defense skills of any Rocs or Thunderbirds for each level attained after 5th level.',
		['roc', 'thunderbird']
	),
	SERPENT_FLIES: new LevelScalingUnitSpecialty(
		'serpent_flies',
		'Serpent Flies',
		'Serpent_Fly.gif',
		3,
		'Increases the Attack and Defense skills of any Serpent or Dragon Flies for each level attained after 3rd level.',
		['serpent_fly', 'dragon_fly']
	),
	SKELETONS: new LevelScalingUnitSpecialty(
		'skeletons',
		'Skeletons',
		'Skeleton.gif',
		1,
		'Increases the Attack and Defense skills of any Skeletons or Skeleton Warriors for each level attained after 1st level.',
		['skeleton', 'skeleton_warrior']
	),
	SWORDSMEN: new LevelScalingUnitSpecialty(
		'swordsmen',
		'Swordsmen',
		'Swordsman.gif',
		4,
		'Increases the Attack and Defense skills of any Swordsmen or Crusaders for each level attained after 4th level.',
		['swordsman', 'crusader']
	),
	TROGLODYTES: new LevelScalingUnitSpecialty(
		'troglodytes',
		'Troglodytes',
		'Troglodyte.gif',
		1,
		'Increases the Attack and Defense skills of any Troglodytes or Infernal Troglodytes for each level attained after 1st level.',
		['troglodyte', 'infernal_troglodyte']
	),
	UNICORNS: new LevelScalingUnitSpecialty(
		'unicorns',
		'Unicorns',
		'Unicorn.gif',
		6,
		'Increases the Attack and Defense skills of any Unicorns or War Unicorns for each level attained after 6th level.',
		['unicorn', 'war_unicorn']
	),
	VAMPIRES: new LevelScalingUnitSpecialty(
		'vampires',
		'Vampires',
		'Vampire.gif',
		4,
		'Increases the Attack and Defense skills of any Vampires or Vampire Lords for each level attained after 4th level.',
		['vampire', 'vampire_lord']
	),
	WALKING_DEAD: new LevelScalingUnitSpecialty(
		'walking_dead',
		'Walking Dead',
		'Walking_Dead.gif',
		2,
		'Increases the Attack and Defense skills of any Walking Dead or Zombies for each level attained after 2nd level.',
		['walking_dead', 'zombie']
	),
	WATER_ELEMENTALS: new FlatScalingUnitSpecialty(
		'water_elementals',
		'Water Elementals',
		'Water_Elemental.gif',
		{ attack: 2 },
		'Increases the Attack and Defense skills of any Unicorns or War Unicorns for each level attained after 6th level.',
		['water_elemental', 'ice_elemental']
	),
	WIGHTS: new LevelScalingUnitSpecialty(
		'wights',
		'Wights',
		'Wight.gif',
		3,
		'Increases the Attack and Defense skills of any Vampires or Vampire Lords for each level attained after 4th level.',
		['wight', 'wrath']
	),
	WOLF_RIDERS: new LevelScalingUnitSpecialty(
		'wolf_riders',
		'Wolf Riders',
		'Wolf_Rider.gif',
		2,
		'Increases the Attack and Defense skills of any Wolf Riders or Wolf Raiders for each level attained after 2nd level.',
		['wolf_rider', 'wolf_raider']
	),
	WYVERNS: new LevelScalingUnitSpecialty(
		'wyverns',
		'Wyverns',
		'Wyvern.gif',
		6,
		'Increases the Attack and Defense skills of any Wyverns or Wyvern Monarchs for each level attained after 6th level.',
		['wyvern', 'wyvern_monarch']
	),
};
