/*
 * Requirements and globals
 */
const locale = require('locale');
var alarm = -1;
var hrmValue = "-";

var backgroundImage = {
  width : 176, height : 151, bpp : 3,
  transparent : 2,
  buffer : require("heatshrink").decompress(atob("jlx44CdEQMHnnz54Ca/+OnHjAThlC8+evICaQf4CBQDqD/Qf6DruAlCAHJlC8BA8gCDDIPqD/Qf6D/QZEUQf6D/QYUEG2VwQf8D/yD/j//4CD+IIP4Qf6D/gH/Qf8HIIP/QfpBDGpCDzGQJBCj/x4CD4gY/CAAPj//4QZDCw+DFD/kBAQKD2n44Bn5BDJQWAQeh6BAQRBEgEf+CD0h7+CQYaACgf+Qel/4CDFYQYLCQeJ3DIJCPDQeNwII/wBASD0HAUPIJCDzj44DIJH/QeUffwZBE/yD6v5BE//AQesDIISD/QYvHj6D4PQRBCAoJBDh6DzgF+IIiJBIId/AQKDxGoZBCwCMB/6ABIIiDwF4RBB/hKEjlwCAaDwgP/8aCBGQcP/DLCQecB4/8QYJKFRIaDyAAKCB/AGDh6JEQeQABj//48cgEHHAKJEAGkD/0/QwIABAoJB4j/wQASGDIPQHFg/gIO59BIIyD4AH4A/AH4A/AH4A/AH4A/AEMcuPHAQoLLARvADQUYsOGASgZBkv/AA39EwUbtu27YCSwAaC6dNmgCUgEBNZImCj158+eASSDDjVp02aAScAh6CHQfDvKQesTQRCD3QBCD4QRKD/Qf6D/Qf6D/Qf6D/Qf6D/Qf6DNxkgwUIAQYmCiZoVDIUAyaDaD4YA5QQXgIPr+FQfxB+Qf6DD/qD/Qf4A/AH4A/AH4A/AH4A/AB0cuPHIP3z588Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6D/Qf6DbwCD/Qf6DC8CD/48cQf88+fNmnTpoCLkAXCi/fvv3ASgvCARk4QYYCP4CbGAUpQNAQqDE/4Am/qD/Qf6D/Qf6D/Qf6D/ARoA="))
}

var iconPlanet = {
  width : 50, height : 50, bpp : 3,
  transparent : 5,
  buffer : require("heatshrink").decompress(atob("23btoCD6PHjlx9oLGAQuGiVJkmSpIRK2lxEYQCDCJOGjEhEYNBwUI5drEw/xEYwCB8oRGDoMhwmSsAFBkGM237NZICGj15OgnaDoOGI4cgwUa5dv332EwdHEZACB8+evYRCtAdBEAQpDscs3379+9HAW8EZPHz158+WSQQjFwUYsMs2QjBEwPrSRZuCJQN5TAJuCEYkhwUS5cvJQRxCNxZKDOIXgJQkh0mYtMk2XLJQXv1u0EZSVDOIWsJQsSpMkyVJljgB9gmB7YjLOgtq4BKEsIjCAQNLlgCBt+9EZwCCj8sJQpxB00aJoYCB5cBEZ4CB+RKFJoeGjAjCoOGzBKaAQeGJQQFBwJKSsAjIcweSBwRKRjojKOgYFCxZKRtAaBjHrlm4FJUN3hKQi3ShAjB2XLAQQmI7dHJR97tsh9gjEAQLpHlu2+PnExvF23an3794mF2BKFm3btsevImMjwRB23v3wmB3xNF5BuDCIPb8+eEwOeExIRCtojCJo5uEEwRxBEwRuJHAdI+YmCTYlgJQIREtrjCEwLdHCIiYBhF7OgnJSQgmFjhxCOgiSDAQvSX4QmB90IkQRIX4gmCEZICDvwmCBY3QA"))
}

