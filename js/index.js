
//ich machs jez so
// sentences beinhaltet arrays namens sentence
// wo alli in allne sprache de glich satz isch
// aber de satz isch nacher nomal en array mit allne wärter

var gapes = [];
var difficulty;
var language;
var sentences;

if (sessionStorage.getItem("sentences") == undefined) {
    sentences = getXMLSentences();
    for (var i = 0; i < sentences.length; i++) {
        for (var j = 0; j < sentences[i].length; j++) {
            //ohni funktion wirds verrwirt
            sentences[i][j] = splitString(sentences[i][j]);
        }
    }
} else {
    alert("hey")
    sentences = sessionStorage.getItem("sentences");
}
setEventListener();
setLanguage();
getLanguage();
checkSynonym();
getDifficulty();
setHTML();


//EX
function setEventListener() {
    document.addEventListener("input", function (event) {
        if (event.target.id === "selectLanguage") {
            if (event.target.value === "1-0") {
                sessionStorage.setItem("language", event.target.value);
            }
            if (event.target.value === "0-1") {
                sessionStorage.setItem("language", event.target.value);
            }
            location.reload();
        }
    }, false);
}

/*
    function  mixSentences() {
        var x = shuffle(sentences);
        sessionStorage.setItem("sentences", x);
        location.reload();

    }*/

//noEX
function setHTML() {
    var divDifficulty = document.getElementById("difficulty");
    divDifficulty.innerHTML += difficulty;
    var divContent = document.getElementById("content");
    for (var i = 0; i < sentences.length; i++) {
        //neui sprache = neui schleife ibaue
        var divSection = creatDiv(0);
        var divNumber = creatDiv(1);
        var h2Number = document.createElement("h2");
        var divSentences = creatDiv(2);
        var divAnswer = creatDiv(3);
        h2Number.innerHTML = i + 1 + ". ";
        divNumber.appendChild(h2Number);

        //falls ich en random mix mache will
        divSentences.appendChild(creatSentence(sentences[i][language[0]]));
        divSentences.appendChild(creatSentenceWithGape(sentences[i][language[1]]));

        divSection.appendChild(divNumber);
        divSection.appendChild(divSentences);

        divContent.appendChild(divSection);
        divContent.appendChild(divAnswer);
    }
}

//ex
function splitString(txt) {
    return txt.split(" ");
}


//ex
function getDifficulty() {
    if (sessionStorage.getItem("difficulty") == undefined) {
        difficulty = 1;
    } else {
        difficulty = sessionStorage.getItem("difficulty");
    }
}

//funktioniert so lala
function setLanguage() {
    var select = document.getElementById("selectLanguage");
    //var options = select.options;
    if (sessionStorage.getItem("language") == "0-1") {
        select.selectedIndex = 0;
    }
    if (sessionStorage.getItem("language") == "1-0") {
        select.selectedIndex = 1;
    }
    if (sessionStorage.getItem("language") == undefined) {
        select.selectedIndex = 0;
    }
    //spöter wen ich neui sprache no dezue nimm
    /*for(var i = 0; i < options; i++){
        if(sessionStorage.getItem("language") == options[i].value){
            select.selectedIndex = 0;
        }
        if(sessionStorage.getItem("language") == options[i].value){
            select.selectedIndex = 1;
        }
        if(sessionStorage.getItem("language") == undefined){
            select.selectedIndex = 0;
        }
    }*/

}

function getLanguage() {
    var select = document.getElementById("selectLanguage");
    language = select.options[select.selectedIndex].value.split("-");

}

function checkSynonym() {
    for (var i = 0; i < sentences.length; i++) {
        for (var j = 0; j < sentences[i].length; j++) {
            for (var w = 0; w < sentences[i][j].length; w++) {
                var x = sentences[i][j][w];
                if (sentences[i][j][w].includes("/")) {
                    sentences[i][j][w] = sentences[i][j][w].split("/");
                }
            }
        }
    }
}

function creatSentence(sentence) {
    //h2.innerHTML = sentence.join(" "); geht nicht wegen Synonym Arrays
    var h2 = document.createElement("h2");
    var noSynonyms = true;
    //check if there are synonyms
    for (var i = 0; i < sentence.length; i++) {
        if (Array.isArray(sentence[i])) {
            noSynonyms = false;
        }
    }
    if (noSynonyms) {
        h2.innerHTML = sentence.join(" ");
    } else {
        for (var i = 0; i < sentence.length; i++) {
            getSentenceText(h2, i, sentence)
        }
    }
    return h2;
}

//sentence = Array aus wörtern die den Satz ergeben
function creatSentenceWithGape(sentence) {
    //
    var h2 = document.createElement("h2");
    //declares where the gape should be
    var punctuationMark = "";
    var gape = [];
    createGape(gape, sentence);
    //visual settings for the textbox
    for (var i = 0; i < sentence.length; i++) {
        //check every word if it contains any . , ? ! ode so if then safe which word(i)
        if (sentence[i].includes(",") ||
            sentence[i].includes(".") ||
            sentence[i].includes("!") ||
            sentence[i].includes("?")) {
            punctuationMark = sentence[i].substr(-1);
            sentence[i] = sentence[i].replace(punctuationMark, "");
        }

        if (gape.includes(i)) {
            setTextBox(h2, i, sentence)
        } else {
            //falls es kein gape ist wird der normale text wiedergegeben
            getSentenceText(h2, i, sentence);
        }
        h2.innerHTML += punctuationMark;
        h2.innerHTML += " ";
        punctuationMark = "";
    }
    //put all gapes in an array gapes
    gapes.push(gape);

    return h2;
}

