/*
1 = 1
2 = 2 * 1
3 = 3 * 1
4 = 2 * 2
5 = 5
6 = 3 * 2
7 = 7
8 = 2 * 2 * 2
9 = 3 * 3
10 = 5 * 2
11 = 11
12 = 2 * 2 * 3
13 = 13 
14 = 2 * 7

// 1 * 2 * 2 * 2 * 3 * 3 * 5 * 7 * 11 * 13
*/

const testNumberStart = 5;
const testNumberEnd = 26;

const primeFactors = [];

let currentNumber;

/*
key => value
faktor => Häufigkeit
 */

function setup(){
    createCanvas(0,0);
    frameRate(5);
     currentNumber = testNumberStart;
}


function draw(){

    const factors = getPrimeFactors(currentNumber);

    for(let i in factors){
        if(!primeFactors[i] || primeFactors[i] < factors[i]){
            primeFactors[i] = factors[i];
        }
    }

    console.log("Primfaktoren fuer " + currentNumber);
    console.log(factors);
    console.log(primeFactors);

    currentNumber++;

    if(currentNumber > testNumberEnd){
        console.log("Die gesuchte Zahl, welche durch alle natuerlichen Zahlen von " + testNumberStart + " bis " + testNumberEnd +" ohne Rest teilbar ist, lautet:");

        let result = 1;
        for(let i in primeFactors){
            //result = result * pow(i, primeFactors[i]);
            result *=  pow(i, primeFactors[i]);
        }

        console.log(result);

        noLoop();
    }
}

function getPrimeFactors(num){
    const result= [];
    
    let rest = num;

    for(let i = 2; i < rest; i++){
        let occurrences = 0;
        let noMore = false;
        do{
            const divResult = rest / i;
            if(divResult === floor(divResult)){
                occurrences++;
                rest = divResult;
            }else{
                noMore = true;
            }
        }while(!noMore)
        
        if(occurrences > 0){
            result[i] = occurrences;
        }
    }

    if(rest > 1)
    {
        result[rest] = 1;
    }

    return result;
}