import Hero from '../models/Hero';

import unitService from '../services/unitService';
import spellService from '../services/spellService';
import damageService from '../services/damageService';

export default class DamageCalculator {
  init(containerEl) {
    this.attackerUnit = unitService.getUnit('INFERNAL_TROGLODYTE');
    this.attackerHero = new Hero('Christian', 0, 0, 1, 'armorer', { 'offense': 3 });

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

  updateHeroStat(position, stat, amount) {
    if(position === 'attacker') {
      this.attackerHero[stat] += Number(amount);
    } else if(position === 'defender') {
      this.defenderHero[stat] += Number(amount);
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

  createHeroHtml(position, hero) {
    return `
      <div class="hero text-center">
        <h3>Hero</h3>

        <div class="stats">
          ${this.createHeroStatHtml(hero, 'Attack', position)}
          ${this.createHeroStatHtml(hero, 'Defense', position)}
          ${this.createHeroStatHtml(hero, 'Level', position)}
        </div>
      </div>
    `;
  }

  createHeroStatHtml(hero, stat, position) {
    const statSlug = stat.toLowerCase();

    return `
      <p>
        <span>
          ${stat}: ${hero[statSlug]}
        </span>

        ${this.createHeroStatButtonHtml(statSlug, 1, position)}
        ${this.createHeroStatButtonHtml(statSlug, -1, position)}
        ${this.createHeroStatButtonHtml(statSlug, 5, position)}
        ${this.createHeroStatButtonHtml(statSlug, -5, position)}
      </p>
    `
  }

  createHeroStatButtonHtml(statSlug, amount, position) {
    const isPositive = amount > 0;

    return `
      <button
        class="btn hero-stat-btn"
        data-stat="${statSlug}"
        data-amount="${amount}"
        data-position="${position}">
        ${isPositive ? '+' : '-' }${Math.abs(amount)}
      </button>
    `;
  }

  createUnitsHtml() {
    return `
      <div class="row text-center">
        <div class="col-md-6">
          ${this.createHeroHtml('attacker', this.attackerHero)}
          ${this.createUnitHtml('attacker', this.attackerUnit)}
        </div>

        <div class="col-md-6">
          ${this.createHeroHtml('defender', this.defenderHero)}
          ${this.createUnitHtml('defender', this.defenderUnit)}
        </div>


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
    const activeHero = position === 'attacker' ? this.attackerHero : this.defenderHero;
  
    const createStatHtml = (title, baseDmg, buffedDmg) => {
      const isBuffed = buffedDmg > baseDmg;

      const statBonus = `<span class="stat-bonus">(${buffedDmg})</span>`;

      return `
        <p>${title}: ${baseDmg}${isBuffed ? statBonus : ''}</p>
      `
    };

    return `
      <div id="${position}">
        <p>${position}: ${unit.name}</p>

        <div class="content">
          <img src="${unit.image}" />

          <div class="stats">
            ${createStatHtml('Attack', unit.attack, (unit.totalAttackSkill + activeHero.attack))}
            ${createStatHtml('Defense', unit.defense, (unit.totalDefenseSkill + activeHero.defense))}
            ${createStatHtml('Min Damage', unit.minDamage, unit.minTotalDamage)}
            ${createStatHtml('Max Damage', unit.maxDamage, unit.maxTotalDamage)}
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
    const statButtons = document.getElementsByClassName('hero-stat-btn');

    for(let i = 0; i < spells.length; i++) {
      const button = spells[i];
      const { spell, position } = button.dataset;

      button.onclick = this.selectSpell.bind(this, position, spell);
    }

    for(let i = 0; i < statButtons.length; i++) {
      const statButton = statButtons[i];
      const { stat, amount, position } = statButton.dataset;
      
      statButton.onclick = this.updateHeroStat.bind(this, position, stat, amount);
    }
  }

  createResultsHtml() {
    const damageInfo = damageService.calculateTotalDamage(
      this.attackerHero,
      this.defenderHero,
      this.attackerUnit,
      this.defenderUnit
    );

    console.log('info: ', damageInfo);

    return `
      <div id="results" class="text-center">
        <p>Damage done: ${Number(damageInfo.damage).toFixed(2)}</p>
        <p>Damage bonus: ${Number(damageInfo.totalBonus).toFixed(2)}</p>
        <p>Damage reduction: ${Number(damageInfo.totalReduction).toFixed(2)}</p>
      </div>
    `
  }
}