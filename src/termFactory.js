import {Number} from "./number";
import {Term} from "./term";

class TermFactory {
    s
    x
    xInd

    constructor(s, x) {
        this.s = s
        this.x = x
        this.xInd = s.lastIndexOf(x)
    }

    static makeTerm(s, x) {
        return new TermFactory(s, x).makeTerm()
    }

    makeTerm() {
        if (this.xInd == -1)
            return new Number(0)
        else {
            return this.makeTermWithX();
        }
    }

    makeTermWithX() {
        let coef = this.getCoef()
        let power = this.getPower()
        let x = this.x;

        return new Term(coef, x, power)
    }

    getCoef() {
        if (this.hasCoefficient())
            return parseInt(this.s.substring(0, this.xInd - 1));
        else
            return 1;
    }

    hasCoefficient() {
        return this.xInd != 0 && this.s.charAt(this.xInd - 1) == '*';
    }

    getPower() {
        if (this.hasPower())
            return parseInt(this.s.substring(this.xInd + this.x.length + 1))
        else
            return 1;
    }

    hasPower() {
        return this.s.charAt(this.xInd + this.x.length) == '^';
    }
}

export {TermFactory}