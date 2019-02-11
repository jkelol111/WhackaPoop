//Checking cookies happens here.
console.log("Checking if user has been here before...");
if (Cookies.get('whackapoop_whackCount') == null) {
  console.log("Not yet! Setting new cookie for click count...")
  Cookies.set('whackapoop_whackCount', 0, { expires: 365 });
  var whackCount = Cookies.get('whackapoop_whackCount');
  alert("Looks like you're new here! Make yourself at home by clicking on the whack. "+
  "The count increases as you whack more. Whack to the ultimate number and get ultimate self-satisfaction!\n\n"+
  "NOTE: the game only saves the count locally as a cookie. Going to another computer means you lose your progress!\n"+
  "Also, the local cookie will expire in 365 days. RIP your record if you were too busy with New Year Celebrations.\n\n"+
  "Also for those who watch ( ͡° ͜ʖ ͡°), don't clear your cookies, you'll regret ;)");
} else {
  var whackCount = Cookies.get('whackapoop_whackCount');
  console.log("User has been here before. Click count: "+whackCount);
}

console.log("Checking if user is sane or not...")
if (Cookies.get('whackapoop_agreeSanity') == null) {
  if (confirm("By playing whackapoop, you agree to donating your sanity. Agree?")) {
    console.log("Sane prompt agreed! Insanity is garunteed!");
    Cookies.set('whackapoop_agreeSanity', 1, { expires: 365 });
  } else {
    alert("Oh well, I guess you're not ready now. Click 'Ok' to get back to life.");
    close();
  }
} else {
  console.log("User is not sane already.")
  //Do nothing :) You're not sane already!
}

//whackapoop version here.
var WHACKAPOOP_VERSION = '0.1';

//Set toastr options here.
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-full-width",
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

//Settings pane logic here.
function settingsPaneOpen() {
  $(settingsButton).attr('disabled', 'disabled');
  var settings = QuickSettings.create(panelTitle='whackapoop Settings');
  if (Cookies.get('whackapoop_settings_cheatModeEnabled') == true) {
    settings.setValue('Cheat mode', true);
  } else if (Cookies.get('whackapoop_settings_cheatModeEnabled') == false) {
    settings.setValue('Cheat mode', false);
  }
  settings.addBoolean('Cheat mode', function(value){
    Cookies.set('whackapoop_settings_cheatModeEnabled', value);
    toastr["success"]('Reload settings pane', 'The settings pane needs to be reloaded for the settings to apply.');
  });
  settings.addButton('Reset settings & data', function(valve){
    if (confirm("This will clear all game cookies off your device. Do you want to proceed?")) {
      Cookies.remove('whackapoop_settings_cheatModeEnabled');
      Cookies.remove('whackapoop_agreeSanity');
      Cookies.remove('whackapoop_whackCount');
      reload();
    }
  })
  settings.addButton('Close', function(value){
    $(settingsButton).removeAttr('disabled');
    settings.destroy();
  });
}

$(document).ready(function(){
  $(settingsButton).click(settingsPaneOpen);
});