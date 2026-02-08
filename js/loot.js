// =====================================
// 🔥 COMPLETE LOOT + BAG SYSTEM (FINAL)
// =====================================

// ===============================
// ⚔️ WEAPON DATA
// ===============================
const WEAPONS = [

    {
        id: "green",
        name: "Dao Dưa Hấu",
        img: "img/vk1.png",
        atk: 8,
        color: "#00ff88",
        rate: 0.60
    },

    {
        id: "purple",
        name: "Kiếm Ma",
        img: "img/vk2.png",
        atk: 18,
        color: "#bb55ff",
        rate: 0.30
    },

    {
        id: "gold",
        name: "Thánh Kiếm",
        img: "img/vk3.png",
        atk: 35,
        color: "#ffcc00",
        rate: 0.10
    }
];


// ===============================
// 🎒 BAG SYSTEM (10 ô)
// ===============================
state.bagSize = 10;
state.inventory = new Array(state.bagSize).fill(null);


// ===============================
// 🎲 RANDOM WEAPON
// ===============================
function rollWeapon(){

    const r = Math.random();
    let sum = 0;

    for(const w of WEAPONS){
        sum += w.rate;
        if(r <= sum) return w;
    }

    return WEAPONS[0];
}


// ===============================
// ➕ ADD TO BAG (NO ALERT)
// ===============================
function addToBag(w){

    const idx = state.inventory.findIndex(i => i === null);

    if(idx === -1){
        return false; // ❌ FULL → KHÔNG popup
    }

    state.inventory[idx] = {...w};
    // renderBag(); ❌ bỏ auto mở


    return true;
}


