var Reservation = {

  book : function(stationObj){
    that = this;

    if(!stationObj.hasBooking()){
      sessionStorage.bookingStation = stationObj.station_id;
      sessionStorage.bookingTime = Date.now();
	  console.log('New reservation in station ' + stationObj.station_id);
    }else{
      console.log('Reservation already exists in station ' + stationObj.station_id);
	}

    appMap.setMakersIcons();

    this.countDown(stationObj);
  
    $remove.onclick = function() {
      if (confirm('Voulez-vous vraiment annuler votre réservation?')) {
        that.remove(stationObj);
      }
    };
    
  },

  countDown : function(stationObj){
  that = this;
    $booking.style.display = 'block';
    document.querySelector('#station_name').textContent = stationObj.title;
    document.querySelector('#numbikesavailable').textContent = stationObj.numbikesavailable-1;
    setInterval(function() {
      var now = new Date().getTime();
      var distance = Number(sessionStorage.bookingTime) + 1200000 - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.querySelector('#count_down_m').textContent = minutes;
      document.querySelector('#count_down_s').textContent = seconds;
      if (distance < 0) {
        that.remove(stationObj);
        clearInterval(this.countDown);
      }
    }, 1000);
    handleHeight();
  },

  //Cette méthode est pour annuler une réservation
  remove : function (stationObj){
    $booking.style.display = 'none';
    handleHeight();
    if (Number(sessionStorage.selectedStation) === stationObj.station_id){
      $book.removeAttribute('disabled', '');
      document.querySelector('#numbikesavailable').textContent = stationObj.numbikesavailable;
    }
    sessionStorage.removeItem("bookingStation");
    sessionStorage.removeItem("bookingTime");
    appMap.setMakersIcons();
    console.log('Reservation removed from station ' + stationObj.station_id);
  }
}