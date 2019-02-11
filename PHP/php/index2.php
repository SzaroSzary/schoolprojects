<?php
    define('PI',3.1415);
    if (isset($_GET['a']) && isset($_GET['b'])) {
        $a=$_GET['a'];
        $b=$_GET['b'];
        echo("Pole prostokąta wynosi ".$a*$b." a jego obwód wynosi ".(2*$a)+(2*$b));
    }
?>