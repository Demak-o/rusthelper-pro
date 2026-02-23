const raidData = {
  "Sheet Metal Door": { hp: 250, methods: { rockets: 2, c4: 1, exploammo: 63, satchel: 4 }, hybrid: { rockets: 1, exploammo: 8 } },
  "Garage Door": { hp: 600, methods: { rockets: 3, c4: 2, exploammo: 150, satchel: 9 } },
  "Armored Door": { hp: 1000, methods: { rockets: 5, c4: 3, exploammo: 250, satchel: 15 } },
  "Stone Wall": { hp: 500, methods: { rockets: 4, c4: 2, exploammo: 185, satchel: 10 }, hybrid: { rockets: 3, exploammo: 30 } },
  "Metal Wall": { hp: 1000, methods: { rockets: 8, c4: 4, exploammo: 400, satchel: 23 } },
  "Armored Wall": { hp: 2000, methods: { rockets: 15, c4: 8, exploammo: 799, satchel: 46 } },
  "Tool Cupboard": { hp: 100, methods: { rockets: 1, c4: 1, exploammo: 10, satchel: 1 } }
};

const raidTimeData = {
  "Sheet Metal Door": { rockets: 6, c4: 10, exploammo: 23, satchel: 13 },
  "Garage Door": { rockets: 12, c4: 11, exploammo: 64, satchel: 21 },
  "Armored Door": { rockets: 24, c4: 13, exploammo: 106, satchel: 30 },
  "Stone Wall": { rockets: 18, c4: 11, exploammo: 78, satchel: 22 },
  "Metal Wall": { rockets: 43, c4: 14, exploammo: 171, satchel: 42 },
  "Armored Wall": { rockets: 86, c4: 20, exploammo: 346, satchel: 76 },
  "Tool Cupboard": { rockets: 1, c4: 10, exploammo: 1, satchel: 9 }
};

const sulfurPer = {
  rockets: 1400,
  c4: 2200,
  exploammo: 25,
  satchel: 480
};

const craftData = {
  "Workbench Level 1": { "Wood": 500, "Metal Fragments": 100 },
  "Workbench Level 2": { "Metal Fragments": 500, "High Quality Metal": 20, "Basic Blueprint Fragment": 5 },
  "Workbench Level 3": { "Metal Fragments": 1000, "High Quality Metal": 100, "Advanced Blueprint Fragment": 5 },
  "Furnace": { "Stones": 200, "Wood": 100, "Low Grade Fuel": 50 },
  "Large Furnace": { "Stones": 500, "Wood": 600, "Low Grade Fuel": 75 },
  "Electric Furnace": { "High Quality Metal": 5, "Metal Fragments": 200 },
  "Garage Door": { "Gears": 2, "Metal Fragments": 300 },
  "Armored Door": { "High Quality Metal": 20, "Gears": 5 },
  "Tool Cupboard": { "Wood": 1000 },
  "Auto Turret": { "Targeting Computer": 1, "CCTV Camera": 1, "High Quality Metal": 10 }
};

const recycleData = {
  "Road Signs": {
    guaranteed: { Scrap: 6 },
    chance: { "High Quality Metal": 0.2 }
  },
  "Metal Pipe": {
    guaranteed: { Scrap: 6 },
    chance: { "High Quality Metal": 0.2 }
  },
  "Gears": {
    guaranteed: { Scrap: 12, "Metal Fragments": 15 }
  },
  "Metal Spring": {
    guaranteed: { Scrap: 12 },
    chance: { "High Quality Metal": 0.2 }
  },
  "Semi Automatic Body": {
    guaranteed: { Scrap: 18, "Metal Fragments": 90 },
    chance: { "High Quality Metal": 0.8 }
  },
  "SMG Body": {
    guaranteed: { Scrap: 18 },
    chance: { "High Quality Metal": 0.8 }
  },
  "Rifle Body": {
    guaranteed: { Scrap: 30 },
    chance: { "High Quality Metal": 0.8 }
  },
  "Tech Trash": {
    guaranteed: { Scrap: 24 },
    chance: { "High Quality Metal": 0.2 }
  },
  "Targeting Computer": {
    guaranteed: { "Tech Trash": 3, "Metal Fragments": 60 },
    chance: { "High Quality Metal": 0.2 }
  },
  "CCTV Camera": {
    chance: { "Tech Trash": 0.8, "High Quality Metal": 0.8 }
  },
  "Counter": {
    guaranteed: { "Metal Fragments": 45 }
  },
  "Empty Propane Tank": {
    guaranteed: { "Metal Fragments": 60 }
  },
  "Rope": {
    guaranteed: { Cloth: 15 }
  }
};

