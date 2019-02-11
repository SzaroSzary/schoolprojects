<?php

	$conn=@mysqli_connect("localhost", "rskrzypczak", "rskrzypczak", "rskrzypczak");
	$rs=mysqli_query($conn, "SELECT * FROM dni") or exit("Błąd w SQL");
  $liczby = [];
  $dni = [];
  while($rec=mysqli_fetch_array($rs)) 
	{
    array_push($liczby, $rec["ilosc"]);
    array_push($dni, $rec["dzien"]);
	}
  header("Content-type: image/jpeg");
  $rysunek = imagecreate (400,200)
    or die("Biblioteka graficzna nie została zainstalowana!");
  $kolorbialy = imagecolorallocate ($rysunek, 255, 255, 255);
  $kolorczarny = imagecolorallocate ($rysunek, 0, 0, 0);
  imagefill($rysunek, 0, 0, $kolorbialy);
  $max = $liczby[0];
  for( $i=0; $i<7; $i++)
  {
    if($liczby[$i]>$max){
      $max = $liczby[$i];
    }
  }
  $diff = 1/($max/240);
  for( $i=0; $i<7; $i++)
  {
    $kolorslupka = imagecolorallocate ($rysunek, 25*$i, 25*$i,0);
    imagefilledrectangle ($rysunek, 120, $i*30+3, $liczby[$i]*$diff+120, $i*30+10, $kolorslupka);
    imagestring ($rysunek, 3,  20, $i*30, $dni[$i], $kolorczarny);
    imagestring($rysunek,3,$liczby[$i]*$diff+124,$i*30,$liczby[$i],$kolorczarny);
  }
  imagejpeg($rysunek);
?>
