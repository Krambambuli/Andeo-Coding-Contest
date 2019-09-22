<?php

$dom = new DOMDocument;

$dom->load("../test.xml");

$root = $dom->documentElement;

$sentences = $root->getElementsByTagName("sentences");

for ($i = 0; $i < $sentences->length; $i++) {
    $checkbox = "checkbox-" . $i;
    if (!empty($_POST[$checkbox])) {
        $sentences[$_POST[$checkbox] - 1]->parentNode->removeChild($sentences[$_POST[$checkbox] - 1]);
    }
}

$dom->save("../test.xml");

header('Location: ../editSentence.html');
?>