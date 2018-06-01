module.exports = {
    paths: {
        public: './public',
        watched: ['app']
    },
    files: {
        javascripts: {
            joinTo: {
                'js/app.js': /^app/,
                'js/vendor.js': /^(?!app)/
            }
        },
        stylesheets: { 
            joinTo: 'stylesheets/app.css'
        },
        templates: { 
            joinTo: 'js/app.js'
        }
    },
    plugins: {
        babel: { presets: ['es2015'] }
    }
};