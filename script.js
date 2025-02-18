function myFunction() {
    var x = document.getElementById("loginForm").elements.length;
    var y = document.getElementById("loginForm").elements[1].value;
    document.getElementById("displaySpace").innerHTML = "Found " + x + " elements in the form. The last name is " + y;

    const para = document.createElement("p");
    para.innerText = "This is a new paragraph created by DOM.";
    document.body.appendChild(para);
}