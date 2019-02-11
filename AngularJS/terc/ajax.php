<?php
$terc=simplexml_load_file("terc.xml");
$simc=simplexml_load_file("simc.xml");
switch($_GET['f']){
    case 1:
        $result = $terc->xpath("/teryt/catalog//NAZWA_DOD[text()='województwo']/../NAZWA[text()]");
        break;
    case 2:
        $wojval = $terc->xpath("/teryt/catalog//NAZWA[text()='".$_GET['woj']."']/../WOJ/text()")[0];
        $result = $terc->xpath("/teryt/catalog//WOJ[text()='".$wojval."']/../NAZWA_DOD[contains(text(),'powiat')]/../NAZWA[text()]");
        break;
    case 3:
        $wojval = $terc->xpath("/teryt/catalog//NAZWA[text()='".$_GET['woj']."']/../WOJ/text()")[0];
        $powval = $terc->xpath("/teryt/catalog//NAZWA[text()='".$_GET['pow']."']/../POW/text()")[0];
        $result = $terc->xpath("/teryt/catalog//WOJ[text()='".$wojval."']/../POW[text()='".$powval."']/../NAZWA_DOD[contains(text(),'gmina') or contains(text(),'miasto') or contains(text(),'obszar') or contains(text(),'delegatura') or contains(text(),'dzielnica')]/../NAZWA[text()]");
        break;
    case 4:
        $wojval = $terc->xpath("/teryt/catalog//NAZWA[text()='".$_GET['woj']."']/../WOJ/text()")[0];
        $powval = $terc->xpath("/teryt/catalog//NAZWA[text()='".$_GET['pow']."']/../POW/text()")[0];
        $gmival = $terc->xpath("/teryt/catalog//NAZWA[text()='".$_GET['gmi']."']/../GMI/text()")[0];
        $result = $simc->xpath("/SIMC/catalog//WOJ[text()='".$wojval."']/../POW[text()='".$powval."']/../GMI[text()='".$gmival."']/../NAZWA[text()]");
        break;
}
echo json_encode($result);
?>