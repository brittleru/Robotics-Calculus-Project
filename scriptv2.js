// Cache the DOM



// Conversion functions
const PI = Math.PI
const toDegrees = angle => angle * (180 / PI);
const toRadians = angle => angle * (PI / 180);


// Global variables
const armsLengthL1 = 0.20;         // [m]
const armsLengthL2 = 0.18;         // [m]
const H1 = 0.228;                  // [m]
const H2 = 0.016;                  // [m]
const H3 = 0.028;                  // [m]
const localPositionA = 0.02;       // [m]
const localPositionC = 0.02;       // [m]
const points = 10;                 // [m]
const initialPositionRi = [0.105, -0.220, 0.020];
const finalPositionRf = [0.325, 0.100, 0.150];
const initialOrientation = 0;     // [deg]
const finalOrientation = 90;      // [deg]
let r = [];
let fi = [];


// Result arrays
let Q1arr = [];
let Q2arr = [];
let Q3arr = [];
let Q4arr = [];
let PHIarr = [];
let time = [];  // [s]


// Position of intermediary points
for (let i = 0; i <= points; i++) {
    fi.push(initialOrientation + i * (initialOrientation + finalOrientation) / points);
    let temp = [];

    for (let j = 0; j < 3; j++) {
      temp.push(initialPositionRi[j] + i * (finalPositionRf[j] - initialPositionRi[j]) / points);
    }
    r.push(temp);
}

// Intermediary points calculus 
for (let i = 0; i <= points; i++) {
  let x = r[i][0];
  let y = r[i][1];
  let z = r[i][2];
  let phi = fi[i];

  let u = x - localPositionA * Math.cos(toRadians(phi));
  let v = y - localPositionC * Math.sin(toRadians(phi));
  let rho = Math.sqrt(Math.pow(u, 2) + Math.pow(v, 2));
  let theta = Math.atan(v / u);
  let gamma = Math.acos((Math.pow(armsLengthL1, 2) + Math.pow(rho, 2) - Math.pow(armsLengthL2, 2)) / (2 * armsLengthL1 * rho));
  let q1 = toDegrees(theta - gamma);
  let s = armsLengthL1 * Math.cos(toRadians(q1));
  let t = armsLengthL1 * Math.sin(toRadians(q1));
  let q2a = toDegrees(Math.atan((v - t) / (u - s)));
  let q2 = q2a - q1;
  let q3 = phi - q2 - q1;
  let q4 = H1 + H2 + H3 - localPositionC - z;
  
  Q1arr.push(q1);
  Q2arr.push(q2);
  Q3arr.push(q3);
  Q4arr.push(q4);
  PHIarr.push(phi);
  time.push(i);
}

console.log(`Q1arr = `, Q1arr );
console.log(`Q2arr = `, Q2arr);
console.log(`Q3arr = `, Q3arr);
console.log(`Q4arr = `, Q4arr);
console.log(`Phi arr = `, PHIarr);
console.log(`time = `, time);

