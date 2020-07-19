import tippy from 'tippy.js';

import unitSpecialityService from '../services/unitSpecialityService';
import spellSpecialityService from '../services/spellSpecialityService';
import skillSpecialtyService from '../services/skillSpecialityService';

export default class SpecialtyModal {
	constructor({ parentElId, onSpecialtySelected }) {
		this.containerEl = document.getElementById(parentElId);
		this.contentEl = document.getElementById('specialty-modal-content');
		this.cancelEl = null;

		this.position = null;

		this.unitSpecialitys = unitSpecialityService.getSpecialitys();
		this.spellSpecialitys = spellSpecialityService.getSpecialitys();
		this.skillSpecialtys = skillSpecialtyService.getSpecialitys();

		this.onSpecialtySelected = onSpecialtySelected;
	}

	show(position) {
		this.position = position;
		this.generateHtml();
		this.containerEl.classList.add('shown');
	}

	hide() {
		this.containerEl.classList.remove('shown');
	}

	generateHtml() {
		this.contentEl.innerHTML = `
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
			
			<div class="footer">
				<button id="specialty-modal-close-btn">Close</button>
			</div>
		`;

		tippy('.hero-skill-specialty');
		tippy('.hero-unit-specialty');
		tippy('.hero-spell-specialty');

		this.cancelEl = document.getElementById('specialty-modal-close-btn');
		this.cancelEl.onclick = this.hide.bind(this);
		this.bindEvents();
	}

	bindEvents() {
		const specialtySelector = '#specialty-modal .hero-specialty';
		const specialtyButtons = document.querySelectorAll(specialtySelector);

		/* eslint-disable-next-line no-restricted-syntax */
		for (const specialtyButton of specialtyButtons) {
			specialtyButton.onclick = () => {
				const { onSpecialtySelected } = this;
				const { specialty, position } = specialtyButton.dataset;

				this.createdHtml = false;
				onSpecialtySelected(specialty, position);
				this.hide();
			};
		}
	}

	createSkillSpecialtyHtml() {
		const specialtys = this.skillSpecialtys;

		const createSkillSpecialityImage = (speciality) => `
      <img
        src="./img/${speciality.image}"
				data-specialty="${speciality.slug}"
				data-position="${this.position}"
        class="hero-specialty hero-skill-specialty"
        data-tippy-content="Select ${speciality.name}" />
    `;

		return Object.keys(specialtys).reduce((acc, specialtyKey) => {
			/* eslint-disable-next-line no-param-reassign */
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
				data-position="${this.position}"
        data-tippy-content="Select ${speciality.name}" />
    `;

		return Object.keys(specialitys).reduce((acc, specialityKey) => {
			/* eslint-disable-next-line no-param-reassign */
			acc += createUnitSpecialityImage(specialitys[specialityKey]);
			return acc;
		}, '');
	}

	createHeroSpellSpecialityHtml() {
		const specialitys = this.spellSpecialitys;

		const createSpellSpecialityImage = (speciality) => `
      <img
        src="./img/${speciality.image}"
				data-specialty="${speciality.slug}"
				data-position="${this.position}"
        class="hero-specialty hero-spell-specialty"
        data-tippy-content="Select ${speciality.name}" />
    `;

		return Object.keys(specialitys).reduce((acc, specialityKey) => {
			/* eslint-disable-next-line no-param-reassign */
			acc += createSpellSpecialityImage(specialitys[specialityKey]);
			return acc;
		}, '');
	}
}
