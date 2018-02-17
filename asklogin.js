var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open('https://reddit.com');
  },
  function(pw) {
    console.log("outer function");
    console.log(pw);
    //Enter Credentials
    page.evaluate(function(pw) {
      console.log("login");
      console.log(pw);
      var form = document.getElementById('login_login-main');
      form.elements["user"].value = "dumbtestfortravis";
      form.elements["passwd"].value = pw;
      return;
    });
  },
  function() {
    //Login
    page.evaluate(function() {
      var populatedForm = document.getElementById('login_login-main');
      populatedForm.submit()
      return;
    });
  },
  function() {
    // Output content of page to stdout after form has been submitted
    page.evaluate(function() {
      var markup = document.getElementById('header-bottom-right').textContent;
      console.log(markup);
    });
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    // console.log("step " + (testindex + 1));
    console.log(env);
    if (testindex != 1) {
      steps[testindex]();
    }
    else {
      console.log(testindex);
      console.log(REDDIT_PW);
      steps[testindex](REDDIT_PW);
    }
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    // console.log("test complete!");
    phantom.exit();
  }
}, 50);
