var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('hand', function(data) {
  console.log(data);
  render(data);
})

function render (data) {

//  document.getElementById('hand').style.zoom = data.sphereRadius;
  //"Dirección :" + data.direction
  var canvas=document.getElementById("hand")
  canvas.innerHTML= ''
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 100, 100);
  ctx.fillStyle = '#000';
  ctx.beginPath();
    ctx.moveTo(200, 200);
    if( data )
      data.position.forEach(function(data_){
        ctx.lineTo( data_[0], data_[1] )
      })


  ctx.closePath();
  ctx.fill();


}
