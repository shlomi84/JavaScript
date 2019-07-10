// let and const

// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5= 'Jane Miller';
console.log(name5); // Jane miller

//ES6
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller'; ERROR: CANNOT CHANGE CONSTANT



// ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'john';
        var yearOfBirth = 1990;
    }
    //in ES5 you can use variables outside of declaration because they are FUNCTION SCOPED
    console.log(firstName + " " + yearOfBirth);
}
driversLicense5(true);

// ES6
function driversLicense6(passedTest) {
    if (passedTest) {
        //variables belong to this block
        let firstName = 'john';
        const yearOfBirth = 1990;
        
    }

    //in ES6 variables are BLOCK SCOPED, not FUNCTION SCOPED
    //console.log(firstName + " " + yearOfBirth); error
}
driversLicense6(true);

let i = 23;

for (let i = 0; i < 5; i++) {
    console.log(i); //prints 1,2,3,4
}

console.log(i); //prints 23

//this occurs because the main block has its own i variable and the for loop has its own i variable as well.



///////////////////////////////////////////////////
// Blocks and IIFEs

//ES5 IIFE
(function() {
    const a = 1;
    let b = 2;
    var c = 3;
});


//ES6 Block version of IIFE - simpler
{
    const a = 1;
    let b = 2;
}

//console.log(a); ERROR, a and b belong to a block. its like an IIFE
//console.log(c); prints 3


///////////////////////////////////////////////////////
// Strings

let first = 'john'
let last = 'smith';
const birth = 1990;
function calcAge(year) {
    return 2019 - year;
}

// ES5
console.log('This is ' + first + ' ' + last + ' DOB: ' + birth);

// ES6
console.log(`This is ${first} ${last} DOB: ${birth}, I am ${calcAge(birth)} years old.`);

const n = `${first} ${last}`;
console.log(n.startsWith('J')); //returns true or false, case SENSITIVE
console.log(n.endsWith('ith'));
console.log(n.includes(' '));
console.log(`${first} `.repeat(5));



/////////////////////////////////////////////////////////
//Arrow functions
const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function(cur) {
    return 2019 - cur;
});
console.log(ages5);

//ES6
// argument => return statement
let ages6 = years.map(cur => 2019 - cur);
console.log(ages6);


// (argument1, argument2) => return statement
ages6 = years.map((cur, index) => `Age element ${index+1}: ${2019-cur}.`);
console.log(ages6);


/* (argument1, argument2) => {
    //do something here
    return;

*/
ages6 = years.map((cur, index) => {
    const now = new Date().getFullYear();
    const age = now - cur;
    return `Age element ${index+1}: ${age}.`;
})
console.log(ages6);

/////////////////////////////////////////////////////////////////
//Arrow functions 2
//Arrow functions dont have the 'this' keyword, they use the 'this' keyword from the the surrounding of where the function is called, Lexical 'this' keyword

//ES5
/*
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
box5.clickMe();
*/

//ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        })
    }
}
box6.clickMe();

//ES6 v2
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        })
    }
}
//box66.clickMe();
//clickMe: () => {} changes the 'this' from box66 to the window object, since that is the surrounding of box66. Thus, this.color and this.position is undefined



function Person(name) {
    this.name = name;
}

//ES5
Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this)); //bind copies the function while letting you change the 'this' keyword
    console.log(arr);
}
var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


//ES6 
Person.prototype.myFriends6 = function(friends) {
    let arr = friends.map((el) => `${this.name} is friends with ${el}`);
    console.log(arr);
}
new Person('John').myFriends6(friends);





/////////////////////////////////////////////////////////
//Destructuring

//ES5
//var john = ['John', 26];
//var name = john[0];
//var age = john[1];

//ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);



function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const[age2, retirement] = calcAgeRetirement(1997);
console.log(`age: ${age2}, retirement: ${retirement}`);





/////////////////////////////////////////////////////////////////////
//Arrays
const boxes = document.querySelectorAll('.box');

//ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
})


//ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');


//ES5
/*
for (i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }
    boxesArr5[i].textContent = 'I changed to blue';
}
*/

//ES6
for (const cur of boxesArr6) {
    if (cur.className.includes("blue")) continue;
    cur.textContent = 'I changed to blue';    
}

//ES5
var ages = [12, 17, 8, 21, 34, 11];
var full = ages.map(function(cur) {
    return cur >= 18;
});


//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));






//////////////////////////////////////////////////////////////////
//Spread operator
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}


var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);


const smithFamily = ['John', 'Jane', 'Mark'];
const millerFamily = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...smithFamily, 'Larry', ...millerFamily];
console.log(bigFamily);


const h = document.querySelector('h1');
const boxes2 = document.querySelectorAll('.box');
const all = [h, ...boxes2];
Array.from(all).forEach(cur => cur.style.color = 'purple');




