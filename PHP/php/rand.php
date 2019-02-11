<?php
$liczby = [];
$suma = 0;
for($i = 0; $i<10; $i++)
{
	$liczby[$i] = rand(1,100);
	echo $liczby[$i].'<br/>';
	$suma+=$liczby[$i];
}
echo 'Suma: '.$suma.' <br/>Średnia: '.($suma/10)
?>