var iconGps = {
  width : 50, height : 50, bpp : 3,
  transparent : 2,
  buffer : require("heatshrink").decompress(atob("pMkyQCFpH0BAwCJv/6CJ8l589CJ0kyf//wIDpVEChM8+/fBAdZ8QRIp++///0gIBlMkxI4IuZKB+/SKAPHzpKJ/YkB//pKAP2BYeXhIFDx88+fPvqYBnibEkmUAofv34lC/RQBBYdcmPCXIYjBEwPfvnzJoILBQoUlHAUuJQYmCDodw48cuBKGTA0WEYIEBJQ6YEQwMMuImBJQyYEkmZFAVkyVSJQ6YCyUcmPDjgmBTAJKETAlJiS4ETANPJQpxCJQtxTALgBEwnfvohBI4NZkmWpNlcAgAD/wzBEYaYCy8cJQiYEyIjCTAWS3wlGTAVIEwkerJKFTAkmOIclToK8GAAIPBIgImCufHyxxG59pEIS8DvfypMr968HEwOHEwfx8+cEYkpCIeSoiYByVf/uSkmTEQP7ZIiYDnl5AQNwBYgCGyOn38k2+2pIRKyVeuPPj1x4ccCJVKSgP/5cJA4NSExMps+cSoMMKAIVCCg7SBpd7TANZkmUHBMevPnjlwcwXCCJFEzYDBA4WWKIIRHpEw4+eNwUxEwKYIkVJk1IyIKFHA+DR4VcJQYCBJRBoCkxHBAgNkyyYKkmXEYaYMAQMSEYKYNAQOHEwnSfBYjBAgVaCJdJJSMkTAK8KYQyVKAQ4jBNxiYEcBCYJXIkgA="))
}

var iconCompass = {
  width : 50, height : 50, bpp : 3,
  transparent : 2,
  buffer : require("heatshrink").decompress(atob("pMkyQCDl//AAPSBYwCFv4RCAAOkCJNLCAgACCJm2rNn34FB+g1Jvny5cs2XPn///QRI9uWEYP2rNly5NHNYN82YjB/4mC5YmBOgkl//9y1bsuW/4CB/Nlz//9I4D3/8I4M8EAICB55NCL4g/BIgRKBAQtnL4lf+QdCI4YCD2Y4DSQPZtojHsuerI4Dv/flnzEZB3CHAJuB8ojIAQY4CNwJHI2XHTAY4B/4gJrGBAoSqBpf2EZMQmRxEv/5Nw9YyVCAoO+rf/0v/Nw/PjFB4ZxCn/+y7dBJQyNBkAIDz/6/7dBJQsYsMEhgsE//+7IjFsTYBwAIE/4ABEYs8uPEiFyF4gRBXIImEBAPSpAjDtuX//9+YmERgMcuODBAU9+xKCr68Ev4lBNwm//IJCnhxDDQPx4xuFJQhBDDQXwTwpKBSos8//HjlwYQyVG34aB2zCG//1Nw6SFAQTgD/JuD+wjFrbgCr/yMQI+B/lxEY08UgPpl4jCNwP+I4wCBUgOk3/8DoXxI44CBn/0yREDzx0EAQlndANJv4gJAQf3/VJkq8CJoZuGXIPpkg4BOIZuI5/9CII4BEZAmDNwIRBHAJxDNxH+CII4CSQW+NALgBtomBt5uCHAbjB2ZoCAQPyJQP/NwIRCkm//4gBIgP/SQn/CImSYALjDviSDQAYUDL4ImEEYYRGL4X/76PCI4P/SQYCFl4MBAAgRJEwYRPOgZrHpMgA"))
}

