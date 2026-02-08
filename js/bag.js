// ===============================
// 🎒 BAG SYSTEM (10 slots)
// ===============================

state.bag = new Array(10).fill(null);

// ===== toggle =====
function toggleBag(){
    const b = document.getElementById("bag");
    b.style.display = b.style.display==="block" ? "none" : "block";
}

// ===== render =====
function renderBag(){

    const wrap = document.getElementById("bagSlots");
    wrap.innerHTML="";

    state.bag.forEach((item,i)=>{

        const s = document.createElement("div");
        s.className="bag-slot";

        if(item){
            s.style.backgroundImage = `url(${item.img})`;
            s.title = item.name;
        }

        s.onclick = ()=>equipFromBag(i);

        wrap.appendChild(s);
    });
}

// ===== add item =====
function addToBag(item){

    const idx = state.bag.findIndex(x=>x===null);

    // ❌ FULL → không nhặt, KHÔNG popup
    if(idx === -1){
        return false;
    }

    state.bag[idx] = item;

    renderBag();

    return true;
}


// ===== equip =====
function equipFromBag(i){

    const item = state.bag[i];
    if(!item) return;

    state.pet.equip.weapon = item;
    state.bag[i]=null;

    renderBag();
    toggleEquip();
}

// auto render
setTimeout(renderBag,100);
