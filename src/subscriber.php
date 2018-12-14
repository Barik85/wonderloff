<?php
date_default_timezone_set('America/Los_Angeles');

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

include('mailchimp/MailChimp.php');

if (isset($_POST) && !empty($_POST)) {
    subscribe_email();
} else {
    echo 0;
    exit;
}

function subscribe_email() {
    $errors = [];

    if (empty($_POST["email"]) || ! preg_match("#^[a-zA-Z0-9_\.]+[a-zA-Z0-9\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$#is", $_POST["email"])) {
        $errors[] = "email";
    }

    if (count($errors) > 0) {
        exit(join(" ", $errors));
    } else {
        $list_id = "54f11ccc6f";
        $MailChimp = new MailChimp("c3c4b54359caf2a105e656276b5fec08-us19");
        $result = $MailChimp->post("lists/$list_id/members", [
            "email_address" => $_POST["email"],
            "status"        => "subscribed",
            "merge_fields" => array(
                "NAME"=> $_POST["name"],
                "PHONE"=> $_POST["phone"]
            )
        ]);

        $status = isset($result["status"]) ? $result["status"] : 500;
        echo ($status === "subscribed" || $status === 400) ? 1 : 0;
        exit;
    }
}
