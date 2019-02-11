<?php
$i = 0;
$last = 0;
while(($last+$i)<100)
{
	$last+=++$i;
}
echo "$i<br>";
?>