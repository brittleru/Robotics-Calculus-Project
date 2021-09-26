// Cache the DOM
// -- User Input cache DOM
const presiune = document.getElementById('pressure');
const l1 = document.getElementById('l1');
const l2 = document.getElementById('l2');
const l3 = document.getElementById('l3');
const e1Id = document.getElementById('e1');
const e2Id = document.getElementById('e2');
const alfa0 = document.getElementById('alfa0');
const D0id = document.getElementById('D0');
const deltaDiameterId = document.getElementById('deltaD');
const kp = document.getElementById('kp');
const miu1Id = document.getElementById('miu1');
const miu2Id = document.getElementById('miu2');
const kapa = document.getElementById('kapa');
const randament = document.getElementById('randament');
const diametru_cil = document.getElementById('diametru_cil');

// Functionallity DOM cache
const button = document.getElementById('button');
const button2 = document.getElementById('button2');
const fnecM = document.getElementById('fnecM');
const st = document.getElementById('st');
const D_c = document.getElementById('D_c');
const amare = document.getElementById('amare');
const fef = document.getElementById('fef');
const qef = document.getElementById('qef');


// Conversion functions
const PI = Math.PI;
const toDegrees = angle => angle * (180 / PI);
const toRadians = angle => angle * (PI / 180);

// console.log(toRadians(20));
// console.log(toRadians(30));

// Global arrays
const diameterArr = [];
const gammaArr = [];
const betaArr = [];
const alphaArr = [];
const BIGamma = [];
const epsilonArr = [];
const hArr = [];
const GArr = [];
const QNecArr = [];
const FNecArr = [];
const SArr = [];

// Global variables
let pressure; // [bar]
let length1; // [mm]
let length2; // [mm]
let length3; // [mm]  /// trb 72
let e1; // [mm]
let e2; // [mm]
let alpha0; // [degree]
let D0; // [mm]
let deltaDiameter; // [mm]
let Kp;
let miu1;
let miu2;
let eta;
let k;
let diametruCil;

// Constant global variables
const theta = toRadians(30); // [degree]
const rho = 7.8 * Math.pow(10, -6); // [kg/mm^3]
const g = 9.8; // [m/s]
const miu = 0.3;
const etaN = 1;



