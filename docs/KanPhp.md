# KAN PHP


# Kantent CMS Framework

#php
#kantent


```php

<?php
/**********************************************************************************************
 *
 *                             KANTENT PHP - Minimal CMS Framework Prototype
 *
 *  This single file is a teaching tool for building a simple content management system.
 *
 *  Features in this file:
 *    1. Backend configuration & secure session initialization.
 *    2. A built-in "Golden Ticket" system.
 *       - Each session gets a random lottery number.
 *       - If that number equals the winning number, a special message is shown.
 *    3. Multiple content sections (Hero, About, Services, Contact, etc.) in one file.
 *    4. Clear inline comments to help you understand where to jump for each part.
 *
 **********************************************************************************************/

/* ------------------------------
   1. Configuration & Error Reporting
   ------------------------------ */
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', '');
define('DATABASE', 'april_fool_db');
define('APP_MODE', 'development'); // switch to 'production' wisely

// Enable error reporting in development
ini_set('display_errors', 1);
error_reporting(E_ALL);

/* ------------------------------
   2. Session Initialization & Security
   ------------------------------ */
// Set secure cookie parameters before session_start()
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => (APP_MODE !== 'development'), // In production, ensure HTTPS is used
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

// Store the session start time (if not already set)
if (!isset($_SESSION['start_time'])) {
    $_SESSION['start_time'] = time();
}

// Set some demo user data
$_SESSION['user_name'] = 'stew';
$_SESSION['logged_in'] = 1;
$_SESSION['Red_barrel'] = str_rot13($_SESSION['user_name']);

/* ------------------------------
   3. Lottery / Golden Ticket System Setup
   ------------------------------ */
// Assign a random lottery seed if not already assigned (1 in 100 chance)
if (!isset($_SESSION['USER_LOTTERY_SEED'])) {
    $_SESSION['USER_LOTTERY_SEED'] = random_int(1, 100);
}
// Assign a Golden Ticket lottery number (special number for discount)
// (Each session gets one random number between 1 and 100)
if (!isset($_SESSION['GOLDEN_TICKET_LOTTERY_NUMBER'])) {
    $_SESSION['GOLDEN_TICKET_LOTTERY_NUMBER'] = random_int(1, 100);
}

/* ------------------------------
   4. CSRF Token Handling
   ------------------------------ */
// Generate CSRF token if not set or expired (15 minutes)
if (!isset($_SESSION['token']) || !isset($_SESSION['token_expires']) || time() > $_SESSION['token_expires']) {
    $_SESSION['token'] = bin2hex(random_bytes(16));
    $_SESSION['token_expires'] = time() + 900; // Token expires in 15 minutes
}

/* ------------------------------
   5. Golden Ticket System Functionality
   ------------------------------ */
// Define the winning number – change this constant to control the chance
define('GOLDEN_TICKET_WIN', 42);

/**
 * checkGoldenTicket()
 * Checks if the current session's golden ticket number equals the winning number.
 *
 * @return string HTML message if winning; otherwise, returns an empty string.
 */
function checkGoldenTicket() {
    if (isset($_SESSION['GOLDEN_TICKET_LOTTERY_NUMBER']) && 
        $_SESSION['GOLDEN_TICKET_LOTTERY_NUMBER'] === GOLDEN_TICKET_WIN) {
        return "<div class='alert alert-success text-center'>Congratulations! You have won the Golden Ticket for a special discount!</div>";
    }
    return "";
}

/* ------------------------------
   6. Content Sections & Minimal CMS Structure
   ------------------------------ */
// From here on, the file is treated as a complete HTML document.
// It contains the header, navigation (with jump links to sections), hero section,
// and other sections such as About, Services, and Contact.
// Inline comments in each section explain their purpose.
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Kantent CMS - Minimal PHP CMS Framework</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- AOS CSS for animations -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css"/>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/custom.css">
    <link rel="icon" href="./assets/icons/favicon/favicon.ico">
    <!-- Inline styles for demonstration -->
    <style>
        body { padding-top: 70px; }
        .hero-section {
            background: url('https://picsum.photos/1920/1080') no-repeat center center;
            background-size: cover;
            height: 80vh;
            display: flex;
            align-items: center;
            color: white;
        }
    </style>
</head>
<body>

<!-- Display the Golden Ticket message (if the user wins) -->
<?php echo checkGoldenTicket(); ?>

<!-- TOP / HEADER Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">
            <img src="./assets/img/brand/logo.png" alt="Logo" height="30">
            Kantent CMS
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Jump links to different sections -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link active" href="#hero">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                <li class="nav-item">
                    <a class="btn btn-outline-light" href="#">
                        <i class="fa fa-github"></i> View Source
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- HERO SECTION -->
<section id="hero" class="hero-section" data-aos="fade-up" data-aos-duration="1000">
    <div class="container text-center">
        <h1 class="display-4">Welcome to Kantent CMS</h1>
        <p class="lead">A Minimal CMS Framework Developed by AJ Javadi. Jump directly to any section using the navigation above.</p>
    </div>
</section>

<!-- ABOUT SECTION -->
<section id="about" class="py-5" data-aos="fade-up">
    <div class="container">
        <h2>About Kantent CMS</h2>
        <p>This file demonstrates a very simplified approach to a CMS. It integrates session security, error reporting,
        and a fun "Golden Ticket" lottery system. Use the navigation to jump between sections and explore the code comments for details.</p>
    </div>
</section>

<!-- SERVICES SECTION -->
<section id="services" class="py-5 bg-light" data-aos="fade-up">
    <div class="container">
        <h2>Services &amp; Features</h2>
        <ul>
            <li>Secure backend initialization and configuration</li>
            <li>Session management and CSRF token handling</li>
            <li>Golden Ticket system offering a chance at special discounts</li>
            <li>Organized content sections within one file for easy reference</li>
            <li>Front-end design with Bootstrap (to be refactored to Tailwind CSS v3)</li>
        </ul>
    </div>
</section>

<!-- CONTACT SECTION -->
<section id="contact" class="py-5" data-aos="fade-up">
    <div class="container">
        <h2>Contact Us</h2>
        <p>Interested in learning more or getting in touch? Use the form below.</p>
        <form action="forms/contact.php" method="post" class="php-email-form">
            <div class="mb-3">
                <label for="name-field" class="form-label">Your Name</label>
                <input type="text" name="name" id="name-field" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="email-field" class="form-label">Your Email</label>
                <input type="email" name="email" id="email-field" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="subject-field" class="form-label">Subject</label>
                <input type="text" name="subject" id="subject-field" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="message-field" class="form-label">Message</label>
                <textarea name="message" id="message-field" rows="5" class="form-control" required></textarea>
            </div>
            <!-- Include CSRF token as a hidden field -->
            <input type="hidden" name="token" value="<?php echo $_SESSION['token']; ?>">
            <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
    </div>
</section>

<!-- FOOTER -->
<footer class="bg-dark text-white py-4">
    <div class="container text-center">
        <p>&copy; <?php echo date("Y"); ?> Kantent CMS. All Rights Reserved.</p>
        <p>Designed by AJ Javadi</p>
    </div>
</footer>

<!-- Vendor JS Files -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap

```

---
