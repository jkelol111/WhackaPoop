//Checking cookies happens here.
try {
  //whackapoop version here.
  var WHACKAPOOP_VERSION = '0.1';

  //Set toastr options here.
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "slideDown",
    "hideMethod": "slideUp"
  }

  if (localStorage.getItem('whackapoop_whackCount') == null) {
    localStorage.setItem('whackapoop_whackCount', 0);
    var whackCount = localStorage.getItem('whackapoop_whackCount');
    alert("Looks like you're new here! Make yourself at home by clicking on the whack. "+
    "The count increases as you whack more. Whack to the ultimate number and get ultimate self-satisfaction!\n\n"+
    "Made by jkelol111 (Nam).");
  } else {
    var whackCount = localStorage.getItem('whackapoop_whackCount');
  }

  //Load count value into label
  document.getElementById('countLabel').innerHTML = whackCount;

  if (localStorage.getItem('whackapoop_agreeSanity') == null) {
    if (confirm("By playing whackapoop, you agree to donating your sanity. Agree?")) {
      localStorage.setItem('whackapoop_agreeSanity', true);
    } else {
      alert("Oh well, I guess you're not ready now. Click 'Ok' to get back to life.");
      close();
    }
  } else {
    //Do nothing :) You're not sane already!
  }

  //Autoclicker cheat (execute in JS console)!
  function autoClicker(toggle, clickPerSec) {
    if (localStorage.getItem('whackapoop_settings_cheatModeEnabled') == 'true') {
      if (toggle) {
        toastr.success('autoClicker interval/sec: '+clickPerSec, 'autoClicker on!');
      } else {
        toastr.success('autoClicker off!');
      }
    } else {
      toastr.error('Cheat mode is off! This command cannot be executed.', 'autoClicker failed execution!');
      throw 'Cheat mode is off! This command cannot be executed.';
    }
  }

  //Change count cheat (execute in JS console)!
  function customCount(count) {
    if (localStorage.getItem('whackapoop_settings_cheatModeEnabled') == 'true') {
      localStorage.setItem('whackapoop_whackCount', count);
      document.getElementById('countLabel').innerHTML = count;
      toastr.success('Set whackCount to: '+count, 'customCount executed!');
    } else {
      toastr.error('Cheat mode is off! This command cannot be executed.', 'customCount failed execution!');
      throw 'Cheat mode is off! This command cannot be executed.';
    }
  }


  //Settings pane logic here.
  function settingsPaneOpen() {
    document.getElementById('settingsButton').disabled = true;
    var settings = QuickSettings.create(0, 0, 'Settings pane');
    settings.setDraggable(false);

    settings.addBoolean('Debug mode', Boolean(localStorage.getItem('whackapoop_settings_debugModeEnabled')), function(value) {
      localStorage.setItem('whackapoop_settings_debugModeEnabled', value);
    })

    settings.addBoolean('Cheat mode', Boolean(localStorage.getItem('whackapoop_settings_cheatModeEnabled')), function(value) {
      localStorage.setItem('whackapoop_settings_cheatModeEnabled', value);
    });
    
    settings.addButton('Reset data & settings', function(value) {
      if (confirm('This will clear all your progress and settings! Do you want to proceed?')) {
        localStorage.clear();
        window.location.reload(true);
      } else {
        //Do nothing.
      }
    });
    settings.addButton('Close', function(value) {
      document.getElementById('settingsButton').disabled = false;
      document.getElementById('null').remove();
      settings.destroy();
    });
    settings.saveInLocalStorage('whackapoop_settings_layout');
  }

  //Share pane logic here
  function sharePaneOpen() {
    document.getElementById('shareButton').disabled = true;
    var sharePane = QuickSettings.create(0, 0, 'Share whackapoop');
    sharePane.setDraggable(false);
    sharePane.addButton('Share to Twitter...', function(value) {
      window.open('https://twitter.com/intent/tweet?text=jkelol111.github.io/whackapoop');
      document.getElementById('shareButton').disabled = false;
      sharePane.destroy();
    });
    sharePane.addButton('Share to Facebook...', function(value) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=jkelol111.github.io/whackapoop');
      document.getElementById('shareButton').disabled = false;
      sharePane.destroy();
    });
    sharePane.addButton('Share to Reddit...', function(value) {
      window.open('http://www.reddit.com/submit?url=jkelol111.github.io/whackapoop');
      document.getElementById('shareButton').disabled = false;
      sharePane.destroy();
    });
    sharePane.addButton('Close', function(value) {
      document.getElementById('shareButton').disabled = false;
      sharePane.destroy();
    });
  }

  //Real magic happens here!
  function whackClickHandler() {
    document.getElementById('whackImage').src = 'res/whackf2.png';
    localStorage.setItem('whackapoop_whackCount', parseInt(localStorage.getItem('whackapoop_whackCount'))+1);
    document.getElementById('countLabel').innerHTML = localStorage.getItem('whackapoop_whackCount');
    setTimeout(function() {
      document.getElementById('whackImage').src = 'res/whackf1.png';
    }, 500);
  }

  // //Unclick handler for poop
  // function whackUnClickHandler() {
  //   document.getElementById('whackImage').src = 'res/whackf1.png';
  // }

  document.getElementById('settingsButton').addEventListener('click', settingsPaneOpen);
  document.getElementById('shareButton').addEventListener('click', sharePaneOpen);
  document.getElementById('whackImage').addEventListener('click', whackClickHandler);
  //document.getElementById('whackImage').addEventListener('onmouseup', whackUnClickHandler);
} catch (err) {
  toastr.error(err.message, "An error has occured!");
}
