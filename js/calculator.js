/**
 * Created by vladimir on 06.03.17.
 */
var calculator = (function ($) {
    var resultContainer = $("#result");

    var numberOne;
    var numberTwo;
    var operation;

    var action = {
        "+": function (first, second) {
            return first + second;
        },
        "-": function (first, second) {
            return first - second;
        },
        "/": function (first,second) {
            return (second != 0)? first / second : "Nan"
        },
        "*": function (first, second) {
            return first * second;
        }
    };

    var result;

    function checkValidInputWhile(sign) {
        var currentInput = getResult(+getResultFromContainer());
        if (currentInput) {
            numberOne = currentInput;
            resultContainer.html(numberOne + sign);
            operation = sign;
        } else {
            equals()
        }
    }

    function init() {
        resultContainer = $("#result");
    }

    function addition() {
        checkValidInputWhile("+")
    }

    function subtraction() {
        checkValidInputWhile("-")
    }

    function multiplication() {
        checkValidInputWhile("*")
    }

    function division() {
        checkValidInputWhile("/")
    }

    function squareRoot() {
        resultContainer.html(Math.sqrt(+getResultFromContainer()))
    }

    function equals() {
        numberTwo = +getResultFromContainer().split(operation)[1];
        console.debug(numberOne, operation, numberTwo);
        resultContainer.html(Number((action[operation](numberOne,numberTwo))).toFixed(5));
    }

    function percent() {
        resultContainer.html(+getResultFromContainer() / 100)
    }

    function cos() {
        resultContainer.html(Math.cos(+getResultFromContainer()))
    }

    function sin() {
        resultContainer.html(Math.sin(+getResultFromContainer()))
    }

    function tg() {
        resultContainer.html(Math.tan(+getResultFromContainer()))
    }

    function ctg() {
        resultContainer.html(1 / Math.tan(+getResultFromContainer()))
    }

    function placeDot() {
        resultContainer.html(getResultFromContainer() + '.')
    }

    function getResult(number) {
        return isNumeric(number) ? Number((number).toFixed(5)): '';
    }

    function deleteOneSymbol() {
        resultContainer.html(getResultFromContainer().slice(0, -1));
    }

    function deleteAll() {
        resultContainer.html('');
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function getResultFromContainer() {
        return resultContainer.html();
    }

    return {
        percent: percent,
        equals: equals,
        squareRoot: squareRoot,
        division: division,
        multiplication: multiplication,
        subtraction: subtraction,
        addition: addition,
        deleteOneSymbol: deleteOneSymbol,
        deleteAll: deleteAll,
        placeDot: placeDot,
        sin: sin,
        cos: cos,
        tg: tg,
        ctg: ctg,
        init:init
    }
})(jQuery);

var commands = {
    "clear": calculator.deleteOneSymbol,
    "clearAll": calculator.deleteAll,
    "dot": calculator.placeDot,
    "plus": calculator.addition,
    "percent": calculator.percent,
    "equals": calculator.equals,
    "minus": calculator.subtraction,
    "multiplication": calculator.multiplication,
    "division": calculator.division,
    "squareRoot": calculator.squareRoot,
    "cos": calculator.cos,
    "sin": calculator.sin,
    "tan": calculator.tg,
    "cotan": calculator.ctg
};