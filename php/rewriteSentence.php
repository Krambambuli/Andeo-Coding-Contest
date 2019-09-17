<?php
/*schleife vlt*/

$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;


$dom->load("../test.xml");




$dom ->save("../test.xml");

header('Location: ../editSentence.html');
?>