<?php

$TO = "m.vrignaud@lecolededesign.com";
$name = $_REQUEST["requiredfullname"];
$email = $_REQUEST["requiredemail"];
$subject = $_REQUEST["requiredsubject"];
$message = $_REQUEST["requiredmessage"];

$h  = "From: " . $name . " <" . $email . ">" ;

function spamcheck($field) {
  //filter_var() sanitizes the e-mail
  //address using FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() validates the e-mail
  //address using FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
      return TRUE;
    }
  else
    {
      return FALSE;
    }
}

$mailcheck = spamcheck($email);

if ($mailcheck==FALSE)
{
  Header("Location: contact.html#failure");
}
else
{
  mail($TO, $subject, $message, $h);
  Header("Location: contact.html#thanks");
}
?>