var iconAlarm = {
  width : 50, height : 50, bpp : 3,
  transparent : 1,
  buffer : require("heatshrink").decompress(atob("kmSpICEp//BAwCJn/+CJ8k//5CKAABCJs8uPH//x48EI5YjCAARNKEYUcv//jgFBExEnEYoAC+QmHIgIgC/gpCuPBCI2fIgU4AQXjA4P8CIuTEYZKBAolwHApXBEAWP//jxwpBAALaFDoYCIiQmDDIP4EAT+CEwnJEwYjLAQLaFEYomDKALmDNwoCIOIZuD8AkFgCYDHAQjMAQTdDNwOAEg0Dx0/cYeREZtxQYOTHgJuHOIvkXJy8DNwIACJQ8Ah4NDAAfxEZARHOIIkHg4jQAQb1CQ4KVJgEOnDIBSoIjNAQPBcAaVJcAKVBcDGOcD7OBMQM48BuH8f//JKCnhKNggRBkmfTQJxBEwhuD/gRCyVHJRlyCIVJXgYmB8ZQBAoIKBXIQmCOIt/NxAUCOIImCIgIpCBAJuDAQZEE/huIAQWTDgImBTYQGC8gRFcYpKFCI8kDwQAFCJBfBEAX/+IjBiQRIEw4jJAQc8v//NYwCIOgJrIJpA1OcwbaFAQWQA="))
}

Graphics.prototype.setFontAntonioMedium = function(scale) {
  // Actual height 18 (17 - 0)
  g.setFontCustom(atob("AAAAAAAAAAAAAAAf4Mf/sYAMAAAAAAfgAfAAAAAfgAeAAAAAAiAAj8H/4fyEAv8f/gfiAAgAAAAD54H98eOPHn8Hz8AhwAAAP8Af+AYGAYCAf+AP8MAB8AHwA+AD4AfAAcf4A/8AwMAwMA/8Af4AAAAAwGD8f/8f8MY/cfz4PD8AHMAAAfAAeAAAAAAAAP/+f//YADAAAQABYADf//P/+AAAAAANAAPAAfwAfgAPAANAAAAAAEAAEAA/AA/AAEAAEAAAAAAZAAfAAYAAAAIAAIAAIAAIAAAAAAAAAMAAMAAAAAAAAEAB8Af4H+AfwAcAAAAAP/4f/8YAMf/8f/8H/wAAAAAAEAAMAAf/8f/8f/8AAAAAAAAAHgcfh8cH8YPMf8MPwEAAAAAAOB4eB8YYMY4Mf/8Pn4AAAAAgAHwA/wPwwf/8f/8AAwAAgAAAf54f58ZwMZwMY/8Qf4AAAAAAP/4f/8YYMYYMff8HP4AAAQAAYAAYD8Y/8f/AfgAcAAAAAAAAPv4f/8YYMY8Mf/8Pn4AAAAAAP94f98YGMcMMf/8H/wAAAAAABgwBgwAAAAAABgABg/Bg8AAAAEAAOAAbAA7gAxgBwwASAAbAAbAAbAAbAASAAAAAxwA5gAbAAPAAOAAAAPAAfHcYPcf8Af4AHgAAAAAAAB/gH/wOA4Y/MZ/sbAsbBkb/MZ/sOBsH/AAAAAAMAP8f/4fwwf4wH/8AH8AAMAAAf/8f/8YYMYYMf/8P/4ADgAAAP/4f/8YAMYAMfj8Pj4AAAAAAf/8f/8YAMYAMf/8P/4B/AAAAf/8f/8YMMYMMYIMAAAAAAf/8f/8YYAYYAYYAAAAAAAP/4f/8YAMYIMfP8Pv8AAAAAAf/8f/8AMAAMAf/8f/8f/8AAAAAAf/8f/8AAAAAAAD4AB8AAMf/8f/4f/gAAAAAAf/8f/8A+AD/gfj4eA8QAEAAAf/8f/8AAMAAMAAMAAAf/8f/8f8AB/wAB8AP8P/Af/8f/8AAAAAAf/8f/8HwAA+AAPwf/8f/8AAAAAAP/4f/8YAMYAMf/8P/4AAAAAAf/8f/8YGAYGAf8AP8ABAAAAAf/w//4wAYwAc//+f/yAAAAAAf/8f/8YMAYMAf/8f/8DA8CAAPj4fz8Y4MeeMfP8HD4YAAYAAf/8f/8YAAQAAAAAf/4f/8AAMAAMf/8f/4AAAYAAf4AP/4AP8AP8f/4fwAQAAYAAf8AP/8AD8D/8f8Af8AD/8AD8f/8f8AAAAQAEeB8P/4B/AP/4fA8QAEYAAfAAP4AB/8H/8fwAcAAAAMYD8Y/8f/MfwMcAMAAAf/+f//YADYADAAAAAAfAAf8AB/wAH8AAMQACYADf//f//AAAAA"), 32, atob("BAUHCAcTCAQFBQgGBAYFBggICAgICAgICAgEBQYGBggNCAgICAcHCAkECAgGCwkICAgIBwYICAwHBwYGBgY="), 18+(scale<<8)+(1<<16));
}

