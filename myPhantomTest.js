// var system = require('system');
// var env = system.env;
//
// system.env.LOGIN_URL = 'helloENV'
// Object.keys(env).forEach(function(key) {
//   console.log(key + '=' + env[key]);
// });

// Test reddit
// var page = require('webpage').create();
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';
// page.open('https://www.reddit.com', function(status) {
//   if (status !== 'success') {
//     console.log('Unable to access network');
//   } else {
//     var ua = page.evaluate(function() {
//       return document.getElementById('header-bottom-right').textContent;
//     });
//     console.log(ua);
//   }
//   phantom.exit();
// });


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
  function() {
    //Enter Credentials
    page.evaluate(function() {
      var form = document.getElementById('login_login-main');
      form.elements["user"].value = "dumbtestfortravis";
      form.elements["passwd"].value = "stealmyaccount";
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
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    // console.log("test complete!");
    phantom.exit();
  }
}, 50);
