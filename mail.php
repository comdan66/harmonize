<?php
  $name = 'oa';
  $email = 'comdan66@yahoo.com.tw';
  $message = 'asdasd';

  $from = $email;
  $to = 'comdan66@gmail.com';
  $subject = 'Contact form';

  $body = '';
  $body .= 'Name: ' . $name . "\n";
  $body .= 'Email: ' . $email . "\n";
  $body .= "Message: \n\n" . $message . "\n";

  mail ($to, $subject, $body, "From: <$from>");

  echo 'ok';