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
let length3; // [mm]
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
    diametrulDOM.innerHTML = D0 + i;


    let gamma = Math.asin(-e2 / length3 * Math.cos(Math.atan(-i / (2 * length3 *
                Math.cos(theta)) - e2 / length3))) -
                Math.atan(-i / (2 * length3 * Math.cos(theta)) - e2 / length3);
    this[`gamma${index}`] = document.getElementById(`gamma-mic-${index + 1}`);
    let gammaDOM = this[`gamma${index}`];
    gammaDOM.innerHTML = toDegrees(gamma);


    let betaChange = PI - XI - gamma;
    this[`beta${index}`] = document.getElementById(`beta-${index + 1}`);
    let betaDOM = this[`beta${index}`];
    // console.log(betaDOM);
    // console.log(toDegrees(betaChange));
    betaDOM.innerHTML = toDegrees(betaChange);


    let alphaChange = Math.asin((e2 + length2 * Math.sin(betaChange) - e1) / length1);
    this[`alpha${index}`] = document.getElementById(`alpha-${index + 1}`);
    let alphaDOM = this[`alpha${index}`];
    alphaDOM.innerHTML = toDegrees(alphaChange);


    let biggammaChange = Math.cos(gamma) / (1 + e2 / length3 * Math.sin(gamma));
    this[`bigGamma${index}`] = document.getElementById(`gamma-mare-${index + 1}`);
    let bigGammaDOM = this[`bigGamma${index}`];
    bigGammaDOM.innerHTML = biggammaChange;


    let epsilonChange = length3 * (((1 + e2 / length3 * Math.sin(gamma)) / Math.cos(gamma)) - 1);
    this[`epsilon${index}`] = document.getElementById(`epsilon-${index + 1}`);
    let epsilonDOM = this[`epsilon${index}`];
    epsilonDOM.innerHTML = -epsilonChange;


    let hChange = (length2 / (2 * length3)) * (Math.sin(alphaChange + betaChange)
                  / Math.cos(alphaChange)) * biggammaChange * etaN;
    hChange *= 1000;
    this[`inaltime${index}`] = document.getElementById(`inaltime-${index + 1}`);
    let hDOM = this[`inaltime${index}`];
    hDOM.innerHTML = hChange;


    let G0 = g * Kp * PI * Math.pow(D0 + i, 3) * rho / 4;
    this[`g-mare${index}`] = document.getElementById(`g-mare-${index + 1}`);
    let GDOM= this[`g-mare${index}`];
    GDOM.innerHTML = G0;


    let QnecChange = (k * G0 * Math.cos(theta)) / (2 * miu1 * Math.cos(gamma));
    this[`q-nec${index}`] = document.getElementById(`q-nec-${index + 1}`);
    let QnecDOM = this[`q-nec${index}`];
    QnecDOM.innerHTML = QnecChange;


    let FnecChange = 1000 * QnecChange / hChange;
    this[`f-nec${index}`] = document.getElementById(`f-nec-${index + 1}`);
    let FnecDOM = this[`f-nec${index}`];
    FnecDOM.innerHTML = FnecChange;


    let Schange;
    // ????????????????????????????????????????????????????????????????????? //
    if (i === -deltaDiameter) {
      Schange = length1 * (Math.cos(alpha0) - Math.cos(alphaChange)) +
                length2 * (Math.cos(betaChange) - Math.cos(betaChange));
    }
    else if (alpha0 < alphaChange) {
      Schange = length1 * (Math.cos(alpha0) - Math.cos(alphaChange)) +
                length2 * (Math.cos(betaChange) - Math.cos(betaChange));
    }
    else {
      Schange = length1 * (Math.cos(alphaChange) - Math.cos(alpha0)) +
                length2 * (Math.cos(betaChange) - Math.cos(betaArr[0]));
    }
    this[`s-mic${index}`] = document.getElementById(`s-mic-${index + 1}`);
    let SDOM = this[`s-mic${index}`];
    SDOM.innerHTML = Schange;
    // ??????????????????????????????????????????????????????????????????? //

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
    SArr.push(Schange);

  }

  fnecM.innerHTML = FNecArr[FNecArr.length - 1];

  // Determinarea diametrului cilindrului motorului de actionare
  let Qmax = QNecArr[QNecArr.length - 1];
  let Fmax= FNecArr[FNecArr.length - 1];
  let diametruCil = Math.sqrt((4 * Fmax) / ( eta * PI * pressure));
  D_c.innerHTML = diametruCil;

  st.innerHTML = SArr[SArr.length - 1];

}


