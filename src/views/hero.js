/* eslint-disable no-shadow */
import tippy from 'tippy.js';

import specialtyService from '../services/specialityService';

import SpecialityDrawerView from './specialtys';
import SpecialtyModal from './specialtyModal';

export default class HeroView {
	constructor(viewData) {
		const {
			hero,
			skills,
			containerElId,
			onStatUpdate,
			onSkillSelect,
			onSpecialtySelect,
			title,
			position,
		} = viewData;

		this.hero = hero;
		this.skills = skills;
		this.containerElId = containerElId;
		this.hasGeneratedHtml = false;
		this.title = title;
		this.position = position;
		this.onStatUpdate = onStatUpdate;
		this.onSkillSelect = onSkillSelect;
		this.onSpecialtySelect = onSpecialtySelect;

		this.specialityDrawer = new SpecialityDrawerView({
			parentElId: this.containerElId,
			onSpecialtySelected: this.selectSpecialty.bind(this),
		});

		this.specialtyModal = new SpecialtyModal({
			parentElId: 'specialty-modal',
			position: this.position,
			onSpecialtySelected: this.selectSpecialty.bind(this, this.position),
		});
	}

	selectSpecialty(position, specialty) {
		const { onSpecialtySelect } = this;
		onSpecialtySelect(position, specialty);
	}

	/* eslint-disable-next-line class-methods-use-this */
	createHeroStatButtonHtml(statSlug, amount) {
		const isPositive = amount > 0;
		const prefix = isPositive ? 'Increase' : 'Decrease';

		return `
      <button
        class="btn hero-stat-btn"
        data-stat="${statSlug}"
        data-amount="${amount}"
        data-tippy-content="${prefix} ${statSlug} by ${Math.abs(amount)}">
        ${isPositive ? '+' : '-'}${Math.abs(amount)}
      </button>
    `;
	}

	createHeroStatHtml(stat) {
		const statSlug = stat.toLowerCase();

		return `
			<div class="hero-stat-container"
				data-tippy-content="Type in hero ${stat}">
				<p>${stat}</p>
				<img src="./img/Hero_${stat}.png" />
				<input
					class="hero-stat-input"
					data-stat="${statSlug}"
					type="number"
					min="0"
					value="${this.hero[statSlug]}"
					step="1"
					tabindex="1"
				>
			</div>
		`;
	}

	createHeroSkillsHtml() {
		/* eslint-disable-next-line no-return-assign, no-param-reassign */
		const reducer = (acc, skill) => (acc += this.createHeroSkillHtml(skill));
		return this.skills.reduce(reducer, '');
	}

	createHeroSkillHtml(skill) {
		const skillLevelMap = {
			1: 'Basic',
			2: 'Advanced',
			3: 'Expert',
		};

		const skillSlug = skill.name.toLowerCase().split(' ').join('_');
		const heroSkillLevel = this.hero.skills[skillSlug];

		const createHeroSkillImage = (skill, level, isActive) => {
			const activeClass = isActive ? 'active' : '';
			const tooltipPrefix = isActive ? 'Turn off' : 'Turn on';
			const skillName = skill.name;

			const tooltipContent = `
				<div class='hero-skill-tooltip'>
					<p>${tooltipPrefix} ${skillLevelMap[level]} ${skillName}</p>
					<p>${skill.description}</p>
				</div>
			`;

			const skillImage = `${skillLevelMap[level]}_${skill.name
				.split(' ')
				.join('_')}`;

			return `
        <img
          data-skill=${skillSlug}
          data-level=${level}
          class="hero-skill-btn ${activeClass}"
          data-tippy-content="${tooltipContent}"
          src="./img/${skillImage}.png"
        />`;
		};

		let imagesHtml = '';

		for (let i = 0; i < Object.keys(skillLevelMap).length; i += 1) {
			imagesHtml += createHeroSkillImage(
				skill,
				i + 1,
				i + 1 === heroSkillLevel
			);
		}

		return `
      <div class="skill">
        <div class="skill-images">
          ${imagesHtml}
        </div>
      </div>
    `;
	}

	bindStatListeners() {
		const inputSelector = `#${this.containerElId} .hero-stat-input`;
		const statInputs = document.querySelectorAll(inputSelector);

		/* eslint-disable-next-line no-restricted-syntax */
		for (const statInput of statInputs) {
			statInput.addEventListener('change', () => {
				const { onStatUpdate } = this;
				const newValue = statInput.value < 0 ? 0 : statInput.value;
				onStatUpdate(statInput.dataset.stat, newValue);
				statInput.focus();
			});
		}

		tippy('.hero-stat-container');
	}

	bindSkillListeners() {
		const skillBtnSelector = `#${this.containerElId} .hero-skill-btn`;
		const skillButtons = document.querySelectorAll(skillBtnSelector);

		for (let i = 0; i < skillButtons.length; i += 1) {
			skillButtons[i].onclick = () => {
				const { onSkillSelect } = this;
				const { level, skill } = skillButtons[i].dataset;

				onSkillSelect(skill, level);
			};
		}

		tippy('.hero-skill-btn');
	}

	bindSpecialityDrawerListeners() {
		const drawerSelector = `#${this.containerElId} .active-specialty`;
		const specialityDrawerToggler = document.querySelector(drawerSelector);

		// specialityDrawerToggler.onclick = this.specialityDrawer.toggle.bind(
		// this.specialityDrawer
		// );

		specialityDrawerToggler.onclick = this.specialtyModal.show.bind(
			this.specialtyModal,
			this.position
		);

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

		const specialtyTooltip = (specialty) => `
			<div class='hero-specialty-tooltip'>
				<p>Specialty: ${specialty.name}</p>
				<p>${specialty.description}</p>
			</div>
		`;

		return `
			<div id="${this.containerElId}" class="hero text-center">
				<p class="hero-title">${this.title}</p>

        <div class="stats">
          ${this.createHeroStatHtml('Attack')}
          ${this.createHeroStatHtml('Defense')}
					${this.createHeroStatHtml('Level')}
					
					<div
						class="active-specialty active-hero-specialty"
						data-tippy-content="${specialtyTooltip(speciality)}"
					>
						<p>Specialty</p>
						<img src="./img/${speciality.image}" />
					</div>
        </div>

        <div class="skills">
          ${this.createHeroSkillsHtml()}
        </div>
      </div>
    `;
	}
}
