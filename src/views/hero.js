import tippy from 'tippy.js';

import spellSpecialityService from '../services/spellSpecialityService';
import unitSpecialityService from '../services/unitSpecialityService';

export default class HeroView {
  constructor(viewData) {
    const {
      hero,
      skill,
      containerElId,
      onStatUpdate,
      onSkillSelect
    } = viewData;

    this.hero = hero;
    this.skill = skill;
    this.containerElId = containerElId;
    this.hasGeneratedHtml = false;
    this.onStatUpdate = onStatUpdate;
    this.onSkillSelect = onSkillSelect;
  }

  createHeroStatButtonHtml(statSlug, amount) {
    const isPositive = amount > 0;

    return `
      <button
        class="btn hero-stat-btn"
        data-stat="${statSlug}"
        data-amount="${amount}">
        ${isPositive ? '+' : '-' }${Math.abs(amount)}
      </button>
    `;
  }

  createHeroStatHtml(stat) {
    const statSlug = stat.toLowerCase();

    return `
      <p>
        <span>${stat}: ${this.hero[statSlug]}</span>

        ${this.createHeroStatButtonHtml(statSlug, 1)}
        ${this.createHeroStatButtonHtml(statSlug, -1)}
        ${this.createHeroStatButtonHtml(statSlug, 5)}
        ${this.createHeroStatButtonHtml(statSlug, -5)}
      </p>
    `;
  }

  createHeroSkillHtml() {
    const skillLevelMap = {
      1: 'Basic',
      2: 'Advanced',
      3: 'Expert'
    };

    const heroSkillLevel = this.hero.skills[this.skill.toLowerCase()];

    const createHeroSkillImage = (skill, level, isActive) => {
      const activeClass = isActive ? 'active' : '';

      return `
        <img
          data-skill=${skill}
          data-level=${level}
          class="hero-skill-btn ${activeClass}"
          src="./img/skills/${skillLevelMap[level]}_${skill}.png"
        />`;
    };

    let skillHtml = '';

    for(let i = 0; i < Object.keys(skillLevelMap).length; i++) {
      skillHtml += createHeroSkillImage(this.skill, i+1, i + 1 === heroSkillLevel);
    }

    return skillHtml;
  }

  createHeroUnitSpecialityHtml(hero, position) {
    const specialitys = unitSpecialityService.getSpecialitys();

    const createUnitSpecialityImage = (speciality) => `
      <img
        src="./img/castle/${speciality.image}"
        class="hero-unit-speciality"
        data-tippy-content="${speciality.name}" />
    `;

    return Object.keys(specialitys).reduce((acc, specialityKey) => {
      acc += createUnitSpecialityImage(specialitys[specialityKey]);
      return acc;
    }, '');
  }

  createHeroSpellSpecialityHtml(hero, position) {
    const specialitys = spellSpecialityService.getSpecialitys();

    const createSpellSpecialityImage = (speciality) => `
      <img
        src="./img/spells/${speciality.image}"
        class="hero-spell-speciality" />
    `;

    return Object.keys(specialitys).reduce((acc, specialityKey) => {
      acc += createSpellSpecialityImage(specialitys[specialityKey]);
      return acc;
    }, '');
  }

  showSpecialityDrawer(element) {
    const drawerElement = document.createElement('div');
    drawerElement.id = 'speciality-drawer';

    drawerElement.innerHTML = `
      <p>Spells</p>
      ${this.createHeroSpellSpecialityHtml()}
      <p>Units</p>
      <div class="unit-specialtys">
        ${this.createHeroUnitSpecialityHtml()}
      </div>
    `; 

    document.getElementById(element).appendChild(drawerElement);

    tippy('.hero-unit-speciality');
  }

  bindStatListeners() {
    const btnSelector = `#${this.containerElId} .hero-stat-btn`; 
    const statButtons = document.querySelectorAll(btnSelector);

    for(let i = 0; i < statButtons.length; i++) {
      statButtons[i].onclick = event => {
        const { onStatUpdate } = this;
        const { stat, amount } = statButtons[i].dataset;
        
        onStatUpdate(stat, amount);
      }
    }
  }

  bindSkillListeners() {
    const skillBtnSelector = `#${this.containerElId} .hero-skill-btn`;
    const skillButtons = document.querySelectorAll(skillBtnSelector);

    for (let i = 0; i < skillButtons.length; i++) {
      skillButtons[i].onclick = event => {
        const { onSkillSelect } = this;
        const { level, skill } = skillButtons[i].dataset;

        onSkillSelect(skill, level);
      }
    }
  }

  bindSpecialityDrawerListeners() {
    const specialityDrawerToggler = document.getElementById('speciality-drawer-test');
    specialityDrawerToggler.onclick = this.showSpecialityDrawer.bind(this, 'speciality-container');
  }

  bindListeners() {
    this.bindStatListeners();
    this.bindSkillListeners();
    this.bindSpecialityDrawerListeners();
  }

  generateHtml() {
    this.hasGeneratedHtml = true;

    return `
      <div id="${this.containerElId}" class="hero text-center">
        <h3>Hero</h3>

        <div class="stats">
          ${this.createHeroStatHtml('Attack')}
          ${this.createHeroStatHtml('Defense')}
          ${this.createHeroStatHtml('Level')}
        </div>

        <div class="spells">
          ${this.createHeroSkillHtml()}
        </div>

        <div class="specialitys">
          <div id="speciality-container">
          <img id="speciality-drawer-test" src="./img/skills/Expert_Offense.png" />
          </div>
        </div>
      </div>
    `;
  }
}
