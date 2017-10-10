<?php
require "db.php";
?>
<?php
function dump($what)
{
    echo '<pre>';
    print_r($what);
    echo '</pre>';
}
if (isset($_SESSION['logged_user'])):
    setcookie("latitude", $_SESSION['logged_user']['latitude']);
    setcookie("longitude", $_SESSION['logged_user']['longitude']);
    setcookie("address", $_SESSION['logged_user']['address']);
    setcookie("userid", $_SESSION['logged_user']['id']);
    header('Location: map.php');

else: ?>
Вы не авторизованы!<br>
<a href="login.php"> Войти </a><br>
<a href="signup.php"> Зарегистрироваться </a><br>
<?php endif;?>