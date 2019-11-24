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

const pikeman = new Unit(1, 4, 5, 1, 3);
const tenPikeman = new Unit(10, 4, 5, 1, 3);
const archer = new Unit(1, 6, 3, 2, 3, true);
const tenArchers = new Unit(10, 6, 3, 2, 3, true);

const peasant = new Unit(1, 1, 5, 1, 1);

console.log('================================');
console.log('======CHRISTIAN======');
pikeman.attackUnit(christian, kyrre, peasant);

console.log('================================');
console.log('======KYRRE======');
pikeman.attackUnit(kyrre, christian, peasant);

console.log('================================');
console.log('======CHRISTIAN======');
tenPikeman.attackUnit(christian, kyrre, peasant);

console.log('================================');
console.log('======KYRRE======');
tenPikeman.attackUnit(kyrre, christian, peasant, true);