var messaging;

function isSameTokenSaved(token, window) {
  if (window.localStorage) {
    var tokenSaved = window.localStorage.getItem("token");
    window.localStorage.setItem("token", token);
    if (tokenSaved) {
      return (token === tokenSaved) ? true : false
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function suscribeToken() {
  messaging.requestPermission()
    .then(function() {
      return messaging.getToken();
    })
    .then(function (token) {
      if (isSameTokenSaved(token, window)) {
        return true;
      }
      return sendToken(token);
    })
    .then(function () {
      console.log(":D");
    })
    .catch(function(err) {
      console.error('Ocurrio un error', err);
    });
}

function initFirebase() {
  var config = {
    apiKey: "<%= API_KEY %>",
    authDomain: "<%= AUTH_DOMAIN %>",
    databaseURL: "<%= DATABASE_URL %>",
    storageBucket: "<%= STORAGE_BUCKET %>",
    messagingSenderId: "<%= MESSAGING_SENDER_ID %>"
  };
  firebase.initializeApp(config);
  messaging = firebase.messaging();
}

function sendToken(token) {
  var config = {
    method : 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({ token : token })
  };
  return fetch("<%= URL_SUSCRIBE_NOTIFICATION %>", config);
}

window.onload = function() {
  initFirebase();
  suscribeToken();
};