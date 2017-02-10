chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);

    var regex = /(?:(?:issues?|bugs?|SF)(?:\s+id:?)?\s*#?|#)\s*(\d+)/gmi;

    var commitTitleElm = document.querySelector(".commit-title");

    if (commitTitleElm !== null) {
      var commitTitle = commitTitleElm.innerHTML.trim();

      function replacer(match, p1, offset, string) {
        return '<a href="https://bugs.python.org/issue' + p1 + '">' + match + '</a>';
      }

      var newTitle = commitTitle.replace(regex, replacer);
      commitTitleElm.innerHTML = newTitle;
    }
  }
  }, 10);
});
