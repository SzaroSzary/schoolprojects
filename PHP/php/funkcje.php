<form>
Podaj liczbe: <input type="text" name="n"/><br/>
<input type="submit" value="oblicz"/>
</form>
<?php
function fibo($n)
{
	$a =0;
	$b =1;
	for($i=1;$i<$n;$i++)
	{
		$b+=$a;
		$a = $b-$a;
	}
	return $b;
}
if(isset($_GET['n']))
{
	$n=$_GET['n'];
	echo "Wynik: ".fibo($n);
}
?>