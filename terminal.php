<?php
// get and validate client ip address
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP);
}
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = filter_var($_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP);
}
else {
    $ip = filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP);
}

// if localhost
if ($ip == '::1') {
    $ip = 'localhost';
}

// log client ip for debug
echo '<script>console.log("'.$ip.'"); </script>';

?>
<!DOCTYPE html>
<html lang="en-gb">
<head>

<link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="style/terminal.css?v=<?php echo uniqid(); ?>"/>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

</head>
<body>

<div id="#terminal">

    <section class="console">
    
    </section>
    <section class="input">
        <label for="raw">&nbsp;&gt;</label>
        <input type="text" name="input" id="raw" value=""/>
    </section>

</div>

<script src="scripts/terminal.js?v=<?php echo uniqid(); ?>" id="terminal-script" ip="<?php echo $ip; ?>"></script>

</body>