const monumentData = [
  { name: "Launch Site", tier: "High", rad: "High", loot: "Elite + Locked Crate", notes: "Bring rad meds + card path prep." },
  { name: "Military Tunnels", tier: "High", rad: "High", loot: "Elite Crates", notes: "Scientists + tight corridors." },
  { name: "Oil Rig (Small)", tier: "High", rad: "Low", loot: "Locked Crate", notes: "Strong ocean control objective." },
  { name: "Train Yard", tier: "Mid", rad: "Medium", loot: "Military + Blue Room", notes: "Reliable component farm." },
  { name: "Airfield", tier: "Mid", rad: "Low", loot: "Military Crates", notes: "Fast runs and frequent PvP." },
  { name: "Water Treatment", tier: "Mid", rad: "Medium", loot: "Blue Card + Military", notes: "Good all-round recycler route." }
];

const furnaceProfiles = {
  small: {
    label: "Small Furnace",
    orePerMinute: { sulfur: 36, metal: 18, hqm: 9 },
    orePerWood: { sulfur: 1.2, metal: 0.6, hqm: 0.3 },
    strategy: "Efficient split stacks (RustClash community baseline)"
  },
  large: {
    label: "Large Furnace",
    orePerMinute: { sulfur: 96, metal: 42, hqm: 18 },
    orePerWood: { sulfur: 3.2, metal: 1.4, hqm: 0.75 },
    strategy: "Low-maintenance large furnace stack baseline"
  }
};

const oreYield = { sulfur: 1, metal: 1, hqm: 0.5 };
const oreNames = { sulfur: "Sulfur", metal: "Metal Fragments", hqm: "High Quality Metal" };

const raidTarget = document.getElementById("raidTarget");
const raidQty = document.getElementById("raidQty");
const raidAdd = document.getElementById("raidAdd");
const raidList = document.getElementById("raidList");
const raidOutput = document.getElementById("raidOutput");

const craftItem = document.getElementById("craftItem");
const craftQty = document.getElementById("craftQty");
const craftCalc = document.getElementById("craftCalc");
const craftOutput = document.getElementById("craftOutput");

const recycleItem = document.getElementById("recycleItem");
const recycleQty = document.getElementById("recycleQty");
const recycleMode = document.getElementById("recycleMode");
const recycleAdd = document.getElementById("recycleAdd");
const recycleList = document.getElementById("recycleList");
const recycleOutput = document.getElementById("recycleOutput");

const furnaceOre = document.getElementById("furnaceOre");
const furnaceOreAmount = document.getElementById("furnaceOreAmount");
const furnaceType = document.getElementById("furnaceType");
const furnaceCalc = document.getElementById("furnaceCalc");
const furnaceOutput = document.getElementById("furnaceOutput");

const intelGrid = document.getElementById("intelGrid");

const raidEntries = [];
const recycleEntries = [];
const recyclerModes = {
  monument: {
    label: "Monument (Green Recycler)",
    multiplier: 1,
    efficiency: "60%",
    badgeClass: "mode-green"
  },
  outpost: {
    label: "Outpost (Yellow Recycler)",
    multiplier: 2 / 3,
    efficiency: "40%",
    badgeClass: "mode-yellow"
  }
};

function fillSelect(selectEl, items) {
  selectEl.innerHTML = "";
  items.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    selectEl.appendChild(opt);
  });
}

function prettyNumber(value) {
  return Math.round(value).toLocaleString();
}

function prettyDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const mins = Math.floor(seconds / 60);
  const rem = seconds % 60;
  if (mins < 1) {
    return `${rem}s`;
  }
  return `${mins}m ${rem}s`;
}

