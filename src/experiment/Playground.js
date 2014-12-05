define(['helpers/Resize', 'Stats', 'entities/Particle', 'entities/Vector'], function(Resize, Stats, Particle, Vector) {

    var Playground = function()
    {
        // Variables (usefull for dat.GUI)
        this.trails = false;

        this.isDebug = true;
        if(this.isDebug)
        {
            this.debug();
        }

        // Kick it !
        this.init();
        this.animate();
    };

    Playground.prototype = {
        init: function()
        {
            // Classic canvas init
            this.canvas = document.createElement('canvas');
            this.canvas.width = Resize.screenWidth;
            this.canvas.height = Resize.screenHeight;
            this.context = this.canvas.getContext("2d");
            document.body.appendChild(this.canvas);

            this.particles = [];

            for (var i = 0; i < 300; i++) {
                var particle = new Particle(getRandomInt(0, Resize.screenWidth), getRandomInt(0, Resize.screenHeight));
                this.particles.push(particle);
            };

            this.wind = new Vector(0.05, 0);
            this.gravity = new Vector(0, 0.05);
        },

        animate: function()
        {
            if(this.trails)
            {
                this.context.fillStyle = "rgba(0,0,0,0.05)";
                this.context.fillRect(0, 0, Resize.screenWidth, Resize.screenHeight);
            }
            else
            {
                this.context.clearRect(0, 0, Resize.screenWidth, Resize.screenHeight);
            }
            if(this.isDebug)
            {
                this.stats.update();
            }

            this.particles.forEach(function(particle) {
                particle.applyForce(this.wind.clone());
                particle.applyForce(this.gravity.clone());

                if (particle.position.x > this.canvas.width) {
                      particle.position.x = this.canvas.width;
                      particle.velocity.x *= -1;
                    } else if (location.x < 0) {
                      particle.velocity.x *= -1;
                      particle.position.x = 0;
                    }
                 
                    if (particle.position.y > this.canvas.height) {
                      particle.velocity.y *= -1;
                      particle.position.y = this.canvas.height;
                    }

                particle.update(this.context);
            }.bind(this));

            requestAnimationFrame(this.animate.bind(this));
        },

        debug: function() {
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.left = '0px';
            this.stats.domElement.style.top = '0px';
            this.stats.domElement.style.zIndex = '100';
            document.body.appendChild(this.stats.domElement);
        }
    };

    return Playground;
});