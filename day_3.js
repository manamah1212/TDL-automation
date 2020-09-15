module.exports = {
    function(client) {
        let originalHandle;

        const resources = [
            {
                selector: '.navigation a:nth-child(3)',
                url: 'https://blog.loadero.com/'
            },
            {
                selector: '.resources a:nth-of-type(2)',
                url: 'https://wiki.loadero.com/'
            }
        ];


        

        prepare();
        checkLinks();

        function prepare() {
            client
                .url('https://loadero.com/')
                .maximizeWindow()
                .waitForElementVisible('body', 5 * 1000)
                .windowHandle(({ value }) => (originalHandle = value))
                .waitForElementVisible('.accept', 5 * 1000)
                .click('.accept');
        }

        function checkLinks() {
            client.perform(() => {
                resources.forEach(({ selector, url }) => checkLink(selector, url));
            });
        }

        function checkLink(linkSelector, urlString) {
            client
                .click(linkSelector)
                .windowHandles(({ value }) => {
                    // [landingHandle, blogHandle]
                    const handles = value;

                    handles.forEach(handle => {
                        if (handle !== originalHandle) {
                            client.switchWindow(handle);
                        }
                    });
                })
                .waitForElementVisible('body', 5 * 1000)
                .verify.urlEquals(urlString)
                .closeWindow()
                .perform(() => client.switchWindow(originalHandle))
                .pause(3 * 1000);
        }
    }
};