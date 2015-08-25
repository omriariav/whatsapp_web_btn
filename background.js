//Created by @omriariav

var newTab = function() {
    var whatsappUrl = "https://web.whatsapp.com/";
    chrome.tabs.query({url: whatsappUrl}, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, {
                selected: true
            });
        } else {
            chrome.tabs.create({url: whatsappUrl});
        }
    });
};

chrome.browserAction.onClicked.addListener(newTab);
