const carsInReverse = ['Ford', 'Honda', 'BMW', 'Lexus'];
for (let index = carsInReverse.length - 1; index > -1; index--) {
  console.log(carsInReverse[index]);
}

const person = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}
for (const key in person) {
  console.log(person[key]);
}

for (const key in person) {
  if (key === "birthDate") {
    console.log(person.birthDate);
  }
}

let number = 0;
while (number < 1000) {
  number++;
  console.log(number);
}

let number = 0;
do {
  number++;
  console.log(number);
} while (number < 1000);

/* A for loop is better than a while loop when you know the number of iterations.
A for...in loop is used with objects only.
A do while loop always runs once before testing the conditional. The while loop tests the conditional first. */