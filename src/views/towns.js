import towns from '../data/towns';

export default class TownsView {
	constructor() {
		this.towns = towns;
		this.activeTown = this.towns.CASTLE;
	}

	createTownHtml(town) {
		let selectedClass = '';

		console.log('active town: ', this.activeTown);

		if(this.activeTown.slug === town.slug) {
			selectedClass = 'selected';
		} 
		
		return `
			<div class="town-list-item ${selectedClass}" data-town="${town.slug.toUpperCase()}">
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

	bindListeners(onTownSelect, onSelectUnit) {
		const townListItems = document.getElementsByClassName('town-list-item');

		for(let i =0 ; i < townListItems.length; i += 1) {
			townListItems[i].onclick = () => {
				const { town } = townListItems[i].dataset;

				onTownSelect(town.toUpperCase(), onSelectUnit);
				this.activeTown = this.towns[town.toUpperCase()];
				this.containerEl.innerHTML = this.createTownsHtml();
				this.bindListeners(onTownSelect, onSelectUnit);
			}
		}
	}

	init(containerId, onTownSelect, onSelectUnit) {
		this.containerEl = document.getElementById(containerId);
		this.containerEl.innerHTML = this.createTownsHtml();
		this.bindListeners(onTownSelect);
		onTownSelect('CASTLE');
	}
}