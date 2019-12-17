import tippy from 'tippy.js';

import unitService from '../services/unitService';

export default class UnitsView {
  showUnits(town) {
    this.units = unitService.getTownUnits(town);
    this.createUnitList();
    this.bindListeners();
  }

  createUnitList() {
    const unitsHtml = Object.keys(this.units).reduce((acc, unitKey) => acc += this.createUnitlistItem(this.units[unitKey]), '');

    this.containerElement.innerHTML = `
			<div id="unit-list" class="row">
				${unitsHtml}
			</div>
		`;
  }

  createUnitlistItem(unit) {
    return `
			<div class="unit-list-item d-flex flex-column col-md-6 text-center">
				<div class="unit-list-item-header">
					<p>${unit.name}</p>
				</div>

				<div class="d-flex flex-row unit-list-item-body">
					<div class="select-overlay">
						<button class="btn unit-selector" data-tippy-content="Set ${unit.name} as attacker" data-slug="${unit.slug}" data-position="attacker">ATTACKER</button>					
						<button class="btn unit-selector" data-tippy-content="Set ${unit.name} as defender" data-slug="${unit.slug}" data-position="defender">DEFENDER</button>					
					</div>

					<div class="unit-image">
						<img src="./img/${this.generateImageName(unit.name)}.gif" />
					</div>

					<div class="unit-list-item-info">
						<p>Attack: <span>${unit.attack}</span><p>
						<p>Defense: <span>${unit.defense}</span><p>
						<p>Damage: <span>${unit.minDamage}-${unit.maxDamage}</span><p>
						<p>Health: <span>${unit.health}</span><p>
						<p>Speed: <span>${unit.speed}</span><p>
						<p>Growth: <span>${unit.growth}</span><p>
						<p>AI value: <span>${unit.aiValue}</span><p>
						<p>cost: <span>${unit.cost}</span><p>
					</div>
				</div>
			</div>
		`;
  }

  bindListeners() {
    const buttons = document.getElementsByClassName('unit-selector');

    for (let i = 0; i < buttons.length; i++) {
      const { onUnitSelected } = this;
      const { position, slug } = buttons[i].dataset;

      buttons[i].onclick = onUnitSelected.bind(null, { position, slug });
    }

    tippy('.unit-selector');
  }

  init(elementId, onUnitSelected) {
    this.containerElement = document.getElementById(elementId);
    this.onUnitSelected = onUnitSelected;
  }

  generateImageName(unitName) {
    let splitWords = unitName.split(' ');
    const hasMultipleWords = splitWords.length > 1;

    if (!hasMultipleWords) return unitName;

    splitWords = splitWords.map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`);

    return splitWords.join('_');
  }
}
