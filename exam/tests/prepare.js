module.exports = {
    function(client) {


        
        let originalHandle;

        const socialResources = [{
            selector: 'a[title="Facebook"]',
            url: 'https://www.facebook.com/bestbuy'
        },
        {
            selector: 'a[title="Twitter"]',
            url: 'https://twitter.com/BestBuy'
        },
        {
            selector: 'a[title="Instagram"]',
            url: 'https://instagram.com/bestbuy'
        },
        {
            selector: 'a[title="Pinterest"]',
            url: 'https://www.pinterest.com/bestbuy/'
        },
        ];

        prepare();
        checkLinks();

        function prepare() {
            client
                .url('https://www.bestbuy.com/')
                .maximizeWindow()
                .windowHandle(({ value }) => (originalHandle = value))
                .waitForElementVisible('[alt="United States"]', 5 * 1000)
                .click('[alt="United States"]')
                .waitForElementVisible('body', 5 * 1000)
				.click('button[class="c-close-icon  c-modal-close-icon"]')
				.waitForElementVisible('body', 5 * 1000)
				.pause(2 * 1000);
        }
        
        function checkLinks() {
            client.perform(() => {
                socialResources.forEach(({ selector, url }) => checkLink(selector, url));
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
                .pause(2 * 1000);
        }






    }
}