Graphics.prototype.setFontAntonioLarge = function(scale) {
  // Actual height 34 (34 - 1)
  g.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAADwAAAAAeAAAAADwAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAD+AAAAH/wAAAP/+AAAf/+AAA//8AAB//4AAD//wAAD//gAAAf/AAAAD+AAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAB////gA/////AP////8D/////wfAAAA+DwAAADweAAAAeDwAAADwf////+D/////wP////8Af///+AAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAOAAAAADwAAAAAeAAAAAHgAAAAB/////wf////+D/////wf////+D/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAPwH/4AP+B//AH/wf/4D/+D4AB/9weAAf4ODwAP8BweAP/AOD///gBwP//wAOA//4ABwB/4AAOAAAAAAAAAAAAAAAAAAAAB8AA/gA/gAH/AP8AA/8D/gAH/wfAHAA+DwA4ADweAHgAeDwB8ADwf7/+H+D/////gP/9//8A//H/+AA/AH/AAAAAAAAAAAAAAAAAABwAAAAD+AAAAD/wAAAH/+AAAH/5wAAH/wOAAP/gBwAP/gAOAD/////wf////+D/////wf////+AAAABwAAAAAOAAAAABwAAAAAAAAAAAAAAAAAAeAD//4D/Af//Af8D//4D/wf//Af+DwPAADweB4AAeDwPAADweB///+DwP///weA///8DwD//+AAAA/8AAAAAAAAAAAAAAAAAAAAAA////AA/////AP////8D/////wfgPAB+DwB4ADweAOAAeDwBwADwf+PAA+D/x///wP+H//8A/wf//AAAA//gAAAAAAAAAAAAADgAAAAAeAAAAADwAAAAAeAAAD+DwAAP/weAA//+DwA///weB///8Dx//8AAf//wAAD//gAAAf/AAAAD/AAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAD/wf/wB//v//AP////8D/////weAPwAeDwA8ADwcAHAAeDwB8ADwf////+D/////wP/9//8A//H//AA/AD/AAAAAAAAAAAAAAAAAAAAAD//gfAA///D/AP//8f8D///j/weAA8A+DwADgDweAAcAeDwAHgDwf////+B/////gP////8Af///+AAP//4AAAAAAAAAAAAAAAAAAAAAAD4AfAAAfAD4AAD4AfAAAfAD4AAD4AfAAAAAAAAAAAAAA=="), 46, atob("Cg4QEBAQEBAQEBAQCQ=="), 39+(scale<<8)+(1<<16));
}

/*
 * Draw watch face
 */
var drawTimeout;
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw(true);
  }, 60000 - (Date.now() % 60000));
}


