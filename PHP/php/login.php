<?php
if (isset($_POST['login']) && isset($_POST['pass'])){
  $conn=mysqli_connect("localhost","rskrzypczak","rskrzypczak","rskrzypczak");
  $login=htmlentities($_POST['login']);
  $haslo=htmlentities($_POST['pass']);
  $rs=mysqli_query($conn,"SELECT Count(id) FROM users WHERE username='$login'
   AND password=sha1('$haslo')");
	$rec=mysqli_fetch_array($rs);
  if ($rec[0]>0){
    session_start();
	$_SESSION['login']=$_POST['login'];
    header("Location: glowna.php?" . SID);
    exit();
  } else
    $error = "<B>B��dny login lub has�o!</B><BR>";
} else
  $error = false;
?>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Logowanie</title>
</head>
<body>
<?php
    echo $error ? $error : "";
?>
    <form method="POST">
        Login: <input type="text" name="login"><BR>
        Has�o: <input type="password" name="pass"><BR>
        <input type="submit" value="Zaloguj si�">
    </form>
</body>
</html> 