function getSentenceText(h2, i, sentence) {
    //direkt vo creatSentence koppiert
    if (Array.isArray(sentence[i])) {
        //bei synonymen wird ein wort von allen ausgewählt
        var span = document.createElement("span");
        span.style.color = "blue";
        span.setAttribute("title", getWord(sentence[i]));
        span.innerHTML += sentence[i][getRandInteger(sentence[i].length)];
        h2.appendChild(span);
    } else {
        h2.innerHTML += sentence[i];
    }
    h2.innerHTML += " ";
}

function setTextBox(h2, i, sentence) {
    if (Array.isArray(sentence[i])) {
        //bei synonymen wird die TextBox so lang wie das längste wort
        var longestWord = " ";
        for (var j = 0; j < sentence[i].length; j++) {
            if (longestWord < sentence[i][j]) {
                longestWord = sentence[i][j];
            }
        }
        h2.appendChild(creatTextBox(longestWord.length * 10));
    } else {
        //textbox länge wird von wortlänge bestimmt
        h2.appendChild(creatTextBox(sentence[i].length * 10));
    }
}


function createGape(gape, sentence) {
    var sentenceDifficulty = difficulty;
    if (difficulty >= sentence.length) {
        sentenceDifficulty = sentence.length;
    }
    for (var i = 0; i < sentenceDifficulty; i++) {
        var r = getRandInteger(sentence.length);
        //damit es immer en neue gape macht und ned 2mal de glich
        while (gape.includes(r)) {
            r = getRandInteger(sentence.length)
        }
        gape.push(r);
    }
    //sorting the Array in aufsteigende order.
    gape.sort(function (a, b) {
        return a - b
    });
}

function getRandInteger(length) {
    return Math.floor(Math.random() * length);
}

function check() {
    var textBox = document.getElementsByClassName("textBox");
    var divAnswer = document.getElementsByClassName("divAnswer");
    var x = 0;
    for (var i = 0; i < sentences.length; i++) {
        divAnswer[i].innerHTML = "";
        for (var j = 0; j < gapes[i].length; j++) {
            var h3 = document.createElement("h3");
            //takes all the words which were gapeps
            var gapeText = sentences[i][language[1]][gapes[i][j]];
            //muss satzzeiche vo dem entferne wenis obe au mach isch en String
            var textBoxValue = textBox[x].value;
            var isCorrect = checkGapeText(gapeText, textBoxValue);

            if (isCorrect) {
                textBox[x].style.border = "2px solid green";
                h3.style.backgroundColor = "#90ee90";
                h3.innerText =
                    i + 1 +
                    "." + j +
                    ". Richtig !";
            } else {
                textBox[x].style.border = "2px solid red";
                h3.style.backgroundColor = "#ffcccb";
                h3.innerText =
                    i + 1 +
                    "." + j +
                    ". Falsch ! => \"" +
                    textBoxValue +
                    "\" sollte " +
                    getWord(gapeText) +
                    " sein";
            }
            divAnswer[i].appendChild(h3);
            x++
        }
    }
}

function checkGapeText(gapeText, textBoxValue) {
    if (Array.isArray(gapeText)) {
        if (gapeText.includes(textBoxValue)) {
            return true;
        } else {
            return false;
        }
    } else {
        if (gapeText === textBoxValue) {
            return true;
        } else {
            return false;
        }
    }
}

function getWord(word) {
    var txt = "";
    if (Array.isArray(word)) {
        for (var i = 0; i < word.length - 1; i++) {
            txt += "\"" + word[i] + "\"";
            if (i !== word.length - 2) {
                txt += ", ";
            }
        }
        txt += " oder \"" + word[word.length - 1] + "\"";
        return txt;
    } else {
        txt = "\"" + word + "\"";
        return txt;
    }
}

function difficultyUp() {
    if (difficulty < 10) {
        difficulty++;
        sessionStorage.setItem("difficulty", difficulty);
        location.reload();
    }
}

function difficultyDown() {
    if (difficulty > 0) {
        difficulty--;
        sessionStorage.setItem("difficulty", difficulty);
        location.reload();
    }
}

//muss nomal dure gmacht werde (id muss zu class gmacht werde)
function creatTextBox(width) {
    //creat input
    var element = document.createElement("input");
    //Assign attributes
    element.setAttribute("type", "text");
    element.setAttribute("value", "");
    element.setAttribute("name", "textBox");
    element.setAttribute("class", "textBox");
    element.style.width = width + "px";
    element.style.border = "2px solid black"

    return element;

}

//EX
function creatDiv(whichDiv) {
    //creat div
    var div = document.createElement("div");
    //Assign attributes
    switch (whichDiv) {
        case 0:
            div.className = "divSection";
            //div.setAttribute("class", "divSection");
            break;
        case 1:
            div.className = "divNumber";
            break;
        case 2:
            div.className = "divSentences";
            break;
        case 3:
            div.className = "divAnswer";
    }

    return div;
}

