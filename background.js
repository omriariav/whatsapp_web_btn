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
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == 'count') {
        var _wa_title = message.counter;
        var rgx = /\(([^)]+)\)/;
        var match = _wa_title.match(rgx) || ["(0)"];
        chrome.browserAction.setBadgeText({
            "text": match[0].replace("(","").replace(")","")
        })
    } else if (message.type == "bye") {
        chrome.browserAction.setBadgeText({
            "text": ""
        })
    } else if (message.type == "butter") {
        chrome.browserAction.setBadgeText({
            "text": "!!!"
        })
    }
});
