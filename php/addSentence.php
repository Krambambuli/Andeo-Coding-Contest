<?php
/*schleife vlt*/

$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;


$dom->load("../test.xml");



$dom ->save("../testtest.xml");

header('Location: ../editSentence.html');
?>