 ## Polynomial Solver

This simple code in javascript takes a json file as input, which is the below format:
```
Sample file
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
```
n: The number of roots provided in the given JSON

k: The minimum number of roots required to solve for the coefficients of the polynomial 

k = m + 1, where m is the degree of the polynomial 

Returns an output which contains the roots of the polynomial based on the json file.

******Install any dependencies if required:**
```
npm install
```

****How to run:****
Save the the json file as input.json for the first test case and input2.json for the second and run the following command for the output:
```
node solverpoly.js
```
make sure your solverpoly.js is in the same folder as both the input files.
