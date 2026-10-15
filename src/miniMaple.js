import {TermFactory} from "./termFactory";

class MiniMaple {
    str
    x

    sepSignIndices;

    terms = []
    signs = []

    constructor(s, x) {
        this.str = s
        this.x = x
    }

    static diff(s, x) {
        return new MiniMaple(s, x).diff()
    }

    diff() {
        this.throwErrorIfWrongOperation();
        this.getSeparatingSignIndices();

        if (this.sepSignIndices.length > 0)
            return this.getDiffOfPolynomial()
        else
            return this.getDiffOfSingle()
    }

    throwErrorIfWrongOperation() {
        const symbols = "/!%&()";
        let foundChar = ''

        for (let symbol of symbols)
            if (this.str.includes(symbol)) {
                foundChar = symbol
                break;
            }

        if (foundChar != '')
            throw new Error(`Использована неподходящая операция: ${foundChar}`)
    }

    getSeparatingSignIndices() {
        this.sepSignIndices = []

        for (let i = 0; i < this.str.length; i++)
            this.pushIfSeparatingSign(i)
    }

    pushIfSeparatingSign(i) {
        if (this.str[i] == '+' || this.str[i] == '-')
            this.sepSignIndices.push(i)
        return this.sepSignIndices;
    }

    getDiffOfPolynomial() {
        this.getTermsAndSigns();
        const diffsWithSigns = this.getDiffsWithSigns();
        return diffsWithSigns.join("");
    }

    getTermsAndSigns() {
        let prevInd = 0;
        for (let i = 0; i < this.sepSignIndices.length; i++) {
            prevInd = this.pushTermAndNextSign(prevInd, i);
        }

        this.pushLastTerm(prevInd);
    }

    pushTermAndNextSign(prevInd, i) {
        const ind = this.sepSignIndices[i];
        const subString = this.str.substring(prevInd, ind)

        this.makeNewTermsElement(subString)
        this.signs.push(this.str.charAt(ind))

        return ind;
    }

    pushLastTerm(prevInd) {
        const lastSubString = this.str.substring(prevInd + 1)
        this.makeNewTermsElement(lastSubString)
    }

    makeNewTermsElement(subString) {
        let term = TermFactory.makeTerm(subString, this.x)
        this.terms.push(term)
    }

    getDiffsWithSigns() {
        // console.debug(this.terms)
        // console.debug(this.signs)

        let diffsAndSigns = []
        for (let i = 0; i < this.terms.length - 1; i++) {
            this.PushTermAndSignOrRemoveZeroTerm(i, diffsAndSigns);
        }

        const lastDiff = this.terms[this.terms.length - 1].diff();
        if (lastDiff == "0")
            diffsAndSigns.pop()
        else
            diffsAndSigns.push(lastDiff)

        return diffsAndSigns
    }

    PushTermAndSignOrRemoveZeroTerm(i, diffsAndSigns) {
        const diff = this.terms[i].diff();
        if (diff == "0") {
            this.removeZeroTerm(diffsAndSigns, i);
        }
        else {
            this.pushDiffAndNextSign(diffsAndSigns, diff, i);
        }
    }

    removeZeroTerm(diffsAndSigns, i) {
        if (i != 0) {
            diffsAndSigns.pop();
            diffsAndSigns.push(this.signs[i]);
        }
        else
            ;   // Пропустить терм и знак
    }

    pushDiffAndNextSign(diffsAndSigns, diff, i) {
        diffsAndSigns.push(diff);
        diffsAndSigns.push(this.signs[i]);
    }

    getDiffOfSingle() {
        const termFactory = new TermFactory(this.str, this.x);
        const term = termFactory.makeTerm();
        return term.diff()
    }
}

export {MiniMaple}
