<?php
$xml=simplexml_load_file("czasopisma.xml");
switch($_GET['f']){
    case 1:
        $result = $xml->xpath("/czasopisma/zmienne/*");
        break;
    case 2:
        $result = $xml->xpath("/czasopisma/lata/".$_GET['val']);
        break;
    case 3:
        $result = $xml->xpath("/czasopisma/".$_GET['val']."/*[@rok='".$_GET['year']."']");
        break;
    case 4:
        $result = $xml->xpath("/czasopisma/".$_GET['val']."/*");
        break;
}
echo json_encode($result);
?>