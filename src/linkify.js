chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);

    var regex = /(?:(?:issues?|bugs?|SF|bpo-)(?:\s+id:?)?\s*#?|#)\s*(\d{4,})/gmi;

    function replacer(match, p1, offset, string) {
      return '<a href="https://bugs.python.org/issue' + p1 + '" class="issue-link">' + match + '</a>';
    }

    // URL: https://github.com/python/cpython/pull/*/commits/*
    // URL: https://github.com/python/cpython/commit/*
    var commitTitleElm = document.querySelector(".commit-title");
    if (commitTitleElm !== null) {
      var commitTitle = commitTitleElm.innerHTML.trim();
      commitTitleElm.innerHTML = commitTitle.replace(regex, replacer);
    }

    var commitDescElm = document.querySelector(".commit-desc");
    if (commitDescElm !== null) {
      var commitDesc = commitDescElm.innerHTML.trim();
      commitDescElm.innerHTML = commitDesc.replace(regex, replacer);
    }

    // URL: https://github.com/python/cpython/pull/*
    var prTitleElm = document.querySelector(".gh-header-title");
    if (prTitleElm !== null) {
      var prTitle = prTitleElm.innerHTML.trim();
      prTitleElm.innerHTML = prTitle.replace(regex, replacer);
    }
  }
  }, 10);
});
