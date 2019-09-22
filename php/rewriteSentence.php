<?php
$dom = new DOMDocument;

$dom->load("../test.xml");

$root = $dom->documentElement;

$sentences = $root->getElementsByTagName("sentences");
if(!empty($_POST["0-0"])) {
    for ($i = 0; $i < $sentences->length; $i++) {
        $ger = $sentences[$i]->getElementsByTagName('german');
        $eng = $sentences[$i]->getElementsByTagName('english');
        $eng->item(0)->nodeValue = $_POST[$i ."-1"];
        $ger->item(0)->nodeValue = $_POST[$i ."-0"];
    }
}
//echo $_POST["0-0"];

//for ($i = 0; $i < $sentences->length; $i++) {
//foreach ($root -> childNodes as $item){
//  echo $item ->nodeName ;
//  }
//echo $sentences->item($i)->nodeName;
// for($j = 0; $j < $sentences->item($i)->length; $j++){
//->item($j)->nodeName;
//echo $i;
//}
//}

$dom->save("../test.xml");

header('Location: ../editSentence.html');
?>