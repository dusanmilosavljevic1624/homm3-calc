import tippy from 'tippy.js';

import unitSpecialityService from '../services/unitSpecialityService';
import spellSpecialityService from '../services/spellSpecialityService';

export default class SpecialtysView {
  constructor(drawerData) {
    const { parentElId } = drawerData;

    this.unitSpecialitys = unitSpecialityService.getSpecialitys();
    this.spellSpecialitys = spellSpecialityService.getSpecialitys();

    this.createdHtml = false;
    this.shown = false;

    this.parentElId = parentElId;
  }

  toggle() {
    if(!this.createdHtml) return this.createSpecialityDrawer();

    const containerElSelector = `#${this.parentElId} #speciality-drawer`;
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

  createHeroUnitSpecialityHtml() {
    const specialitys = this.unitSpecialitys;

    const createUnitSpecialityImage = (speciality) => `
      <img
        src="./img/${speciality.image}"
        class="hero-unit-speciality"
        data-tippy-content="${speciality.name}" />
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
        class="hero-spell-speciality" />
    `;

    return Object.keys(specialitys).reduce((acc, specialityKey) => {
      acc += createSpellSpecialityImage(specialitys[specialityKey]);
      return acc;
    }, '');
  }

  createSpecialityDrawer() {
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

    document.getElementById(this.parentElId).appendChild(drawerElement);

    tippy('.hero-unit-speciality');
    this.createdHtml = true;
    this.shown = true;
  }
}