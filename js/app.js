$(document).ready(setupBar);

// Constructor to create question objects which will be presented by the
// bartender.
function Question(taste, text) {
    this.taste = taste;
    this.text = text;
}

/*
Create a pantry object which should contain all of the ingredients. The pantry
must keep track of the quantity of each ingredient. When the amount of the
ingredient changes, the pantry needs to adjust the values stored in it's database.
*/

function Pantry(ingredient, quantity) {
    this.ingredient = ingredient;
    this.quantity = quantity;
}

// Add the ingredient to the Pantry if it doesn't already reside there.
// If it does, update the quantity stored.

Pantry.prototype.addIngredient = function (ingredient, quantity) {
    if (ingredient instanceof(Ingredient)) {
        console.log('Add ' + quantity + ' of ' + ingredient.name +
            ' to the pantry.');
        this.updateQuantity(ingredient, quantity);
    } else {
        console.log(
            'Make the ingredient a Pantry object and update the quantity stored.'
        );
    }
}

// Method to update the quantity of the ingredient on stock.
Pantry.prototype.updateQuantity = function (quantity) {
    console.log(
        'Adjust the quantity of the ingredient stored in the pantry.'
    );
    this.quantity += quantity;
    return this.quantity;
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

// Constructor for a bartender object.
function Bartender() {

}

// Method to allow the bartender to make drinks based on the customer's preferences.
Bartender.prototype.createDrink = function (tastePreferences) {
    // Use a few of lists to store the potential drink ingredients,
    // the customer's taste preferences, and the corresponding expression
    // used to describe the ingredient so we can suggest a drink.
    var extraIngredient = [],
        preferences = [],
        ingredientName = [];
    // Loop over the preferences object to see which tastes the customer prefers.
    for (var taste in tastePreferences) {
        if (tastePreferences[taste]) {
            preferences.push(taste);
        }
    }
    var primaryFlavor = chooseMainFlavor(preferences);
    var drink = nameDrink(primaryFlavor);

    // Using the current taste preference, search the list of ingredients
    // to find those that have a taste equal to the selected taste, then
    // store the expression in the list.
    for (var taste of preferences) {
        if (taste) {
            $.each(ingredients, function (i, ingredient) {
                if (ingredient.taste == taste) {
                    ingredientName.push(ingredient.expression);
                }
            });
        }
    }

    // Choose a random extra ingredient to add to the suggested drink.
    var rand = getRandomInt(0, ingredientName.length);
    extraIngredient.push(ingredientName[rand]);

    // Choose a random ingredient from the list of possible ingredients.
    var drinkIngredient = extraIngredient[getRandomInt(0, extraIngredient.length)];

    renderSuggestion(drink, drinkIngredient);
}

function chooseMainFlavor(preferences) {
    var mainFlavor;
    if (preferences.length > 1) {
        var index = getRandomInt(0, preferences.length)
        mainFlavor = preferences[index];
        preferences[index] = '';
    } else {
        mainFlavor = preferences[0];
    }

    return mainFlavor;
}

function renderSuggestion(drink, additive) {
    var suggestion = '';
    if (drink && additive) {
        suggestion = '"' + "Ye should try a " + drink + " with a " + additive +
            '"';
    } else {
        suggestion = '"' +
            "Ye need to select at least one preference for me to help." + '"';
    }
    $('.suggestion h2').text(suggestion);
}

function nameDrink(taste) {
    var adjective = taste;
    var animals = {
        "strong": ['Devil Dog', 'Black Mamba'],
        "salty": ['Golden Monkey', 'Manic Kangaroo'],
        "bitter": ['Rabid Mongoose', 'Dyslexic Badger', ],
        "sweet": ['Pink Panther', 'Ladybug'],
        "fruity": ['Dancing Bear', 'Flying Giraffe']
    }

    var animal = animals[taste][getRandomInt(0, animals[taste].length)];
    var drinkName = "";
    drinkName += adjective + " " + animal;
    return titleCase(drinkName);
}

function titleCase(str) {
    var regex = /(^|\s)[a-z]/g;
    return str.replace(regex, upperCase);
}

function upperCase(str) {
    return str.toUpperCase();
}

// Function to elicit a pseudo random number.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Convert each ingredient to an Ingredient object.
var rum = new Ingredient("rum", "glug of rum", "strong");
var whiskey = new Ingredient("whiskey", "slug of whiskey", "strong");
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

// Put the ingredients in an array.
var ingredients = [rum, whiskey, gin, olive, salt, bacon, bitters,
    tonic, lemon, sugar, honey, cola, orange, cassis, cherry
];

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

// console.log(storedRum.updateQuantity(-1));

// Make an array of the pantry items.
var storedIngredients = [storedRum, storedWhiskey, storedGin, storedOlive,
    storedSalt, storedBacon, storedBitters, storedTonic, storedLemon,
    storedSugar, storedHoney, storedCola, storedOrange, storedCassis,
    storedCherry
];
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
function Preferences() {
    this.strong = false,
        this.salty = false,
        this.bitter = false,
        this.sweet = false,
        this.fruity = false
};

function getUserPreferences(tastes, list) {
    for (var taste in tastes) {
        for (var i = 0; i < list.length; i++) {
            if (taste == list[i]['id']) {
                tastes[taste] = list.val();
            }

        }
    }
    // console.log(tastes);
    return tastes;
}

function setupBar() {
    $('.suggestion h2').empty();
    $('#questions .input-group').empty();
    enterBar();
}

function enterBar() {
    // Reset the bar
    var checkbox = '';
    var bartender = new Bartender();
    var checked = '';
    // Iterate over the questions array and add each to the response list.
    $.each(questions, function (i, question) {
        // Get the html markup.
        checkbox = $('.templates .form-input').clone();

        var input = checkbox.find('input');
        input.attr('name', "taste");
        input.attr('id', question.taste);
        input.attr('value', "true");

        var label = checkbox.find('label');
        label.attr('for', question.taste);
        label.text(question.text);

        $('#questions .input-group').append(checkbox);
    });

    // Handle the customer's selection.
    $('#submit').on('click', function (e) {
        e.preventDefault();
        checked = $('input:checked');
        if (checked.length < 1) {
            renderSuggestion();
        } else {
            var tastes = new Preferences();
            var userTastePreferences = getUserPreferences(tastes,
                checked);
            bartender.createDrink(userTastePreferences);
            $('input:checked').removeAttr('checked');
        }

    });

}