// Valori dupa alegerea cilindrului
function cilindruValues() {

  let Qmax = QNecArr[QNecArr.length - 1];
  let Fmax= FNecArr[FNecArr.length - 1];
  let garnituraH = 1; // ????????????????????
  let aplhaM = alphaArr[Math.floor(alphaArr.length / 2)];
  let betaM = betaArr[Math.floor(betaArr.length / 2)];
  let diametruCil_init = diametru_cil.value;
  let Ffetan = PI * diametruCil_init * garnituraH * pressure * miu * Math.pow(10, -1);
  let Fef = (PI * Math.pow(diametruCil_init, 2)) / 4 * pressure * Math.pow(10, -1) - Ffetan;
  let Qef = hArr[hArr.length - 1] * Fef; // ??????????????????????????????????????????????????????????????????????????
  // ????????????????????????????????????????????????????
  // ????????????????????????????????????????????????????
  amare.innerHTML = '???';
  fef.innerHTML = Fef;
  qef.innerHTML = Qef;
}



console.log("D = ", diameterArr);
console.log('Gamma = ', gammaArr);
console.log('Beta = ', betaArr);
console.log('Alfa = ', alphaArr);
console.log('Gamma mare = ', BIGamma);
console.log('Epsilon = ', epsilonArr); // semne pe dos
console.log('H = ', hArr);
console.log("G = ", GArr);
console.log("Qnec = ", QNecArr);
console.log("Fnec = ", FNecArr);
console.log("s = ", SArr);



// let G0 = g * Kp * PI * Math.pow(D0, 3) * rho / 4;

// console.log(`G0 = ${G0}`);


// let GM = g * Kp * PI * Math.pow(DM, 3) * rho / 4
// console.log(`GM = ${GM}`);


let DM = 75;
// Dimensionarea bacurilor
let joc = 3 // 2 - 4 [mm]
let b = DM / (2 * Math.tan(theta)) + 3;
let a = D0 / (2 * Math.cos(theta)) - e2;
let gammaE = gammaArr[gammaArr.length - 1] + joc;
// console.log(`b = ${b}`);
// console.log(`a = ${a}`);
// console.log(`GammaE = ${gammaE}`);






// console.log('qmax = ', Qmax);
// console.log('fmax = ', Fmax);
// console.log('Diametru cilindru = ', diametruCil);
// console.log('Se alege diametrul cilindrului: 20mm si latimea garniturii H: ???');



// // Determinarea cursei pistonuliui motorului de actionare
// // -- Cursa pistonului pentru diametrul minim -- //
// let sprim = length1 * (Math.cos(toRadians(alpha0)) - Math.cos(toRadians(alphaArr[0]))) +
//             length2 * (Math.cos(toRadians(beta0)) - Math.cos(toRadians(betaArr[0])));
// let sprimR = sprim + 3;
//
// // -- Cursa pistonului pentru diametrul maxim -- //
// let sSecund = length1 * (Math.cos(toRadians(alphaArr[alphaArr.length - 1])) - Math.cos(toRadians(alpha0))) +
//               length2 * (Math.cos(toRadians(betaArr[betaArr.length - 1])) - Math.cos(toRadians(beta0)));

// console.log("S prim = ", sprim);
// console.log('S prim R = ', sprimR);
// console.log('S secund = ', sSecund);
// console.log("Fef =", Fef);
// console.log('Qef =', Qef); // ?????????????????????????????????????????








// ===== Event Listeners ===== //
presiune.addEventListener('input', () => {
  pressure = parseFloat(presiune.value);
});
l1.addEventListener('input', () => {
  length1 = parseFloat(l1.value);
});
l2.addEventListener('input', () => {
  length2 = parseFloat(l2.value);
});
l3.addEventListener('input', () => {
  length3 = parseFloat(l3.value);
});
e1Id.addEventListener('input', () => {
  e1 = parseFloat(e1Id.value);
});
e2Id.addEventListener('input', () => {
  e2 = parseFloat(e2Id.value);
});
alfa0.addEventListener('input', () => {
  alpha0 = toRadians(parseFloat(alfa0.value));
  console.log(alpha0);
});
D0id.addEventListener('input', () => {
  D0 = parseFloat(D0id.value);
});
deltaDiameterId.addEventListener('input', () => {
  deltaDiameter = parseFloat(deltaDiameterId.value);
});
kp.addEventListener('input', () => {
  Kp = parseFloat(kp.value);
});
miu1Id.addEventListener('input', () => {
  miu1 = parseFloat(miu1Id.value);
});
miu2Id.addEventListener('input', () => {
  miu2 = parseFloat(miu2Id.value);
});
kapa.addEventListener('input', () => {
  k = parseFloat(kapa.value);
});
randament.addEventListener('input', () => {
  eta = parseFloat(randament.value);
});
diametru_cil.addEventListener('input', () => {
  diametruCil = parseInt(diametru_cil.value);
});
button.addEventListener('click', updateValues);
button2.addEventListener('click', cilindruValues);




























// End
