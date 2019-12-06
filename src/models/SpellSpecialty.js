import Specialty from './Specialty';

export default class SpellSpecialty extends Specialty{
  constructor(slug, name, image, spellType) {
    super(slug, name, image, 'spell');
    this.spellType = spellType;
  }
}