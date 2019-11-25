/**
 * 923. 3Sum With Multiplicity
 * =====================================================
 * https://leetcode.com/problems/3sum-with-multiplicity/
 * =====================================================
 * 
 * Given an integer array A, and an integer target, 
 * return the number of tuples i, j, k  such that 
 * i < j < k and 
 * A[i] + A[j] + A[k] == target.
 * 
 * As the answer can be very large, return it modulo 10^9 + 7
 * 
 * Example 1:
 * ----------
 * Input: A = [1,1,2,2,3,3,4,4,5,5], target = 8
 * Output: 20
 * Explanation: 
 * Enumerating by the values (A[i], A[j], A[k]):
 * (1, 2, 5) occurs 8 times;
 * (1, 3, 4) occurs 8 times;
 * (2, 2, 4) occurs 2 times;
 * (2, 3, 3) occurs 2 times.
 * 
 * Example 2:
 * ----------
 * Input: A = [1,1,2,2,2,2], target = 5
 * Output: 12
 * Explanation: 
 * A[i] = 1, A[j] = A[k] = 2 occurs 12 times:
 * We choose one 1 from [1,1] in 2 ways,
 * and two 2s from [2,2,2,2] in 6 ways.
 * 
 * Note:
 * -----
 * 3 <= A.length <= 3000
 * 0 <= A[i] <= 100
 * 0 <= target <= 300
 * 
 * Submission Version:
 * -------------------
 * -> Doesn't have the getCombination as a separate function
 * -> Minified
 * -> Submitted:
 *      var threeSumMulti=function(t,e){const n={};let l=[],o=0;for(let e=0;e<t.length;e++){const o=t[e];n[o]||(n[o]=0,l.push(o)),n[o]+=1}if(1==l.length){const e=t.length;return e*(e-1)*(e-2)/6%1000000007}l.sort((t,e)=>t-e);for(let t=0;t<l.length;t++){const r=l[t],s=e-r,c=l.length-1;let f=t,h=c;for(;f<=c;){const t=l[f],e=l[h];if(t+e<s||h<f)f++;else if(t+e==s){const l=n[r],s=n[t],c=n[e];let u=l*s*c;r!=t&&t!=e&&r!=e||(u=r==t&&t==e&&r==e?l*(l-1)*(l-2)/6:r==t?c*l*(l-1)/2:r==e?s*l*(l-1)/2:l*s*(s-1)/2),o+=u,f++,h--}else h--}}return o%1000000007};
 * 
 *      Result: https://leetcode.com/submissions/detail/281588390/
 *      Runtime: 64 ms, faster than 95.35% of JavaScript online submissions for 3Sum With Multiplicity.
 *      Memory Usage: 35.6 MB, less than 100.00% of JavaScript online submissions for 3Sum With Multiplicity.
 * 
 * 
 * @param {number[]} A
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function (A, target) {
    // {
    //      number x : # of occurences of x, 
    //      number y : # of occurences of y, 
    //      ...
    // }
    // The occurences of numbers in an object
    const dict = {};   
    // The unique numbers from the given array
    let uniqueList = []; 
    // How many tuples 
    let tuples = 0;
    // Math.pow(10, 9) + 7
    const mod = 1000000007;

    // Populate the object with the items
    for (let i = 0; i < A.length; i++) {
        const elm_1 = A[i];
        if(!dict[elm_1]){
            dict[elm_1] = 0;
            uniqueList.push(elm_1);
        }            
        dict[elm_1] += 1;
    }

    // If all the numbers are the same
    // Get the unique combination of indexes
    if (uniqueList.length == 1) {
        return getCombination(A.length, 3) % mod;
    }

    // Sort the list to make use of beginning and end in the inner loop
    // Sorting at this point save us time from sorting duplicates
    uniqueList.sort((a, b) => (a - b));

    // Traverse the array with the unique numbers
    for (let i = 0; i < uniqueList.length; i++) {
        const elm_1 = uniqueList[i];
        
        const imm_target = target - elm_1;
        const last_ind = uniqueList.length - 1;
        // For the inner loop, 
        // Start iterating from both ends
        let elm_2_ind = i;
        let elm_3_ind = last_ind;
        
        // Loop until the beginIndex(elm_2_ind) reaches the endIndex(elm_3_ind)
        while (elm_2_ind <= last_ind) {
            const elm_2 = uniqueList[elm_2_ind];
            const elm_3 = uniqueList[elm_3_ind];
            // If the combination of the 2 is less than the immediate target
            // It's pointless to keep iterating from the end
            //      Increment the beginIndex
            //      Reset the endIndex
            // 
            // Also prevent endIndex to go lower than the beginIndex
            //      Avoid duplicate combinations
            if (elm_2 + elm_3 < imm_target || elm_3_ind < elm_2_ind){
                elm_2_ind++;
            // If the combination of the 2 matches the immediate target
            } else if(elm_2 + elm_3 == imm_target) {                
                const elm_1_occ = dict[elm_1]; 
                const elm_2_occ = dict[elm_2]; 
                const elm_3_occ = dict[elm_3]; 
                // CASE TYPE 1: Combination of all different numbers
                //      Multiply the occurences of these numbers
                let multiplier = elm_1_occ * elm_2_occ * elm_3_occ;
                if (elm_1 == elm_2 || elm_2 == elm_3 || elm_1 == elm_3){
                    // CASE TYPE 2: Combination of all same numbers
                    //      Get the unique combination of the occurence of this number
                    if (elm_1 == elm_2 && elm_2 == elm_3 && elm_1 == elm_3) {                        
                        multiplier = getCombination(elm_1_occ, 3);
                    // CASE TYPE 3: Combination of 2 same numbers with 1 different number 
                    //      Get the unique combination of the occurence of the same number
                    //      Then multiply it by the different number
                    } else if(elm_1 == elm_2) {                        
                        multiplier = elm_3_occ * getCombination(elm_1_occ, 2);
                    } else if(elm_1 == elm_3) {
                        multiplier = elm_2_occ * getCombination(elm_1_occ, 2);
                    } else {
                        multiplier = elm_1_occ * getCombination(elm_2_occ, 2);
                    }
                }                
                tuples += multiplier;
                elm_2_ind++;             
                elm_3_ind--;
            // If the combination of the 2 is bigger than the immediate target
            //      Keep iterating from the end
            } else {
                elm_3_ind--;                
            }
        }
    }    
    return tuples % mod;    
};

/**
 * Number of unique index combinations (n!/r!*(n-r)!)
 * 
 *     n! 
 * -----------
 * r! * (n−r)! 
 *
 * @param {Number} n - Numbers to choose from
 * @param {Number} r - Numbers to choose
 * @returns {Number} - Number of unique index combinations
 */
const getCombination = (n, r) => {
    let top = 1;
    let bottom = 1;
    for (let i = 0; i < r; i++) {
        top *= (n - i);
        bottom *= (i + 1);
    }
    return top / bottom;
};