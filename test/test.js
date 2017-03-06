describe("Calculator Tests", function () {
    "use strict";
    var expect = chai.expect;
    var result;
    var calculator;

    before(function() {
        // Karma creates this global __html__ property that will hold all
        // of our HTML so we can populate the body during our tests
        if (window.__html__) {
            document.body.innerHTML = window.__html__['test/testRunner.html'];
        }
        calculator = window.calculator;
        result = $('#result');
        calculator.init();
    });

    it("is deleteAll() clear DOM", function () {
        $(result).html("test");
        calculator.deleteAll();
        var text = $('#result').html();
        expect(text).to.equals('');
    });

    it("is commands right", function () {
        expect(commands.clear).to.equals(calculator.deleteOneSymbol);
    });

});
