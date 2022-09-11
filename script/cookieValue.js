function loggin(x) {
    console.log(x)
}
function checkCookieHasASpecificValue(x) {
    if (document.cookie.split(";").some((item) => item.includes("reader=1"))) {
        const output = document.getElementById(`${x.id}`);
        output.textContent = '> The cookie "reader" has a value of "1"';
    }
}
function clearASpecificValueOfTheCookie(x) {
    const output = document.getElementById(`${x.id}`);
    output.textContent = "";
}