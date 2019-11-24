import Unit from './models/Unit';
import Hero from './models/Hero';

const christian = new Hero('Christian', 0, 0, 20, 'offense', {
    archery: 0,
    offense: 3
});

const kyrre = new Hero('Kyrre', 0, 0, 20, 'armorer', {
    archery: 3,
    offense: 0,
    armorer: 3
});

const pikeman = new Unit('Pikeman', 1, 1, 4, 5, 1, 3);
const blessedPikeman = new Unit('Pikeman', 1, 1, 4, 5, 1, 3, false, { bless: 2 });

const peasant = new Unit('Peasant', 1, 1, 1, 5, 1, 1);
const shieldedPeasant = new Unit('Peasant', 1, 1, 1, 5, 1, 1, false, { shield: 2 });

blessedPikeman.attackUnit(christian, kyrre, peasant);
blessedPikeman.attackUnit(kyrre, christian, peasant);

blessedPikeman.attackUnit(christian, kyrre, shieldedPeasant);
blessedPikeman.attackUnit(kyrre, christian, shieldedPeasant);

pikeman.attackUnit(christian, kyrre, peasant);
pikeman.attackUnit(kyrre, christian, peasant, true);