"use strict";

// ACCOUNTS DATA
const account1 = {
  owner: "Ilia Ahadi",
  name: "ایلیا احدی",
  movements: [4000000, 450000, -2000000, 3000, 6500000, -1300000, 70000, 13000],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2023-02-01T10:17:24.185Z",
    "2023-02-08T14:11:59.604Z",
    "2023-03-07T17:01:17.194Z",
    "2023-03-11T23:36:17.929Z",
    "2023-03-12T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Ali Mohammadi",
  name: "علی محمدی",
  movements: [500000, 340000, -15000, -79000, -321000, -100000, 850000, -3000],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-01-05T16:33:06.386Z",
    "2023-01-10T14:43:26.374Z",
    "2023-02-25T18:49:59.371Z",
    "2023-03-14T12:01:20.894Z",
  ],
};

const account3 = {
  owner: "Mohammad Hosein Karimi",
  name: "محمد حسین کریمی",
  movements: [100000, -20000, 3400, -30000, -200, 500, 40000, -4600],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-01-05T16:33:06.386Z",
    "2023-01-10T14:43:26.374Z",
    "2023-02-25T18:49:59.371Z",
    "2023-03-14T12:01:20.894Z",
  ],
};

const account4 = {
  owner: "Sara Hoseini",
  name: "سارا حسینی",
  movements: [43000, 10000000, 7000000, 5000, 190000, 200000, 500000, 120000],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2023-02-01T10:17:24.185Z",
    "2023-02-08T14:11:59.604Z",
    "2023-03-07T17:01:17.194Z",
    "2023-03-11T23:36:17.929Z",
    "2023-03-12T10:51:36.790Z",
  ],
};
const accounts = [account1, account2, account3, account4];

// ELEMENTS
const labelWelcome = document.querySelector(".welcome");
const labelBalance = document.querySelector(".balance__value");
const labelDate = document.querySelector(".balance__date");

const containerMovements = document.querySelector(".movements");
const app = document.querySelector(".app");

const summaryIn = document.querySelector(".summary__value--in");
const summaryOut = document.querySelector(".summary__value--out");
const summaryInterest = document.querySelector(".summary__value--interest");

const inputLogin = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const btnLogin = document.querySelector(".login__btn");

const inputTransfer = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const btnTransfer = document.querySelector(".form__btn--transfer");

const inputLoan = document.querySelector(".form__input--loan");
const btnLoan = document.querySelector(".form__btn--loan");

const inputDelete = document.querySelector(".form__input--user");
const inputDeletePin = document.querySelector(".form__input--pin");
const btnDelete = document.querySelector(".form__btn--close");

const btnSort = document.querySelector(".btn--sort");

const labelTimer = document.querySelector(".timer");

// FUNCTIONS

// MOVEMENTS DATE
function calcDisplayDate(date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "امروز";
  if (daysPassed === 1) return "دیروز";
  if (daysPassed <= 7) return `${daysPassed} روز پیش`;

  return new Intl.DateTimeFormat("fa-IR").format(date);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

// MOVEMENTS
function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "واریز" : "برداشت";
    const typeClass = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = calcDisplayDate(date);

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${typeClass}">${type} ${
      i + 1
    }</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurrency(mov)} تومان</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

// BALANCE CALCULATION
function displayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCurrency(acc.balance)} تومان`;
}

// DISPLAY SUMMARY
function displaySummary(acc) {
  const sumIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `${formatCurrency(sumIn)} تومان`;

  const sumOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryOut.textContent = `${formatCurrency(sumOut)} تومان`;

  const sumInterest = acc.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov, 0);
  summaryInterest.textContent = `${formatCurrency(sumInterest)} تومان`;
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

function updateUI(acc) {
  // DISPALY ACCOUNT BALANCE
  displayBalance(acc);
  // DISPLAY MOVEMENTS
  displayMovements(acc);
  // DISPLAY ACCOUNT SUMMARY
  displaySummary(acc);
}

// INACTIVE LOGOUT TIMER
function logoutTimer() {
  let time = 150;

  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "برای شروع وارد شوید";
      app.style.opacity = 0;
      app.style.visibility = "hidden";
      currentAcc = null;
    }
    time--;
  }
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

// EVENT HANDLERS

// LOGIN
let currentAcc, timer;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAcc = accounts.find((acc) => acc.username === inputLogin.value);

  if (currentAcc?.pin === +inputLoginPin.value) {
    // WELCOME MESSAGE
    labelWelcome.textContent = `${currentAcc.name.split(" ")[0]} خوش آمدید`;

    // DISPLAY TIME
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    labelDate.textContent =
      "تاریخ ورود: " + new Intl.DateTimeFormat("fa-IR", options).format(now);

    // CLEAR INPUT FIELDS
    inputLogin.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // DISPLAY APP
    app.style.visibility = "visible";
    app.style.opacity = 1;

    // UPDATE UI
    updateUI(currentAcc);

    if (timer) clearInterval(timer);
    timer = logoutTimer();
  }
});

// TRANSFER
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const transferTo = accounts.find(
    (acc) => acc.username === inputTransfer.value
  );
  const transferAmount = +inputTransferAmount.value;

  if (
    currentAcc.balance >= transferAmount &&
    transferAmount > 0 &&
    transferTo &&
    transferTo?.username !== currentAcc.username
  ) {
    // DOING TRANSFER
    currentAcc.movements.push(-transferAmount);
    transferTo.movements.push(transferAmount);

    // ADD DATE
    currentAcc.movementsDates.push(new Date().toISOString());
    transferTo.movementsDates.push(new Date().toISOString());

    // UPDATE UI
    updateUI(currentAcc);

    // CLEAR FIELDS
    inputTransfer.value = inputTransferAmount.value = "";

    // RESET TIMER
    clearInterval(timer);
    timer = logoutTimer();
  }
});

// REQUEST LOAN
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const amountLoan = +inputLoan.value;

  if (
    amountLoan > 0 &&
    currentAcc.movements.some((mov) => mov >= amountLoan * 0.1)
  ) {
    // ADD LOAN
    setTimeout(() => {
      currentAcc.movements.push(amountLoan);

      // ADD DATE
      currentAcc.movementsDates.push(new Date().toISOString());

      // UPDATE UI
      updateUI(currentAcc);

      // CLEAR FIELDS
      inputLoan.value = "";

      // RESET TIMER
      clearInterval(timer);
      timer = logoutTimer();
    }, 3000);
  }
});

// DELETE ACCOUNT
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputDelete.value === currentAcc.username &&
    +inputDeletePin.value === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAcc.username
    );

    // DELETE ACCOUNT
    accounts.splice(index, 1);

    // HIDE UI
    app.style.visibility = "hidden";
    app.style.opacity = 0;
  }

  inputDelete.value = inputDeletePin.value = "";
});

// SORTING MOVEMENTS
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
  if (sorted === true) btnSort.innerHTML = "&#8645; مرتب سازی";
  else if (sorted === false) btnSort.innerHTML = "&downarrow; مرتب سازی";
});
