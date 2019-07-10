/* Budget Control Module */
var budgetController = (function() {

    //Data of Budget
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percent: -1,
    }

    //Income Constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Expense Constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            //do not divide by 0
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }


    //Get total income and expense
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // ID = last ID + 1
            ID = (data.allItems[type].length === 0) ? 0 :
            data.allItems[type][data.allItems[type].length-1].id + 1;

            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else {
                //type === exp
                newItem = new Expense(ID, des, val);
            }

            //Push it to our data structure
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            //calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percent of income spent
            if (data.totals.inc > 0) {
                data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percent
            }
        },

        deleteItem: function(type, id) {
            var ids, index;

            // 1. find where the id is stored in array
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);

            //2. delete item from array
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },


        //////////////////////////////////////////////////// REMOVE LATER /////
        testing: function() {
            console.log(data);
        }
    }
    

})();

/* UI Control Module */
var UIController = (function() {
    // Declare DOM class strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expertContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        /* RULES
        1) + or - before number
        2) exactly 2 decimals
        3) comma separating every 3 digits
        */

        var numSplit, int, dec, sign;

        num = Math.abs(num);
        num = num.toFixed(2); //rounds to 2 decimals

        sign = (type === 'inc') ? '+' : '-';
        num = numberWithCommas(num);

        return sign + ' ' + num;

    }

    var numberWithCommas = function (number) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };


    // UI Public Functions
    return {
        // Returns DOMstrings
        getDOMstrings: function() {
            return DOMstrings;
        },

        // Returns input fields in an object
        getinput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        // Adds an item to UI
        addListItem: function(obj, type) {
            var html, newHtml, element;

            //Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DOMstrings.expertContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percent%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
            }

            //Replace the placeholder text with real data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        //Delete item from UI list
        deleteListItem: function(selectorID) {
            var element;
            element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },

        // Clear input fields
        clearFields: function() {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            console.log(fields);
            console.log(fieldsArray);

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();
        },

        // Display budget on UI
        displayBudget: function(data) {
            var type;
            data.budget >= 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(data.budget, type);
            
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(data.totalIncome, 'inc');
            
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(data.totalExpenses, 'exp');
            
            if (data.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = data.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            var now, year, month, months;

            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ", " + year;
            
        },

        changedType: function() {
            var fields;

            fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' +                DOMstrings.inputValue);
                
            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
    }

    

})();




/* Global App Control Module */
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.key === 13 || event.which === 13) {
                //Enter was pressed
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
    };

    var ctrlAddItem = function() {
        var input, newItem;

        //1. Get the field input data
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add item to the budge controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBudget();

            //6. Update percentages on expenses
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            //format: inc-1, exp-3, etc.
            splitID = itemID.split('-'); //[TYPE, ID]
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. Delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            //2. Delete item from UI
            UICtrl.deleteListItem(itemID);

            //3. Update new budget
            updateBudget();

            //4. Update percentages on expenses
            updatePercentages();
        }
    };

    var updateBudget = function() {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        var budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        //1. Calculate percentages
        budgetCtrl.calculatePercentages();

        //2. Read percentages from budget controller
        var percentages = budgetCtrl.getPercentages();

        //3. Update the UI with new percentages
        UICtrl.displayPercentages(percentages);
    };

    return {
        //Starts application
        init: function() {
            setupEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: -1
            })
        }
    }

})(budgetController, UIController);


/* START APPLICATION */
controller.init();