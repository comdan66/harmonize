<?php
/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

  $email = $_POST['email'];
  $name = $_POST['name'];
  $message = $_POST['comment'];

  $from = $email;
  $to = 'hd@harmonizedesign.com';
  $subject = 'Contact form';

  $body = '';
  $body .= 'Name: ' . $name . "\n";
  $body .= 'Email: ' . $email . "\n";
  $body .= "Message: \n\n" . $message . "\n";

  mail ($to, $subject, $body, "From: <$from>");

echo 'OK';