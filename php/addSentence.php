<?php
/*schleife vlt*/

$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;


$dom->load("../test.xml");

if(!empty($_POST["german"]) && !empty(($_POST["english"]))) {
    $sentences = $dom->createElement("sentences");

    $ger = $dom->CreateElement("german");
    $gerText = $dom->createTextNode($_POST["german"]);
    $ger->appendChild($gerText);
    $sentences->appendChild($ger);

    $en = $dom->createElement("english");
    $enText = $dom->createTextNode($_POST["english"]);
    $en->appendChild($enText);
    $sentences->appendChild($en);

    $dom ->documentElement->appendChild($sentences);

}

$dom ->save("../test.xml");

header('Location: ../editSentence.html');
?>