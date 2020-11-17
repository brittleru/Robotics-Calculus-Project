// Cache the DOM







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
const QmaxArr = [];
const FmaxArr = [];
const SArr = [];

// Global variables
const pressure = 2.3; // [bar]
const length1 = 21; // [mm]
const length2 = 30; // [mm]
const length3 = 68; // [mm]
const e1 = 10; // [mm]
const e2 = 13; // [mm]
const alpha0 = toRadians(20); // [degree]
const theta = toRadians(30); // [degree]
const rho = 7.8 * Math.pow(10, -6); // [kg/mm^3]
const D0 = 65; // [mm]
const deltaDiameter = 10; // [mm]
const Kp = 1.2;
const g = 9.8; // [m/s]
const miu = 0.3;
const miu1 = 0.5;
const miu2 = 0.6;
const eta = 0.85;
const k = 1.4;
const etaN = 1;

// console.log(alpha0, theta);



// Calculus
const beta0 = Math.asin((e1 + length1 * Math.sin(alpha0) - e2) / length2);
let XI = PI - beta0;
console.log(toDegrees(beta0));
console.log(`Xi = ${XI}`);

let DM = 75;

// let G0 = g * Kp * PI * Math.pow(D0, 3) * rho / 4;

// console.log(`G0 = ${G0}`);


let GM = g * Kp * PI * Math.pow(DM, 3) * rho / 4
console.log(`GM = ${GM}`);



for (let i = -deltaDiameter; i <= deltaDiameter; i++) {
  let gamma = Math.asin(-e2 / length3 * Math.cos(Math.atan(-i / (2 * length3 *
              Math.cos(theta)) - e2 / length3))) -
              Math.atan(-i / (2 * length3 * Math.cos(theta)) - e2 / length3);

  let betaChange = PI - XI - gamma;

  let alphaChange = Math.asin((e2 + length2 * Math.sin(betaChange) - e1) / length1);

  let biggammaChange = Math.cos(gamma) / (1 + e2 / length3 * Math.sin(gamma));

  let epsilonChange = length3 * (((1 + e2 / length3 * Math.sin(gamma)) / Math.cos(gamma)) - 1);

  let hChange = (length2 / (2 * length3)) * (Math.sin(alphaChange + betaChange)
                / Math.cos(alphaChange)) * biggammaChange * etaN;

  let G0 = g * Kp * PI * Math.pow(D0 + i, 3) * rho / 4;

  let QnecChange = (k * G0 * Math.cos(theta)) / (2 * miu1 * Math.cos(gamma));

  let FnecChange = QnecChange / hChange;
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

  // ??????????????????????????????????????????????????????????????????? //

  diameterArr.push(i);
  gammaArr.push(toDegrees(gamma));
  betaArr.push(toDegrees(betaChange));
  alphaArr.push(toDegrees(alphaChange));
  BIGamma.push(biggammaChange);
  epsilonArr.push(-epsilonChange);
  hArr.push(hChange * 1000);
  GArr.push(G0);
  QNecArr.push(QnecChange);
  FNecArr.push(FnecChange);
  SArr.push(Schange);

  // Mai trb G[N] si s[mm]
  // QmaxArr.push(QmaxChange);
  // FmaxArr.push(FmaxChange);
}

console.log(diameterArr);
console.log(gammaArr);
console.log(betaArr);
console.log(alphaArr);
console.log(BIGamma);
console.log(epsilonArr); // semne pe dos
console.log(hArr);
console.log("GArr = ", GArr);
console.log("qnec = ", QNecArr);
console.log("fnec = ", FNecArr);
console.log("S = ", SArr);
// console.log("qmax = ", QmaxArr);
// console.log("fmax = ", FmaxArr);

// Dimensionarea bacurilor
let joc = 3 // 2 - 4 [mm]
let b = DM / (2 * Math.tan(theta)) + 3;
let a = D0 / (2 * Math.cos(theta)) - e2;
let gammaE = gammaArr[gammaArr.length - 1] + joc;
console.log(`b = ${b}`);
console.log(`a = ${a}`);
console.log(`GammaE = ${gammaE}`);


gammaE = -Math.atan((a - b * Math.sin(theta)) / (length3 + b * Math.cos(theta)))
         +Math.asin((DM / 2 + joc - e2) / (length3 + b * Math.cos(theta))
         *Math.cos(Math.atan((a - b * Math.sin(theta)) / (length3 + b * Math.cos(theta)))));


console.log(`gammaE 2= ${toDegrees(gammaE)}`);




// Determinarea diametrului cilindrului motorului de actionare

let Qmax = QNecArr[QNecArr.length - 1];

let Fmax= FNecArr[FNecArr.length - 1];

let diametruCil = Math.sqrt((4 * Fmax) / ( eta * PI * pressure));

console.log('qmax = ', Qmax);
console.log('fmax = ', Fmax);
console.log('Diametru cilindru = ', diametruCil);
console.log('Se alege diametrul cilindrului: 20mm si latimea garniturii H: ???');


diametruCil = 20;


let garnituraH = 1; // ????????????????????

// let aplhaM = alphaArr[Math.floor(alphaArr.length / 2)];
// let betaM = betaArr[Math.floor(betaArr.length / 2)];
// console.log(betaM);
// console.log(aplhaM);
let FnecM = Fmax;
let Ffetan = PI * diametruCil * garnituraH * pressure * miu * Math.pow(10, -1);
let Fef = (PI * Math.pow(diametruCil, 2)) / 4 * pressure * Math.pow(10, -1) - Ffetan;
let Qef = hArr[hArr.length - 1] * Fef; // ??????????????????????????????????????????????????????????????????????????
// ????????????????????????????????????????????????????

// Determinarea cursei pistonuliui motorului de actionare
// -- Cursa pistonului pentru diametrul minim -- //
let sprim = length1 * (Math.cos(toRadians(alpha0)) - Math.cos(toRadians(alphaArr[0]))) +
            length2 * (Math.cos(toRadians(beta0)) - Math.cos(toRadians(betaArr[0])));
let sprimR = sprim + 3;

// -- Cursa pistonului pentru diametrul maxim -- //
let sSecund = length1 * (Math.cos(toRadians(alphaArr[alphaArr.length - 1])) - Math.cos(toRadians(alpha0))) +
              length2 * (Math.cos(toRadians(betaArr[betaArr.length - 1])) - Math.cos(toRadians(beta0)));

console.log("S prim = ", sprim);
console.log('S prim R = ', sprimR);
console.log('S secund = ', sSecund);
console.log("Fef =", Fef);
console.log('Qef =', Qef); // ?????????????????????????????????????????






































// End
