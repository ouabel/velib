var appMap = {

  mapElement : document.querySelector('#google_map'),
  zoom : 13,
  centerPosition : {lat: 48.856649, lng: 2.34547},
  gestureHandling : 'cooperative',
  dataURL : 'https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&rows=-1&facet=status',
  markers : [],

  init : function () {
    map = new google.maps.Map(this.mapElement, {
      zoom: this.zoom,
      center: this.centerPosition,
      gestureHandling: this.gestureHandling
    });
    this.setMarkers();
  },

  //Cette méthode obtient les données de l'API OpenData de la ville de Paris
  setMarkers : function () {
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.dataURL);
    request.responseType = 'json';
    request.send();

    request.addEventListener("load", function (){
    if(typeof(request.response) === 'string'){
      var response = JSON.parse(this.response);
    }else{
      var response = this.response;
    }

    response.records.forEach(function(record){
        fields = record.fields;
        that.setMarker(fields);
      });
      that.setMakersIcons ();
      var markerCluster = new MarkerClusterer(map, that.markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    });
  },

  //copie les donnes de chaque station vers un object station
  setMarker :  function (fields) {
    var that = this;
    var newMarker = new google.maps.Marker({
      position: {lat:fields.position[0], lng:fields.position[1]},
      title: fields.name.slice(8),
      station : Object.create(Station),
    });

    newMarker.station.init(fields.number, newMarker.title, fields.status, fields.numdocksavailable, fields.numbikesavailable, fields.address);

    this.markers.push(newMarker);

    newMarker.addListener("click", function(){
      that.setMakersIcons();
      newMarker.station.showInfo();
      this.setIcon('icons/3.png');
    });

    if (newMarker.station.hasBooking()){
      newMarker.station.showInfo();
    }
  },

  setMakersIcons : function () {
    for (i in this.markers){
      var marker = this.markers[i];
      if (marker.station.hasBooking()){
        marker.setIcon('icons/4.png');
      }else if(marker.station.status === "OPEN" && marker.station.numbikesavailable > 0){
        marker.setIcon('icons/1.png');
      }else {
        marker.setIcon('icons/2.png');
      }
    }
  }
}
