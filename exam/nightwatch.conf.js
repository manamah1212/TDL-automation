module.exports = {
    src_folders: ['tests'],

    webdriver: {
        start_process: true,
        port: 4444
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            webdriver: { server_path: require('chromedriver').path }
        },

        firefox: {
            browserName: 'firefox',
            webdriver: { server_path: require('geckodriver').path }
        },

        chrome_extra: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: [
                        'no-sandbox',
                        'use-fake-device-for-media-stream'
                        // "use-file-for-fake-video-capture=PATH_TO_FILE",
                        // "use-file-for-fake-audio-capture=PATH_TO_FILE",
                    ],
                    prefs: {
                        profile: {
                            content_settings: {
                                exceptions: {
                                    media_stream_camera: {
                                        'https://*,*': {
                                            setting: 1
                                        }
                                    },
                                    media_stream_mic: {
                                        'https://*,*': {
                                            setting: 1
                                        }
                                    }
                                }
                            },
                            default_content_setting_values: {
                                automatic_downloads: 1,
                                notifications: 1
                            }
                        }
                    }
                }
            },
            webdriver: { server_path: require('chromedriver').path }
        }
    }
};