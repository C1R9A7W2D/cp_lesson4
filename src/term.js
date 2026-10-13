class Term {
    k
    s
    p

    constructor(k, s, p) {
        this.k = k
        this.s = s
        this.p = p
    }

    toString() {
        if (this.p == 0)
            return this.stringWithoutVariable()

        let kString = this.k == 1 ? "" : `${this.k}*`
        let sString = this.s.toString()
        let pString = this.p == 1 ? "" : `^${this.p}`

        return kString + sString + pString
    }

    stringWithoutVariable() {
        if (this.k == 0)
            return "0"
        else
            return this.k.toString()
    }

    diff() {
        let newK = this.k * this.p;
        let newP = this.p - 1;
        return new Term(newK, this.s, newP).toString()
    }
}

export {Term}