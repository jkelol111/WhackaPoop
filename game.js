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
    localStorage.setItem('whackapoop_settings_cheatModeEnabled', false);
    localStorage.setItem('whackapoop_settings_cheat_autoClickerOn', false);
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
  //Settings pane logic here.
  function settingsPaneOpen() {
    document.getElementById('settingsButton').disabled = true;
    if (Boolean(localStorage.getItem('whackapoop_settings_cheatModeEnabled'))) {
      //Do nothing
    } else {
      var readSettingsLayout = JSON.parse(localStorage.getItem('whackapoop_settings_layout'));
      var newSettingsLayout = JSON.stringify({'Cheat mode':false});
      localStorage.setItem('whackapoop_settings_layout', newSettingsLayout);
    }
    var settings = QuickSettings.create(0, 0, 'Settings pane');
    if (Boolean(localStorage.getItem('whackapoop_settings_cheatModeEnabled'))) {
      //Do nothing
    } else {
      settings.hideControl('cheat_changeClickNumber');
      settings.hideControl('cheat_autoClickerOn');
    }
    settings.setDraggable(false);
    settings.addBoolean('Cheat mode', Boolean(localStorage.getItem('whackapoop_settings_cheatModeEnabled')), function(value) {
      localStorage.setItem('whackapoop_settings_cheatModeEnabled', Boolean(value));
      toastr.success('Please re-open the settings panel.', 'Settings change requires panel reload')
    });
    settings.addTextArea('cheat_changeClickNumber', localStorage.getItem('whackapoop_whackCount'), function(value) {
        localStorage.setItem('whackapoop_whackCount', value);
        toastr.success('Please check if click count is changed.', 'Settings changed successfully');
    });
    settings.addBoolean('cheat_autoClickerOn', Boolean(localStorage.getItem('whackapoop_settings_cheat_autoClickerOn')), function(value) {
        localStorage.setItem('whackapoop_settings_cheat_autoClickerOn', Boolean(value));
        if (localStorage.getItem('whackapoop_settings_cheat_autoClickerOn')) {
          startAutoclicker();
        } else {
          stopAutoclicker();
        }
        toastr.success('Please check if auto clicker is working.', 'Settings changed successfully');
    });
    settings.addButton('Reset data & settings', function(value) {
      if (confirm('This will clear all your progress and settings! Do you want to proceed?')) {
        localStorage.removeItem('whackapoop_settings_cheatModeEnabled');
        localStorage.removeItem('whackapoop_agreeSanity');
        localStorage.removeItem('whackapoop_whackCount');
        localStorage.removeItem('whackapoop_settings_layout');
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

  document.getElementById('settingsButton').addEventListener('click', settingsPaneOpen);
} catch (err) {
  toastr.error(err.message, "An error has occured!");
}
