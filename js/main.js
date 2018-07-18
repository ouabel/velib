var $container = document.querySelector('#container');
var $map = document.querySelector('#map');
var $googleMap = document.querySelector('#google_map');
var $booking = document.querySelector('#booking');
var $showMap = document.querySelector('#show_map');
var $showStation = document.querySelector('#show_station');
var $staionInfo = document.querySelector('#station_info');

var $signature = document.querySelector('#signature');
var $canvas = document.querySelector('#canvas');
var $confirm = document.querySelector('#confirm');
var $book = document.querySelector('#book');
var $erase = document.querySelector('#erase');
var $cancel = document.querySelector('#cancel');
var $remove = document.querySelector('#remove');

var $goLeft = document.querySelector('#go_left');
var $goRight = document.querySelector('#go_right');
var $slides = document.querySelector('#slides');
var $pages = document.querySelectorAll('.pages');

handleHeight();

window.onresize = function(){
  handleHeight();
}

topSlider = new Object(Slider);
topSlider.init($slides,4,$goLeft,$goRight,$pages);

$showMap.onclick = function (){
  toggle('map');
};

$showStation.onclick = function (){
  toggle('station');
};