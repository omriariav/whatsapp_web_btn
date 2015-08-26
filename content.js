/**
 * Created by omriariav on 8/25/15.
 */
$(document).ready( function() {
    var _title_query = document.querySelector("head > title");
    var _body_query = document.querySelector("body");

    var counter_observer = new window.MutationObserver(
        function(mutations) {
            mutations.forEach(
                function(mutation){
                    chrome.runtime.sendMessage({'type' : 'count', 'counter': mutation.target.textContent});
                }
            );
        }
    );
    var error_observer = new window.MutationObserver(
        function(mutations) {
            mutations.forEach(
                function(mutation){
                    if (mutation.addedNodes.length > 0) {
                        var _class_name = mutation.target.className;
                        var _inner_text =mutation.target.innerText;
                        if (_class_name == "butterbar-container") {
                            if (_inner_text.indexOf("Phone Not Connected") >= 0) {
                                chrome.runtime.sendMessage({'type' : 'butter'});
                                return false
                            }
                        }
                    }
                }
            );
        }
    );
    counter_observer.observe(_title_query, { subtree: true, characterData: true, childList: true });
    error_observer.observe(_body_query, { subtree: true, characterData: true, childList: true });
});

window.onbeforeunload = function() {
    chrome.runtime.sendMessage({'type': 'bye'});
};