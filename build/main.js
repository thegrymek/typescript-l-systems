/// <reference path="../typings/tsd.d.ts" />
/// <reference path="LSystem.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JqueryLSystem = (function (_super) {
    __extends(JqueryLSystem, _super);
    function JqueryLSystem() {
        _super.apply(this, arguments);
    }
    JqueryLSystem.prototype.forward = function () {
        this._elem.fd(this._options.length);
    };
    JqueryLSystem.prototype.onRight = function () {
        this._elem.rt(this._options.angle);
    };
    JqueryLSystem.prototype.onLeft = function () {
        this._elem.lt(this._options.angle);
    };
    JqueryLSystem.prototype.penUp = function () {
        this._elem.pu();
    };
    JqueryLSystem.prototype.penDown = function () {
        this._elem.pd();
    };
    JqueryLSystem.prototype.penColor = function (color) {
        this._elem.pen(color);
    };
    return JqueryLSystem;
}(LSystem.LSystem));
var supportedLSystemExamples = [
    LSystem.Examples.HeighwayDragon(),
    LSystem.Examples.HilbertCurve(),
    LSystem.Examples.KochSnowflake(),
    LSystem.Examples.LevyDragon(),
    LSystem.Examples.MoorCurve(),
    LSystem.Examples.PeanoCurve(),
    LSystem.Examples.SierpinskiTriangle(),
    LSystem.Examples.Pentadendryt(),
];
function renderLSystem(canvas, axiom, rules, options) {
    var system = new JqueryLSystem(axiom, rules, options);
    system.using(canvas);
    system.start();
}
function getDOMOptions() {
    var color = $('#options-color').val() || 'black';
    var size = $('#options-size').val() || '3';
    var angle = $('#options-angle').val() || '90';
    var maxIterations = $('#options-max-iterations').val() || '2';
    var options = {
        'speed': 2,
        'length': +size,
        'color': color,
        'iterations': +maxIterations,
        'angle': +angle
    };
    return options;
}
function setDomOptions(options) {
    $('#options-color').val(options.color);
    $('#options-size').val(options.length);
    $('#options-angle').val(options.angle);
    $('#options-max-iterations').val(options.iterations);
}
function getDOMRules() {
    var rules = Array();
    for (var i = 1; i < 10; i++) {
        var letter = $('#options-rule-letter-' + i).val();
        var axiom = $('#options-rule-rule-' + i).val();
        if (letter && axiom) {
            var rule = {
                'letter': letter,
                "axiom": axiom
            };
            rules.push(rule);
        }
        else
            break;
    }
    return rules;
}
function insertDOMRule(rule) {
    var rules = getDOMRules();
    var total_rules = rules.length;
    var rule_id = total_rules + 1;
    var ruleRowHTML = "\n    <tr>\n        <td><button id=\"options-rule-remove-" + rule_id + "\" type=\"button\" class=\"btn btn-danger\">-</button></td>\n        <td><input id=\"options-rule-letter-" + rule_id + "\" type=\"text\" class=\"form-control\"/ value=\"" + rule.letter + "\"></td>\n        <td><input id=\"options-rule-rule-" + rule_id + "\" type=\"text\" class=\"form-control\" value=\"" + rule.axiom + "\"/></td>\n    </tr>\n    ";
    $(ruleRowHTML).insertBefore('#options-rule-body tr:last');
}
function clearDOMRules() {
    for (var i = 1; i < 10; i++) {
        var letterDom = $('#options-rule-letter-' + i);
        if (!letterDom.val())
            break;
        letterDom.parent().parent().remove();
    }
}
function setDomRules(rules) {
    clearDOMRules();
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        insertDOMRule(rule);
    }
}
function setDomAxiom(axiom) {
    $('#options-main-axiom').val(axiom);
}
function renderDomDropdownMenu() {
    var menuDom = $('#options-dropdown-menu');
    var _loop_1 = function(example) {
        var menuElemHTML = "<li><a href=\"#\" id=\"options-menu-" + example.id + "\">" + example.name + "</a></li>";
        menuDom.append(menuElemHTML);
        $("#options-menu-" + example.id).on('click', function (evt) { return setDomExample(example); });
    };
    for (var _i = 0, supportedLSystemExamples_1 = supportedLSystemExamples; _i < supportedLSystemExamples_1.length; _i++) {
        var example = supportedLSystemExamples_1[_i];
        _loop_1(example);
    }
}
function setDomExample(example) {
    setDomOptions(example.options);
    setDomRules(example.rules);
    setDomAxiom(example.axiom);
    setDomHeading(example.name);
}
function setDomHeading(newHeading) {
    $('#options-heading').html(newHeading);
}
function setStartPositionOrDefault(pos) {
    if (pos === void 0) { pos = null; }
    var surface = $('#turtle');
    if (!pos || pos === {})
        pos = {
            'pageX': window.innerWidth * 3 / 5,
            'pageY': window.innerHeight * 4 / 7
        };
    surface.home();
    surface.jumpto(pos);
}
function clearCanvas() {
    var canvas = $('.turtlefield canvas')[0];
    if (!canvas)
        return;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
$(document).ready(function () {
    // renderujemy menu
    renderDomDropdownMenu();
    // ustawiam pierwszego exampla w ustawieniach
    setDomExample(supportedLSystemExamples[0]);
    var surface = $('#turtle');
    surface.st();
    surface.wear('blue');
    // ustawiam startowa pozycje na prawy srodek ekranu
    setStartPositionOrDefault();
    var lastPosition = {};
    function draw(evt) {
        var surface = $('#turtle');
        var axiom = $('#options-main-axiom').val();
        var rules = getDOMRules();
        var options = getDOMOptions();
        renderLSystem(surface, axiom, rules, options);
        setStartPositionOrDefault(lastPosition);
    }
    function addRule(evt) {
        var rules = getDOMRules();
        var letter = $('#options-rule-add-letter').val();
        var axiom = $("#options-rule-add-rule").val();
        if (!letter || !axiom)
            return;
        var rule = {
            'letter': letter,
            "axiom": axiom
        };
        insertDOMRule(rule);
    }
    function setTurtlePosition(evt) {
        lastPosition = {
            pageX: evt.pageX,
            pageY: evt.pageY
        };
        setStartPositionOrDefault(lastPosition);
    }
    $('#options-draw').on('click', function (evt) { return draw(evt); });
    $('#options-clear').on('click', function (evt) { return clearCanvas(); });
    $('#options-rule-button-add').on('click', function (evt) { return addRule(evt); });
    $('#turtle-board').on('click', function (evt) { return setTurtlePosition(evt); });
});
//# sourceMappingURL=main.js.map