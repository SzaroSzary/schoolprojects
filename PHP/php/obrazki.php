<?php
if(isset($_FILES['plik'])&&isset($_POST['wyslij']))
{
	/* sprawdzenie czy zosta� wybrany plik */
	if ($_FILES['plik']['name'] != '')
		if ($_FILES['plik']['type'] == 'image/jpeg')
		{
			if(is_uploaded_file($_FILES['plik']['tmp_name']))
  			{
				$obrazek=base64_encode(file_get_contents($_FILES['zdjecie']['tmp_name']));
				//po��czenie z MySQL
				//dodanie pliku do pola typu BLOB
			}
			else
			{
				echo 'problem: Mo�liwy atak podczas przesy�ania pliku.';
				echo 'Plik nie zosta� zapisany.';
			}
		}
		else
		{
			echo('Nie ma pliku');
			echo($_FILES['plik']['error']);
        }
	else
	{
        /* je�li plik nie zosta� wybrany */
        echo 'Wybierz plik.<br>';
    }
}
?>