// task 1, random numbers 1-10 and comparison

function task()
{
    // assign random number 0-10, Math.ceil() rounds number up so no 0
    const number1 = Math.ceil(Math.random() * 10);
    const number2 = Math.ceil(Math.random() * 10);
    // compare numbers and return text
    if (number1 == number2)
    {
        return number1 + " is equal to " + number2;
    }
    else if (number1 > number2)
    {
        return number1 + " is greater than " + number2;
    }
    else
    {
        return number1 + " is less than " + number2;
    }
}

console.log(task());

function task2(min, max)
{
    // print even numbers first, then odd, between min-max, basic looping
    // separated for loops so first it prints only even numbers
    for (let x = min; x <= max; x++)
    {
        if (x % 2 == 0)
        {
            // if number is even, print
            console.log(x);
        }
    }
    for (let x = min; x <= max; x++)
    {
        if (x % 2 != 0)
        {
            // if number is odd, print
            console.log(x);
        }
    }
}
/* teacher's solution
let l1 = evenNumbers.length;
let l2 = oddNumbers.length;

for (let i = 0; i < l1; i++){
    console.log(evenNumbers[i]); // to print one line at a time?
}
for (let i = 0; i < l1; i++){
    console.log(evenNumbers[i]); // to print one line at a time?
}
task2(-3, 4); // calls the function
*/

console.log(task2(3, 7));
// this also prints undefined but not sure how I could avoid printing that
// maybe replace console.log(x); with something?
// or make an array but then how to print it one per line

function task3(min, max)
{
    // print an array of numbers, odds reversed
    // create empty array
    let numbers = [];
    for (let x = min; x <= max; x++)
    {
        if (x % 2 == 0)
        {
            // add even number to array
            numbers.push(x);
        }
    }
    // reverse order, max to min
    for (let x = max; x >= min; x--)
    {
        if (x % 2 != 0)
        {
            // add odd number to array
            numbers.push(x);
        }
    }
    // print array
    return numbers;
}
// teacher's solution
// const catenated = evenNumbers.concat(oddNumbers.reverse());
// console.log(catenated);

console.log(task3(3, 7));

function task4(testString)
{
    // test if string is palindrome, return true
    // a-z, A-Z, spaces, capitalization doesn't matter

    // convert testString to lowercase
    let lowerTestString = testString.toLowerCase();
    // splits string to an array, reverses array elements then joins array into a string
    let reverseString = lowerTestString.split('').reverse().join('');
    // return true if string reversed is the same, false if not
    return reverseString == lowerTestString;
}

// teacher's solution
// return testString.toLowerCase() === testString.split('').reverse().join('').toLowerCase();
// console.log('Task 4: ' + task4('Step on NO pets'));

console.log(task4("Step on no pets"));