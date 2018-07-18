function handleHeight (){
  var headerHeight = 50;
  var availableHeight = window.innerHeight-headerHeight;
  if ($booking.style.display === 'block'){
    var containerHeight = availableHeight-$booking.offsetHeight;
  }else{
    var containerHeight = availableHeight;
  }

  $container.style.height = containerHeight+'px';
  var googleMapHeight = containerHeight-headerHeight-20;
  
  if (window.innerWidth <= 768){
    googleMapHeight = googleMapHeight-60;
  }
	
  $googleMap.style.height = googleMapHeight+'px';
  $staionInfo.style.height = googleMapHeight+30+'px';

  if (window.innerWidth > 768){
    $map.style.display = 'block';
    $staionInfo.style.width = '350px';
    $staionInfo.style.margin = '0 0 0 10px';
  }else if ($showStation.className === "toggled") {
    toggle('station');
  }
}

function toggle (target){
  if(target === 'map'){
    $showMap.className = "toggled";
    $showStation.className = "toggle";
    $staionInfo.style.display = 'none';
    $map.style.display = 'block';
  }else if(target === 'station'){
      $showMap.className = "toggle";
      $showStation.className = "toggled";
      $staionInfo.style.display = 'block';
      $showStation.removeAttribute('disabled', '');
    if (window.innerWidth <= 768){
      $map.style.display = 'none';
      $staionInfo.style.width = '100%';
      $staionInfo.style.margin = '0';
    }
  }
}