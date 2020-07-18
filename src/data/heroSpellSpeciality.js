import SpellSpecialty from '../models/SpellSpecialty';

export default {
	BLESS: new SpellSpecialty('bless', 'Bless', 'Bless.png', 'attacker'),
	SHIELD: new SpellSpecialty('shield', 'Shield', 'Shield.png', 'defender'),
	BLOODLUST: new SpellSpecialty(
		'bloodlust',
		'Bloodlust',
		'Bloodlust.png',
		'attacker'
	),
	PRECISION: new SpellSpecialty(
		'precision',
		'Precision',
		'Precision.png',
		'attacker'
	),
	STONE_SKIN: new SpellSpecialty(
		'stone_skin',
		'Stone Skin',
		'Stone_Skin.png',
		'defender'
	),
	AIR_SHIELD: new SpellSpecialty(
		'air_shield',
		'Air Shield',
		'Air_Shield.png',
		'defender'
	),
};
