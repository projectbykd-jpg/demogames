// ========================================
// LOLTOTO SCRIPT.JS
// ========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzII1ekyINbflVxrIfT2vihMtg0uOlM6aFXTHepoD9dXpFt4xeesC5iobhHIb-WA9xmYw/exec";


// ========================================
// REGISTER
// ========================================

async function registerUser(){

try{

const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value.trim();

if(!username || !password){

alert("Username dan Password wajib diisi");

return;

}

const response = await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"register",

username,

password

})

});

const result =
await response.json();

alert(result.message);

if(result.status){

window.location.href="login.html";

}

}catch(err){

console.error(err);

alert("Register gagal");

}

}


// ========================================
// LOGIN
// ========================================

async function loginUser(){

try{

const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value.trim();

if(!username || !password){

alert("Username dan Password wajib diisi");

return;

}

const response = await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"login",

username,

password

})

});

const result =
await response.json();

if(result.status){

localStorage.setItem(
"user",
JSON.stringify(result.user)
);

window.location.href="index.html";

}else{

alert(result.message);

}

}catch(err){

console.error(err);

alert("Login gagal");

}

}


// ========================================
// LOAD USER
// ========================================

function loadUser(){

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){

return;

}

const usernameElement =
document.getElementById("usernameDisplay");

const saldoElement =
document.getElementById("saldoDisplay");

if(usernameElement){

usernameElement.innerText =
user.username;

}

if(saldoElement){

saldoElement.innerText =
"Rp " +
Number(user.saldo || 0)
.toLocaleString("id-ID");

}

}


// ========================================
// LOGOUT
// ========================================

function logout(){

localStorage.removeItem("user");

window.location.href="login.html";

}


// ========================================
// REFRESH SALDO
// ========================================

async function refreshBalance(){

try{

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){

return;

}

const response = await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"getsaldo",

username:user.username

})

});

const result =
await response.json();

if(result.status){

user.saldo =
result.saldo;

localStorage.setItem(
"user",
JSON.stringify(user)
);

const saldoElement =
document.getElementById("saldoDisplay");

if(saldoElement){

saldoElement.innerText =
"Rp " +
Number(result.saldo)
.toLocaleString("id-ID");

}

}

}catch(err){

console.error(err);

}

}


// ========================================
// DEPOSIT
// ========================================

async function deposit(){

try{

const amount =
document.getElementById("depositAmount").value;

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!amount){

alert("Masukkan nominal");

return;

}

const response =
await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"deposit",

username:user.username,

amount

})

});

const result =
await response.json();

alert(result.message);

}catch(err){

console.error(err);

alert("Deposit gagal");

}

}


// ========================================
// WITHDRAW
// ========================================

async function withdraw(){

try{

const amount =
document.getElementById("withdrawAmount").value;

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!amount){

alert("Masukkan nominal");

return;

}

const response =
await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"withdraw",

username:user.username,

amount

})

});

const result =
await response.json();

alert(result.message);

}catch(err){

console.error(err);

alert("Withdraw gagal");

}

}


// ========================================
// TRANSAKSI GAME
// ========================================

async function saveTransaction(
game,
bet,
result,
profit
){

try{

const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){

return;

}

await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"transaction",

username:user.username,

game,

bet,

result,

profit

})

});

await refreshBalance();

}catch(err){

console.error(err);

}

}


// ========================================
// VISITOR LOG
// ========================================

async function saveVisit(page){

try{

const user =
JSON.parse(
localStorage.getItem("user")
);

await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"visit",

username:
user ? user.username : "Guest",

page

})

});

}catch(err){

console.error(err);

}

}


// ========================================
// DEMO GAME
// ========================================

async function minesWin(){

await saveTransaction(
"Mines",
10000,
"WIN",
15000
);

}

async function baccaratWin(){

await saveTransaction(
"Baccarat",
50000,
"WIN",
75000
);

}

async function rouletteWin(){

await saveTransaction(
"Roulette",
25000,
"WIN",
50000
);

}


// ========================================
// AUTO VISIT
// ========================================

window.addEventListener(
"load",
()=>{

saveVisit(
window.location.pathname
);

}
);
