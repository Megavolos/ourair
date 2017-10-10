<?php

require "db.php";
$data = $_POST;

function dump($what)
{
    echo '<pre>';
    print_r($what);
    echo '</pre>';
}
//echo '<pre>'.print_r(  $_POST ,true).'</pre>';
//$id= $_SESSION['logged_user']->id ;

// if (isset( $_POST['sendingAddress']))
// {
//     $user->address = $_POST['address'];
//     $user->coords =  $_POST['coords'];
//     R::store($user);
//}

// if (isset( $_POST['sendingAllaData']))
// {
//     $air=R::dispense('airdata');
//     $air->date = $_POST['date'];
//     $air->time1 = $_POST['time1'];
//     $air->time1 = $_POST['time2'];

//     $air->address = $_POST['address'];
//     $air->coords =  $_POST['coords'];
//     $air->stinkvalue = $_POST['stinkvalue'];
//     $air->comment = $_POST['comment'];
//     $air->userid = $id;

//     R::store($air);
// }
$json = json_decode(file_get_contents('php://input'), true);
//dump($json['']);
if ($json['cmd'] == 3) {
    $user = R::load('users', $json['userid']);
    $user->address = $json['addr'];
    $user->latitude = $json['coords'][0];
    $user->longitude = $json['coords'][1];
    R::store($user);
    dump($user);
    $_SESSION['logged_user']['address'] = $json['addr'];
    $_SESSION['logged_user']['latitude'] = $json['coords'][0];
    $_SESSION['logged_user']['longitude'] = $json['coords'][1];
    setcookie("latitude", $_SESSION['logged_user']['latitude']);
    setcookie("longitude", $_SESSION['logged_user']['longitude']);
    setcookie("address", $_SESSION['logged_user']['address']);

}
if ($json['cmd'] == 1) {
    dump($json);
    $air = R::dispense('airdata');
    $air->date1 = $json['date1'];
    $air->date2 = $json['date2'];
    $air->address = $json['addr'];
    $air->latitude = $json['coords'][0];
    $air->longitude = $json['coords'][1];
    $air->stinkvalue = $json['stinkvalue'];
    $air->comment = $json['comment'];
    $air->userid = $json['userid'];
    $air->setupdate = $json['setupdate'];
    $air->setuptime = $json['setuptime'];
    R::store($air);
}
if ($json['cmd'] == 2) {
    $fromdate = $json['showdate1'];
    $todate = $json['showdate2'];
    $exparr = array();
    $export = new \stdClass();
    $exportarr = array();
    // dump($date1 . " " . $json['showtime1']);
    // dump($date2 . " " . $json['showtime2']);
    $air = R::load('airdata', $json['userid']);

    //dump($json);

    $exparr = R::getAll('select * FROM airdata WHERE (date1 BETWEEN :fromdate AND :todate) OR (date2 BETWEEN :fromdate AND :todate)', [':fromdate' => $fromdate, ':todate' => $todate]);

    //dump($dateinbaselow . ' ' . $datelow);

    //dump(($airdata['date1'] . " " . $airdata['time1'] . "|" . $json['showdate1'] . " " . $json['time1'] . "###" . $airdata['date2'] . " " . $airdata['time2'] . " " . $date2 . " " . $json['time2']));

    // if ($k >= $x) {
    //     dump($k . " # " . $x . " = " . "k>=x" . "<br>" . $date1 . " " . $json['showtime1'] . "()" . $airdata['date1'] . " " . $airdata['time1']);

    // }

    // if ($k >= $y) {
    //     dump($k . " # " . $y . " = " . "k>=y" . "<br>" . $date1 . " " . $json['showtime1'] . "()" . $airdata['date2'] . " " . $airdata['time2']);
    // }

    // if ($l >= $x) {
    //     dump($l . " # " . $x . " = " . "l>=x" . "<br>" . $date2 . " " . $json['showtime2'] . "()" . $airdata['date1'] . " " . $airdata['time1']);
    // }

    // if ($l >= $y) {
    //     dump($l . " # " . $y . " = " . "l>=y" . "<br>" . $date2 . " " . $json['showtime2'] . "()" . $airdata['date2'] . " " . $airdata['time2']);
    // }
    // dump("-------------------------------------");

    // $exparr[] = array('date1' => $airdata['date1'], 'date2' => $airdata['date2'], 'time1' => $airdata['time1'], 'time2' => $airdata['time2'], 'addr' => $airdata['address'], 'stinkvalue' => $airdata['stinkvalue'], 'latitude' => $airdata['latitude'], 'longitude' => $airdata['longitude'], 'comment' => $airdata['comment']);

    echo json_encode($exparr, JSON_PRETTY_PRINT);
}

; //echo '<pre>'.print_r($user,true).'</pre>';
