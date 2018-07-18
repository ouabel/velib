var Slider = {

  slider : "",
  slides : 2,
  goLeft : "",
  goRight : "",
  pages : [],

  init : function(slider,slides,goLeft,goRight,pages){
  this.slider = slider;
  this.slides = slides;
  this.goLeft = goLeft;
  this.goRight = goRight;
  this.pages = pages;

    var that = this;
    this.onkeydown();
    this.swipe(this.slider);

    this.goLeft.onclick = function() {
      that.slide ('left');
    };

    this.goRight.onclick = function() {
      that.slide ('right');
    };
  
  for(var i = 0 ; i < this.pages.length; i++){
    (function(i) {
      pages[i].onclick = function() {
        that.goSlide(i+1);
      }
    })(i);
  };
  },

  slide : function (direction) {
    var marginLeft = Number(this.slider.style.marginLeft.slice(0,-1));
  var slide = (marginLeft)/-100+1;
    switch(direction) {
      case 'left':
        if(slide !== 1){
      this.goSlide(slide-1);
        }else{
      this.goSlide(this.slides);
        }
        break;
      case 'right':
        if(slide !== this.slides){
          this.goSlide(slide+1);
        }else{
          this.goSlide(1);
        }
        break;
    }
  },

  onkeydown : function() {
    var that = this;
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37:
          that.slide('left');
          break;
        case 39:
          that.slide('right');
          break;
      }
    }
  },

  goSlide : function(slide){
  var marginLeft = (slide-1)*-100;
  this.slider.style.marginLeft = marginLeft+"%";
  this.pages[slide-1].click();
  },
  
  swipe : function (area, callback){

    var that = this,
    direction,
    start,
    distance,
    threshold = 50,
    handleSwipe = callback || function(direction){};
    
    area.addEventListener('touchstart', function(e){
      var touchObj = e.changedTouches[0];
      direction = 'none';
      start = touchObj.pageX;
    }, false);

    area.addEventListener('touchend', function(e){
      var touchObj = e.changedTouches[0];
      distance = touchObj.pageX - start;
      if (Math.abs(distance) >= threshold){
        direction = (distance > 0) ? 'left' : 'right';
        that.slide(direction);
        e.preventDefault();  
      }
      handleSwipe(direction);
    }, false);
  }
}