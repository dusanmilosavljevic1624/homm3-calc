import tippy from 'tippy.js';

import Hero from '../models/Hero';
import HeroView from './hero';
import ResultsView from './results';

import unitService from '../services/unitService';
import spellService from '../services/spellService';
import damageService from '../services/damageService';

export default class DamageCalculator {
	init(containerEl) {
		this.attackerUnit = unitService.getUnit('INFERNAL_TROGLODYTE', 'SOD');
		this.attackerHero = new Hero('Christian', 0, 0, 1, 'bless', {
			offense: 3,
			archery: 3,
		});

		this.defenderHero = new Hero('Ciele', 0, 0, 1, 'armorer', { armorer: 3 });
		this.defenderUnit = unitService.getUnit('IMP', 'SOD');

		this.attackerHeroView = new HeroView({
			hero: this.attackerHero,
			skills: ['Offense', 'Archery'],
			containerElId: 'attacker-hero',
			onStatUpdate: this.updateHeroStat.bind(this, 'attacker'),
			onSkillSelect: this.selectSkill.bind(this, 'attacker'),
			onSpecialtySelect: this.selectSpecialty.bind(this, 'attacker'),
		});

		this.defenderHeroView = new HeroView({
			hero: this.defenderHero,
			skills: ['Armorer'],
			containerElId: 'defender-hero',
			onStatUpdate: this.updateHeroStat.bind(this, 'defender'),
			onSkillSelect: this.selectSkill.bind(this, 'defender'),
			onSpecialtySelect: this.selectSpecialty.bind(this, 'defender'),
		});

		this.containerEl = document.getElementById(containerEl);

		this.render();
	}

	render() {
		this.containerEl.innerHTML = this.createUnitsHtml();
		this.renderResults();
		this.bindListeners();
	}

	selectUnit(unitInfo, version) {
		if (unitInfo.position === 'attacker') {
			this.attackerUnit = unitService.getUnit(unitInfo.slug, version);
		} else if (unitInfo.position === 'defender') {
			this.defenderUnit = unitService.getUnit(unitInfo.slug, version);
		}

		this.render();
	}

	updateHeroStat(position, stat, value) {
		const activeHero = this.getHeroByPosition(position);
		activeHero[stat] = Number(value);

		this.render();
	}

	selectSkill(position, skill, level) {
		const activeHero = this.getHeroByPosition(position);
		const skillSlug = skill.toLowerCase();

		if (activeHero.skills[skillSlug] === Number(level)) {
			activeHero.skills[skillSlug] = null;
		} else {
			activeHero.skills[skillSlug] = Number(level);
		}

		this.render();
	}

	selectSpell(position, spell) {
		const activeUnit = this.getUnitByPosition(position);
		const isSpellActive = activeUnit.spells[spell];

		activeUnit.spells[spell] = isSpellActive ? null : 3;

		this.render();
	}

	selectSpecialty(position, speciality) {
		const activeHero = this.getHeroByPosition(position);
		activeHero.speciality = speciality;

		this.render();
	}

	getHeroByPosition(position) {
		const heroPositionMap = {
			attacker: this.attackerHero,
			defender: this.defenderHero,
		};

		return heroPositionMap[position];
	}

	getUnitByPosition(position) {
		const unitPositionMap = {
			attacker: this.attackerUnit,
			defender: this.defenderUnit,
		};

		return unitPositionMap[position];
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

        <div id="results"></div>
      </div>
    `;
	}

	/* eslint-disable-next-line class-methods-use-this */
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

			return acc + spellHtml;
		}, '');
	}

	createUnitHtml(position, unit) {
		/* eslint-disable max-len */
		const activeHero = this.getHeroByPosition(position);
		const activeUnit = this.getUnitByPosition(position);

		const specialtyAttackBonus = damageService.calculateSpecialtyAttackBonus(
			activeHero,
			activeUnit
		);
		const specialtyDefenseBonus = damageService.calculateSpecialtyDefenseBonus(
			activeHero,
			activeUnit
		);

		const createStatHtml = (title, baseDmg, buffedDmg) => {
			const isBuffed = buffedDmg > baseDmg;

			const statBonus = `<span class="stat-bonus">(${buffedDmg})</span>`;

			return `
        <p>${title}: ${baseDmg}${isBuffed ? statBonus : ''}</p>
      `;
		};

		const buffedAttack =
			unit.totalAttackSkill + activeHero.attack + specialtyAttackBonus;
		const buffedDefense =
			unit.totalDefenseSkill + activeHero.defense + specialtyDefenseBonus;

		return `
      <div id="${position}">
        <p>${position}: ${unit.name}</p>

        <div class="content">
          <div class="image-container">
            <div class="unit-count">
							<input
								class="unit-count-field"
								type="number"
								value="${unit.count}"
								max="9999"
								data-position="${position}"
							/>
						</div>

            <img src="./img/${unit.image}" />
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

		for (let i = 0; i < spells.length; i += 1) {
			const button = spells[i];
			const { spell, position } = button.dataset;

			button.onclick = this.selectSpell.bind(this, position, spell);
		}

		const unitCounts = document.getElementsByClassName('unit-count-field');

		for (let i = 0; i < unitCounts.length; i += 1) {
			const field = unitCounts[i];
			field.onchange = (event) => {
				const { value, dataset } = event.target;
				const activeUnit = this.getUnitByPosition(dataset.position);

				activeUnit.count = value;

				this.render();
			};
		}

		this.attackerHeroView.bindListeners();
		this.defenderHeroView.bindListeners();

		tippy('.spell');
	}

	renderResults() {
		const detailedDamageInfo = damageService.detailedTotalDamageCalculation(
			this.attackerHero,
			this.defenderHero,
			this.attackerUnit,
			this.defenderUnit
		);

		this.resultsView = new ResultsView('results');
		this.resultsView.render(detailedDamageInfo);
	}
}
