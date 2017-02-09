/// <reference path="../typings/tsd.d.ts" />
/// <reference path="LSystem.ts" />

class JqueryLSystem extends LSystem.LSystem {
    
    public forward()
    {
        this._elem.fd(this._options.length);
    }

    public onRight()
    {
        this._elem.rt(this._options.angle);
    }

    public onLeft()
    {
        this._elem.lt(this._options.angle);
    }

    public penUp() 
    {
        this._elem.pu();
    }

    public penDown()
    {
        this._elem.pd();
    }

    public penColor(color: string)
    {
        this._elem.pen(color);
    }
}

let supportedLSystemExamples = [
    LSystem.Examples.HeighwayDragon(),
    LSystem.Examples.HilbertCurve(),
    LSystem.Examples.KochSnowflake(),
    LSystem.Examples.LevyDragon(),
    LSystem.Examples.MoorCurve(),
    LSystem.Examples.PeanoCurve(),
    LSystem.Examples.SierpinskiTriangle(),
    LSystem.Examples.Pentadendryt(),
];


function renderLSystem(canvas: JQuery, axiom: string, rules: LSystem.Rule[], options: LSystem.Options)
{   
    let system = new JqueryLSystem(
        axiom,
        rules,
        options
    );
 
    system.using(canvas);
    system.start();
}


function getDOMOptions(): LSystem.Options
{
    let color = $('#options-color').val() || 'black';
    let size = $('#options-size').val() || '3';
    let angle = $('#options-angle').val() || '90';
    let maxIterations = $('#options-max-iterations').val() || '2';

    let options = <LSystem.Options>{
        'speed': 2,
        'length': +size,
        'color': color,
        'iterations': +maxIterations,
        'angle': +angle 
    };
    return options;
}


function setDomOptions(options: LSystem.Options): void
{
    $('#options-color').val(options.color);
    $('#options-size').val(options.length);
    $('#options-angle').val(options.angle);
    $('#options-max-iterations').val(options.iterations);
}


function getDOMRules(): LSystem.Rule[]
{
    let rules = Array<LSystem.Rule>();
    for(let i = 1; i < 10; i++)
    {
        let letter = $('#options-rule-letter-' + i).val();
        let axiom = $('#options-rule-rule-' + i).val();

        if (letter && axiom)
        {
            let rule = <LSystem.Rule>{
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


function insertDOMRule(rule:LSystem.Rule): void
{
    let rules = getDOMRules();
    let total_rules = rules.length;
    let rule_id = total_rules + 1;

    let ruleRowHTML = `
    <tr>
        <td><button id="options-rule-remove-${rule_id}" type="button" class="btn btn-danger">-</button></td>
        <td><input id="options-rule-letter-${rule_id}" type="text" class="form-control"/ value="${rule.letter}"></td>
        <td><input id="options-rule-rule-${rule_id}" type="text" class="form-control" value="${rule.axiom}"/></td>
    </tr>
    `;
    $(ruleRowHTML).insertBefore('#options-rule-body tr:last');
}


function clearDOMRules(): void
{
    for(let i = 1; i < 10; i++)
    {
        let letterDom = $('#options-rule-letter-' + i);
        if (!letterDom.val()) 
            break;
        letterDom.parent().parent().remove()
    }
}


function setDomRules(rules: LSystem.Rule[]): void
{
    clearDOMRules();
    for(let rule of rules)
    {
        insertDOMRule(rule);
    }
}


function setDomAxiom(axiom: string): void
{
    $('#options-main-axiom').val(axiom);
}


function renderDomDropdownMenu(): void
{
    let menuDom = $('#options-dropdown-menu');
    for(let example of supportedLSystemExamples)
    {
        let menuElemHTML = `<li><a href="#" id="options-menu-${example.id}">${example.name}</a></li>`;
        menuDom.append(menuElemHTML);
        $(`#options-menu-${example.id}`).on(
            'click', 
            (evt) => setDomExample(example)
        );
    }
}


function setDomExample(example: LSystem.IExample): void
{
    setDomOptions(example.options);
    setDomRules(example.rules);
    setDomAxiom(example.axiom);
    setDomHeading(example.name);
}


function setDomHeading(newHeading: string): void
{
    $('#options-heading').html(newHeading);
}


function setStartPositionOrDefault(pos: any = null): void
{
    let surface = $('#turtle');
    if (!pos || pos === {})
        pos = {
            'pageX': window.innerWidth * 3/5,
            'pageY': window.innerHeight * 4/7
        };
    surface.home();
    surface.jumpto(pos);
}


function clearCanvas(): void
{
    let canvas = $('.turtlefield canvas')[0];
    if (!canvas) 
        return;
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}


$(document).ready(function () {

    renderDomDropdownMenu();
    setDomExample(supportedLSystemExamples[0]);

    let surface = $('#turtle');
    surface.st();
    surface.wear('blue');

    setStartPositionOrDefault();

    let lastPosition = {};

    function draw(evt: any) 
    {
        let surface = $('#turtle');
        let axiom = $('#options-main-axiom').val();
        let rules = getDOMRules();
        let options = getDOMOptions();

        renderLSystem(surface, axiom, rules, options);
        setStartPositionOrDefault(lastPosition);
    }

    function addRule(evt: any)
    {
        let rules = getDOMRules();
        let letter = $('#options-rule-add-letter').val();
        let axiom = $("#options-rule-add-rule").val();
        
        if (!letter || !axiom) return;

        let rule = <LSystem.Rule> {
            'letter': letter,
            "axiom": axiom
        };
        insertDOMRule(rule);
    }

    function setTurtlePosition(evt: any)
    {
        lastPosition = {
            pageX: evt.pageX,
            pageY: evt.pageY
        };
        setStartPositionOrDefault(lastPosition);
    }

    $('#options-draw').on('click', (evt) => draw(evt));
    $('#options-clear').on('click', (evt) => clearCanvas());
    $('#options-rule-button-add').on('click', (evt) => addRule(evt));
    $('#turtle-board').on('click', (evt) => setTurtlePosition(evt));
});
