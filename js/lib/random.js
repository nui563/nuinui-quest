function createLCG(seed) {
	const m = 0x7fffffff;
    const a = 48271;
	let state = seed;
	return () => {
		state = (state * a) % m;
		return state / m;
	}
}

const LCG = createLCG(1);

/**
 * Returns a random number between 0 and 1
 * @returns {number}
 */
function random() {
	const n = LCG();
	console.log(n);
	return n;
}