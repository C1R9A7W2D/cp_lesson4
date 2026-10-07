import {MiniMaple} from "../src/miniMaple";

test('empty string returns empty', () => {
    expect(MiniMaple.diff("", "")).toBe("");
})

test('const returns 0', () => {
    expect(MiniMaple.diff("157", "x")).toBe("0");
})

test('x returns 1', () => {
    expect(MiniMaple.diff('x', 'x')).toBe("1");
})

test('const * x returns const', () => {
    expect(MiniMaple.diff('2*x', 'x')).toBe("2")
    expect(MiniMaple.diff('58*x', 'x')).toBe("58")
})

test('square(x) returns 2*x', () => {
    expect(MiniMaple.diff('x^2', 'x')).toBe("2*x")
})

test('x^n returns n*x^(n-1)', () => {
    expect(MiniMaple.diff('x^3', 'x')).toBe("3*x^2")
    expect(MiniMaple.diff('x^51', 'x')).toBe("51*x^50")
})

test('2*x^2 returns 4*x', () => {
    expect(MiniMaple.diff('2*x^2', 'x')).toBe("4*x")
})

test('x diff by y returns 0', () => {
    expect(MiniMaple.diff('53*x^19', 'y')).toBe("0")
})

test('two parts of a binomial work separately', () => {
    expect(MiniMaple.diff('x^2+3*x', 'x')).toBe("2*x+3")
    expect(MiniMaple.diff('x^2-3*x', 'x')).toBe("2*x-3")
})

test('parts of a polynomial work separately', () => {
    expect(MiniMaple.diff('x^3+2*x^2-9*x', 'x')).toBe("3*x^2+4*x-9")
})


test('wrong operation throws error', () => {
    expect(() => MiniMaple.diff('x^7 / 16', 'x')).toThrow("Использована неподходящая операция: /")
})