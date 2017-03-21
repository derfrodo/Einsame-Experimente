function setup() {
    noCanvas();

    let a = 1;
    let b = 1;
    let c = "1";

    console.log("a, b : number == 1");
    console.log("c: string== \"1\"");

    console.log("a==b");

    console.log(a == b);
    console.log("a===b");
    console.log(a === b);

    console.log("a==c");
    console.log(a == c);
    console.log("a===c");
    console.log(a === c);

    console.log("c")
    console.log(c)

    c = c+1;
    console.log("c=c+1" );
    console.log(c)

    c="1";
    c++;
    console.log("c=\"1\"; c++;" );
    console.log(c)
    

}

function draw() {

}
