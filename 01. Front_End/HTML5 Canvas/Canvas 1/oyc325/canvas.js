var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c =canvas.getContext('2d');

//c.fillRect(x, y, width, height);
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);


// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

//Arc / Circle
//c.arc(300, 300, 30, startAngle: Float, endAngle: Float, drawCounterClockwise: Bool (false));
// c.beginPath();
// c.arc(300, 300, 30, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 200; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
    
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
// var minRadius = 10;

var colorArray = [
    '#2c3e50',
    '#e74c3c',
    '#3498db',
    '#ecf0f1',
    '#298080'
]

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill(); 
    }

    this.update = function() {
        
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
         {
            if (this.radius < maxRadius){
                this.radius += 1;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw(); // 업데이트
    }
}

var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2 ) + radius;//바닥과 완전히 충돌하게 만듬
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}



var circle = new Circle(200, 200, 3, 3, 30);


    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight); //초기화, 잔상 없애기
    
        for (var i = 0; i < circleArray.length; i++){
            circleArray[i].update();
        }
        

    }

    init();

    animate();
