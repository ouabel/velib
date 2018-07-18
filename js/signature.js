var Signature = {
  
  canvas : "",
  ctx : this.canvas.getContext("2d"),
  flag : false,
  coordinates : {
    curr: {
      x : 0,
      y : 0,
    },
    prev: {
      x : 0,
      y : 0,
    }
  },

  init : function (canvas) {
  this.canvas = canvas;
    var that = this;
    this.canvas.addEventListener("mousemove", function (e) {
      that.findxy('move', e)
    }, false);
    this.canvas.addEventListener("mousedown", function (e) {
      that.findxy('down', e)
    }, false);
    this.canvas.addEventListener("mouseup", function (e) {
      that.findxy('up', e)
    }, false);
    this.canvas.addEventListener("mouseout", function (e) {
      that.findxy('out', e)
    }, false);

    this.canvas.addEventListener("touchstart", function (e) {
      that.findxy('down', e.touches[0]);
    }, false);
    this.canvas.addEventListener("touchmove", function (e) {
      that.findxy('move', e.touches[0]);
      e.preventDefault();
    }, false);

  },
  
  findxy : function (res, e) {
    if (res == 'down') {
      this.coordinates.prev.x = this.coordinates.curr.x;
      this.coordinates.prev.y = this.coordinates.curr.y;
      this.coordinates.curr.x = e.clientX - this.canvas.getBoundingClientRect().left;
      this.coordinates.curr.y = e.clientY - this.canvas.getBoundingClientRect().top;
  
      this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.coordinates.curr.x, this.coordinates.curr.y, 2, 2);
      this.ctx.closePath();
      this.flag = true;
    }

    if (res == 'up' || res == "out") {
      this.flag = false;
    }

    if (res == 'move' && this.flag === true) {
      this.coordinates.prev.x = this.coordinates.curr.x;
      this.coordinates.prev.y = this.coordinates.curr.y;
      this.coordinates.curr.x = e.clientX - this.canvas.getBoundingClientRect().left;
      this.coordinates.curr.y = e.clientY - this.canvas.getBoundingClientRect().top;
      this.signe();
    }
  },
  
  signe : function () {
    this.ctx.beginPath();
    this.ctx.moveTo(this.coordinates.prev.x, this.coordinates.prev.y);
    this.ctx.lineTo(this.coordinates.curr.x, this.coordinates.curr.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  },
  
  erase : function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  isSigned : function () {
    var blank = document.createElement('canvas');
    blank.width = this.canvas.width;
    blank.height = this.canvas.height;
    return this.canvas.toDataURL() !== blank.toDataURL();
  }
}