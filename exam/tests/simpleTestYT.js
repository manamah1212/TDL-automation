module.exports = {
    function(client) {


        prepare();

        function prepare() {
            client
                .maximizeWindow()
                .url('https://www.youtube.com/')
                .pause(5 * 1000);
        };
    }
};