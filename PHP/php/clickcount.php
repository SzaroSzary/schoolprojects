<?php
$conn = mysqli_connect("localhost","rskrzypczak","rskrzypczak","rskrzypczak");
if(!$conn) die('brak połączenia');
mysqli_query($conn,"UPDATE licznik SET licz=licz+1");
$rs=mysqli_query($conn,"SELECT licz FROM licznik");
while($rec=mysqli_fetch_array($rs))
	echo $rec['licz'].'<br/>';
?>