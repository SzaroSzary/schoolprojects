<?php
if (isset($_POST['login']) && isset($_POST['pass'])){
    $conn=mysqli_connect("localhost","root","","rskrzypczak");
    $login=htmlentities($_POST['login']);
    $haslo=htmlentities($_POST['pass']);
    $rs=mysqli_query($conn,"SELECT Count(id) FROM users WHERE username='$login' AND password=sha1('$haslo')");
    $rec=mysqli_fetch_array($rs);
    if ($rec[0]>0){
        session_start();
        $_SESSION['login']=$_POST['login'];
        header("Location: articles.php?user=".$login);
        exit();
    } 
    else
        $error = "<b>Błędny login lub hasło!</b><br/>";
} 
else
    $error = false;
?>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Logowanie</title>
        <style>
            body{
                width:960px;
                margin:0 auto;
            }
            #loginpanel{
                position: relative;
                float: right;
                width: 200px;
            }
            #contentpanel{
                position:relative;
                width:700px;
                float:left;
                border-right: 1px black solid;
            }
            .article{
                width:650px;
                text-align: justify;
            }
        </style>
        <script>
            
        </script>
    </head>
    <body>
        <?php
            echo $error ? $error : "";
        ?>
        <div id="contentpanel">
            <?php
                $conn=mysqli_connect("localhost","root","","rskrzypczak");
                if(!$conn) die('brak połączenia');
                $edycja = false;
                $title='';
                $content='';
                $date='';
                $id='';
                $rs=mysqli_query($conn,"SELECT * FROM posts");
                while($rec=mysqli_fetch_array($rs)){
                    echo "<div class='article'>
                        <input type='hidden' name='id' value='".$rec['id']."'/>
                        <h3>".$rec['title']."</h3><br/>"
                        .$rec['content']."<br/>
                        <img src='data:image/jpeg;base64,".$rec['picture']."' style='max-width:400px;'/><br/><br/>
                        Posted by <b>".$rec['author']."</b> ".$rec['date']."<br/>
                        <hr/>
                    </div>";
                    if(isset($_GET['user'])){
                        if($rec['author']== $_GET['user']){
                            echo "<form method='POST'>
                            <input type='hidden' name='id' value='".$rec['id']."'/><input type='submit' name='edit' value='edit' id='".$rec['id']."'/><input type='submit' name='delete' value='delete' id='".$rec['id']."'/></form>";
                        }
                    }
                }
            ?>
        </div>
        <div id="loginpanel">
            <form method="POST">
                Login: <input type="text" name="login"><br/>
                Hasło: <input type="password" name="pass"><br/>
                <input type="submit" value="Zaloguj się">
            </form>
            <hr/>
            <form method="POST">
                <input type="submit" name="new" value="Nowy"/>
            </form>
            <?php
                $conn=mysqli_connect("localhost","root","","rskrzypczak");
                if(!$conn) die('brak połączenia');
                $title='';
                $content='';
                $date='';
                $id='';
                if(isset($_POST['edit'])){
                    echo "<form method='POST'>
                        <input type='hidden' name='id' value='".$_POST['id']."'/><br/>
                        Tytuł: <input type='text' name='title' value='".($title)."'/><br/>
                        Treść: <input type='textbox' name='content' value='".($content)."'/><br/>
                        <input type='submit' name='save' value='Zapisz'/>
                    </form>";
                }
                if(isset($_POST['new'])){
                    echo "<form method='POST' enctype='multipart/form-data'>
                        Tytuł: <input type='text' name='title' value='".($title)."'/><br/>
                        Treść: <input type='textbox' name='content' value='".($content)."'/><br/>
                        Zdjęcie: <input type='file' name='image'/>
                        <input type='submit' name='addnew' value='Zapisz'/>
                    </form>";
                }
                if(isset($_POST['delete'])){
                    if($_POST['delete']=="delete"){
                        if(isset($_POST['id'])){
                            $sql="DELETE FROM posts WHERE id=".$_POST['id'];
                            $wynik=$conn->query($sql) or die("Rekord nie zostal usuniety");
                            header("Refresh:0");
                        }
                    }
                }
                if(isset($_POST['save'])){
                    if($_POST['save']=="Zapisz"){
                        if(isset($_POST['id'])){
                            $id = $_POST['id'];
                            $title = $_POST['title'];
                            $content = $_POST['content'];
                            $date = date("Y-m-d");
                            if(strlen($title)>0 &&strlen($content)>0){
                                $sql="UPDATE posts SET title='$title',content='$content',date='$date' WHERE id=".$id;
                                $wynik=$conn->query($sql) or die("Rekord nie zmieniony");
                                header("Refresh:0");
                            }
                            else{
                                echo "Tytuł i treść nie mogą być puste";
                            }
                        }
                    }
                }
                if(isset($_FILES['image'])&&isset($_POST['addnew']))
                {
                    if ($_FILES['image']['name'] != '' && $_POST['addnew']=="Zapisz")
                        if ($_FILES['image']['type'] == 'image/jpeg')
                        {
                            if(is_uploaded_file($_FILES['image']['tmp_name']))
                            {
                                $picture=base64_encode(file_get_contents($_FILES['image']['tmp_name']));
                                $title = $_POST['title'];
                                $content = $_POST['content'];
                                $date = date("Y-m-d");
                                $author = $_GET['user'];
                                if(strlen($title)>0 &&strlen($content)>0){
                                    $sql="INSERT INTO posts (title,content,date,author,picture) VALUES ('$title','$content','$date','$author','$picture');";
                                    $wynik=$conn->query($sql) or die("Rekord nie zmieniony");
                                    header("Refresh:0");
                                }
                                else{
                                    echo "Tytuł i treść nie mogą być puste";
                                }
                            }
                            else
                            {
                                echo 'problem: Możliwy atak podczas przesyłania pliku.';
                                echo 'Plik nie został zapisany.';
                            }
                        }
                        else
                        {
                            echo('Nie ma pliku');
                            echo($_FILES['image']['error']);
                        }
                    else
                    {
                        echo 'Wybierz plik.<br>';
                    }
                }
            ?>
        </div>
    </body>
</html> 