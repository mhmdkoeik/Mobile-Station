var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var bReady = false;
var bImage = new Image();
bImage.onload = function () {
 bReady = true;
};
bImage.src = "background.png";
var CustomerReady = false;
var CustomerImage = new Image();
CustomerImage.onload = function () {
  CustomerReady = true;
};
CustomerImage.src = "boy.png";
var PhoneReady = false;
var PhoneImage = new Image();
PhoneImage.onload = function () {
 PhoneReady = true;
};
PhoneImage.src = "phone.png";
var Customer = {
  speed: 256 
};
var  Phone = {};
var PhoneCaught = 0;
var keysDown = {};
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);
var reset = function () {
  Customer.x = canvas.width / 2;
  Customer.y = canvas.height / 2;
  Phone.x = 32 + (Math.random() * (canvas.width - 64));
  Phone.y = 32 + (Math.random() * (canvas.height - 64));
};
var update = function (modifier) {
  if (87 in keysDown) { 
    Customer.y -= Customer.speed * modifier;
  }
  if (83 in keysDown) { 
    Customer.y += Customer.speed * modifier;
  }
  if (65 in keysDown) { 
    Customer.x -= Customer.speed * modifier;
  }
  if (68 in keysDown) { 
    Customer.x += Customer.speed * modifier;
  }
if (
    Customer.x <= (Phone.x + 32)
    && Phone.x <= (Customer.x + 32)
    && Customer.y <= (Phone.y + 32)
    && Phone.y <= (Customer.y + 32)
  ) {
    ++PhoneCaught;
    reset();
  }
};
var render = function () {
  if (bReady) {
    ctx.drawImage(bImage, 0, 0);
  }
  if (CustomerReady) {
    ctx.drawImage(CustomerImage, Customer.x, Customer.y);
  }
  if (PhoneReady) {
    ctx.drawImage(PhoneImage, Phone.x, Phone.y);
  }
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Phone is caught: " + PhoneCaught, 20, 20);
  ctx.fillText("CountDown: " + count, 20, 50);
  if (finished==true && PhoneCaught>=20){
         
		 ctx.fillText("Very Good!",200,200)

}
else if (finished==true && PhoneCaught>=10){
			 ctx.fillText("Nice! but hope better",200,200)
}
else if(finished==true && PhoneCaught<10){
			 ctx.fillText("Game Over!",200,200)
}

};
var count = 45; 
var finished = false;
var counter =function(){
  count=count-1; 
    if (count <= 0)
    {
       clearInterval(counter);
       finished = true;
       count=0;
       PhoneReady=false;
       CustomerReady=false;
    }
}
setInterval(counter,1000);
var main = function () {
  update(0.02); 
  render();
  requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
reset();
main();