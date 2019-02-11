<?php
if (isset($_POST['login']) && isset($_POST['pass'])){
  $conn=mysqli_connect(...);
  $login=htmlentities($_POST['login']);
  $haslo=htmlentities($_POST['pass']);
  $rs=mysqli_query($conn,"SELECT Count(id) FROM loginy WHERE login='$login'
   AND pass=sha1('$haslo')");
	$rec=mysqli_fetch_array($rs);
  if ($rec[0]>0){
    session_start();
	$_SESSION['login']=$_POST['login'];
    header("Location: glowna.php?" . SID);
    exit();
  } else
    $error = "<B>B³êdny login lub has³o!</B><BR>";
} else
  $error = false;
?>
<HTML>
<HEAD>
  <TITLE>Logowanie</TITLE>
</HEAD>
<BODY>
<?php
  echo $error ? $error : "";
?>
  <B>Podaj login i&nbsp;has³o</B>
  <FORM method="POST">
    Login: <INPUT type="text" name="login"><BR>
    Has³o: <INPUT type="password" name="pass"><BR>
    <INPUT type="submit" value="Zaloguj siê">
  </FORM>
</BODY>
</HTML> 