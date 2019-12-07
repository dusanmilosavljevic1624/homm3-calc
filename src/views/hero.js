import specialtyService from '../services/specialityService';

import SpecialityDrawerView from './specialtys';
import tippy from 'tippy.js';

export default class HeroView {
  constructor(viewData) {
    const {
      hero,
      skill,
      containerElId,
      onStatUpdate,
      onSkillSelect,
      onSpecialtySelect
    } = viewData;

    this.hero = hero;
    this.skill = skill;
    this.containerElId = containerElId;
    this.hasGeneratedHtml = false;
    this.onStatUpdate = onStatUpdate;
    this.onSkillSelect = onSkillSelect;
    this.onSpecialtySelect = onSpecialtySelect;

    this.specialityDrawer = new SpecialityDrawerView({
      parentElId: this.containerElId,
      onSpecialtySelected: this.selectSpecialty.bind(this)
    });
  }

  selectSpecialty(specialty) {
    const { onSpecialtySelect } = this;
    onSpecialtySelect(specialty);
  }

  createHeroStatButtonHtml(statSlug, amount) {
    const isPositive = amount > 0;
    const prefix = isPositive ? 'Increase' : 'Decrease';

    return `
      <button
        class="btn hero-stat-btn"
        data-stat="${statSlug}"
        data-amount="${amount}"
        data-tippy-content="${prefix} ${statSlug} by ${Math.abs(amount)}">
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
      const tooltipPrefix = isActive ? 'Turn off' : 'Turn on';

      return `
        <img
          data-skill=${skill}
          data-level=${level}
          class="hero-skill-btn ${activeClass}"
          data-tippy-content="${tooltipPrefix} ${skillLevelMap[level]} ${skill}"
          src="./img/${skillLevelMap[level]}_${skill}.png"
        />`;
    };

    let imagesHtml = '';

    for(let i = 0; i < Object.keys(skillLevelMap).length; i++) {
      imagesHtml += createHeroSkillImage(this.skill, i+1, i + 1 === heroSkillLevel);
    }

    return `
      <div class="skills-container">
        ${imagesHtml}
      </div>

      <div class="skill-info">
        <p>${this.skill}</p>
        <p>${skillLevelMap[heroSkillLevel] || 'None'}</p>
      </div>
    `;
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

    tippy('.hero-stat-btn');
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

    tippy('.hero-skill-btn');
  }

  bindSpecialityDrawerListeners() {
    const drawerSelector = `#${this.containerElId} .active-specialty`;
    const specialityDrawerToggler = document.querySelector(drawerSelector);
    specialityDrawerToggler.onclick = this.specialityDrawer.toggle.bind(this.specialityDrawer);
    tippy('.active-specialty');
  }

  bindListeners() {
    this.bindStatListeners();
    this.bindSkillListeners();
    this.bindSpecialityDrawerListeners();
  }

  generateHtml() {
    const speciality = specialtyService.getSpeciality(this.hero.speciality);
    this.hasGeneratedHtml = true;

    return `
      <div id="${this.containerElId}" class="hero text-center">
        <h3>Hero</h3>

        <div class="stats">
          ${this.createHeroStatHtml('Attack')}
          ${this.createHeroStatHtml('Defense')}
          ${this.createHeroStatHtml('Level')}
        </div>

        <div class="skills">
          ${this.createHeroSkillHtml()}
        </div>

        <div class="specialitys">
          <div class="active-specialty" data-tippy-content="Change specialty">
            <div class="image-container">
              <img id="speciality-drawer-test" class="img-fluid" src="./img/${speciality.image}" />
            </div>

            <div class="content">
              <p>Speciality</p>
              <p>${speciality.name}<p>
            </div>
          </div>
   
          <div id="speciality-container"></div>
        </div>
      </div>
    `;
  }
}
