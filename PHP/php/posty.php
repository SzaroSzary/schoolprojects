<form method="POST">
<label>Autor: <input type="text" name="autor"></label>
<label>Wpis: <textarea rows="10" cols="100" name="wpis"></textarea></label>
<input type="submit" value="Dodaj"/>
</form>
<?php
$conn = mysqli_connect("localhost","rskrzypczak","rskrzypczak","rskrzypczak");
if(!$conn) die('brak połączenia');
if(isset($_GET['autor'],$_GET['wpis']))
{
	$autor=htmlentities($_GET['autor']);
	$wpis=($_GET['wpis']);
	$sql=mysqli_query($conn, "INSERT INTO wpisy(autor, wpis, data) VALUES ('$autor', '$wpis', NOW))");
	mysqli_query($conn,$sql);
}
$rs=mysqli_query($conn,"SELECT autor, data, wpis FROM wpisy");
while($rec=mysqli_fetch_array($rs))
	echo "Autor: ".$rec['autor']."Data: ".$rec['data']."<br/>Wpis:".$rec['wpis'].'<br/>';
?>