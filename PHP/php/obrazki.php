<?php
if(isset($_FILES['plik'])&&isset($_POST['wyslij']))
{
	/* sprawdzenie czy zosta³ wybrany plik */
	if ($_FILES['plik']['name'] != '')
		if ($_FILES['plik']['type'] == 'image/jpeg')
		{
			if(is_uploaded_file($_FILES['plik']['tmp_name']))
  			{
				$obrazek=base64_encode(file_get_contents($_FILES['zdjecie']['tmp_name']));
				//po³¹czenie z MySQL
				//dodanie pliku do pola typu BLOB
			}
			else
			{
				echo 'problem: Mo¿liwy atak podczas przesy³ania pliku.';
				echo 'Plik nie zosta³ zapisany.';
			}
		}
		else
		{
			echo('Nie ma pliku');
			echo($_FILES['plik']['error']);
        }
	else
	{
        /* jeœli plik nie zosta³ wybrany */
        echo 'Wybierz plik.<br>';
    }
}
?>