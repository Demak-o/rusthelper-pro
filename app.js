const raidData = {
  "Sheet Metal Door": { hp: 250, methods: { rockets: 2, c4: 1, exploammo: 63, satchel: 4 } },
  "Garage Door": { hp: 600, methods: { rockets: 3, c4: 2, exploammo: 150, satchel: 9 } },
  "Armored Door": { hp: 800, methods: { rockets: 4, c4: 2, exploammo: 200, satchel: 12 } },
  "Stone Wall": { hp: 500, methods: { rockets: 4, c4: 2, exploammo: 185, satchel: 10 } },
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
  "Assault Rifle": { "High Quality Metal": 50, "Wood": 200, "Metal Fragments": 450 },
  "Rocket": { "Explosives": 10, "Metal Pipe": 2 },
  "Garage Door": { "Gears": 2, "Metal Fragments": 300 },
  "Armored Door": { "High Quality Metal": 25, "Gears": 5 },
  "Auto Turret": { "Targeting Computer": 1, "Camera": 1, "High Quality Metal": 40 },
  "Workbench Level 3": { "Scrap": 1250, "Metal Fragments": 1000, "High Quality Metal": 100 }
};

const recycleData = {
  "Road Sign": { Scrap: 5, "High Quality Metal": 1 },
  "SMG Body": { Scrap: 15, "High Quality Metal": 2, "Metal Fragments": 25 },
  "Rifle Body": { Scrap: 25, "High Quality Metal": 3, "Metal Fragments": 50 },
  "Sheet Metal": { Scrap: 1, "Metal Fragments": 8 },
  "Tech Trash": { Scrap: 20, "High Quality Metal": 1 },
  "Gears": { Scrap: 10, "Metal Fragments": 13 },
  "Rope": { Cloth: 15 }
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
    orePerMinute: { sulfur: 45, metal: 60, hqm: 15 },
    woodPerMinute: 22
  },
  large: {
    label: "Large Furnace",
    orePerMinute: { sulfur: 300, metal: 360, hqm: 90 },
    woodPerMinute: 132
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

const upWood = document.getElementById("upWood");
const upStone = document.getElementById("upStone");
const upMetal = document.getElementById("upMetal");
const upHqm = document.getElementById("upHqm");
const upGarage = document.getElementById("upGarage");
const upTurret = document.getElementById("upTurret");
const upkeepCalc = document.getElementById("upkeepCalc");
const upkeepOutput = document.getElementById("upkeepOutput");

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
    badgeClass: "mode-green"
  },
  outpost: {
    label: "Outpost (Yellow Recycler)",
    multiplier: 0.8,
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

  const totals = { rockets: 0, c4: 0, exploammo: 0, satchel: 0, sulfur: 0 };

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

  totals.sulfur =
    totals.rockets * sulfurPer.rockets +
    totals.c4 * sulfurPer.c4 +
    totals.exploammo * sulfurPer.exploammo +
    totals.satchel * sulfurPer.satchel;

  raidOutput.innerHTML = `
    <div class="row"><strong>Totals</strong><span class="muted">Combined sulfur if crafted per method count</span></div>
    <span class="metric">Rockets: ${prettyNumber(totals.rockets)}</span>
    <span class="metric">C4: ${prettyNumber(totals.c4)}</span>
    <span class="metric">Explosive Ammo: ${prettyNumber(totals.exploammo)}</span>
    <span class="metric">Satchels: ${prettyNumber(totals.satchel)}</span>
    <span class="metric">Approx Sulfur Budget: ${prettyNumber(totals.sulfur)}</span>
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

function renderUpkeep() {
  const values = {
    wood: Number(upWood.value) || 0,
    stone: Number(upStone.value) || 0,
    metal: Number(upMetal.value) || 0,
    hqm: Number(upHqm.value) || 0,
    garage: Number(upGarage.value) || 0,
    turret: Number(upTurret.value) || 0
  };

  const daily = {
    wood: values.wood * 15,
    stone: values.stone * 30,
    metal: values.metal * 15,
    hqm: values.hqm * 2,
    gears: values.garage * 1,
    hqmDeployable: values.turret * 1
  };

  upkeepOutput.innerHTML = `
    <div class="row"><strong>24h Upkeep Estimate</strong><span class="muted">Fast-planning approximation</span></div>
    <span class="metric">Wood: ${prettyNumber(daily.wood)}</span>
    <span class="metric">Stone: ${prettyNumber(daily.stone)}</span>
    <span class="metric">Metal Fragments: ${prettyNumber(daily.metal)}</span>
    <span class="metric">HQM (Building): ${prettyNumber(daily.hqm)}</span>
    <span class="metric">Gears (Garage Doors): ${prettyNumber(daily.gears)}</span>
    <span class="metric">HQM (Turrets): ${prettyNumber(daily.hqmDeployable)}</span>
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
    Object.entries(yields).forEach(([name, value]) => {
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
    <span class="metric">Output Multiplier: ${(mode.multiplier * 100).toFixed(0)}%</span>
    ${Object.entries(adjustedTotals).map(([name, value]) => `<span class="metric">${name}: ${prettyNumber(value)}</span>`).join("")}
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
  const woodNeeded = minutes * profile.woodPerMinute;

  furnaceOutput.innerHTML = `
    <div class="row"><strong>${profile.label} Plan</strong><span class="muted">${oreAmount.toLocaleString()} ${furnaceOre.options[furnaceOre.selectedIndex].text}</span></div>
    <span class="metric">Output: ${prettyNumber(output)} ${oreNames[oreType]}</span>
    <span class="metric">Approx Time: ${minutes.toFixed(1)} min</span>
    <span class="metric">Wood Needed: ${prettyNumber(woodNeeded)}</span>
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
  upkeepCalc.addEventListener("click", renderUpkeep);

  recycleAdd.addEventListener("click", () => {
    recycleEntries.push({ item: recycleItem.value, qty: Math.max(1, Number(recycleQty.value) || 1) });
    renderRecycle();
  });
  recycleMode.addEventListener("change", renderRecycle);

  furnaceCalc.addEventListener("click", renderFurnace);

  renderRaid();
  renderCraft();
  renderUpkeep();
  renderRecycle();
  renderFurnace();
  renderIntel();
}

init();
