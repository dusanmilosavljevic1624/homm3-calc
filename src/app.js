import Unit from './models/Unit';

const pikeman = new Unit(1, 4, 5, 1, 3);
const tenPikeman = new Unit(10, 4, 5, 1, 3);
const archer = new Unit(1, 6, 3, 2, 3, true);
const tenArchers = new Unit(10, 6, 3, 2, 3, true);

const peasant = new Unit(1, 1, 1, 1, 1);

pikeman.attackUnit(peasant);
tenPikeman.attackUnit(peasant);