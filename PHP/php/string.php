<form>
Podaj imie: <input type="text" name="imie"/><br/>
Podaj nazwisko: <input type="text" name="nazwisko"/><br/>
Podaj PESEL: <input type="text" name="pesel"/><br/>
<input type="submit" value="oblicz"/>
</form>
<?php
if(isset($_GET['imie'],$_GET['nazwisko'],$_GET['nazwisko']))
{
	$imie=trim($_GET['imie']);
	$nazwisko=trim($_GET['nazwisko']);
	$pesel=trim($_GET['pesel']);
	echo "Inicjaly: ".substr($imie,0,1).substr($nazwisko,0,1).'<br/>';
	$szyfr = '';
	$d = strlen($imie);
	$count = 0;
	for($i=0;$i<$d;$i++)
	{
		if($imie[$i] == " ")
		{
			$count++;
		}
			
	}
	//echo "<br/>Płeć: ".($pesel[strlen($pesel)-2]%2==0)?'kobieta':'mezczyzna';
	echo $count;
}
?>