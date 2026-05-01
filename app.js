const equipos = [
"OVIEDO",
"LEVANTE",
"SEVILLA",
"MALLORCA",
"ALAVÉS",
"GIRONA",
"ESPANYOL",
"ELCHE",
"VALENCIA",
"RAYO"
];

// 👉 PUNTOS ACTUALES (AJÚSTALOS SEGÚN TU EXCEL)
const puntosIniciales = {
"OVIEDO": 35,
"LEVANTE": 34,
"SEVILLA": 33,
"MALLORCA": 33,
"ALAVÉS": 32,
"GIRONA": 32,
"ESPANYOL": 31,
"ELCHE": 30,
"VALENCIA": 30,
"RAYO": 29
};

// 👉 PARTIDOS PENDIENTES (de tu hoja PREDICCIÓN)
const partidos = [
{local:"ALAVÉS", visitante:"RAYO"},
{local:"VALENCIA", visitante:"RAYO"},
{local:"GIRONA", visitante:"MALLORCA"},
{local:"LEVANTE", visitante:"MALLORCA"},
{local:"ELCHE", visitante:"ALAVÉS"},
{local:"SEVILLA", visitante:"ESPANYOL"},
{local:"OVIEDO", visitante:"ALAVÉS"},
{local:"RAYO", visitante:"GIRONA"},
{local:"GIRONA", visitante:"ELCHE"},
{local:"MALLORCA", visitante:"OVIEDO"}
];

function renderPartidos(){
    let html = "";
    partidos.forEach((p,i)=>{
        html += `
        <div class="partido">
            ${p.local}
            <input type="number" id="l${i}" min="0">
            -
            <input type="number" id="v${i}" min="0">
            ${p.visitante}
        </div>`;
    });
    document.getElementById("partidos").innerHTML = html;
}

function calcular(){
    let puntos = {...puntosIniciales};

    partidos.forEach((p,i)=>{
        let gl = parseInt(document.getElementById(`l${i}`).value);
        let gv = parseInt(document.getElementById(`v${i}`).value);

        if(isNaN(gl) || isNaN(gv)) return;

        if(gl > gv){
            puntos[p.local] += 3;
        } else if(gl < gv){
            puntos[p.visitante] += 3;
        } else {
            puntos[p.local] += 1;
            puntos[p.visitante] += 1;
        }
    });

    let clasif = Object.entries(puntos)
        .map(([equipo, pts]) => ({equipo, pts}))
        .sort((a,b)=>b.pts - a.pts);

    renderTabla(clasif);
}

function renderTabla(clasif){
    let html = "";

    clasif.forEach((e,i)=>{
        let clase = "salvado";
        if(i >= clasif.length - 3) clase = "descenso";
        else if(i >= clasif.length - 6) clase = "peligro";

        html += `
        <div class="equipo ${clase}">
            <span>${i+1}. ${e.equipo}</span>
            <span>${e.pts} pts</span>
        </div>`;
    });

    document.getElementById("tabla").innerHTML = html;
}

document.addEventListener("input", calcular);

renderPartidos();
calcular();