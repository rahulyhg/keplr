<!DOCTYPE html>
<html lang="en">
<head>
  
  <title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>
  <meta charset="utf-8" />
  <meta name="description" content="<?php echo html($site->description()) ?>" />
  <meta name="keywords" content="<?php echo html($site->keywords()) ?>" />
  <meta name="robots" content="index, follow" />

  <?php echo css('assets/styles/styles.css') ?>
  
  <style>
        body {
          font-family: sans-serif;
          font-size: 14px;
        }
        #map_canvas {
          height: 400px;
          width: 600px;
          margin-top: 0.6em;
        }
        input {
          border: 1px solid  rgba(0, 0, 0, 0.5);
        }
        input.notfound {
          border: 2px solid  rgba(255, 0, 0, 0.4);
        }
  </style>
  
  <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeEfSiOnA5tVJgUrf_IUSpB1LGmADooew&sensor=false&libraries=places">
  </script>
 
  
</head>

<body>

  <header>
    <h1><a href="<?php echo url() ?>"><img src="<?php echo url('assets/images/logo.png') ?>" width="115" height="41" alt="<?php echo html($site->title()) ?>" /></a></h1>
  </header>