/**
 * Created by vladimir on 26.02.17.
 */
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
