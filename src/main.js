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

require(['Playground'], function(Playground) {
    var playground = new Playground();
});