import DUNGEON_UNITS from '../data/units/dungeon';
import INFERNO_UNITS from '../data/units/inferno';

import Unit from '../models/Unit';
import Hero from '../models/Hero';

export default class DamageCalculator {
  init(containerEl) {
    this.attackerUnit = new Unit(DUNGEON_UNITS.INFERNAL_TROGLODYTE);
    this.attackerHero = new Hero('Christian', 0, 0, 1, 'armorer', { 'armorer': 3 });
    this.defenderHero = new Hero('Ciele', 0, 0, 1, 'offense', { 'offense': 3 });
    this.defenderUnit = new Unit(INFERNO_UNITS.IMP);

    document.getElementById(containerEl).innerHTML = this.createUnitsHtml();
  }

  createResultsHtml() {
    const damageInfo = this.attackerUnit.attackUnit(
      this.attackerHero,
      this.defenderHero,
      this.defenderUnit,
      false
    );

    return `
      <div id="results" class="text-center">
        <p>Damage done: ${Number(damageInfo.damage).toFixed(2)}</p>
        <p>Damage bonus: ${Number(damageInfo.totalBonus).toFixed(2)}</p>
        <p>Damage reduction: ${Number(damageInfo.totalReduction).toFixed(2)}</p>
      </div>
    `
  }

  createUnitsHtml() {
    return `
      <div class="row text-center">
        ${this.createUnitHtml('attacker', this.attackerUnit)}
        ${this.createUnitHtml('defender', this.defenderUnit)}

        ${this.createResultsHtml()}
      </div>
    `;
  }

  createUnitHtml(position, unit) {
    return `
      <div id="${position}" class="col-md-6">
        <p>${position}: ${unit.name}</p>

        <div class="content">
          <img src="${unit.image}" />

          <div class="stats">
            <p>Attack: ${unit.attack}</p>
            <p>Defense: ${unit.defense}</p>
            <p>Damage: ${unit.minDamage}-${unit.maxDamage}</p>
            <p>Health: ${unit.health}</p>
          </div>
        </div>
      </div>
    `;
  }
}