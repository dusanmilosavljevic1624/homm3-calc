import Unit from '../models/Unit';
import Hero from '../models/Hero';

import unitService from '../services/unitService';
import spellService from '../services/spellService';

export default class DamageCalculator {
  init(containerEl) {
    this.attackerUnit = new Unit(unitService.getUnit('INFERNAL_TROGLODYTE'));
    this.attackerHero = new Hero('Christian', 0, 0, 1, 'armorer', { 'armorer': 3 });

    this.defenderHero = new Hero('Ciele', 0, 0, 1, 'offense', { 'offense': 3 });
    this.defenderUnit = new Unit(unitService.getUnit('IMP'));

    this.containerEl = document.getElementById(containerEl); 
    this.containerEl.innerHTML = this.createUnitsHtml();
  }

  selectUnit(unitInfo) {
    if(unitInfo.position === 'attacker') {
      this.attackerUnit = unitService.getUnit(unitInfo.slug);
    } else if(unitInfo.position === 'defender') {
      this.defenderUnit = unitService.getUnit(unitInfo.slug);
    }

    this.containerEl.innerHTML = this.createUnitsHtml();
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

  createSpellsHtml(spellType) {
    const spells = spellService.getSpellsByType(spellType);

    return Object.keys(spells).reduce((acc, spellKey) => {
      const { image } = spells[spellKey];
      return acc += `<div class="spell"><img src="./img/spells/${image}" /></div>`
    }, '');
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

        <div class="spells">
          ${this.createSpellsHtml(position)}
        </div>
      </div>
    `;
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
}