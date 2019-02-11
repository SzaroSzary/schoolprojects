
<?php
$conn = mysqli_connect("localhost","rskrzypczak","rskrzypczak","rskrzypczak");
if(!$conn) die('brak połączenia');
$edycja=False;
$name='';
$price='';
$count='';
$id='';
if (isset($_GET['add'])) {
	switch($_GET['add']){
		case 'Dodaj':
			if(isset($_GET['name'],$_GET['price'],$_GET['count'])){
				$name=$_GET['name'];
				$price=$_GET['price'];
				$count=$_GET['count'];
				$sql="INSERT INTO sklep (nazwa,cena,ilosc) VALUES ('$name',$price,$count);";
				//echo $sql;
				$conn->query($sql) or die("Rekord nie zostal dodany");
			}
			$button=$_GET['add'];
			break;
		case 'Edytuj':
			if(isset($_GET['id'])){
				$sql="SELECT * FROM sklep WHERE id=".$_GET['id'];
				$wynik=$conn->query($sql) or die("Rekord nie zostal znaleziony");
				if($wynik->num_rows>0){
					$rekord=$wynik->fetch_array();
					$name=$rekord['nazwa'];
					$price=$rekord['cena'];
					$count=$rekord['ilosc'];
					$id=$_GET['id'];
					$edycja=True;
				}
			}
			break;
		case 'Usun':
			if(isset($_GET['id'])){
				$sql="DELETE FROM sklep WHERE id=".$_GET['id'];
				$conn->query($sql) or die("Rekord nie zostal usuniety");
			}
			break;
		case 'Zapisz':
			if(isset($_GET['name'],$_GET['price'],$_GET['count'])){
				$name=$_GET['name'];
				$price=$_GET['price'];
				$count=$_GET['count'];
				$sql="UPDATE sklep SET nazwa='$name',cena='$price',ilosc='$count' WHERE id=".$_GET['id'];
				$wynik=$conn->query($sql) or die("Rekord nie zmieniony");
				$name='';
				$price='';
				$count='';
			}
	}
}
$rs=mysqli_query($conn,"SELECT * FROM sklep");
//echo "<form method='GET'>";
echo '<table border="2" style="border-collapse:collapse;">';
echo '<tr><th></th><th>Nazwa produktu</th><th>Cena</th><th>Ilosc</th><th>Edytowanie</th><th>Usuwanie</th></tr>';
while($rec=mysqli_fetch_array($rs))
	echo '<form><tr><td><input type="hidden" name="id" value="'.$rec['id'].'"/><td>'.$rec['nazwa'].'</td><td>'.$rec['cena'].'</td><td>'.$rec['ilosc'].'</td><td><input type="submit" name="add" value="Edytuj"/></td><td><input type="submit" name="add" value="Usun"/></td></tr></form>';
echo '</table>';
echo('
<form>
	<input type="hidden" name="id" value="'.($id).'"/><br/>
	Nazwa produktu: <input type="text" name="name" value="'.($name).'"/><br/>
	Cena: <input type="text" name="price" value="'.($price).'"/><br/>
	Ilosc: <input type="text" name="count" value="'.($count).'"/><br/>
	<input type="submit" name="add" value="'.(($edycja)?"Zapisz":"Dodaj").'"/>
</form>
')
?>