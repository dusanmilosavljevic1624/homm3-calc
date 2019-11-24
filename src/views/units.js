import units from '../data/units';

class UnitsView {
	constructor(elementId) {
		this.units = units;

		this.init(elementId);
	}

	createUnitList() {
		const unitsHtml = Object.keys(this.units).reduce((acc, unitKey) => {
			return acc += this.createUnitlistItem(this.units[unitKey]);
		}, '');

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
					<img src="./img/castle/${unit.name.replace(' ', '_')}.gif" />
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

	init(elementId) {
		this.containerElement = document.getElementById(elementId);
		this.createUnitList();
	}
}

export default new UnitsView('units', units);