// Calculus
function updateValues() {
  const beta0 = Math.asin((e1 + length1 * Math.sin(alpha0) - e2) / length2);
  let XI = PI - beta0;
  console.log(toDegrees(beta0));
  console.log(`Xi = ${XI}`);

  for (let i = -deltaDiameter; i <= deltaDiameter; i++) {
    let index = i + deltaDiameter;

    this[`marker${index}`] = document.getElementById(`diametru-${index + 1}`);
    let diametrulDOM = this[`marker${index}`];
    diametrulDOM.innerHTML = (D0 + i).toFixed(2);


    let gamma = Math.asin(-e2 / length3 * Math.cos(Math.atan(-i / (2 * length3 *
        Math.cos(theta)) - e2 / length3))) -
      Math.atan(-i / (2 * length3 * Math.cos(theta)) - e2 / length3);
    this[`gamma${index}`] = document.getElementById(`gamma-mic-${index + 1}`);
    let gammaDOM = this[`gamma${index}`];
    gammaDOM.innerHTML = (toDegrees(gamma)).toFixed(4);


    let betaChange = PI - XI - gamma;
    this[`beta${index}`] = document.getElementById(`beta-${index + 1}`);
    let betaDOM = this[`beta${index}`];
    betaDOM.innerHTML = (toDegrees(betaChange)).toFixed(4);


    let alphaChange = Math.asin((e2 + length2 * Math.sin(betaChange) - e1) / length1);
    this[`alpha${index}`] = document.getElementById(`alpha-${index + 1}`);
    let alphaDOM = this[`alpha${index}`];
    alphaDOM.innerHTML = (toDegrees(alphaChange)).toFixed(4);


    let biggammaChange = Math.cos(gamma) / (1 + e2 / length3 * Math.sin(gamma));
    this[`bigGamma${index}`] = document.getElementById(`gamma-mare-${index + 1}`);
    let bigGammaDOM = this[`bigGamma${index}`];
    bigGammaDOM.innerHTML = (biggammaChange).toFixed(4);


    let epsilonChange = length3 * (((1 + e2 / length3 * Math.sin(gamma)) / Math.cos(gamma)) - 1);
    this[`epsilon${index}`] = document.getElementById(`epsilon-${index + 1}`);
    let epsilonDOM = this[`epsilon${index}`];
    epsilonDOM.innerHTML = (-epsilonChange).toFixed(4);


    let hChange = (length2 / (2 * length3)) * (Math.sin(alphaChange + betaChange) /
      Math.cos(alphaChange)) * biggammaChange * etaN;
    // hChange *= 1000; // nu trb * 1000 si nu mm
    this[`inaltime${index}`] = document.getElementById(`inaltime-${index + 1}`);
    let hDOM = this[`inaltime${index}`];
    hDOM.innerHTML = (hChange).toFixed(4);


    let G0 = g * Kp * PI * Math.pow(D0 + i, 3) * rho / 4;
    this[`g-mare${index}`] = document.getElementById(`g-mare-${index + 1}`);
    let GDOM = this[`g-mare${index}`];
    GDOM.innerHTML = (G0).toFixed(4);


    let QnecChange = (k * G0 * Math.cos(theta)) / (2 * miu1 * Math.cos(gamma));
    this[`q-nec${index}`] = document.getElementById(`q-nec-${index + 1}`);
    let QnecDOM = this[`q-nec${index}`];
    QnecDOM.innerHTML = (QnecChange).toFixed(4);


    let FnecChange = QnecChange / hChange;
    this[`f-nec${index}`] = document.getElementById(`f-nec-${index + 1}`);
    let FnecDOM = this[`f-nec${index}`];
    FnecDOM.innerHTML = (FnecChange).toFixed(4);

    diameterArr.push(i);
    gammaArr.push(toDegrees(gamma));
    betaArr.push(toDegrees(betaChange));
    alphaArr.push(toDegrees(alphaChange));
    BIGamma.push(biggammaChange);
    epsilonArr.push(-epsilonChange);
    hArr.push(hChange);
    GArr.push(G0);
    QNecArr.push(QnecChange);
    FNecArr.push(FnecChange);

  }

  for (let i = -deltaDiameter; i <= deltaDiameter; i++) {
    let index = i + deltaDiameter;
    let alphaChange = toRadians(alphaArr[index])
    let betaChange = toRadians(betaArr[index])
    let min_alpha = toRadians(Math.min(...alphaArr))
    let min_beta = toRadians(Math.min(...betaArr))

    let Schange = length1 * (Math.cos(min_alpha) - Math.cos(alphaChange)) +
      length2 * (Math.cos(min_beta) - Math.cos(betaChange));

    this[`s-mic${index}`] = document.getElementById(`s-mic-${index + 1}`);
    let SDOM = this[`s-mic${index}`];
    SDOM.innerHTML = (Schange).toFixed(4);
    SArr.push(Schange);
  }
  console.log(SArr);
  fnecM.innerHTML = (FNecArr[FNecArr.length - 1]).toFixed(4);

  // Determinarea fortei de strangere (Q) la bacul de apucare
  let DM = diameterArr[(diameterArr.length - 1)];
  console.log(`DM = ${DM}`);
  let GM = g * Kp * PI * Math.pow(DM, 3) * rho / 4
  console.log(`GM = ${GM}`);


  // Determinarea diametrului cilindrului motorului de actionare
  let Qmax = Math.max(...QNecArr);
  let Fmax = Math.max(...FNecArr);

  let diametruCil = Math.sqrt((4 * Fmax) / (eta * PI * pressure));
  D_c.innerHTML = (diametruCil).toFixed(4);

  st.innerHTML = (Math.max(...SArr)).toFixed(4);

}


// Valori dupa alegerea cilindrului
function cilindruValues() {

  let Qmax = Math.max(...QNecArr);
  let Fmax = Math.max(...FNecArr);
  let garnituraH = 6;
  let aplhaM = alphaArr[Math.floor(alphaArr.length / 2)];
  let betaM = betaArr[Math.floor(betaArr.length / 2)];
  let diametruCil_init = Math.ceil(diametru_cil.value);
  console.log("diamcil", diametruCil_init);
  let Ffetan = PI * diametruCil_init * garnituraH * pressure * miu * Math.pow(10, -1);
  let Fef = ((PI * Math.pow(diametruCil_init, 2)) / 4) * pressure * Math.pow(10, -1) - Ffetan;
  let Qef = Math.max(...hArr) * Fef;
  let Area = PI * Math.pow(diametruCil_init, 2) / 4

  amare.innerHTML = (Area).toFixed(4);
  fef.innerHTML = (Fef).toFixed(4);
  qef.innerHTML = (Qef).toFixed(4);
}



