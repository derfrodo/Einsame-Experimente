"use strict";

var value1 = "v1";
const value2 = "v2";
let value3 = "v3";

function setup() {
    noCanvas();

    frameRate(1);

    // console.log("Setup");
    // console.log(value1);
    // console.log(value2);
    // console.log(value3);
}

function draw() {
    console.log("Draw wurde aufgerufen");
    doSomeDeclarations7();
    noLoop();
}

function doSomeDeclarations3() {
    do {
        var valueInBlock = "Wert aus do-while";
    } while (false);
    console.log(`Wert der var - Variable na do while: ${valueInBlock}`);

    {
        let valueWithLetInBlock = "LetWert";
    }

    (function doSomething() {

        console.log(`Wert von uebergeordneter let-variablen: ${valueWithLetInBlock}`);
        valueInBlock = "neuer Wert";
        // console.log(`Variable in Unterfunktion vor Deklaration: ${valueInBlock}`);

        let valueInBlock = "Wert aus doSomething";
        console.log(`Wert der var - Variable in Unterfunktion: ${valueInBlock}`);
    })();

    console.log(`Wert der var - Variable am Ende der Funktion: ${valueInBlock}`);
}

function doSomeDeclarations4() {
    {
        let data = "Voll viele daten";
        console.log(data);

        /*
        Ganz viel Code
         */
        //Ich brauche die Daten nicht mehr.
        data = undefined;
        console.log(data);
    }

    /*
    Ganz viel Code
     */

    //nach drei- vier Jahren
    console.log("Gebe nochmal data aus...");
    console.log(data);

}

function doSomeDeclarations5() {

    const doSomething = () => {
        var letter = "entertain you";
        console.log(letter);
        // console.log(`Wir haben einen konstanten: ${cnst}`);
    }

    // const cnst = "wert";

    var letter;
    letter = "let me";
    console.log(letter);

    {
        var letter = "varLetter";
    }

    // console.log(`Wir haben einen konstanten: ${cnst}`);

    doSomething();
    console.log(letter);
}

function doSomeDeclarations6() {

    // {
    //     let data = "wert";
    //     console.log(data);
    //     /*
    //     Viel Code
    //     */
    // }
    // console.log(data);

    const letter = "let me";
    console.log(letter);

    const letter = "varLetter";
    console.log(letter);
}

function doSomeDeclarations7() {
    var x = 0;
    switch (x) {
        case 0:
            var foo;
            break;

        case 1:
            var foo; // SyntaxError für erneute Deklaration
            break;
    }
}

function doSomeDeclarations7() {

    // const letter ={a:["let me", "entertain you"]};
    // console.log(letter);
    
    // for(let letter of letter.a)
    // {
    //     console.log(letter);    
    // }
    
    // const array =["let me", "entertain you"];
    // console.log(array);
    
    // for(let letter of array)
    // {
    //     console.log(letter);    
    // }


    const array =["let me", "entertain you"];
    console.log(array);
    
    for(let letter of array)
    {
        letter = "neu " + letter;
        console.log(letter);    
    }

    console.log(array);

    // const n = { a: ["eins", "zwei", "drei"] };
    // console.log(n);
    // for (let n of n.a) {
    //     console.log(n);
    // }

}