//////////////////////////////////////////////////////////////////////////
//Rest parameters

//ES5
function isFullAge5() {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2019 - cur) >= 18);
    })
}
isFullAge5(1990, 1999, 1965);



//ES6
function isFullAge6(...years) {
    console.log(years);
    years.forEach(cur => console.log((2019-cur) >= 18));
}
const yrs = [1990, 1999, 1965];
isFullAge6(1990, 1999, 1992);



///////////////////////////////////////////////////////////////////////////
//Default parameters

//ES5
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
var john = new SmithPerson('John', 1990);
*/

//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);




/////////////////////////////////////////////////////////////////////////////
//Maps (Hashmap)

const question = new Map();
question.set('question', 'What is the name of latest JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'correct answer');
question.set(false, 'wrong answer');
console.log(question);

console.log(question.get('question'));
console.log(question.size);

question.delete(4);

if (question.has('correct')) {
    console.log('There is a valid answer');
}


//loop through hashmap
//question.forEach((val, key) => console.log(`key is ${key}, value is ${val}`));

for (let [key, val] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`key is ${key}, value is ${val}`);
    }
}

console.log(question.entries());







/////////////////////////////////////////////////////////////////////////////
//CLASSES
/*
//ES5
var Person5 = function(name, DOB, job) {
    this.name = name;
    this.DOB = DOB;
    this.job = job;
}
Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.DOB;
    console.log(age);
}
var john5 = new Person5('john', 1990, 'teacher');
john5.calculateAge();


class Person6 {
    constructor(name, DOB, job) {
        this.name = name;
        this.DOB = DOB;
        this.job = job;
    }

    calculateAge() {
        console.log(new Date().getFullYear() - this.DOB);
    }

    static greeting() {
        console.log('hey there');
    }
}
const john6 = new Person6('john', 1990, 'teacher');
john6.calculateAge();
Person6.greeting();

*/





/////////////////////////////////////////////////////////////////
//subclasses

//ES5
var Person5 = function(name, DOB, job) {
    this.name = name;
    this.DOB = DOB;
    this.job = job;
}
Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.DOB;
    console.log(age);
}
var john5 = new Person5('john', 1990, 'teacher');
john5.calculateAge();

var Athlete5 = function(name, DOB, job, olympicGames, medals) {
    Person5.call(this, name, DOB, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}
Athlete5.prototype = Object.create(Person5.prototype);




//ES6
class Person6 {
    constructor(name, DOB, job) {
        this.name = name;
        this.DOB = DOB;
        this.job = job;
    }

    calculateAge() {
        console.log(new Date().getFullYear() - this.DOB);
    }
}

class Athlete6 extends Person6 {
    constructor(name, DOB, job, olympicGames, medals) {
        super(name, DOB, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
johnAthlete6.wonMedal();





//////////////////////////////////////////////////////////////////////////////
//coding challenge
class Park {
    constructor(name, trees, area, age) {
        this.name = name;
        this.trees = trees;
        this.area = area;
        this.age = age;
    }
}

class Street {
    constructor(name, length, yearBuilt, size = "normal", ) {
        this.name = name;
        this.length = length;
        this.size = size;
        this.yearBuilt = yearBuilt;
    }
}

let park1 = new Park("Green Park", 100, 500, 10);
let park2 = new Park("Central Park", 2000, 750, 20);
let park3 = new Park("NJ Gardens", 3000, 1000, 40);

let st1 = new Street("Ocean Parkway", 200, 2011);
let st2 = new Street("BQE", 300, 2010, "huge");
let st3 = new Street("SI Expressway", 10, 2015, "tiny");
let st4 = new Street("Belt Parkway", 40, 2019, "small");

const parks = [park1, park2, park3];
const streets = [st1, st2, st3, st4];

parkReport(parks);
streetReport(streets);

function parkReport(parks) {
    console.log('---Park Report---');
    //Average age
    let age = 0;
    parks.forEach(el => age += el.age);
    console.log(`Our ${parks.length} have an average age of ${age/parks.length} years`);

    //Tree Density
    parks.forEach(el => console.log(`${el.name} has a tree density of ${el.trees/el.area}`));

    //More than 1,000 trees
    parks.forEach(el => {
        if (el.trees > 1000) {
            console.log(`${el.name} has more than 1000 trees`);
        }
    });
}

function streetReport(streets) {
    console.log('---Street Report---');

    //total and avg lengths
    let totalLength = 0;
    streets.forEach(el => totalLength += el.length);
    console.log(`Our ${streets.length} have a total length of ${totalLength} and average length of ${totalLength/streets.length}`);

    streets.forEach(el => {
        console.log(`${el.name}, built in ${el.yearBuilt}, is a ${el.size} street`);
    })
}








