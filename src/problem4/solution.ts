// 1. Iterative Approach
/**
 * Time Complexity O(n)
 * Space Complexity O(1)
 */
function sum_to_n_iterative(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// 2. Mathematical Formula Approach
/**
 * Time Complexity O(1)
 * Space Complexity O(1)
 */
function sum_to_n_formula(n: number): number {
    return (n * (n + 1)) / 2;
}

// 3. An Array and reduce
/**
 * Time Complexity O(n)
 * Space Complexity O(n)
 */
function sum_to_n_reduce(n: number): number {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
}

// Example Usage
console.log("Iterative:", sum_to_n_iterative(5)); // Output: 15
console.log("Formula:", sum_to_n_formula(5));    // Output: 15
console.log("Reduce:", sum_to_n_reduce(5)); // Output: 15