function renderRaid() {
  if (!raidEntries.length) {
    raidList.innerHTML = "<p class='muted'>No raid targets added yet.</p>";
    raidOutput.innerHTML = "<p class='muted'>Add targets to compare total raid cost.</p>";
    return;
  }

  const totals = { rockets: 0, c4: 0, exploammo: 0, satchel: 0 };
  const times = { rockets: 0, c4: 0, exploammo: 0, satchel: 0 };
  const hybridTotals = { rockets: 0, c4: 0, exploammo: 0, satchel: 0 };
  let hybridTimeSeconds = 0;

  raidList.innerHTML = raidEntries.map((entry, idx) => {
    const methods = raidData[entry.target].methods;
    return `<div class="row"><strong>${entry.qty}x ${entry.target}</strong><button data-remove-raid="${idx}" class="btn">Remove</button><span class="muted">${methods.rockets * entry.qty} rockets | ${methods.c4 * entry.qty} C4</span></div>`;
  }).join("");

  raidEntries.forEach((entry) => {
    const target = raidData[entry.target];
    const methods = target.methods;
    const methodTimes = raidTimeData[entry.target];
    totals.rockets += methods.rockets * entry.qty;
    totals.c4 += methods.c4 * entry.qty;
    totals.exploammo += methods.exploammo * entry.qty;
    totals.satchel += methods.satchel * entry.qty;
    times.rockets += methodTimes.rockets * entry.qty;
    times.c4 += methodTimes.c4 * entry.qty;
    times.exploammo += methodTimes.exploammo * entry.qty;
    times.satchel += methodTimes.satchel * entry.qty;

    if (target.hybrid) {
      hybridTotals.rockets += (target.hybrid.rockets || 0) * entry.qty;
      hybridTotals.c4 += (target.hybrid.c4 || 0) * entry.qty;
      hybridTotals.exploammo += (target.hybrid.exploammo || 0) * entry.qty;
      hybridTotals.satchel += (target.hybrid.satchel || 0) * entry.qty;
      hybridTimeSeconds +=
        (
          ((target.hybrid.rockets || 0) / methods.rockets) * methodTimes.rockets +
          ((target.hybrid.c4 || 0) / methods.c4) * methodTimes.c4 +
          ((target.hybrid.exploammo || 0) / methods.exploammo) * methodTimes.exploammo +
          ((target.hybrid.satchel || 0) / methods.satchel) * methodTimes.satchel
        ) * entry.qty;
    }
  });

  const sulfurByMethod = {
    rockets: totals.rockets * sulfurPer.rockets,
    c4: totals.c4 * sulfurPer.c4,
    exploammo: totals.exploammo * sulfurPer.exploammo,
    satchel: totals.satchel * sulfurPer.satchel
  };
  const hybridSulfur =
    hybridTotals.rockets * sulfurPer.rockets +
    hybridTotals.c4 * sulfurPer.c4 +
    hybridTotals.exploammo * sulfurPer.exploammo +
    hybridTotals.satchel * sulfurPer.satchel;

  raidOutput.innerHTML = `
    <div class="row"><strong>Totals by Method</strong><span class="muted">Choose one method path (not combined)</span></div>
    <span class="metric">Rockets: ${prettyNumber(totals.rockets)}</span>
    <span class="metric">Rocket Sulfur: ${prettyNumber(sulfurByMethod.rockets)}</span>
    <span class="metric">Rocket Time: ${prettyDuration(times.rockets)}</span>
    <span class="metric">C4: ${prettyNumber(totals.c4)}</span>
    <span class="metric">C4 Sulfur: ${prettyNumber(sulfurByMethod.c4)}</span>
    <span class="metric">C4 Time: ${prettyDuration(times.c4)}</span>
    <span class="metric">Explosive Ammo: ${prettyNumber(totals.exploammo)}</span>
    <span class="metric">Explo Ammo Sulfur: ${prettyNumber(sulfurByMethod.exploammo)}</span>
    <span class="metric">Explo Ammo Time: ${prettyDuration(times.exploammo)}</span>
    <span class="metric">Satchels: ${prettyNumber(totals.satchel)}</span>
    <span class="metric">Satchel Sulfur: ${prettyNumber(sulfurByMethod.satchel)}</span>
    <span class="metric">Satchel Time: ${prettyDuration(times.satchel)}</span>
    <div class="row"><strong>Hybrid Route (where available)</strong><span class="muted">Common mixed methods like rocket+explo</span></div>
    <span class="metric">Hybrid Rockets: ${prettyNumber(hybridTotals.rockets)}</span>
    <span class="metric">Hybrid C4: ${prettyNumber(hybridTotals.c4)}</span>
    <span class="metric">Hybrid Explo Ammo: ${prettyNumber(hybridTotals.exploammo)}</span>
    <span class="metric">Hybrid Satchels: ${prettyNumber(hybridTotals.satchel)}</span>
    <span class="metric">Hybrid Sulfur: ${prettyNumber(hybridSulfur)}</span>
    <span class="metric">Hybrid Time (Est.): ${prettyDuration(hybridTimeSeconds)}</span>
    <p class="muted">Sheet Metal Door hybrid: 1 rocket + 8 explosive ammo. Pure sulfur cheapest remains 63 explosive ammo.</p>
    <p class="muted">Example: 2 stone walls = 8 rockets OR 4 C4 OR 370 explosive ammo OR 20 satchels.</p>
  `;

  document.querySelectorAll("[data-remove-raid]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-remove-raid"));
      raidEntries.splice(idx, 1);
      renderRaid();
    });
  });
}

function renderCraft() {
  const item = craftItem.value;
  const qty = Math.max(1, Number(craftQty.value) || 1);
  const mats = craftData[item];

  const lines = Object.entries(mats).map(([mat, amount]) => {
    return `<span class="metric">${mat}: ${prettyNumber(amount * qty)}</span>`;
  }).join("");

  craftOutput.innerHTML = `
    <div class="row"><strong>${qty}x ${item}</strong><span class="muted">Crafting requirements</span></div>
    ${lines}
  `;
}

