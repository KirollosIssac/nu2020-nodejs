function area(x)
{
    return  x*x;
}

function test(callbackfunction)
{
    return callbackfunction(5);
}

let a = test(area);

console.log(a);