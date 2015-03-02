
/*

    This example demonstrates how to use randomness in your generators. Because we must ensure that 
    an image is reproducible, when using random numbers they must be generated by a _deterministic_ 
    pseudo-random number generator, rather than `Math.random`. For this, we provide you with 
    `studio.random`, which is documented in the [sandbox readme](https://github.com/stuvio/sandbox)

    When a generator is initialized in the Stuvio environment, it is assigned a `seed` value and 
    before each call to `generate` the pseudo-random number generator powering `stuvio.random` is 
    reset to this seed value. You are of course free to override this value by creating a setting 
    for your own seed value, as is show here. Be sure however to use this value to set the seed of 
    `studio.random`, inside your `generate` method and before you actually generate any numbers.

*/

var Generator = (function() {

    var canvas = document.createElement( 'canvas' )
    var context = canvas.getContext( '2d' )

    var settings = {
        
        seed: {
            type: 'number',
            range: [ 0, 1000 ],
            value: 12,
            step: 1
        },

        lines: {
            type: 'number',
            range: [ 5, 20 ],
            value: 10,
            step: 1
        }
    }

    return {

        context: context,

        settings: settings,

        initialize: function( done ) {

            done()
        },

        generate: function( done ) {

            // override the current stuvio seed with the settings seed
            stuvio.random.seed = settings.seed.value

            context.globalAlpha = 1.0
            context.fillStyle = '#323f4c'
            context.fillRect( 0, 0, canvas.width, canvas.height )

            for ( var i = 0, n = settings.lines.value; i < n; i++ ) {

                context.beginPath()

                context.moveTo(
                    canvas.width * stuvio.random.float( 0.05, 0.95 ),
                    canvas.height * stuvio.random.float( 0.05, 0.95 )
                )

                context.lineTo(
                    canvas.width * stuvio.random.float( 0.05, 0.95 ),
                    canvas.height * stuvio.random.float( 0.05, 0.95 )
                )

                context.lineWidth = canvas.width * stuvio.random.float( 0.02, 0.1 )
                context.globalAlpha = stuvio.random.float( 0.1, 0.9 )
                context.strokeStyle = '#fff'
                context.lineCap = 'round'
                context.stroke()
            }
        },

        destroy: function( done ) {

            done()
        }
    }

})();