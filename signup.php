<?php
	require "db.php"; 
	$data=$_POST;
	if (isset($data['do_signup']))
	{
		$errors = array();
		if (trim($data['login'])=='')
		{
			$errors[]='Введите логин!';
		}
		if (trim($data['e-mail'])=='')
		{
			$errors[]='Введите e-mail!';
		}
		if ($data['password']=='')
		{
			$errors[]='Введите пароль!';
		}
		if ($data['password2']!=$data['password'])
		{
			$errors[]='Пароли не совпадают!';
		}
		if (R::count('users'," login= ?",array($data['login']))>0)
		{
			$errors[]='Пользователь с таким логином уже существует!';
		}
		if (R::count('users'," email= ?",array($data['e-mail']))>0)
		{
			$errors[]='Пользователь с таким e-mail уже существует!';
		}
		if (empty($errors))
		{
			$user = R::dispense('users');
			$user->login = $data['login'];
			$user->email = $data['e-mail'];
			$user->password =password_hash($data['password'], PASSWORD_DEFAULT) ;
			R::store($user);
			echo '<div style="color: green;">Вы успешно зарегистрированы! <br/>Теперь необходимо <a href="login.php"> войти </a> </div><hr>';
		} 
		else
		{

			echo '<div style="color: red;">'.array_shift($errors).'</div><hr>';
		}

	}
?>
<form action="signup.php" method="POST">
	<p>
		<p><strong>Ваш логин</strong>:</p>
		<input type="text" name="login" value="<?php echo @$data['login'];?>">
	</p>
	<p>
		<p><strong>Ваш e-mail</strong>:</p>
		<input type="e-mail" name="e-mail" value="<?php echo @$data['e-mail'];?>">
	</p>
	<p>
		<p><strong>Ваш пароль</strong>:</p>
		<input type="password" name="password" value="<?php echo @$data['password'];?>">
	</p>
	<p>
		<p><strong>Ваш пароль еще раз</strong>:</p>
		<input type="password" name="password2" value="<?php echo @$data['password2'];?>">
	</p>
	<p>
		<button type="submit" name="do_signup"> Зарегистрироваться</button>
	</p>
</form>