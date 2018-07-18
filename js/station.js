var Station = {

  station_id : 0,
  title : "",
  is_renting : 0,
  is_renting_fr : "Fermée",
  numdocksavailable : 0,
  numbikesavailable : 0,
  address : "",

  init : function(station_id, title, is_renting, numdocksavailable, numbikesavailable, address) {
    this.station_id = station_id;
    this.title = title;
    this.is_renting = is_renting;
    this.is_renting_fr = this.is_renting.replace(1, "Ouverte").replace(0, "Fermée");
    this.numdocksavailable = numdocksavailable;
    this.numbikesavailable = numbikesavailable;
    this.address = address;
  },

  hasBooking : function () {
    if(typeof sessionStorage.bookingStation !== 'undefined'){
      bookingStation = Number(sessionStorage.bookingStation);
      if(this.station_id === bookingStation){
        return true;
      }
	}
    return false;
  },

  showInfo : function () {
    var that = this;
    sessionStorage.selectedStation = this.station_id;
    var fields = ["title","is_renting_fr","numdocksavailable","numbikesavailable","address"];
    fields.forEach(function(field){
      document.querySelector('#'+field).textContent = that[field];
    });
    $book.setAttribute('disabled', '');
    if (this.is_renting === 1 && this.numbikesavailable > 0){
      if(this.hasBooking()){
        oldReservation = new Object(Reservation);
        oldReservation.book(this);
      }else{
        $book.removeAttribute('disabled', '');
      }

      $book.onclick = function() {
        $signature.style.display = 'block';
        signature = new Object(Signature)
        signature.init($canvas);

        $confirm.onclick = function() {
          if(signature.isSigned()){
            if (typeof sessionStorage.bookingStation === 'undefined' || confirm('Voulez-vous vraiment remplacer la réservation actuelle?')) {
              newReservation = new Object(Reservation);
              newReservation.book(that);
              $book.setAttribute('disabled', '');
              $signature.style.display = 'none';
            }
          }else{
            alert ('Veuillez signer pour compléter votre réservation');
          }
        };

        $erase.onclick = function() {
          signature.erase();
        };

        $cancel.onclick = function() {
          $signature.style.display = 'none';
          signature.erase();
        };

      };
    }else{
      $book.setAttribute('disabled', '');
    }
    toggle('station');
    $signature.style.display = 'none';
  }

}
