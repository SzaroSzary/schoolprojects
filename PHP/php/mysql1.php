<head>
<meta charset="UTF8"/>
</head>
<?php
$conn = mysqli_connect("localhost","mnowak","mnowak","pracownicy");
if(!$conn)
	exit("Brak połączenia z serwerem!");
mysqli_query($conn, 'set names utf8');
$rs=mysqli_query($conn, "SELECT Count(ID) AS Ile FROM Pracownicy WHERE Pensja>2000")
	or exit('Błąd w SQL!');
while($rec=mysqli_fetch_array($rs))
	echo $rec['Ile'].'<br/>';
?>