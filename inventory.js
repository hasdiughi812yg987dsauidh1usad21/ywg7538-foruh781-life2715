const overlay = document.getElementById("inventoryOverlay");
const maxWeight = 100;
let playerWeight = 28;


function updateWeight() {
    const bar = document.getElementById("playerWeightBar");
    if (bar) {
        bar.style.width = (playerWeight / maxWeight * 100) + "%";
    }
}



const lootPool = [ // loot pool
    {name:"Industrial Angle Grinder", weight:30},
    {name:"Industrial Towing Rope", weight:20},
    {name:"Industrial Insullation Roll", weight:40},
    {name:"Cable Roll", weight:20},
    {name:"Toolbox", weight:30},
    {name:"Laptop", weight:16},
    {name:"Circuit Board", weight:4},
    {name:"USB (SSO Key)", weight:4},
    {name:"Blast Charge", weight:12},
    {name:"Remote Explosives", weight:16},
    {name:"Gold Nugget", weight:10},
    {name:"Uncut Diamond (Large)", weight:12},
    {name:"Uncut Diamond (Medium)", weight:12},
    {name:"Uncut Diamond (Small)", weight:12},
    {name:"Five Seven", weight:12},
    {name:"Heavy Shotgun", weight:16},
    {name:"Switchblade", weight:8},
    {name:"Knuckle Duster", weight:8},
    {name:"M9 Barreta", weight:12},
    {name:"SNS Pistol", weight:12},
    {name:"Pistol MK2", weight:12},
    {name:"Uncut Sapphire", weight:12},
    {name:"Crowex Watch", weight:4},
    {name:"Uncut Ruby", weight:12},
    {name:"Crowex Pearl Necklace", weight:12},
    {name:"Crowex Earrings", weight:12},
    {name:"Designer Pants", weight:10},
    {name:"Designer Glasses", weight:4},
    {name:"Designer Shoes", weight:10},
    {name:"Designer Top", weight:12},
    {name:"Suitcase", weight:20},
    {name:"Designer Suitcase", weight:20},
    {name:"Widescreen TV", weight:20},
    {name:"DES Module", weight:4},
    {name:"Glass Cutter", weight:16},
    {name:"Industrial Drill", weight:30},
    {name:"Drill", weight:16},
    {name:"Industrial Ventilation Equipment", weight:40},
    {name:"Furr coat", weight:15},
    {name:"Suppressor (Mod)", weight:5},
    {name:"Crystal Meth Tray (Blue)", weight:20},
    {name:"Crystal Meth Tray (Green)", weight:20},
    {name:"Crystal Meth Tray (Clear)", weight:20},
    {name:"Crystal Meth Tray (Cloudy)", weight:20},
    {name:"Crystal Meth Tray (White)", weight:20},
    {name:"Ketamine Tray", weight:20},
    {name:"Meth Slab (Blue)", weight:20},
    {name:"Meth Slab (Green)", weight:20},
    {name:"Meth Slab (Clear)", weight:20},
    {name:"Meth Slab (Cloudy)", weight:20},
    {name:"Meth Slab (White)", weight:20},
    {name:"Cocaine (Block)", weight:10},
    {name:"Cocaine (Slab)", weight:20},
    {name:"Cocaine (Brick)", weight:50},
    {name:"Grip (Mod)", weight:5},
    {name:"Extended Mag (Mod)", weight:4},
    {name:"SMG Ammunation Box", weight:12},
    {name:"SMG Shell Casings", weight:3},
    {name:"Rifle Ammunation Box", weight:12},
    {name:"Rifle Shell Casings", weight:3},
    {name:"SMG Stock", weight:5},
    {name:"SMG Receiver", weight:5},
    {name:"SMG Barrel", weight:5},
    {name:"SMG Handguard", weight:5},
    {name:"Rifle Stock", weight:5},
    {name:"Rifle Receiver", weight:5},
    {name:"Rifle Handguard", weight:5},
    {name:"Rifle Barrel", weight:5},
    {name:"Blueprint (Weed Lockup)", weight:5},
    {name:"Blueprint (Coke lab)", weight:5}
];



