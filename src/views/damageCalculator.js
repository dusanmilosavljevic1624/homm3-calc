import Hero from '../models/Hero';
import HeroView from './hero';

import unitService from '../services/unitService';
import spellService from '../services/spellService';
import damageService from '../services/damageService';
import tippy from 'tippy.js';

export default class DamageCalculator {
  init(containerEl) {
    this.attackerUnit = unitService.getUnit('INFERNAL_TROGLODYTE');
    this.attackerHero = new Hero('Christian', 0, 0, 1, 'bless', { 'offense': 3 });

    this.defenderHero = new Hero('Ciele', 0, 0, 1, 'armorer', { 'armorer': 3 });
    this.defenderUnit = unitService.getUnit('IMP');

    this.attackerHeroView = new HeroView({
      hero: this.attackerHero,
      skill: 'Offense',
      containerElId: 'attacker-hero',
      onStatUpdate: this.updateHeroStat.bind(this, 'attacker'),
      onSkillSelect: this.selectSkill.bind(this, 'attacker'),
      onSpecialtySelect: this.selectSpecialty.bind(this, 'attacker')
    });

    this.defenderHeroView = new HeroView({
      hero: this.defenderHero,
      skill: 'Armorer',
      containerElId: 'defender-hero',
      onStatUpdate: this.updateHeroStat.bind(this, 'defender'),
      onSkillSelect: this.selectSkill.bind(this, 'defender'),
      onSpecialtySelect: this.selectSpecialty.bind(this, 'defender')
    });
    
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
    const activeHero = position === 'attacker' ? this.attackerHero : this.defenderHero;

    activeHero[stat] += Number(amount);

    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
  }

  selectSkill(position, skill, level) {
    const activeHero = position === 'attacker' ? this.attackerHero : this.defenderHero;
    const skillSlug = skill.toLowerCase();

    if(activeHero.skills[skillSlug] === Number(level)) {
      activeHero.skills[skillSlug] = null;
    } else {
      activeHero.skills[skillSlug] = Number(level);
    }

    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
  }

  selectSpell(position, spell) {
    const activeUnit = position === 'attacker' ? this.attackerUnit : this.defenderUnit;
    const isSpellActive = activeUnit.spells[spell];

    activeUnit.spells[spell] = isSpellActive ? null : 3;
    
    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
  }

  selectSpecialty(position, speciality) {
    const activeHero = position === 'attacker' ? this.attackerHero : this.defenderHero;

    activeHero.speciality = speciality;

    this.containerEl.innerHTML = this.createUnitsHtml();
    this.bindListeners();
  }
  
  createUnitsHtml() {
    return `
      <div class="row text-center">
        <div class="col-md-6">
          ${this.attackerHeroView.generateHtml()}
          ${this.createUnitHtml('attacker', this.attackerUnit)}
        </div>

        <div class="col-md-6">
          ${this.defenderHeroView.generateHtml()}
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
      const tooltipPrefix = isActive ? 'Turn off' : 'Turn on';

      const spellHtml = `
        <div
          class="spell ${activeClass}"
          data-position="${position}"
          data-spell="${slug}"
          data-tippy-content="${tooltipPrefix} ${slug}">
          <img src="./img/${image}"/>
        </div>
      `;

      return acc += spellHtml;
    }, '');
  }

  createUnitHtml(position, unit) {
    const activeHero = position === 'attacker' ? this.attackerHero : this.defenderHero;
    const activeUnit = position === 'attacker' ? this.attackerUnit : this.defenderUnit;

    const specialtyAttackBonus = damageService.calculateSpecialtyAttackBonus(activeHero, activeUnit);
    const specialtyDefenseBonus = damageService.calculateSpecialtyDefenseBonus(activeHero, activeUnit);

    const createStatHtml = (title, baseDmg, buffedDmg) => {
      const isBuffed = buffedDmg > baseDmg;

      const statBonus = `<span class="stat-bonus">(${buffedDmg})</span>`;

      return `
        <p>${title}: ${baseDmg}${isBuffed ? statBonus : ''}</p>
      `
    };

    const buffedAttack = unit.totalAttackSkill + activeHero.attack + specialtyAttackBonus;
    const buffedDefense = unit.totalDefenseSkill + activeHero.defense + specialtyDefenseBonus;

    return `
      <div id="${position}">
        <p>${position}: ${unit.name}</p>

        <div class="content">
          <div class="image-container">
            <img src="${unit.image}" />
          </div>

          <div class="stats">
            ${createStatHtml('Attack', unit.attack, buffedAttack)}
            ${createStatHtml('Defense', unit.defense, buffedDefense)}
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

    for(let i = 0; i < spells.length; i++) {
      const button = spells[i];
      const { spell, position } = button.dataset;

      button.onclick = this.selectSpell.bind(this, position, spell);
    }

    this.attackerHeroView.bindListeners();
    this.defenderHeroView.bindListeners();

    tippy('.spell');
  }

