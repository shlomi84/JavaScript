//print
console.log("Hello World!!");

/*
Five Different Data Types
1) Number (all numbers are floating in JS, decimals)
2) String
3) Boolean
4) Undefined (var does not have value yet)
5) Null (non-existent)
*/
var firstName = "John";
var lastName = "Smith";
var age = 28;
var overEighteen = true;

/***************************
 * Variable mutation and type coercion
 */
console.log(firstName + " " + lastName + ", age: " + age);

var job, isMarried;
job = "teacher";
isMarried = false;

//firstName = prompt("What is their first name?");

console.log(firstName + " is a " + job + " and is he married? " + isMarried);

/***************************
 * Basic Operators
1) +
2) -
3) *
4) /
5) >
6) <
*/
console.log(typeof firstName);

//precedence
//assignment works right to left
var x, y;
x = y = (8 + 2) * 2 - 5; //15
console.log(x, y);

/***************************
 * CODING CHALLENGE 1
 */
var mass_mark, height_mark, mass_john, height_john;
mass_mark = 100;
height_mark = 2.3;
mass_john = 120;
height_john = 2.1;

var BMI_mark, BMI_john;
BMI_mark = mass_mark / Math.pow(height_mark, 2);
BMI_john = mass_john / Math.pow(height_john, 2);

var markHigherBMI = BMI_mark > BMI_john;

console.log("Does Mark have a higher BMI than John? " + markHigherBMI);

/***************************
 * If-Else Statements
 */
firstName = "John";
var civilStatus = "single";

if (civilStatus === "married") {
  console.log(firstName + " is married.");
} else {
  console.log(firstName + " is not married.");
}

/* Ternary Operator */
firstName = "John";
age = 16;

age >= 18
  ? console.log(firstName + " drinks beer")
  : console.log(firstName + " drinks water");

/* Truthy and Falsy values */
//Falsy values: undefined, null, 0, '', Nan
//Truthy values: NOT falsy values
var height;
if (height || height === 0) {
  console.log("height is defined");
} else {
  console.log("height is not defined");
}

/* === vs. ==
 * == does type coercion (convers string to int or int to string) and then compares the 2 values to see if equal
 * === STRICTLY EQUAL checks if both the TYPE and VALUE are equal
 */

age = 25;
if (age == "25") {
  console.log("This is true");
}

if (age === "25") {
  //age === '25' is false, code won't run.
}

if (age === 25) {
  console.log("This is true");
}

/* FUNCTIONS */
/* Function Statements */
function calculateAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}
console.log(calculateAge(1997));

/* Function Expressions */
var whatDoYouDo = function(job, firstName) {
  switch (job) {
    case "teacher":
      return firstName + " is a teacher";
    case "driver":
      return firstName + " is a driver";
    default:
      return "NA";
  }
};

console.log(whatDoYouDo("teacher", "John"));

/* ARRAYS */
var names = ["John", "Mark", "Jane"];
var years = new Array(1990, 1969, 1948);
console.log(names);
console.log(names[2]);
console.log(names[3]);
names[90] = "mary";
console.log(names);

//different data types
var john = ["John", "Smith", 1990, "teacher", false];
john.push("blue"); //adds to end
john.unshift("Mr."); //adds to front

john.pop(); //deletes end
john.shift(); //deletes front

john.indexOf(1990); //returns position of 1990 in array

console.log(john);

/* Objects */
john = {
  firstName: "John",
  lastName: "Smith",
  birthYear: 1990,
  family: ["Jane", "Mark", "Bob"],
  job: "teacher",
  isMarried: false
};
/* Access */
john.firstName;
john.family;
john["job"];
/* Mutate */
john.job = "designer";

//new Object syntax
var jane = new Object();
jane.name = "Jane";
jane.job = "coder";

/* Object Methods */
var Shlomo = {
  firstName: "Shlomo",
  lastName: "Benyaminov",
  birthYear: 1990,
  family: ["Jane", "Mark", "Bob"],
  job: "teacher",
  isMarried: false,
  calcAge: function() {
    this.age = new Date().getFullYear() - this.birthYear;
  }
};

Shlomo.calcAge();
console.log(Shlomo.age);