function renderRecycle() {
  const modeKey = recycleMode.value;
  const mode = recyclerModes[modeKey];

  if (!recycleEntries.length) {
    recycleList.innerHTML = "<p class='muted'>No components queued for recycling.</p>";
    recycleOutput.innerHTML = `<p class='muted'>Add component stacks to see total returns for ${mode.label}.</p>`;
    return;
  }

  const totals = {};

  recycleList.innerHTML = recycleEntries.map((entry, idx) => {
    return `<div class="row"><strong>${entry.qty}x ${entry.item}</strong><button data-remove-rec="${idx}" class="btn">Remove</button></div>`;
  }).join("");

  recycleEntries.forEach((entry) => {
    const yields = recycleData[entry.item];
    const guaranteed = yields.guaranteed || {};
    const chance = yields.chance || {};

    Object.entries(guaranteed).forEach(([name, value]) => {
      totals[name] = (totals[name] || 0) + value * entry.qty;
    });

    // Add expected value for chance-based recycler outputs (e.g. 20% HQM).
    Object.entries(chance).forEach(([name, value]) => {
      totals[name] = (totals[name] || 0) + value * entry.qty;
    });
  });

  const adjustedTotals = {};
  Object.entries(totals).forEach(([name, value]) => {
    adjustedTotals[name] = value * mode.multiplier;
  });

  recycleOutput.innerHTML = `
    <div class="row"><strong>Total Recycle Return</strong><span class="muted">Estimated output</span></div>
    <span class="metric ${mode.badgeClass}">Recycler: ${mode.label}</span>
    <span class="metric">Efficiency: ${mode.efficiency}</span>
    <span class="metric">Relative Yield: ${(mode.multiplier * 100).toFixed(1)}% of Monument</span>
    ${Object.entries(adjustedTotals).map(([name, value]) => `<span class="metric">${name}: ${prettyNumber(value)}</span>`).join("")}
    <p class="muted">Chance outputs are shown as expected values using RustClash recycler percentages.</p>
  `;

  document.querySelectorAll("[data-remove-rec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-remove-rec"));
      recycleEntries.splice(idx, 1);
      renderRecycle();
    });
  });
}

function renderFurnace() {
  const oreType = furnaceOre.value;
  const oreAmount = Math.max(1, Number(furnaceOreAmount.value) || 1);
  const type = furnaceType.value;
  const profile = furnaceProfiles[type];

  const rate = profile.orePerMinute[oreType];
  const output = oreAmount * oreYield[oreType];
  const minutes = oreAmount / rate;
  const woodNeeded = oreAmount / profile.orePerWood[oreType];

  furnaceOutput.innerHTML = `
    <div class="row"><strong>${profile.label} Plan</strong><span class="muted">${oreAmount.toLocaleString()} ${furnaceOre.options[furnaceOre.selectedIndex].text}</span></div>
    <span class="metric">Output: ${prettyNumber(output)} ${oreNames[oreType]}</span>
    <span class="metric">Approx Time: ${minutes.toFixed(1)} min</span>
    <span class="metric">Wood Needed: ${prettyNumber(woodNeeded)}</span>
    <p class="muted">${profile.strategy}</p>
  `;
}

function renderIntel() {
  intelGrid.innerHTML = monumentData.map((m) => {
    return `
      <div class="intel-card">
        <h3>${m.name}</h3>
        <span class="metric">Loot Tier: ${m.tier}</span>
        <span class="metric">Radiation: ${m.rad}</span>
        <span class="metric">Loot: ${m.loot}</span>
        <p class="muted">${m.notes}</p>
      </div>
    `;
  }).join("");
}

function init() {
  fillSelect(raidTarget, Object.keys(raidData));
  fillSelect(craftItem, Object.keys(craftData));
  fillSelect(recycleItem, Object.keys(recycleData));

  raidAdd.addEventListener("click", () => {
    raidEntries.push({ target: raidTarget.value, qty: Math.max(1, Number(raidQty.value) || 1) });
    renderRaid();
  });

  craftCalc.addEventListener("click", renderCraft);

  recycleAdd.addEventListener("click", () => {
    recycleEntries.push({ item: recycleItem.value, qty: Math.max(1, Number(recycleQty.value) || 1) });
    renderRecycle();
  });
  recycleMode.addEventListener("change", renderRecycle);

  furnaceCalc.addEventListener("click", renderFurnace);

  renderRaid();
  renderCraft();
  renderRecycle();
  renderFurnace();
  renderIntel();
}

init();
