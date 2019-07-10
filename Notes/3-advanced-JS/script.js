/* Function Constructor */
/*
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
//Inherit the CalculateAge Function
Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
}

//Inherit the last name, Smith
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName); //Smith
console.log(jane.lastName); //Smith
*/
/*********************************** */

/* Object.create */
/*
var personProto = {
    calculateAge: function() {
        console.log(2019 - this.yearOfBirth);
    }
}

var john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: {value: 'jane'},
    yearOfBirth: {value: 1969},
    job: {value: 'designer'}
});
*/

//Primatives vs. Objects
//Primatives
var a = 23;
var b = a; //copy value of a to b
a = 46;
console.log(a); //46
console.log(b) //23
//the variables hold the actual data, not the pointer to memory location

//Objects
var john = {
    name: 'john',
    age: 26
}
var sarah = john; //sarah and john hold a reference that points to the address
john.age = 3;
console.log(john.age, sarah.age); //3, 3

//Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};
function change(a, b) {
    a = 30; //a changed to 30, NOT age, a is a copy of age
    b.city = 'San Francisco';
    //obj.city IS changed to San Fran because b points to the same memory location as obj
}
change(age, obj);
console.log(age, obj);


//////////////////////////////////////////////

// Passing Functions As Arguments
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(element) {
    return 2019 - element;
}

function isFullAge(element) {
    return element >= 18;
}

function maxHeartRate(element) {
    if (element >= 18 && element <= 81) {
        return Math.round(206.9 - (0.67 * element));
    }
    return -1;
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var heartRate = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(heartRate);


// Returning Functions
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ", can you please explain what UX design is?");
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log("What subject do you teach, " + name + "?");
        }
    } else {
        return function(name) {
            console.log("Hello " + name + " what do you do?");
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
*/


/* Immediately Invoked Function Expressions (IIFE) */
/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();

//data privacy
(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();
*/




/* Closures */
/*
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementIceland(1990);

function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ", can you please explain what UX design is?");
        } else if (job === 'teacher') {
            console.log("What subject do you teach, " + name + "?");
        } else {
            console.log("Hello " + name + " what do you do?");
        }
    }
}

interviewQuestion('teacher')('John');
*/



/* Bind, call, apply */
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gentlement I am ' + this.name);
        } else if (style === 'friendly') {
            console.log('Hey, whats up? I am ' + this.name + ", have a nice " + timeOfDay);
        }
    }
}

var emily = {
    name: 'emily',
    age: 35,
    job: 'designer',
}

john.presentation('formal', 'morning');
john.presentation.call(emily, 'friendly', 'afternoon');
//this = emily, method borrowing. Call allows us to change the this variable

//john.presentation.apply(emily, ['friendly', 'afternoon']);
//works same as call method but uses as array instead


//bind allows us to preset some arguments
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');
*/




/* Coding Challenge */

(function() {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
    
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    
    }
    
    Question.prototype.checkAnswer = function(ans, callback) {
        var sc = 0;

        if (ans === this.correct) {
            console.log("Correct Answer!");
            sc = callback(true);
        } else {
            console.log("Wrong Answer. Try Again.");
            sc = callback(false);
        }
        console.log("score: " + sc);
    }
    
    var q1 = new Question("Is JS the coolest language?", ['yes', 'no'], 0);
    var q2 = new Question("Name of course's teacher?", ['John', 'Mike', 'Jonas'], 2);
    var q3 = new Question("Best Describe Coding", ['boring', 'fun', 'hard'], 1);
    var questions = [q1, q2, q3];

    function score() {
        var sc = 0;
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    var keepScore = score();
    
    function nextQuestion() {
        var selector = Math.floor(Math.random()*questions.length);
        var questionSelected = questions[selector];
        
        questionSelected.displayQuestion();
        
        var stringAnswer = prompt("Please enter the correct answer");

        var answer = parseInt(stringAnswer);
        

        if (stringAnswer !== 'exit') {
            questionSelected.checkAnswer(answer, keepScore);
            nextQuestion();
        }
        
    }

    nextQuestion();

})();