  createResultsHtml() {
    const detailedDamageInfo = damageService.detailedTotalDamageCalculation(
      this.attackerHero,
      this.defenderHero,
      this.attackerUnit,
      this.defenderUnit
    );

    const {
      minTotalDamage,
      maxTotalDamage,
      kills,
      attackSkillBonus,
      offenseBonus,
      offenseSpecialityBonus,
      defenseSkillReduction,
      armorerReduction,
      armorerSpecialityBonus
    } = detailedDamageInfo;

    const minDamageText = Math.floor(minTotalDamage);
    const maxDamageText = Math.floor(maxTotalDamage);
    const averageDamage = Math.floor((detailedDamageInfo.minTotalDamage + detailedDamageInfo.maxTotalDamage) / 2);
    const killsText = kills.min === kills.max ? `${kills.max}` : `${kills.min}-${kills.max}`;

    const attackSkillBonusText = `${(attackSkillBonus * 100).toFixed(1)}`
    const defenseSkillBonusText = `${(defenseSkillReduction * 100).toFixed(1)}`

    const offenseBonusText = `${(offenseBonus * 100).toFixed(1)}`;
    const offenseSpecialityBonusText = `${((offenseSpecialityBonus * 100)).toFixed(1)}%`;
    const armorerReductionText = `${(armorerReduction * 100).toFixed(1)}`;
    const armorerSpecialityBonusText = `${((armorerSpecialityBonus) * 100).toFixed(2)}%`
    
    const offenseSpecialityBonusHtml = `<p>Offense speciality: <span>${offenseSpecialityBonusText}</span></p>`;
    const armorerSpecialityBonusHtml = `<p>Armorer speciality: <span>${armorerSpecialityBonusText}</span></p>`;

    const totalOffenseBonus = (Math.abs(offenseSpecialityBonus) + Math.abs(offenseBonus)) * 100;
    const totalOffenseBonusText = `${totalOffenseBonus.toFixed(1)}`;

    const totalArmorerBonus = armorerReduction + armorerSpecialityBonus;
    const totalArmorerBonusText = `${(totalArmorerBonus * 100).toFixed(2)}`;

    return `
      <div id="results" class="text-center">
        <h5>Damage</h5>
        <div id="results-damage">
          <p>Range: ${minDamageText}-${maxDamageText}</p>
          <p>Avg: <span>${averageDamage}</span></p>
          <p>Kills: <span>${killsText}</span></p>
        </div>

        <div id="results-bonuses">
        <h5>Bonuses</h5>
        <h5>Reductions</h5>
        <p>Attack skill: ${attackSkillBonusText}%</p>
        <p>Defense skill: ${defenseSkillBonusText}%</p>

        <p>Offense: <span>${offenseBonusText}%</span></p>
        <p>Armorer: <span>${armorerReductionText}%</span></p>

        ${offenseSpecialityBonusHtml}
        ${armorerSpecialityBonusHtml}

        <p>Offense total: <span>${totalOffenseBonusText}%</span></p>
        <p>Armorer total: <span>${totalArmorerBonusText}%</span></p>
        </div>
      </div>
    `;
  }
}