import SpellSpecialty from '../models/SpellSpecialty';

export default {
	BLESS: new SpellSpecialty(
		'bless',
		'Bless',
		'Bless.png',
		'attacker',
		'Casts Bless with increased effect, based on hero level compared to the level of the target unit.'
	),
	BLOODLUST: new SpellSpecialty(
		'bloodlust',
		'Bloodlust',
		'Bloodlust.png',
		'attacker',
		'Casts Bloodlust with increased effect, based on the level of the target unit.'
	),
	PRECISION: new SpellSpecialty(
		'precision',
		'Precision',
		'Precision.png',
		'attacker',
		'Casts Precision with increased effect, based on the level of the target unit.'
	),
	STONE_SKIN: new SpellSpecialty(
		'stone_skin',
		'Stone Skin',
		'Stone_Skin.png',
		'defender',
		'Casts Stone Skin with increased effect, based on the level of the target unit.'
	),
	AIR_SHIELD: new SpellSpecialty(
		'air_shield',
		'Air Shield',
		'Air_Shield.png',
		'defender',
		'Casts Air Shield with effect increased by 3% for every n hero levels, where n is the level of the targeted creature.'
	),
};
