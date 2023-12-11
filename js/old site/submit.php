<?php
session_start();

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate the CAPTCHA code
    if (isset($_POST['verification']) && isset($_SESSION['captcha'])) {
        $user_captcha = $_POST['verification'];
        $expected_captcha = $_SESSION['captcha'];

        if ($user_captcha !== $expected_captcha) {
            // CAPTCHA code doesn't match, display an error message
            die('Invalid CAPTCHA code. Please try again.');
        }
    } else {
        // CAPTCHA code not provided, display an error message
        die('CAPTCHA code missing. Please enter the code.');
    }

    // Process other form fields
    $name = $_POST['name'];
    $contact_info = $_POST['contact_info'];
    $message = $_POST['message'];

    // Example: Save the form data to a file (you can modify this to suit your needs)
    $data = "Name: $name\nContact Info: $contact_info\nMessage: $message\n";

    // Save the form data to a text file (you can customize the file path and name)
    $file_path = "form_submissions.txt";
    file_put_contents($file_path, $data, FILE_APPEND | LOCK_EX);

    // Clear the CAPTCHA value from the session after successful submission
    unset($_SESSION['captcha']);

    // Redirect the user back to the contact page or a thank-you page
    header('Location: contact_thankyou.html');
    exit();
}
?>