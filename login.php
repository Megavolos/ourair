<?php
	require "db.php"; 
	function dump($what)
	{
		echo '<pre>';print_r($what);echo '</pre>';
	}
	$data=$_POST;
	if ( isset($data['do_login']))
	{
		$errors=array();
		$user = R::findOne('users','login = ?', array($data['login']));
		if ($user)
		{
			if (password_verify($data['password'],$user->password))
			{
				$_SESSION['logged_user']=$user;
				echo '<div style="color: green;">Вы авторизованы! <br/>Можете перейти на <a href="map.php"> главную </a> страницу!</div><hr>';
				setcookie("latitude",$_SESSION['logged_user']['latitude']);
				setcookie("longitude",$_SESSION['logged_user']['longitude']);
				setcookie("address",$_SESSION['logged_user']['address']);
				setcookie("userid",$_SESSION['logged_user']['id']);
				//dump($_SESSION);
				
			}else
			{
				$errors[]='Неверный пароль!';
			}
		}else
		{
			$errors[]='Пользователь с таким логином не найден!';
		}
		if (!empty($errors))
		{
			echo '<div style="color: red;">'.array_shift($errors).'</div><hr>';
		} 
	
	}
?>
<form action="login.php" method="POST">
	<p>
		<p><strong>Логин</strong>:</p>
		<input type="text" name="login" value="<?php echo @$data['login'];?>">
	</p>
	<p>
		<p><strong>Пароль</strong>:</p>
		<input type="password" name="password" value="<?php echo @$data['password'];?>">
	</p>
	<p>
		<button type="submit" name="do_login"> Войти</button>
	</p>