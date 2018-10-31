<?php
// Config
$sendto = 'trevorbwilson89@gmail.com';
$subject = 'New Quote Request';

if ( !empty( $_POST ) ) {
  // Whitelist
  $name = $_POST['name'];
  $from = $_POST['email'];
  $message = $_POST['message'];
  $honeypot = $_POST['url'];

  // Check honeypot
  if( !empty($honeypot) ) {
    echo json_encode(array('status'=>0, 'message'=>'There was an error with this message'));

    die();
  }

  // Check for empty values
  if ( empty( $name ) || empty( $from ) || empty( $message )) {
    echo json_encode(array('status'=>0, 'message'=>'A required field is missing'));

    die();
  }

  // Check for a valid Email
  $from = filter_var($from, FILTER_VALIDATE_EMAIL);

  if ( !$from ){
    echo json_encode(array('status'=>0, 'message'=>'Not a valid email'));

    die();
  }

  // Send the email
  $headers = sprintf('From: %s', $from) ."\r\n";
  $headers .= sprintf('Reply-To: %s', $from) ."\r\n";
  $headers .= sprintf('X-Mailer: PHP/%s', phpversion());

  if ( mail($sendto, $subject, $message, $headers)){
    echo json_encode(array('status'=>1, 'message'=>'Email sent successfully'))

    die();
  }

  echo json_encode(array('status'=>0, 'message'=>'Email not sent successfully. Please try again.'))
}

?>
