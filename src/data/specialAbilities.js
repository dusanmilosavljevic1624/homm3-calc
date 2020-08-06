import ActiveSpecialAbility from '../models/ActiveSpecialAbility';

export default {
	ACCURATE_SHOT: new ActiveSpecialAbility(
		'Accurate Shot',
		'accurate_shot',
		"The ability is triggered after a shot: each creature in an attacking stack has a X% chance of killing a creature in the attacked squad, but the total number of killed creatures cannot be more than (number of creatures in an attacking squad) * X/100 (rounded up). X = 3 multiplier for shooting without penalty and X = 2 if shooting with penalty. Ability doesn't work if shooting at creatures behind walls."
	),
	ACID_BREATH: new ActiveSpecialAbility(
		'Acid Breath',
		'acid_breath',
		"Acid breath special ability may occur after a stack of Rust Dragons have attacked target creature stack and before the stack has a chance to retaliate. The breath reduces the target stack's defense by 3, and has 20 % chance to cause additional damage amount of 25 points per attacking unit."
	),
	AGING: new ActiveSpecialAbility(
		'Aging',
		'aging',
		'Ghost Dragons have aging special ability, which has 20% probability to occur after they have attacked target creature stack and before the stack has a chance to retaliate. It causes maximum health of every creature in the target stack to be halved. The effect lasts for 3 combat rounds, and can only be removed with the Cure or Dispel spell. Additionally, non-living creatures are immune to aging.'
	),
};
