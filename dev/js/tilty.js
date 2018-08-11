/*******************************************

  Title: Tilty
  Author: Matt McDonald
  Date Created: 8-8-16
  Last Modified: 8-8-18
  Version: Custom MMD Site Build
  
  To use Tilty, simply add the class 'tilty' 
  to the container you want to give a 3D tilt 
  effect to  In this build, you can modify 
  variables in the source js file
  
********************************************/

var tiltBox = document.querySelectorAll('.tilty');
var tiltAngle = 2;
var scaleAmt = 1.03;
var glare = true;
var glareTranslate = 20;
var throttleAmt = 1;
var perspective = 1000;

var xPercent = 0;
var yPercent = 0;

var parentContainer = tiltBox[0].parentNode;
parentContainer.style.perspective = perspective.toString() + 'px';

if( glare === true ) {
  tiltBox.forEach( box => {
    var glareNode = document.createElement('DIV');
    glareNode.classList.add('glare');
    box.insertBefore(glareNode, box.childNodes[0]) 
  })
}

var tilt = function(e) {
  var glare = this.querySelector('.glare');
  var tiltBoxWidth = this.offsetWidth;
  var tiltBoxHeight = this.offsetHeight;
  var xAxis = tiltBoxWidth / 2;
  var yAxis = tiltBoxHeight / 2;
  var thisBox = this;
  var xMousePos = e.pageX - thisBox.offsetLeft - thisBox.offsetParent.offsetLeft +1;
  var yMousePos = e.pageY - thisBox.offsetTop - thisBox.offsetParent.offsetTop +1;
  if( xMousePos <= xAxis ) {
    var xDifference = xAxis - xMousePos;
    var yDifference = yAxis - yMousePos;
    xPercent = -xDifference / xAxis * tiltAngle;
    yPercent = (yDifference) / yAxis * tiltAngle;
  } else {
    xPercent = (xMousePos - xAxis) / xAxis * tiltAngle;
    yPercent = (yMousePos - yAxis) / yAxis * tiltAngle * -1;
  }
  
  this.style.transform = `scale(${scaleAmt}) rotateX(${yPercent}deg) rotateY(${xPercent}deg)`;
  glare.style.transform = `translateX(${-xPercent * glareTranslate}px) translateY(${yPercent * glareTranslate}px)`
  
}
  
  
tiltBox.forEach( box => box.addEventListener('mousemove', _.throttle(tilt, throttleAmt) ));
tiltBox.forEach( box => box.addEventListener('mouseout', function() {
  box.style.transform = '';
  box.querySelector('.glare').style.transform = '';
}))