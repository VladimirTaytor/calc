/**
 * Created by vladimir on 26.02.17.
 */
var calculator = (function () {

    const resultContainer = $('#result');

    var numberOne;
    var numberTwo;
    var operation;

    const action = {
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
        placeDot: placeDot
    }
})();

const commands = {
    "clear": calculator.deleteOneSymbol,
    "clearAll": calculator.deleteAll,
    "dot": calculator.placeDot,
    "plus": calculator.addition,
    "percent": calculator.percent,
    "equals": calculator.equals,
    "minus": calculator.subtraction,
    "multiplication": calculator.multiplication,
    "division": calculator.division,
    "squareRoot": calculator.squareRoot
};

$(document).ready(function () {

    var pressTimer;

    $('.calc-btn-number').on("click", function () {
        var value = this.dataset.value;
        $('#result').append(value);
    });

    $('.calc-btn-operations').on("click", function () {
        var value = this.dataset.value;
        console.log(value);
        commands[value]();
    });

    $(".calc-btn-operations[data-value='clear']").mouseup(function () {
        clearTimeout(pressTimer);
        $("#back").removeClass("background");
        return false;
    }).mousedown(function () {
        $("#back").addClass("background");
        pressTimer = window.setTimeout(function () {
            commands['clearAll']();
        }, 1000);
        return false;
    });

    $("#engineer-toggle-btn").click(function () {
        $("#engineer").toggleClass("hidden")
    });

});
