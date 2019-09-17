var request = new XMLHttpRequest();
request.open("GET", "test.xml", false);
request.send();
var xmlDoc = request.responseXML;

//navigation nd so erstelle

function getXMLSentences() {
    var sentences = [];
    var x;

    x = xmlDoc.documentElement.childNodes;

    //darf man das?
    for (var i = 1; i < x.length; i += 2) {
        var sameSentence = [];
        var length = x[i].childNodes.length;
        for (var j = 1; j < length; j += 2) {
            //alles in an array
            sameSentence.push(x[i].childNodes[j].childNodes[0].nodeValue);
        }

        sentences.push(sameSentence);
    }
    return sentences;
}

function getXMLNodes() {
    var languages = [];
    var x;
    x = xmlDoc.documentElement.childNodes[1].childNodes;
    for (var i = 1; i< x.length; i+=2){
        languages.push(x[i].nodeName);
    }
    return languages;
}

function creatButton(id) {
    var button = document.createElement("button");

    //eigeni class im css mache für style
    //button.onclick = "change(" + id + ")"; funktioniert nicht
    button.setAttribute("onclick", "change(" + id + ")");
    button.id = id;
    button.setAttribute("value", sessionStorage.getItem("button" + id));
    button.setAttribute("class", "buttonUpDown");

    if (sessionStorage.getItem("stringI" + id) == undefined) {
        sessionStorage.setItem("stringI" + id, "down")
    }
    button.appendChild(creatI(sessionStorage.getItem("stringI" + id)));

    return button;
}

function change(id) {
    switch (sessionStorage.getItem("button" + id)) {
        case "true":
            sessionStorage.setItem("stringI" + id, "down");
            sessionStorage.setItem("button" + id, "false");
            break;
        case "false":
            sessionStorage.setItem("stringI" + id, "up");
            sessionStorage.setItem("button" + id, "true");
            break;
        default:
            sessionStorage.setItem("stringI" + id, "up");
            sessionStorage.setItem("button" + id, "true");
    }

}

function creatI(which) {
    var i = document.createElement("i");
    if (which == "down") {
        i.setAttribute("class", "down");
    }
    if (which == "up") {
        i.setAttribute("class", "up");
    }
    return i;
}