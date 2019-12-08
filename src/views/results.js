export default class Results {
  constructor(containerElId) {
    this.containerEl = document.getElementById(containerElId);
  }

  render(detailedDamageInfo) {
    const {
      minDamageText,
      maxDamageText,
      averageDamage,
      killsText,
      attackSkillBonusText,
      defenseSkillBonusText,
      offenseBonusText,
      armorerReductionText,
      offenseSpecialityBonusHtml,
      armorerSpecialityBonusHtml,
      totalOffenseBonusText,
      totalArmorerBonusText
    } = formatDamageOutput(detailedDamageInfo);

    this.containerEl.innerHTML = `
      <h5>Damage</h5>

      <div id="results-damage">
        <p>Range: ${minDamageText}-${maxDamageText}</p>
        <p>Avg: <span>${averageDamage}</span></p>
        <p>Kills: <span>${killsText}</span></p>
      </div>

      <div id="results-bonuses">
        <h5>Bonuses</h5>
        <h5>Reductions</h5>
        <p>Attack skill: ${attackSkillBonusText}%</p>
        <p>Defense skill: ${defenseSkillBonusText}%</p>

        <p>Offense: <span>${offenseBonusText}%</span></p>
        <p>Armorer: <span>${armorerReductionText}%</span></p>

        ${offenseSpecialityBonusHtml}
        ${armorerSpecialityBonusHtml}

        <p>Offense total: <span>${totalOffenseBonusText}%</span></p>
        <p>Armorer total: <span>${totalArmorerBonusText}%</span></p>
      </div>
    `;
  }
}

function formatDamageOutput(detailedDamageInfo) {
  const {
    minTotalDamage,
    maxTotalDamage,
    kills,
    attackSkillBonus,
    offenseBonus,
    offenseSpecialityBonus,
    defenseSkillReduction,
    armorerReduction,
    armorerSpecialityBonus
  } = detailedDamageInfo;

  const minDamageText = Math.floor(minTotalDamage);
  const maxDamageText = Math.floor(maxTotalDamage);
  const averageDamage = Math.floor((detailedDamageInfo.minTotalDamage + detailedDamageInfo.maxTotalDamage) / 2);
  const killsText = kills.min === kills.max ? `${kills.max}` : `${kills.min}-${kills.max}`;

  const attackSkillBonusText = `${(attackSkillBonus * 100).toFixed(1)}`
  const defenseSkillBonusText = `${(defenseSkillReduction * 100).toFixed(1)}`

  const offenseBonusText = `${(offenseBonus * 100).toFixed(1)}`;
  const offenseSpecialityBonusText = `${((offenseSpecialityBonus * 100)).toFixed(1)}%`;
  const armorerReductionText = `${(armorerReduction * 100).toFixed(1)}`;
  const armorerSpecialityBonusText = `${((armorerSpecialityBonus) * 100).toFixed(2)}%`
  
  const offenseSpecialityBonusHtml = `<p>Offense speciality: <span>${offenseSpecialityBonusText}</span></p>`;
  const armorerSpecialityBonusHtml = `<p>Armorer speciality: <span>${armorerSpecialityBonusText}</span></p>`;

  const totalOffenseBonus = (Math.abs(offenseSpecialityBonus) + Math.abs(offenseBonus)) * 100;
  const totalOffenseBonusText = `${totalOffenseBonus.toFixed(1)}`;

  const totalArmorerBonus = armorerReduction + armorerSpecialityBonus;
  const totalArmorerBonusText = `${(totalArmorerBonus * 100).toFixed(2)}`;
  
  return {
    minDamageText,
    maxDamageText,
    averageDamage,
    killsText,
    attackSkillBonusText,
    defenseSkillBonusText,
    offenseBonusText,
    offenseSpecialityBonusText,
    armorerReductionText,
    armorerSpecialityBonusText,
    offenseSpecialityBonusHtml,
    armorerSpecialityBonusHtml,
    totalOffenseBonus,
    totalOffenseBonusText,
    totalArmorerBonus,
    totalArmorerBonusText
  };
}