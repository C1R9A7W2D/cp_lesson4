class MiniMaple {
    s;
    x;
    xInd;

    constructor(s, x) {
        this.s = s
        this.x = x
        this.xInd = s.lastIndexOf(x)
    }

    static diff(s, x) {
        return new MiniMaple(s, x).diff()
    }

    diff() {
        this.throwErrorIfWrongOperation();

        if (this.s == '' || this.x == '')
            return ''

        let sepSignInd = this.getSeparatingSignIndex();
        if (sepSignInd != 0)
            return this.breakPolynomial(sepSignInd)

        if (this.xInd != -1) {
            let coef = this.getCoef();
            let power = this.getPower();

            coef *= power

            let newCoefString = this.newCoefString(coef)
            let newPowerString = this.newPowerString(power)

            if (power == 1)
                if (coef == 1)
                    return "1"
                else
                    return newCoefString
            else
                return newCoefString + `*${this.x}` + newPowerString
        }

        return "0";
    }

    throwErrorIfWrongOperation() {
        const symbols = "/!%&()";
        let foundChar = ''

        for (let char of symbols) {
            if (this.s.includes(char)) {
                foundChar = char
                break;
            }
        }
        if (foundChar != '')
            throw new Error(`Использована неподходящая операция: ${foundChar}`)
    }

    getSeparatingSignIndex() {
        let sepSignInd = 0

        for (let i = 0; i < this.s.length; i++) {
            if (this.s[i] === '+' || this.s[i] === '-') {
                sepSignInd = i
            }
        }
        return sepSignInd;
    }

    breakPolynomial(sepSignInd) {
        let left = MiniMaple.diff(this.s.substring(0, sepSignInd), this.x);
        let sign = this.s.charAt(sepSignInd);
        let right = MiniMaple.diff(this.s.substring(sepSignInd + 1), this.x);
        return `${left}${sign}${right}`;
    }

    getCoef() {
        let coef = 1;
        if (this.hasCoefficient())
            coef = parseInt(this.s.substring(0, this.xInd - 1));
        return coef;
    }

    hasCoefficient() {
        return this.xInd != 0 && this.s.charAt(this.xInd - 1) == '*';
    }

    getPower() {
        let power = 1
        if (this.hasPower())
            power = parseInt(this.s.substring(this.xInd + this.x.length + 1))
        return power;
    }

    hasPower() {
        return this.s.charAt(this.xInd + this.x.length) == '^';
    }

    newCoefString(coef) {
        return coef == 1 ? "" : coef.toString();
    }

    newPowerString(power) {
        return power == 2 ? "" : `^${power - 1}`;
    }
}

export {MiniMaple}