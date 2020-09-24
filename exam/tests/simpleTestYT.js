module.exports = {
    function(client) {

        const selectors = {
            popUpWindowsCloseBtn: 'yt-formatted-string[class="style-scope yt-button-renderer style-text size-small"]',
            url: 'https://www.youtube.com/',
            agreeBtn: 'div[id="introAgreeButton"]',
            searchArea: 'div[id="search-input"]',
            searchBtn: 'yt-icon[class="style-scope ytd-searchbox"]',
            videosBtn: 'a[data-sc="V"]',
            videoCheck: 'a[href="https://www.youtube.com/watch?v=uds0QBCgJ8I"]',
        }

        timeout = 5 * 1000;


        prepare();
       searchChennal();


        function prepare() {
            client
                // .maximizeWindow()
                // .url(selectors.url)
                // .waitForElementVisible(selectors.popUpWindowsCloseBtn, timeout)
                // .click(selectors.popUpWindowsCloseBtn)
                // .pause(1 * 1000)
                // .element('css selector', 'iframe[src]', result => {
                //     client.frame(result.value).click('#introAgreeButton');
                // })
                // .pause(1 * 1000)
                .url('https://www.google.com')
                .pause(1 * 1000)
                .element('css selector', 'iframe[src]', result => {
                    client.frame(result.value).click('#introAgreeButton');
                })
                .setValue('input[title="Search"]', ['Monotif', client.Keys.ENTER])
               // .pause(5 * 1000);
        };

        function searchChennal() {
            client
                //.element('css selector', selectors.searchArea, result => {
                //     client
                //         .frame(result.value)
                //         .click(selectors.searchArea)
                //         .setValue(['Monotif'])
                //         .click(selectors.searchBtn)
                // })
                // .setValue(selectors.searchArea, ['Monotif'])
                // .click(selectors.searchBtn)
                .pause(1 * 1000)
                .click(selectors.videosBtn)
                .click(selectors.videoCheck)
                .pause(5 * 1000)
        }

    }
};