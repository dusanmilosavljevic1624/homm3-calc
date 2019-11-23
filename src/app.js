import Unit from './models/Unit';

const pikeman = new Unit(1, 4, 5, 1, 3);
const tenPikeman = new Unit(10, 4, 5, 1, 3);

const peasant = new Unit(1, 1, 1, 1, 1);

pikeman.attackUnit(peasant);
tenPikeman.attackUnit(peasant);