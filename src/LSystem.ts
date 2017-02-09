namespace LSystem {
    export interface Rule {
        letter: string,
        axiom: string
    }

    export interface Options {
        speed: number,
        angle: number,
        iterations: number,
        color: string,
        length: number
    }

    interface Letter2Rule {
        [letter: string]: Rule;
    }

    export abstract class LSystem {
        
        private _axiom: string;
        private _rules: Letter2Rule = {};
        protected _elem;
        protected _options: Options;

        public constructor(aksjomat: string, rules: Rule[], options: Options) {
            this._axiom = aksjomat;
            this._options = options;
            for (let rule of rules)
                this._rules[rule.letter] = rule;
        }

        public start() {
            this.penColor(this._options.color);
            this.iterAksjomat(this._axiom);
        }

        public iterAksjomat(aksjomat: string) {
            for (let c of aksjomat) {
                switch (c) {
                    case '+': this.onRight(); break;
                    case '-': this.onLeft(); break;
                    case 'F': this.forward(); break;
                    case 'f': this.penUp(); this.forward(); this.penDown(); break;
                    default: {
                        // for small letters just go forward
                        // without drawing
                        if (c.toLowerCase() === c) {
                            let rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, this._options.iterations);
                        }
                        // for big letters go forward and draw
                        else if (c.toUpperCase() === c) {
                            let rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, this._options.iterations);
                        }
                    }
                }
            }
        }

        public iterRule(aksjomat: string, maxIteration: number)
        {
            if (maxIteration == 0) return;
            for (let c of aksjomat) {
                switch (c) {
                    case '+': this.onRight(); break;
                    case '-': this.onLeft(); break;
                    case 'F': this.forward(); break;
                    case 'f': this.penUp(); this.forward(); this.penDown(); break;
                    default: {
                        if (c.toLowerCase() === c) {
                            let rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, maxIteration -1);
                        }
                        else if (c.toUpperCase() === c) {
                            let rule = this._rules[c.toUpperCase()];
                            this.iterRule(rule.axiom, maxIteration -1);
                        }
                    }
                }
            }
        }

        public abstract forward();
        public abstract onRight();
        public abstract onLeft();
        public abstract penUp();
        public abstract penDown();
        public abstract penColor(color: string);

        public using(elem) {
            this._elem = elem;
        }
    }

    export interface IExample 
    {
        id: string;
        name: string;
        axiom: string;
        rules: Rule[];
        options: Options;
    }

    export class Examples 
    {
        // examples taken from
        // http://www.algorytm.org/fraktale/l-systemy.html

        public static SierpinskiTriangle(): IExample 
        {
            return {
                'id': 'sierpinski-triangle',
                'name': 'Sierpinski Triangle',
                "axiom": 'X+X+X',
                'rules': [
                    <Rule>{
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
            }
        }

        public static KochSnowflake(): IExample 
        {
            return {
                'id': 'koch-snowflake',
                'name': 'Koch Snowflake',
                "axiom": 'X++X++X',
                'rules': [
                    <Rule>{
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
            }
        }

        public static HilbertCurve(): IExample 
        {
            return {
                'id': 'hilbert-curve',
                'name': 'Hilbert Curve',
                "axiom": 'X',
                'rules': [
                    <Rule>{
                        'letter': 'X',
                        "axiom": '-YF+XFX+FY-'
                    },
                    <Rule>{
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
            }
        }

        public static MoorCurve(): IExample 
        {
            return {
                'id': 'moor-curve',
                'name': "Moor Curve",
                "axiom": 'XFX+F+XFX',
                'rules': [
                    <Rule>{
                        'letter': 'X',
                        "axiom": '-YF+XFX+FY-'
                    },
                    <Rule>{
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
            }
        }

        public static PeanoCurve(): IExample 
        {
            return {
                'id': 'peano-curve',
                'name': 'Peano Curve',
                "axiom": 'X',
                'rules': [
                    <Rule>{
                        'letter': 'X',
                        "axiom": 'XFYFX+F+YFXFY-F-XFYFX'
                    },
                    <Rule>{
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
            }
        }

        public static HeighwayDragon(): IExample 
        {
            return {
                'id': 'heighway-dragon',
                'name': 'Heighway Dragon',
                "axiom": 'X',
                'rules': [
                    <Rule>{
                        'letter': 'X',
                        "axiom": 'X+YF+'
                    },
                    <Rule>{
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
            }
        }

        public static LevyDragon(): IExample 
        {
            return {
                'id': 'levy-dragon',
                'name': 'Levie Dragon',
                "axiom": 'X',
                'rules': [
                    <Rule>{
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
            }
        }

        public static Pentadendryt(): IExample 
        {
            return {
                'id': 'pentadendryt',
                'name': 'Pentadendryt',
                "axiom": 'X',
                'rules': [
                    <Rule>{
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
            }
        }

        public static Empty(): IExample 
        {
            return {
                'id': 'empty',
                'name': 'Empty',
                "axiom": '',
                'rules': [

                ],
                'options': {
                    'color': 'black',
                    'iterations': 5,
                    'angle': 60,
                    'length': 3,
                    'speed': -1
                }
            }
        }
    }
}