// ===== Event Listeners ===== //
presiune.addEventListener('input', () => {
  pressure = parseFloat(presiune.value);
  localStorage.setItem("pressure", pressure);
});
l1.addEventListener('input', () => {
  length1 = parseFloat(l1.value);
  localStorage.setItem("length1", length1);
});
l2.addEventListener('input', () => {
  length2 = parseFloat(l2.value);
  localStorage.setItem("length2", length2);
});
l3.addEventListener('input', () => {
  length3 = parseFloat(l3.value);
  localStorage.setItem("length3", length3);
});
e1Id.addEventListener('input', () => {
  e1 = parseFloat(e1Id.value);
  localStorage.setItem("e1", e1);
});
e2Id.addEventListener('input', () => {
  e2 = parseFloat(e2Id.value);
  localStorage.setItem("e2", e2);
});
alfa0.addEventListener('input', () => {
  alpha0 = toRadians(parseFloat(alfa0.value));
  localStorage.setItem('alpha0', alfa0.value);
});
D0id.addEventListener('input', () => {
  D0 = parseFloat(D0id.value);
  localStorage.setItem("D0", D0);
});
deltaDiameterId.addEventListener('input', () => {
  deltaDiameter = parseFloat(deltaDiameterId.value);
  localStorage.setItem("deltaDiameter", deltaDiameter);
});
kp.addEventListener('input', () => {
  Kp = parseFloat(kp.value);
  localStorage.setItem("Kp", Kp);
});
miu1Id.addEventListener('input', () => {
  miu1 = parseFloat(miu1Id.value);
  localStorage.setItem("miu1", parseFloat(miu1));
});
miu2Id.addEventListener('input', () => {
  miu2 = parseFloat(miu2Id.value);
  localStorage.setItem("miu2", miu2);
});
kapa.addEventListener('input', () => {
  k = parseFloat(kapa.value);
  localStorage.setItem("k", k);
});
randament.addEventListener('input', () => {
  eta = parseFloat(randament.value);
  localStorage.setItem("eta", eta);
});
diametru_cil.addEventListener('input', () => {
  diametruCil = parseInt(diametru_cil.value);
  localStorage.setItem("diametruCil", diametruCil);
});


// ===== Local Storage setup ===== //
presiune.value = localStorage.getItem('pressure');
l1.value = localStorage.getItem('length1');
l2.value = localStorage.getItem('length2');
l3.value = localStorage.getItem('length3');
e1Id.value = localStorage.getItem('e1');
e2Id.value = localStorage.getItem('e2');
alfa0.value = localStorage.getItem('alpha0');
D0id.value = localStorage.getItem('D0');
deltaDiameterId.value = localStorage.getItem('deltaDiameter');
kp.value = localStorage.getItem('Kp');
miu1Id.value = localStorage.getItem('miu1');
miu2Id.value = localStorage.getItem('miu2');
kapa.value = localStorage.getItem('k');
randament.value = localStorage.getItem('eta');
diametru_cil.value = localStorage.getItem('diametruCil');


// ===== Local storage values for calculus ===== //
pressure = parseFloat(presiune.value);
length1 = parseFloat(l1.value);
length2 = parseFloat(l2.value);
length3 = parseFloat(l3.value);
e1 = parseFloat(e1Id.value);
e2 = parseFloat(e2Id.value);
alpha0 = toRadians(parseFloat(alfa0.value));
D0 = parseFloat(D0id.value);
deltaDiameter = parseFloat(deltaDiameterId.value);
Kp = parseFloat(kp.value);
miu1 = parseFloat(miu1Id.value);
miu2 = parseFloat(miu2Id.value);
k = parseFloat(kapa.value);
eta = parseFloat(randament.value);
diametruCil = parseInt(diametru_cil.value);


button.addEventListener('click', updateValues);
button2.addEventListener('click', cilindruValues);









// End
