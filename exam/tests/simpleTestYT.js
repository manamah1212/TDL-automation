module.exports = {
    function(client) {

        const selectors = {
            popUpWindowsCloseBtn: 'yt-formatted-string[class="style-scope yt-button-renderer style-text size-small"]',
            url: 'https://www.youtube.com/',
            agreeBtn: 'div[id="introAgreeButton"]',
            searchArea: 'div[id="search-input"]',
            searchBtn: 'yt-icon[class="style-scope ytd-searchbox"]',
            videosBtn: 'a[data-sc="V"]',
            videoCheck: 'a[href="https://www.youtube.com/watch?v=bcjPzrh5IOA"]:last-of-type',
        }

        timeout = 5 * 1000;

        prepare();
        searchChennal();
        playVideo(2 * 1000);

        for (let i = 0; i < 5; i++) {
            otherVideo(100 * 1000)
        }

        function prepare() {
            client
                .url('https://www.google.com')
                .pause(1 * 1000)
                .element('css selector', 'iframe[src]', result => {
                    client.frame(result.value).click('#introAgreeButton');
                })
                .setValue('input[title="Search"]', ['как накачать пресс за 7 минут monotif', client.Keys.ENTER])
        };

        function searchChennal() {
            client
                .pause(1 * 1000)
                .click(selectors.videosBtn)
                .click(selectors.videoCheck)
                .pause(2 * 1000)
                .click('paper-button[class="style-scope yt-button-renderer style-text size-small"]')
                .pause(1 * 1000)
        }
        function playVideo(seconds) {
            client
                .click('button[class="ytp-large-play-button ytp-button"]')
                .waitForElementVisible('body', timeout)
                .pause(seconds)
        }
        function otherVideo(seconds) {
            client
                .click('ytd-channel-name[class="style-scope ytd-video-owner-renderer"]')
                .pause(2 * 1000)
                .url('https://www.youtube.com/watch?v=8QKNZWrygPM&list=PLWspRjhyGMM8UhOVFjutNZmhJo1nQEN8C&index=8')
                .pause(seconds, () =>  {
                    console.log('+1 view')
                })
                
        }
    }
};