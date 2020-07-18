export default (attacker, defender, attackingUnit, defendingUnit, damage) => {
	const attackerSpells = Object.keys(attackingUnit.spells);
	const defenderSpells = Object.keys(defendingUnit.spells);

	const attackerSkills = Object.keys(attacker.skills);
	const defenderSkills = Object.keys(defender.skills);

	console.log(`
		${attacker.name} - ${attackingUnit.count} x ${attackingUnit.name}
		SPECIALITY - ${attacker.speciality}
		SPELLS - ${attackerSpells.length > 0 ? attackerSpells : 'None'}
		SKILLS - ${attackerSkills.length > 0 ? attackerSkills : 'None'}
		===ATTACKS===
		${defender.name} - ${defendingUnit.count} x ${defendingUnit.name}
		SPECIALITY - ${defender.speciality}
		SPELLS - ${defenderSpells.length > 0 ? defenderSpells : 'None'}
		SKILLS - ${defenderSkills.length > 0 ? defenderSkills : 'None'}
		FOR ${Number(damage).toPrecision(4)} DAMAGE
	`);
};
