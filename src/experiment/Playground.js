define(['helpers/Resize', 'Stats', 'entities/Particle', 'entities/Vector', 'entities/Attractor'], function(Resize, Stats, Particle, Vector, Attractor) {

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

            this.refractor = new Attractor(Resize.screenWidth/2, Resize.screenHeight/2);

            window.addEventListener("click", onMouseClick.bind(this));

            function onMouseClick(e) {
                this.refractor.position = new Vector(e.x, e.y);

                this.particles.forEach(function(particle) {
                    particle.applyForce(this.refractor.repel(particle));
                }.bind(this));
            }
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
                var friction = particle.velocity.clone();
                friction.multiply(-1);
                friction.normalize();
                friction.multiply(0.01);
                particle.applyForce(friction);

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