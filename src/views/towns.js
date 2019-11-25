import towns from '../data/towns';

export default class TownsView {
	constructor() {
		this.towns = towns;
		this.activeTown = this.towns.CASTLE;
	}

	createTownHtml(town) {
		return `
			<div class="town-list-item" data-town="${town.slug}">
				<img src="./img/${town.img}" />
			</div>
		`;
	}

	createTownsHtml() {
		const townsHtml = Object.keys(this.towns).reduce((acc, townKey) => {
			return acc += this.createTownHtml(this.towns[townKey]);
		}, '');

		return `
			<div id="towns-list">
				${townsHtml}
			</div>
		`;
	}

	bindListeners(onTownSelect) {
		const townListItems = document.getElementsByClassName('town-list-item');

		for(let i =0 ; i < townListItems.length; i += 1) {
			townListItems[i].onclick = () => {
				const { town } = townListItems[i].dataset;

				this.activeTown = this.towns[town.toUpperCase()];
				onTownSelect(this.activeTown.units);
			}
		}
	}

	init(containerId, onTownSelect) {
		this.containerEl = document.getElementById(containerId);
		this.containerEl.innerHTML = this.createTownsHtml();
		this.bindListeners(onTownSelect);
	}
}