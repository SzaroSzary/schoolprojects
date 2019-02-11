<form method="GET">
Podaj pierwszą liczbę: <input type="text" name="liczba1"/><br/>
Podaj drugą liczbę: <input type="text" name="liczba2"/><br/>
Podaj działanie (+,-,*,/): <input type="text" name="op"/><br/>
<input type="submit" value="Oblicz"/>
</form>
<?php
if(isset($_GET['liczba1'],$_GET['liczba2'],$_GET['op']))
{
	if(is_numeric($_GET['liczba1'])&&is_numeric($_GET['liczba2']))
	{
		$l1=$_GET['liczba1'];
		$l2=$_GET['liczba2'];
		$op=$_GET['op'];
		switch($op)
		{
			case '+':
				echo "$l1$op$l2=".($l1+$l2);
				break;
			case '-':
				echo "$l1$op$l2=".($l1-$l2);
				break;
			case '*':
				echo "$l1$op$l2=".($l1*$l2);
				break;
			case '/':
				if($l2!=0)
				{
					echo "$l1$op$l2=".($l1/$l2);
				}
				else
				{
					echo "Nie wolno dzielić przez zero! Cholero!";
				}
				break;
			default:
				echo "Nieprawidłowy operator!";
		}
	}
	else
	{
		echo "Proszę podać liczby!";
	}
}
?>