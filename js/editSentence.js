var sentences = getXMLSentences();
var divSections = document.getElementsByClassName("divSection");

var button_1 = creatButton(1);
divSections[0].appendChild(button_1);
if (button_1.value === "true") {
    for (var i = 0; i < sentences.length; i++) {
        var divElement = document.createElement("div");
        divElement.style.width = "100%"
        divElement.style.overflow = "auto";

        var pNumber = document.createElement("p");
        var checkbox = creatCheckbox(i + 1);
        pNumber.innerHTML = i + 1 + ".";
        pNumber.style.width = "5%";
        pNumber.style.cssFloat = "left";
        divElement.appendChild(pNumber);
        for (var j = 0; j < sentences[i].length; j++) {
            var pSentence = document.createElement("p");
            pSentence.innerHTML = sentences[i][j];
            pSentence.style.width = "45%";
            pSentence.style.cssFloat = "left";
            divElement.appendChild(pSentence);
        }
        divElement.appendChild(checkbox);
        divSections[0].appendChild(divElement);
    }
    var br = document.createElement("br");
    divSections[0].appendChild(br);

    //creatSubmit()
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    divSections[0].appendChild(inputSubmit);
}

var button_2 = creatButton(2);
divSections[1].appendChild(button_2);
if (button_2.value === "true") {
    var pExplain = document.createElement("p");
    pExplain.innerHTML = "(for a synonym write like \"this is an example/representation/something\")";
    divSections[1].appendChild(pExplain);
    var languages = getXMLNodes();
    for (var i = 0; i < languages.length; i++) {
        var p = document.createElement("p");
        p.innerHTML = "Enter Sentence in " + languages[i].charAt(0).toUpperCase() + languages[i].substring(1) + ":";
        divSections[1].appendChild(p);

        var inputTextBox = document.createElement("input");
        inputTextBox.name = languages[i];
        inputTextBox.type = "text";
        inputTextBox.style.width = "99%";
        inputTextBox.style.marginBottom = "5px"
        divSections[1].appendChild(inputTextBox);
    }
    //creat submit
    var inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    divSections[1].appendChild(inputSubmit);
}

var button_3 = creatButton(3);
divSections[2].appendChild(button_3);
if(button_3.value === "true"){
    for (var i = 0; i < sentences.length; i++) {
        var pNumber = document.createElement("p");
        pNumber.innerHTML = i + 1 + ".";
        divSections[2].appendChild(pNumber);
        for (var j = 0; j < sentences[i].length; j++) {
            var textBoxSentence = document.createElement("input");
            textBoxSentence.setAttribute("type", "text");
            textBoxSentence.style.width = "99%";
            textBoxSentence.style.margin = "0 0 10px 0";
            textBoxSentence.name = i + "-" + j;
            textBoxSentence.value = sentences[i][j];
            divSections[2].appendChild(textBoxSentence);
        }
    }
    //creat submit
    var inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    divSections[2].appendChild(inputSubmit);
}

//creat checkboxes
function creatCheckbox(number) {
    var checkbox = document.createElement("input");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("value", number);
    checkbox.setAttribute("name", "checkbox-" + number);
    checkbox.style.margin = "16px 0 0 0";
    checkbox.style.width = "5%";


    return checkbox;

}