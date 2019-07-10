/////////////////////
//////////////////
// Lecture: Hoisting
/* Functions */
/*
calculateAge(1997);

function calculateAge(year) {
  console.log(new Date().getFullYear() - year);
}

calculateAge(1997);
//calculateAge works before the function is declared and after

//retirement(1990);
var retirement = function(year) {
  console.log(65 - (2019 - year));
};

retirement(1990);
/*retirement function does not work before retirement is declared because
javascript stores all variables as undefined until they are defined in the code*/

/* Variables */
/*
console.log(age); //undefined
var age = 23;
console.log(age); //23

function foo() {
  var age = 65;
  console.log(age);
}
foo();
console.log(age);
*/

///////////////////////////////////////
// Lecture: Scoping

// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword

/* Rules */
/*
1) Regular Function call: this points to global object
2) Method Call (Function inside Object): this points to object calling the method
*/

console.log(this); //window object

calculateAge(1997);

function calculateAge(year) {
  console.log(new Date().getFullYear() - year);
  console.log(this); //window object
}

var john = {
  name: "John",
  DOB: 1990,
  calculateAge: function() {
    console.log(this); //the John Object
    console.log(2019 - this.DOB);

    /*
    function innerFunction() {
      console.log(this); //window object
    }

    innerFunction();
    */
  }
};

john.calculateAge();

var mike = {
  name: "Mike",
  DOB: 1996
};

mike.calculateAge = john.calculateAge; //copies john's function to mike's
mike.calculateAge();
