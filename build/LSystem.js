var LSystem;
(function (LSystem_1) {
    var LSystem = (function () {
        function LSystem(aksjomat, rules, options) {
            this._rules = {};
            this._axiom = aksjomat;
            this._options = options;
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                this._rules[rule.letter] = rule;
            }
        }
        LSystem.prototype.start = function () {
            this.penColor(this._options.color);
            this.iterAksjomat(this._axiom);
        };
        LSystem.prototype.iterAksjomat = function (aksjomat) {
            for (var _i = 0, aksjomat_1 = aksjomat; _i < aksjomat_1.length; _i++) {
                var c = aksjomat_1[_i];
                switch (c) {
                    case '+':
                        this.onRight();
                        break;
                    case '-':
                        this.onLeft();
                        break;
                    case 'F':
                        this.forward();
                        break;
                    case 'f':
                        this.penUp();
                        this.forward();
                        this.penDown();
                        break;
                    default: {
                        // for small letters just go forward
                        // without drawing
                        if (c.toLowerCase() === c) {
                            var rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, this._options.iterations);
                        }
                        else if (c.toUpperCase() === c) {
                            var rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, this._options.iterations);
                        }
                    }
                }
            }
        };
        LSystem.prototype.iterRule = function (aksjomat, maxIteration) {
            if (maxIteration == 0)
                return;
            for (var _i = 0, aksjomat_2 = aksjomat; _i < aksjomat_2.length; _i++) {
                var c = aksjomat_2[_i];
                switch (c) {
                    case '+':
                        this.onRight();
                        break;
                    case '-':
                        this.onLeft();
                        break;
                    case 'F':
                        this.forward();
                        break;
                    case 'f':
                        this.penUp();
                        this.forward();
                        this.penDown();
                        break;
                    default: {
                        if (c.toLowerCase() === c) {
                            var rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, maxIteration - 1);
                        }
                        else if (c.toUpperCase() === c) {
                            var rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, maxIteration - 1);
                        }
                    }
                }
            }
        };
        LSystem.prototype.using = function (elem) {
            this._elem = elem;
        };
        return LSystem;
    }());
    LSystem_1.LSystem = LSystem;
    var Examples = (function () {
        function Examples() {
        }
        Examples.SierpinskiTriangle = function () {
            return {
                'id': 'sierpinski-triangle',
                'name': 'Sierpinski Triangle',
                "axiom": 'X+X+X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": 'XF+XF-XF-XF+XF'
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 3,
                    'angle': -120,
                    'length': 25,
                    'speed': -1
                }
            };
        };
        Examples.KochSnowflake = function () {
            return {
                'id': 'koch-snowflake',
                'name': 'Koch Snowflake',
                "axiom": 'X++X++X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": 'XF-XF++XF-XF'
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 4,
                    'angle': 60,
                    'length': 3,
                    'speed': -1
                }
            };
        };
        Examples.HilbertCurve = function () {
            return {
                'id': 'hilbert-curve',
                'name': 'Hilbert Curve',
                "axiom": 'X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": '-YF+XFX+FY-'
                    },
                    {
                        'letter': 'Y',
                        "axiom": '+XF-YFY-FX+'
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 4,
                    'angle': -90,
                    'length': 15,
                    'speed': -1
                }
            };
        };
        Examples.MoorCurve = function () {
            return {
                'id': 'moor-curve',
                'name': "Moor Curve",
                "axiom": 'XFX+F+XFX',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": '-YF+XFX+FY-'
                    },
                    {
                        'letter': 'Y',
                        "axiom": '+XF-YFY-FX+'
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 4,
                    'angle': 90,
                    'length': 12,
                    'speed': -1
                }
            };
        };
        Examples.PeanoCurve = function () {
            return {
                'id': 'peano-curve',
                'name': 'Peano Curve',
                "axiom": 'X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": 'XFYFX+F+YFXFY-F-XFYFX'
                    },
                    {
                        'letter': 'Y',
                        "axiom": 'YFXFY-F-XFYFX+F+YFXFY'
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 3,
                    'angle': 90,
                    'length': 12,
                    'speed': -1
                }
            };
        };
        Examples.HeighwayDragon = function () {
            return {
                'id': 'heighway-dragon',
                'name': 'Heighway Dragon',
                "axiom": 'X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": 'X+YF+'
                    },
                    {
                        'letter': 'Y',
                        "axiom": '-FX-Y',
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 12,
                    'angle': 90,
                    'length': 3,
                    'speed': -1
                }
            };
        };
        Examples.LevyDragon = function () {
            return {
                'id': 'levy-dragon',
                'name': 'Levie Dragon',
                "axiom": 'X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": '+XF--XF+',
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 10,
                    'angle': 45,
                    'length': 2,
                    'speed': -1
                }
            };
        };
        Examples.Pentadendryt = function () {
            return {
                'id': 'pentadendryt',
                'name': 'Pentadendryt',
                "axiom": 'X',
                'rules': [
                    {
                        'letter': 'X',
                        "axiom": 'XF+XF-XF--XF+XF+XF'
                    }
                ],
                'options': {
                    'color': 'black',
                    'iterations': 4,
                    'angle': 72,
                    'length': 4,
                    'speed': -1
                }
            };
        };
        Examples.Empty = function () {
            return {
                'id': 'empty',
                'name': 'Empty',
                "axiom": '',
                'rules': [],
                'options': {
                    'color': 'black',
                    'iterations': 5,
                    'angle': 60,
                    'length': 3,
                    'speed': -1
                }
            };
        };
        return Examples;
    }());
    LSystem_1.Examples = Examples;
})(LSystem || (LSystem = {}));
//# sourceMappingURL=LSystem.js.map