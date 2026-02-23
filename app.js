const raidData = {
  "Sheet Metal Door": { hp: 250, methods: { rockets: 2, c4: 1, exploammo: 63, satchel: 4 } },
  "Garage Door": { hp: 600, methods: { rockets: 3, c4: 2, exploammo: 150, satchel: 9 } },
  "Armored Door": { hp: 800, methods: { rockets: 4, c4: 2, exploammo: 200, satchel: 12 } },
  "Stone Wall": { hp: 500, methods: { rockets: 4, c4: 2, exploammo: 182, satchel: 10 } },
  "Metal Wall": { hp: 1000, methods: { rockets: 8, c4: 4, exploammo: 400, satchel: 23 } },
  "Armored Wall": { hp: 2000, methods: { rockets: 15, c4: 8, exploammo: 799, satchel: 46 } },
  "Tool Cupboard": { hp: 1000, methods: { rockets: 8, c4: 4, exploammo: 400, satchel: 23 } }
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

function renderRaid() {
  if (!raidEntries.length) {
    raidList.innerHTML = "<p class='muted'>No raid targets added yet.</p>";
    raidOutput.innerHTML = "<p class='muted'>Add targets to compare total raid cost.</p>";
    return;
  }

  const totals = { rockets: 0, c4: 0, exploammo: 0, satchel: 0 };

  raidList.innerHTML = raidEntries.map((entry, idx) => {
    const methods = raidData[entry.target].methods;
    return `<div class="row"><strong>${entry.qty}x ${entry.target}</strong><button data-remove-raid="${idx}" class="btn">Remove</button><span class="muted">${methods.rockets * entry.qty} rockets | ${methods.c4 * entry.qty} C4</span></div>`;
  }).join("");

  raidEntries.forEach((entry) => {
    const methods = raidData[entry.target].methods;
    totals.rockets += methods.rockets * entry.qty;
    totals.c4 += methods.c4 * entry.qty;
    totals.exploammo += methods.exploammo * entry.qty;
    totals.satchel += methods.satchel * entry.qty;
  });

  const sulfurByMethod = {
    rockets: totals.rockets * sulfurPer.rockets,
    c4: totals.c4 * sulfurPer.c4,
    exploammo: totals.exploammo * sulfurPer.exploammo,
    satchel: totals.satchel * sulfurPer.satchel
  };

  raidOutput.innerHTML = `
    <div class="row"><strong>Totals by Method</strong><span class="muted">Choose one method path (not combined)</span></div>
    <span class="metric">Rockets: ${prettyNumber(totals.rockets)}</span>
    <span class="metric">Rocket Sulfur: ${prettyNumber(sulfurByMethod.rockets)}</span>
    <span class="metric">C4: ${prettyNumber(totals.c4)}</span>
    <span class="metric">C4 Sulfur: ${prettyNumber(sulfurByMethod.c4)}</span>
    <span class="metric">Explosive Ammo: ${prettyNumber(totals.exploammo)}</span>
    <span class="metric">Explo Ammo Sulfur: ${prettyNumber(sulfurByMethod.exploammo)}</span>
    <span class="metric">Satchels: ${prettyNumber(totals.satchel)}</span>
    <span class="metric">Satchel Sulfur: ${prettyNumber(sulfurByMethod.satchel)}</span>
    <p class="muted">Example: 2 stone walls = 8 rockets OR 4 C4 OR 364 explosive ammo OR 20 satchels.</p>
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
