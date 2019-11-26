import Hero from '../models/Hero';

import unitService from '../services/unitService';
import spellService from '../services/spellService';

export default class DamageCalculator {
  init(containerEl) {
    this.attackerUnit = unitService.getUnit('INFERNAL_TROGLODYTE');
    this.attackerHero = new Hero('Christian', 0, 0, 1, 'armorer', { 'armorer': 3 });

    this.defenderHero = new Hero('Ciele', 0, 0, 1, 'offense', { 'offense': 3 });
    this.defenderUnit = unitService.getUnit('IMP');

    this.containerEl = document.getElementById(containerEl); 
    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
  }

  selectUnit(unitInfo) {
    if(unitInfo.position === 'attacker') {
      this.attackerUnit = unitService.getUnit(unitInfo.slug);
    } else if(unitInfo.position === 'defender') {
      this.defenderUnit = unitService.getUnit(unitInfo.slug);
    }

    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
  }

  selectSpell(position, spell) {
    if(position === 'attacker') {

      if(this.attackerUnit.spells[spell]) {
        this.attackerUnit.spells[spell] = null;
      } else {
        this.attackerUnit.spells[spell] = 3;
      }
    }

    if(position === 'defender') {
      if(this.defenderUnit.spells[spell]) {
        this.defenderUnit.spells[spell] = null;
      } else {
        this.defenderUnit.spells[spell] = 3;
      }
    }

    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
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

  createSpellsHtml(position, unitSpells) {
    const spells = spellService.getSpellsByType(position);

    return Object.keys(spells).reduce((acc, spellKey) => {
      const { image, slug } = spells[spellKey];
      const isActive = !!unitSpells[slug];
      const activeClass = isActive ? 'active' : '';

      const spellHtml = `
        <div class="spell ${activeClass}" data-position="${position}" data-spell="${slug}">
          <img src="./img/spells/${image}"/>
        </div>
      `;

      return acc += spellHtml;
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
          ${this.createSpellsHtml(position, unit.spells)}
        </div>
      </div>
    `;
  }

  bindListeners() {
    const spells = document.getElementsByClassName('spell');

    for(let i = 0; i < spells.length; i++) {
      const button = spells[i];
      const { spell, position } = button.dataset;

      button.onclick = this.selectSpell.bind(this, position, spell);
    }
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