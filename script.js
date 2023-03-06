"use strict";

// ACCOUNTS DATA

const account1 = {
  owner: "Ilia Ahadi",
  movements: [
    2000000, 450000, -4000000, 3000, -6500000, -1300000, 70000, 13000,
  ],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Ali Mohammadi",
  movements: [500000, 340000, -15000, -79000, -321000, -100000, 850000, -3000],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Mohammad Hosein Karimi",
  movements: [2000, -20000, 3400, -30000, -200, 500, 40000, -4600],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sara Hoseini",
  movements: [43000, 1000000000, 7000000, 5000, 9000],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];

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
displayMovements(account1.movements);

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
