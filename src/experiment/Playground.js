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

            this.particle = new Particle(this.canvas.width/2, this.canvas.height/2);
            this.vector = new Vector(1, 1);
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

            this.particle.position.add(this.vector);
            this.particle.update(this.context);

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