$(document).ready(enterBar);

// Constructor to create question objects which will be presented by the
// bartender.
function Question(taste, text) {
    this.taste = taste;
    this.text = text;
}

/*
Create a pantry object which should contain all of the ingredients. The pantry
must keep track of the quantity of each ingredient. When the amount of the ingredient changes, the
pantry needs to adjust the values stored in it's database.
*/

function Pantry(ingredient, quantity) {
    this.ingredient = ingredient;
    this.quantity = quantity;
}

// Add the ingredient to the Pantry if it doesn't already reside there.
// If it does, update the quantity stored.

Pantry.prototype.addIngredient = function (ingredient, quantity) {
    if (ingredient instanceof(Ingredient)) {
        console.log('Add ' + quantity + ' of ' + ingredient.name + ' to the pantry.');
        this.updateQuantity(ingredient, quantity);
    } else {
        console.log('Make the ingredient a Pantry object and update the quantity stored.');
    }
}

// Method to update the quantity of the ingredient on stock.
Pantry.prototype.updateQuantity = function (ingredient, quantity) {
    console.log(
        'Adjust the quantity of the ingredient stored in the pantry.'
    );

}

/*
Create an ingredient object, the fundamental component of the app. Once an
ingredient exists, it can be stored in the pantry and used when making
drinks or meals.
 */
function Ingredient(name, expression, taste) {
    this.name = name;
    this.expression = expression;
    this.taste = taste;
}



// An array of ingredients to be used for drinks.
var ingredientArray = {
    "strong": ["Glug of rum", "slug of whisky", "splash of gin"],
    "salty": ["Olive on a stick", "salt-dusted rim", "rasher of bacon"],
    "bitter": ["Shake of bitters", "splash of tonic", "twist of lemon peel"],
    "sweet": ["Sugar cube", "spoonful of honey", "splash of cola"],
    "fruity": ["Slice of orange", "dash of cassis", "cherry on top"]
};

// Convert each ingredient to an Ingredient object.
var rum = new Ingredient("rum", "Glug of rum", "strong");
var whiskey = new Ingredient("whiskey", "Slug of whiskey", "strong");
var gin = new Ingredient("gin", "splash of gin", "strong");
var olive = new Ingredient("olive", "olive on a stick", "salty");
var salt = new Ingredient("salt", "salt-dusted rim", "salty");
var bacon = new Ingredient("bacon", "rasher of bacon", "salty");
var bitters = new Ingredient("bitters", "shake of bitters", "bitter");
var tonic = new Ingredient("tonic", "splash of tonic", "bitter");
var lemon = new Ingredient("lemon", "twist of lemon peel", "bitter");
var sugar = new Ingredient("sugar", "sugar cube", "sweet");
var honey = new Ingredient("honey", "spoonful of honey", "sweet");
var cola = new Ingredient("cola", "splash of cola", "sweet");
var orange = new Ingredient("orange", "slice of orange", "fruity");
var cassis = new Ingredient("cassis", "dash of cassis", "fruity");
var cherry = new Ingredient("cherry", "cherry on top", "fruity");

//Add the ingredients to the pantry.
var storedRum = new Pantry(rum, 96);
var storedWhiskey = new Pantry(whiskey, 48);
var storedGin = new Pantry(gin, 48);
var storedOlive = new Pantry(olive, 300);
var storedSalt = new Pantry(salt, 100);
var storedBacon = new Pantry(bacon, 35);
var storedBitters = new Pantry(bitters, 36);
var storedTonic = new Pantry(tonic, 96);
var storedLemon = new Pantry(lemon, 24);
var storedSugar = new Pantry(sugar, 180);
var storedHoney = new Pantry(honey, 35);
var storedCola = new Pantry(cola, 360);
var storedOrange = new Pantry(orange, 48);
var storedCassis = new Pantry(cassis, 48);
var storedCherry = new Pantry(cherry, 60);

// Create some question objects and store them in an array to use later.
var strongQuestion = new Question("strong", "Do ye like yer drinks strong?");
var saltyQuestion = new Question("salty", "Do ye like it with a salty tang?");
var bitterQuestion = new Question("bitter",
    "Are ye a lubber who likes it bitter?");
var sweetQuestion = new Question("sweet",
    "Would ye like a bit of sweetness with yer poison?");
var fruityQuestion = new Question("fruity", "Are ye one for a fruity finish?");
var questions = [strongQuestion, saltyQuestion, bitterQuestion, sweetQuestion,
    fruityQuestion
];

// An object to keep track of the customers taste preferences.
var tastePreferences = {
    "strong": false,
    "salty": false,
    "bitter": false,
    "sweet": false,
    "fruity": false
};



// To get started a customer must enter the bar.
function enterBar() {
    loadResponses();
}

function makeDrink() {
    var drink = [];
    for (var taste in tastePreferences) {
        if (tastePreferences[taste]) {
            console.log(taste + ", " + tastePreferences[taste]);
            var list = pantry[taste];
            console.log(list);
            var rand = getRandomInt(0, list.length);
            console.log(list.length + ", " + rand);
            drink.push(list[rand]);
            console.log(list[rand]);
        }
    }
    alert("You should try a drink with a " + drink);
    console.log(drink);
}

// Function to elicit a pseudo random number.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function loadResponses() {
    // Iterate over the questions array and add each to the response list.
    $.each(questions, function (i, question) {
        // Get the html markup.
        var checkbox = $('.templates .form-input').clone();

        var input = checkbox.find('input');
        input.attr('name', "taste");
        input.attr('id', question.taste);
        input.attr('value', "true");

        var label = checkbox.find('label');
        label.attr('for', question.taste);
        label.text(question.text);

        $('#bartender .input-group').append(checkbox);
    });

    // Handle the customer's selection.
    $('#submit').on('click', function (e) {
        e.preventDefault();
        var checked = $('input:checked');
        for (var taste in tastePreferences) {
            for (var i = 0; i < checked.length; i++) {
                if (taste == checked[i]['id']) {
                    tastePreferences[taste] = checked.val();
                }
            }
        }
        makeDrink();
    });
}
