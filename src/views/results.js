export default class Results {
  constructor(containerElId) {
    this.containerEl = document.getElementById(containerElId);
  }

  render(detailedDamageInfo) {
    const {
      minDamageText,
      maxDamageText,
      minTotalRangedDamage,
      maxTotalRangedDamage,
      averageDamage,
      averageRangedDamage,
      kills,
      rangedKills,
      attackSkillBonusText,
      defenseSkillBonusText,
      offenseBonusText,
      armorerReductionText,
      offenseSpecialityBonusHtml,
      archeryBonus, 
      archerySpecialtyBonus,
      armorerSpecialityBonusHtml,
      totalOffenseBonusText,
      totalArmorerBonusText,
      meleePenaltyReduction
    } = formatDamageOutput(detailedDamageInfo);

    const headerData = {
      minDamageText,
      maxDamageText,
      minTotalRangedDamage,
      maxTotalRangedDamage,
      averageDamage,
      averageRangedDamage,
      kills,
      rangedKills
    };

    this.containerEl.innerHTML = `
      ${createResultsHeader(headerData)}

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

        <p>Archery bonus: <span>${archeryBonus * 100}%</span></p>
        <p>Melee penalty: <span>${meleePenaltyReduction * 100}%</span></p>
      </div>
    `;
  }
}

function createResultsHeader(detailedDamageInfo) {
  const {
    minDamageText,
    maxDamageText,
    averageDamage,
    averageRangedDamage,
    kills,
    rangedKills,
    minTotalRangedDamage,
    maxTotalRangedDamage,
  } = detailedDamageInfo;

  const meleeHeaderData = {
    title: 'Melee damage',
    minDamage: minDamageText,
    maxDamage: maxDamageText,
    averageDamage,
    kills
  };

  const rangedHeaderData = {
    title: 'Ranged damage',
    minDamage: minTotalRangedDamage,
    maxDamage: maxTotalRangedDamage,
    averageDamage: averageRangedDamage,
    kills: rangedKills
  };

  const meleeHeader = createResultsHeaderItem(meleeHeaderData);
  const rangedHeader = maxTotalRangedDamage > 0 ? createResultsHeaderItem(rangedHeaderData) : '';

  const headerHtml = rangedHeader + meleeHeader;

  return `
    <div id="results-header">
      ${headerHtml}
    </div>
  `;
}

function createResultsHeaderItem(damageDetails) {
  const { title, minDamage, maxDamage, averageDamage, kills } = damageDetails;
  const minDamageText = Math.floor(minDamage);
  const maxDamageText = Math.floor(maxDamage);
  const averageDamageText = Math.floor(averageDamage).toPrecision();

  const rangeText = minDamage === maxDamage ? `${maxDamageText}` : `${minDamageText}-${maxDamageText}`;
  const killsText = kills.min === kills.max ? `${kills.max}` : `${kills.min}-${kills.max}`;

  return `
    <h5>${title}</h5>

    <div id="results-damage">
      <p>Range: ${rangeText}</p>
      <p>Avg: <span>${averageDamageText}</span></p>
      <p>Kills: <span>${killsText}</span></p>
    </div>
  `;
}

function formatDamageOutput(detailedDamageInfo) {
  const {
    minTotalDamage,
    maxTotalDamage,
    kills,
    minTotalRangedDamage,
    maxTotalRangedDamage,
    rangedKills,
    attackSkillBonus,
    offenseBonus,
    offenseSpecialityBonus,
    archeryBonus,
    defenseSkillReduction,
    armorerReduction,
    armorerSpecialityBonus,
    meleePenaltyReduction
  } = detailedDamageInfo;

  const minDamageText = Math.floor(minTotalDamage);
  const maxDamageText = Math.floor(maxTotalDamage);
  const averageDamage = Math.floor((detailedDamageInfo.minTotalDamage + detailedDamageInfo.maxTotalDamage) / 2);

  const averageRangedDamage = Math.floor((detailedDamageInfo.minTotalRangedDamage + detailedDamageInfo.maxTotalRangedDamage) / 2);

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
    minTotalRangedDamage,
    maxTotalRangedDamage,
    averageDamage,
    averageRangedDamage,
    kills,
    rangedKills,
    attackSkillBonusText,
    defenseSkillBonusText,
    offenseBonusText,
    offenseSpecialityBonusText,
    armorerReductionText,
    armorerSpecialityBonusText,
    offenseSpecialityBonusHtml,
    archeryBonus,
    armorerSpecialityBonusHtml,
    totalOffenseBonus,
    totalOffenseBonusText,
    totalArmorerBonus,
    totalArmorerBonusText,
    meleePenaltyReduction
  };
}