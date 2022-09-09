<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require_once('phpmailer/PHPMailerAutoload.php');

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
  


    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'nmastitsky@yandex.by';                 // Наш логин
    $mail->Password = 'nzddkqgiwbfdhcfm';                           // Наш пароль от ящика  nzddkqgiwbfdhcfm
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    // От кого письмо
    $mail-setFrom('nmastitsky@yandex.by', 'От меня');
    //Кому отправлять
    $mail->addAddres('xfacac@mailto.plus');
    //Тема письма
    $mail->Subject = 'Новое письмо';
    $mail->IsHTML(true);

    //Тело письма
    $body = '<h1>Новое письмо</h1>';

    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['message']))) {
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    //Отправляем

    if (!$mail->send()) {
        $message = 'Ошибка';
        return false;
    } else {
        $message = 'Данные отправлены!';
        return true;
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
    ?>