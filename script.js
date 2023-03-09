"use strict";

// ACCOUNTS DATA
const account1 = {
  owner: "Ilia Ahadi",
  name: "ایلیا احدی",
  movements: [4000000, 450000, -2000000, 3000, 6500000, -1300000, 70000, 13000],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Ali Mohammadi",
  name: "علی محمدی",
  movements: [500000, 340000, -15000, -79000, -321000, -100000, 850000, -3000],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Mohammad Hosein Karimi",
  name: "محمد حسین کریمی",
  movements: [100000, -20000, 3400, -30000, -200, 500, 40000, -4600],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sara Hoseini",
  name: "سارا حسینی",
  movements: [43000, 10000000, 7000000, 5000, 9000],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

// ELEMENTS
const labelWelcome = document.querySelector(".welcome");
const app = document.querySelector(".app");

// MOVEMENTS
const containerMovements = document.querySelector(".movements");

function displayMovements(movements) {
  containerMovements.innerHTML = "";
  movements.forEach((mov, i) => {
    const type = mov > 0 ? "واریز" : "برداشت";
    const typeClass = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${typeClass}">${type} ${
      i + 1
    }</div>
        <div class="movements__value">${mov} تومان</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

// BALANCE CALCULATION
const labelBalance = document.querySelector(".balance__value");

function displayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} تومان`;
}

// DISPLAY SUMMARY
const summaryIn = document.querySelector(".summary__value--in");
const summaryOut = document.querySelector(".summary__value--out");
const summaryInterest = document.querySelector(".summary__value--interest");

function displaySummary(acc) {
  const sumIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `${sumIn} تومان`;

  const sumOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryOut.textContent = `${sumOut} تومان`;

  const sumInterest = acc.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  summaryInterest.textContent = `${sumInterest} تومان`;
}

// USERNAME CREATION
function usernameCreation(accs) {
  accs.forEach(
    (acc) =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join(""))
  );
}
usernameCreation(accounts);

// EVENT HANDLERS
const inputLogin = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const btnLogin = document.querySelector(".login__btn");

let currentAcc;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAcc = accounts.find((acc) => acc.username === inputLogin.value);

  if (currentAcc?.pin === +inputLoginPin.value) {
    // WELCOME MESSAGE
    labelWelcome.textContent = `${currentAcc.name.split(" ")[0]} خوش آمدید`;

    // CLEAR INPUT FIELDS
    inputLogin.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // DISPLAY APP
    app.style.visibility = "visible";
    app.style.opacity = 1;

    // DISPALY ACCOUNT BALANCE
    displayBalance(currentAcc);
    // DISPLAY MOVEMENTS
    displayMovements(currentAcc.movements);
    // DISPLAY ACCOUNT SUMMARY
    displaySummary(currentAcc);
  }
});
