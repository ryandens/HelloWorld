console.log("\n");
var system = require('system');
var env = system.env;
var ASK_EMAIL = "None";
var ASK_PW = "None";
ASK_EMAIL = env["ASK_EMAIL"];
ASK_PW = env["ASK_PW"];


var page = new WebPage(), testindex = 0, loadInProgress = false;
page.settings.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:44.0) Gecko/20100101 Firefox/44.0";

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
    var url = "https://www.amazon.com/ap/signin?_encoding=UTF8&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.pape.max_auth_age=0&ie=UTF8&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_lwa_na&marketPlaceId=ATVPDKIKX0DER&arb=7e19cac3-a482-4fcf-8354-535435361fe8&language=en_US&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fap%2Foa%3FmarketPlaceId%3DATVPDKIKX0DER%26arb%3D7e19cac3-a482-4fcf-8354-535435361fe8%26language%3Den_US&enableGlobalAccountCreation=1&metricIdentifier=amzn1.application.915369ebbc1242368b3179a9cf03c32a&signedMetricIdentifier=ChhIquzflpDeAXDVrIzn02hZNf4hCPinqYBMTmva5xo%3D";
    page.open(url);
  },
  function(email, password) {
    //Enter Credentials
    page.evaluate(function(ask_email, ask_password) {
      var form = document.getElementById('ap_signin_form');
      console.log("logging in");
      console.log(ask_email);
      console.log(ask_password);
      form.elements["email"].value = ask_email;
      form.elements["password"].value = ask_password;
      return;
    }, email, password);
  },
  function() {
    //Login
    page.evaluate(function() {
      var populatedForm = document.getElementById('ap_signin_form');
      populatedForm.submit()
      return;
    });
  },
  function() {
    // Output content of page to stdout after form has been submitted
    page.evaluate(function() {
      // var markup = document.getElementById('header-bottom-right').textContent;
      var inner = document.documentElement.innerHTML;
      var outer = document.documentElement.outerHTML;
      console.log(inner);
      console.log("thisismylinedivider");
      console.log(outer);
    });
  }
];



interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    if (testindex != 1) {
      steps[testindex]();
    }
    else {
      steps[testindex](ASK_EMAIL, ASK_PW);
    }
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    // console.log("test complete!");
    console.log(phantom.cookiesEnabled);
    phantom.exit();
  }
}, 50);
