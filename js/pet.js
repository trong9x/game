// =====================================
// 🔥 PET SYSTEM (KEEP OLD + ADD SKILL FX)
// =====================================

// =============================
// AUTO ADD CSS
// =============================
const style = document.createElement("style");
style.innerHTML = `
.petDash{
    animation: petDash .18s ease 1;
}

.mobHit{
    animation: mobShake .25s ease 1;
}


@keyframes petDash{
    0%{ transform:translateX(0) translateY(0); }
    25%{ transform:translateX(12px) translateY(-6px); }
    50%{ transform:translateX(20px) translateY(0); }
    75%{ transform:translateX(12px) translateY(-6px); }
    100%{ transform:translateX(0) translateY(0); }
}

.mobHit{
    animation: mobShake .25s ease 3;
}

@keyframes mobShake{
    0%{ transform:translateX(0); }
    20%{ transform:translateX(-6px); }
    40%{ transform:translateX(6px); }
    60%{ transform:translateX(-5px); }
    80%{ transform:translateX(5px); }
    100%{ transform:translateX(0); }
}

`;
document.head.appendChild(style);


const PetSystem = {

    el:null,
    fill:null,

    x:0,
    y:0,

    inited:false,


    // =====================
    // INIT
    // =====================
    init(){

        if(this.inited) return;

        this.el = document.getElementById("pet");
        if(!this.el) return;

        this.x = state.petX;
        this.y = state.petY;

        const bar = document.createElement("div");
        bar.className = "hpbar";

        this.fill = document.createElement("div");
        this.fill.className = "hpfill";

        bar.appendChild(this.fill);
        this.el.appendChild(bar);

        this.inited = true;
    },


    // =====================
    // FOLLOW
    // =====================
    follow(){

        if(!this.el) return;

        const petH = this.el.offsetHeight;

        // battle đứng cạnh mob
        if(state.inBattle && state.target){

            const mob = state.target;
            const mobH = mob.el.offsetHeight;

            const left = mob.x - 120;
            const top  = mob.y + mobH - petH;

            this.el.style.left = left + "px";
            this.el.style.top  = top  + "px";
            this.el.style.zIndex = Math.floor(top);
        }
        else{

            this.x += (state.px - 60 - this.x) * 0.08;
            this.y += (state.py - 10 - this.y) * 0.08;

            this.el.style.left = this.x + "px";
            this.el.style.top  = this.y + "px";
            this.el.style.zIndex = Math.floor(this.y);
        }
    },


    // =====================
    // UPDATE
    // =====================
    update(){

    if(!this.inited) this.init();
    if(!this.fill) return;

    this.follow();

    // update máu
    this.fill.style.width =
        (state.pet.hp/state.pet.maxHp*100)
 + "%";

    // ⭐ HIỆN THANH MÁU PET (FIX CHÍNH)
    this.fill.parentElement.classList.add("show");
},



    // =====================
    // ATTACK
    // =====================
    attack(){

        if(state.turn !== "player") return;
        if(!state.target) return;

        const mob = state.target;

        state.turn="anim";

        this.el.classList.add("petDash");
        setTimeout(()=>this.el.classList.remove("petDash"),180);

        mob.el.classList.add("mobHit");
        setTimeout(()=>mob.el.classList.remove("mobHit"),250);

        const dmg = state.pet.atk + Math.floor(Math.random()*10);


        mob.hp -= dmg;

        showDmg(mob.x,mob.y,dmg,"yellow");

        this.afterHit(mob);
    },


    // =====================
    // SKILL
    // =====================
    skill(){

    if(state.turn !== "player") return;
    if(!state.target) return;

    // ⭐ FIX MP PET
    if(state.pet.mp < 30){
        alert("Không đủ MP!");
        return;
    }

    const mob = state.target;

    state.turn="anim";

    state.pet.mp -= 30;
    updateHUD();

    this.el.classList.add("petDash");
    mob.el.classList.add("mobHit");

    flashHit(mob.x,mob.y);
    shakeCamera();

    for(let i=0;i<20;i++){
        spawnTrail(
            mob.x + Math.random()*70,
            mob.y + Math.random()*70
        );
    }

    const crit = Math.random()<0.35;

    const base = getPetAtk();

    const dmg = Math.floor(
        crit
            ? base * 2 + Math.random()*30
            : base + Math.random()*15
    );

    mob.hp = Math.max(0, mob.hp - dmg);

    mob.x += 20;
    mob.el.style.left = mob.x + "px";

    setTimeout(()=>{
        this.el.classList.remove("petDash");
        mob.el.classList.remove("mobHit");
        this.afterHit(mob);
    },220);
},


    // =====================
    // AFTER HIT
    // =====================
    afterHit(mob){

        setTimeout(()=>{

            if(mob.hp<=0){
                winBattle();
            }else{
                state.turn="mob";
                setTimeout(mobTurn,400);
            }

        },150);
    }

};


// =====================
PetSystem.init();

window.updatePet = () => PetSystem.update();
window.petAttack = () => PetSystem.attack();
window.useSkill  = () => PetSystem.skill();
// =====================
// CLICK PET → OPEN EQUIP
// =====================
setTimeout(()=>{
    const petEl = document.getElementById("pet");
    if(!petEl) return;

    petEl.style.cursor = "pointer";

    petEl.addEventListener("click", ()=>{
        toggleEquip();
    });

}, 100);
