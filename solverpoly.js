// Polynomial from roots (degree m = k - 1), coefficients as BigInt, monic.
// Input file: input.json (format as in your testcases)

const fs = require("fs");

// --------- helpers ---------
function charToVal(ch) {
    const c = ch.toLowerCase();
    if (c >= "0" && c <= "9") return c.charCodeAt(0) - 48;        // '0'->0
    if (c >= "a" && c <= "z") return 10 + (c.charCodeAt(0) - 97); // 'a'->10
    throw new Error(`Invalid digit '${ch}'`);
}

// Parse a (base, value) pair into BigInt without precision loss
function parseInBaseToBigInt(str, base) {
    if (base < 2 || base > 36) {
        throw new Error(`Base ${base} not supported (must be 2..36)`);
    }
    let result = 0n;
    const B = BigInt(base);
    for (const ch of str.trim()) {
        const d = charToVal(ch);
        if (d >= base) {
            throw new Error(`Digit '${ch}' invalid for base ${base}`);
        }
        result = result * B + BigInt(d);
    }
    return result;
}

// Multiply current monic polynomial by (x - r):
// coeffs represent c0 + c1*x + ... + cM*x^M (ascending powers), all BigInt.
function multiplyByLinear(coeffs, r) {
    const out = new Array(coeffs.length + 1).fill(0n);
    for (let i = 0; i < coeffs.length; i++) {
        out[i] += -r * coeffs[i]; // constant contribution
        out[i + 1] += coeffs[i];      // shift for x
    }
    return out;
}

// --------- main ---------
function main() {
    const inputPath = process.argv[2] || "input2.json";
    const raw = fs.readFileSync(inputPath, "utf-8");
    const data = JSON.parse(raw);

    const n = Number(data.keys.n);
    const k = Number(data.keys.k);

    // Problem statement says degree m = k - 1
    const m = k - 1;

    // Collect roots in order "1".."n"
    const roots = [];
    for (let i = 1; i <= n; i++) {
        const node = data[String(i)];
        if (!node) continue;
        const base = Number(node.base);
        const value = String(node.value);
        const r = parseInBaseToBigInt(value, base);
        roots.push(r);
    }

    if (roots.length < m) {
        throw new Error(`Need at least ${m} roots (m = k - 1), but got ${roots.length}.`);
    }

    // Use the first m roots (any m roots work for a monic degree-m polynomial)
    const chosen = roots.slice(0, m);

    // Build monic polynomial by repeated multiplication of (x - r)
    // Start with P(x) = 1
    let coeffs = [1n]; // ascending powers
    for (const r of chosen) {
        coeffs = multiplyByLinear(coeffs, r);
    }

    // Output
    // Descending order is usually expected: [1, a_{m-1}, ..., a0]
    const desc = [...coeffs].reverse().map(x => x.toString());

    console.log("INFO:");
    console.log(`  n = ${n}, k = ${k}, degree m = k - 1 = ${m}`);
    console.log(`  Using first ${m} roots (as decimal): ${chosen.map(x => x.toString()).join(", ")}`);
    console.log("\nPOLYNOMIAL COEFFICIENTS (descending powers):");
    console.log(desc.join(" "));
}

main();
