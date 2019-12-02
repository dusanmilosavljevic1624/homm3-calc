import tippy from 'tippy.js';

import unitSpecialityService from '../services/unitSpecialityService';
import spellSpecialityService from '../services/spellSpecialityService';

export default class SpecialtysView {
  init() {
    this.unitSpecialitys = unitSpecialityService.getSpecialitys();
    this.spellSpecialityService = spellSpecialityService.getSpecialitys();
  }
}