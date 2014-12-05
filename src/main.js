require.config({
    baseUrl: 'src/experiment',
    paths: {
        Stats: '../../lib/stats.min'
    },
    shim: {
        'Stats': {
            exports: 'Stats'
        }
    }
});

// Classic canvas init
var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
context = canvas.getContext("2d");
document.body.appendChild(canvas);

require(['entities/Vector'], function(Vector) {
    var location = new Vector(10, 10);
    var velocity = new Vector(1, 3);

    animate();

    function animate() {
        context.clearRect(0, 0, 400, 400);

        location.x += velocity.x;
        location.y += velocity.y;
        console.log(location.y);

        requestAnimationFrame(animate);
    }
});