function buildInventoryHTML() {
    overlay.innerHTML = `
    <div id="inventoryWindow">

        <!-- TABS -->
        <div id="inventoryTabs">
            <span class="tab active">INVENTORY</span>
            <span class="tab">DAILY ACTIVITIES</span>
            <span class="tab">FAVORS</span>
        </div>

        <!-- GRIDS -->
        <div id="inventoryGrids">

            <!-- Player Inventory (6×5) -->
            <div id="playerGrid" class="gridBox"></div>

            <!-- Loot Grid (6×5) -->
            <div id="lootGrid" class="gridBox">
                <div id="closeInv" class="closeButton">X</div>
            </div>
        </div>

        <!-- WEIGHT BARS -->
        <div class="weightRow">
            <span>Inventory Weight</span>
            <div class="weightBarBG">
                 <div id="playerWeightBar" class="weightBar"></div>
            </div>
        </div>

        <div class="weightRow">
            <span>Robbery Weight</span>
            <div class="weightBarBG">
                 <div id="lootWeightBar" class="weightBar"></div>
            </div>
        </div>

        <!-- HOTBAR -->
        <div id="hotbar">
            <div class="hotbarSlot" data-slot="1">Crowbar</div>
            <div class="hotbarSlot" data-slot="2">Radio</div>
            <div class="hotbarSlot" data-slot="3">Painkillers</div>
            <div class="hotbarSlot" data-slot="4">Bandages</div>
            <div class="hotbarSlot" data-slot="5">Lockpicks</div>
        </div>

    </div>`;
}



function initPlayerGrid() {
    const grid = document.getElementById("playerGrid");
    grid.innerHTML = "";

    for (let i = 0; i < 30; i++) { 
        let slot = document.createElement("div");
        slot.classList.add("slot");
        slot.style.border = "2px dashed #4ab3ff";

        slot.addEventListener("dragover", (e)=>e.preventDefault());
        slot.addEventListener("drop", dropToPlayer);

        grid.appendChild(slot);
    }
}



function generateLootItems() {
    const chosen = [];
    while (chosen.length < 4) {
        const item = lootPool[Math.floor(Math.random()*lootPool.length)];
        if (!chosen.includes(item)) chosen.push(item);
    }
    return chosen;
}


function loadLoot(items) {
    const lootGrid = document.getElementById("lootGrid");

    lootGrid.querySelectorAll(".item").forEach(e=>e.remove());

    items.forEach(obj => {
        const el = document.createElement("div");
        el.classList.add("item");
        el.textContent = obj.name;
        el.setAttribute("data-weight", obj.weight);
        el.setAttribute("data-qty", obj.weight + "kg");
        el.draggable = true;

        el.addEventListener("dragstart", dragStart);

        lootGrid.appendChild(el);
    });


    const totalLootWeight = items.reduce((s,i)=>s+i.weight,0);
    document.getElementById("lootWeightBar").style.width = 
        (totalLootWeight / maxWeight * 100) + "%";
}



function dragStart(e) {
    e.dataTransfer.setData("text/name", e.target.textContent);
    e.dataTransfer.setData("text/weight", e.target.getAttribute("data-weight"));
}



function dropToPlayer(e) {
    const name = e.dataTransfer.getData("text/name");
    const weight = parseInt(e.dataTransfer.getData("text/weight"));


    if (playerWeight + weight > maxWeight) {
        return;
    }


    playerWeight += weight;
    updateWeight();


    const itemEl = document.createElement("div");
    itemEl.classList.add("item");
    itemEl.textContent = name;
    itemEl.setAttribute("data-qty", weight + "kg");
    itemEl.draggable = true;
    itemEl.addEventListener("dragstart", dragStart);

    e.target.innerHTML = "";
    e.target.appendChild(itemEl);


    [...document.querySelectorAll("#lootGrid .item")]
        .find(i => i.textContent === name)
        ?.remove();
}



function openInventory() {
    buildInventoryHTML();
    initPlayerGrid();

    const lootItems = generateLootItems();
    loadLoot(lootItems);

    overlay.style.display = "block";

    updateWeight(); 

    document.getElementById("closeInv").onclick = closeInventory;
}



function closeInventory() {
    overlay.style.display = "none";


    if (typeof stopTimer === "function") {
        stopTimer();
    }
}

document.addEventListener("keydown", (e) => {
    if (overlay.style.display === "block" && e.code === "Escape") {
        closeInventory();
    }
});
