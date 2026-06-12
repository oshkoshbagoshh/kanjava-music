<!doctype html>
<html lang="en">
<head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bulma CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
</head>
<body>
<section class="hero is-bold is-primary">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">
                Title
            </h1>
            <h2 class="subtitle">
                Subtitle
            </h2>
        </div>
    </div>
</section>

<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <!-- Homepage url -->
        <a class="navbar-item" href="#">
            <!-- Brand logo -->
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarId">
            <span aria-hidden="true">navbarId</span>
            <span aria-hidden="true">Menu Item</span>
            <span aria-hidden="true">Menu Item</span>
        </a>
    </div>
    <div id="Menu Item" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item">
                Menu Item
            </a>
            <a class="navbar-item">
                Item
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    Item with menu
                </a>
                <div class="navbar-dropdown">
                    <a class="navbar-item">
                        Submenu item
                    </a>
                    <a class="navbar-item">
                        Submenu item
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item">
                        Submenu item with divider
                    </a>
                </div>
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Action</strong>
                    </a>
                    <a class="button is-light">
                        Action
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>
<!-- Optional JavaScript -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
</body>
</html>