function draw(queue){
  g.reset();
  g.clearRect(0, 24, g.getWidth(), g.getHeight());

  // Draw background image
  g.drawImage(backgroundImage, 0, 24);

  // Draw raster
  // g.drawLine(112, 100, 112, 165);
  for(var x=1; x<7; x++){
    g.drawLine(110+x*10, 100, 110+x*10, 160);
  }

  for(var y=0; y<6; y++){
    g.drawLine(113, 105+y*10, 180, 105+y*10);
  }

  // Draw symbol
  var iconImg =
    alarm >= 0 ? iconAlarm :
    Bangle.isGPSOn() ? iconGps :
    Bangle.isCompassOn() ? iconCompass :
    iconPlanet;
  g.drawImage(iconImg, 120, 107);

  // Alarm within symbol
  g.setFontAntonioMedium();
  if(alarm > 0){
    g.setFontAlign(0,0,0);
    g.drawString(alarm, 120+25, 107+25);
    g.setFontAlign(-1,-1,0);
  }

  // Write time
  var currentDate = new Date();
  var timeStr = locale.time(currentDate,1);
  g.setFontAlign(0,0,0);
  g.setFontAntonioLarge();
  g.drawString(timeStr, 55, 57);

  // Write date
  g.setFontAlign(-1,-1, 0);
  g.setFontAntonioMedium();

  var dayName = locale.dow(currentDate, true).toUpperCase();
  var day = currentDate.getDate();
  g.drawString(day, 100, 37);
  g.drawString(dayName, 100, 57);

  // Temperature
  g.setFontAlign(-1,-1,0);
  g.drawString("HRM:", 20, 104);
  g.drawString(hrmValue, 60, 104);

  // Draw steps
  var steps = getSteps();
  g.drawString("STEP:", 20, 124);
  g.drawString(steps, 60, 124);

  // Draw battery
  var bat = E.getBattery();
  var charging = Bangle.isCharging() ? "*" : "";
  g.drawString("BAT:", 20, 144);
  g.drawString(charging + bat+ "%", 60, 144);

  // Queue draw in one minute
  if(queue){
    queueDraw();
  }
}

/*
 * Step counter via widget
 */
function getSteps() {
  if (stepsWidget() !== undefined)
    return stepsWidget().getSteps();
  return "???";
}

function stepsWidget() {
  if (WIDGETS.activepedom !== undefined) {
    return WIDGETS.activepedom;
  } else if (WIDGETS.wpedom !== undefined) {
    return WIDGETS.wpedom;
  }
  return undefined;
}

/*
 * HRM
 */
Bangle.on('HRM',function(hrm) {
  hrmValue = hrm.bpm;
});

/*
 * Handle alarm
 */
var alarmTimeout;
function queueAlarm() {
  if (alarmTimeout) clearTimeout(alarmTimeout);
  alarmTimeout = setTimeout(function() {
    alarmTimeout = undefined;
    handleAlarm();
  }, 60000 - (Date.now() % 60000));
}

function handleAlarm(){

    // Check each minute
    if(alarm > 0){
      alarm--;
      queueAlarm();
    }

    // After n minutes, inform the user
    if(alarm == 0){
      alarm = -1;

      var t = 300;
      Bangle.buzz(t, 1)
      .then(() => new Promise(resolve => setTimeout(resolve, t)))
      .then(() => Bangle.buzz(t, 1))
      .then(() => new Promise(resolve => setTimeout(resolve, t)))
      .then(() => Bangle.buzz(t, 1))
      .then(() => new Promise(resolve => setTimeout(resolve, t)))
      .then(() => Bangle.buzz(t, 1));
    }

    // Update UI
    draw(false);
}


/*
 * Swipe to set an alarm
 */
Bangle.on('swipe',function(dir) {
  // Increase alarm
  if(dir == -1){
    alarm = alarm < 0 ? 0 : alarm;
    alarm += 5;
    queueAlarm();
  }

  // Decrease alarm
  if(dir == +1){
    alarm -= 5;
    alarm = alarm <= 0 ? -1 : alarm;
  }

  // Update UI
  draw(false);
});


/*
 * Stop updates when LCD is off, restart when on
 */
Bangle.on('lcdPower',on=>{
  if (on) {
    draw(true); // draw immediately, queue redraw
  } else { // stop draw timer
    if (drawTimeout) clearTimeout(drawTimeout);
    drawTimeout = undefined;
  }
});

// Show launcher when middle button pressed
Bangle.setUI("clock");

// Load widgets - needed by draw
Bangle.loadWidgets();

// Clear the screen once, at startup and draw clock
g.setTheme({bg:"#000",fg:"#fff",dark:true}).clear();
draw(true);

// After drawing the watch face, we can draw the widgets
Bangle.drawWidgets();