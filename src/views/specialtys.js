import tippy from 'tippy.js';

import unitSpecialityService from '../services/unitSpecialityService';
import spellSpecialityService from '../services/spellSpecialityService';
import skillSpecialtyService from '../services/skillSpecialityService';

export default class SpecialtysView {
  constructor(drawerData) {
    const { parentElId, onSpecialtySelected } = drawerData;

    this.unitSpecialitys = unitSpecialityService.getSpecialitys();
    this.spellSpecialitys = spellSpecialityService.getSpecialitys();
    this.skillSpecialtys = skillSpecialtyService.getSpecialitys();

    this.createdHtml = false;
    this.shown = false;

    this.parentElId = parentElId;
    this.containerElId = 'speciality-container';
    this.onSpecialtySelected = onSpecialtySelected;
  }

  toggle() {
    if(!this.createdHtml) return this.createSpecialityDrawer();

    const containerElSelector = `#${this.parentElId} #${this.containerElId}`;
    const containerEl = document.querySelector(containerElSelector);
    const containerClasses = containerEl.classList;

    if(this.shown) {
      containerClasses.add('d-none');
      this.shown = false;
    } else {
      containerClasses.remove('d-none');
      this.shown = true;
    }
  }
  
  createSkillSpecialtyHtml() {
    const specialtys = this.skillSpecialtys;

    const createSkillSpecialityImage = (speciality) => `
      <img
        src="./img/${speciality.image}"
        data-specialty="${speciality.slug}"
        class="hero-specialty hero-skill-specialty"
        data-tippy-content="Select ${speciality.name}" />
    `;

    return Object.keys(specialtys).reduce((acc, specialtyKey) => {
      acc += createSkillSpecialityImage(specialtys[specialtyKey]);
      return acc;
    }, '');
  }

  createHeroUnitSpecialityHtml() {
    const specialitys = this.unitSpecialitys;

    const createUnitSpecialityImage = (speciality) => `
      <img
        src="./img/${speciality.image}"
        class="hero-specialty hero-unit-specialty"
        data-specialty="${speciality.slug}"
        data-tippy-content="Select ${speciality.name}" />
    `;

    return Object.keys(specialitys).reduce((acc, specialityKey) => {
      acc += createUnitSpecialityImage(specialitys[specialityKey]);
      return acc;
    }, '');
  }

  createHeroSpellSpecialityHtml(hero, position) {
    const specialitys = this.spellSpecialitys;

    const createSpellSpecialityImage = (speciality) => `
      <img
        src="./img/${speciality.image}"
        data-specialty="${speciality.slug}"
        class="hero-specialty hero-spell-specialty"
        data-tippy-content="Select ${speciality.name}" />
    `;

    return Object.keys(specialitys).reduce((acc, specialityKey) => {
      acc += createSpellSpecialityImage(specialitys[specialityKey]);
      return acc;
    }, '');
  }

  bindEvents() {
    const specialtySelector = `#${this.parentElId} .hero-specialty`;
    const specialtysButtons = document.querySelectorAll(specialtySelector);

    for (let i = 0; i < specialtysButtons.length; i++) {
      specialtysButtons[i].onclick = event => {
        const { onSpecialtySelected } = this;
        const { specialty } = specialtysButtons[i].dataset;

        this.createdHtml = false;
        onSpecialtySelected(specialty);
      }      
    }
  }

  createSpecialityDrawer() {
    const drawerElement = document.createElement('div');
    drawerElement.id = 'speciality-drawer';

    drawerElement.innerHTML = `
      <p>Skills</p>
      <div class="skill-specialtys">
        ${this.createSkillSpecialtyHtml()}
      </div>

      <p>Spells</p>
      <div class="spell-specialtys">
        ${this.createHeroSpellSpecialityHtml()}
      </div>

      <p>Units</p>
      <div class="unit-specialtys">
        ${this.createHeroUnitSpecialityHtml()}
      </div>
    `; 

    const selector = `#${this.parentElId} #${this.containerElId}`;
    document.querySelector(selector).appendChild(drawerElement);

    tippy('.hero-skill-specialty');
    tippy('.hero-unit-specialty');
    tippy('.hero-spell-specialty');
    this.createdHtml = true;
    this.shown = true;
    this.bindEvents();
  }
}