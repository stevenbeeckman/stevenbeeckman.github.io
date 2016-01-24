<?php

	// Mail settings
	$to = "web-master72@yandex.ru";
	$subject = "Leaff contact form";

	if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {

		$content  = "Name: "     . $_POST["name"]    . "\r\n";
		$content .= "Email: "    . $_POST["email"]   . "\r\n";
		$content .= "Message: "  . "\r\n" . $_POST["message"];

		if (mail($to, $subject, $content, $_POST["email"])) {

			$result = array(
				"message" => "Thanks for contacting us.",
				"sendstatus" => 1
			);

			echo json_encode($result);

		} else {

			$result = array(
				"message" => "Sorry, something is wrong.",
				"sendstatus" => 0
			);

			echo json_encode($result);

		}

	}

?>