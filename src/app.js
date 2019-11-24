import Unit from './models/Unit';
import Hero from './models/Hero';

const christian = new Hero(0, 0, 20, 'offense', {
    archery: 3,
    offense: 3
});

const pikeman = new Unit(1, 4, 5, 1, 3);
const tenPikeman = new Unit(10, 4, 5, 1, 3);
const archer = new Unit(1, 6, 3, 2, 3, true);
const tenArchers = new Unit(10, 6, 3, 2, 3, true);

const peasant = new Unit(1, 1, 1, 1, 1);

pikeman.attackUnit(christian, peasant);
tenPikeman.attackUnit(christian, peasant);