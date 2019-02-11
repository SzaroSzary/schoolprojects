<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8">
    <style>
    body{
        background: lightblue;
    }
    </style>
</head>
<body>
	<form method="GET">   
        <input type="radio" name="dzien" value="poniedzialek"> poniedziałek<br>
        <input type="radio" name="dzien" value="wtorek"> wtorek<br>
        <input type="radio" name="dzien" value="sroda"> sroda<br>
        <input type="radio" name="dzien" value="czwartek"> czwartek<br>
        <input type="radio" name="dzien" value="piatek"> piatek<br>
        <input type="radio" name="dzien" value="sobota"> sobota<br>
        <input type="radio" name="dzien" value="niedziela"> niedziela<br>
		<input type="submit" value="Wyślij"/>
	</form>   
<img src="grafika.php"/>
</body>
</html>
<?php

	$conn=@mysqli_connect("localhost", "rskrzypczak", "rskrzypczak", "rskrzypczak");
	if(!$conn) 
	{
		exit("Brak polaczenia z serwerem");
	}

    $dzien = $_GET['dzien'];
    switch($dzien){
        case "poniedzialek":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 1") or exit("Błąd w SQL");
            break;
        case "wtorek":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 2") or exit("Błąd w SQL");
            break;
        case "sroda":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 3") or exit("Błąd w SQL");
            break;
        case "czwartek":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 4") or exit("Błąd w SQL");
            break;
        case "piatek":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 5") or exit("Błąd w SQL");
            break;
        case "sobota":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 6") or exit("Błąd w SQL");
            break;
        case "niedziela":
	        mysqli_query($conn, "UPDATE dni SET ilosc = ilosc + 1 WHERE id = 7") or exit("Błąd w SQL");
            break;
    }

?>