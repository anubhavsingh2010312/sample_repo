async function calculateSimpleInterest() {
    var principal = document.getElementById("principal").value;
    var rate = document.getElementById("rate").value;
    var time = document.getElementById("time").value;
    
    const response = await fetch(`http://localhost:3000/simple-interest?principal=${principal}&rate=${rate}&time=${time}`);
    const ans = await response.text();
    document.getElementById("simpleInterest").innerHTML = "The simple interest is " + ans;  

}