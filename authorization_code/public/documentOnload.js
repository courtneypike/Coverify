window.onload = function (){
    var params = getHashParams();

    var oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');

    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;

    if (error) {
      alert('There was an error during the authentication. Please refresh the page and login again.');
    } else {
      if (access_token) {
        // render oauth info
        oauthPlaceholder.innerHTML = oauthTemplate({
          access_token: access_token,
          refresh_token: refresh_token
        });
        $('#loggedin').show();
        $('#termOptions').show();

      document.getElementById("short_term").addEventListener(
        "click",
        function () {
            reload_js("./apiCalls.js")
            reloadScript('user-profile-template')
            reloadScript('user-top-tracks-details')
            reloadScript('user-top-artists-details')
            window.onload = getAPIs(access_token, "short_term") 
        },
        false
      );
      document.getElementById("medium_term").addEventListener(
        "click",
        function () {
            reload_js("./apiCalls.js")
            reloadScript('user-profile-template')
            reloadScript('user-top-tracks-details')
            reloadScript('user-top-artists-details')
            window.onload = getAPIs(access_token, "medium_term") 
        },
        false
      );
      document.getElementById("long_term").addEventListener(
        "click",
        function () {
            reload_js("./apiCalls.js")
            reloadScript('user-profile-template')
            reloadScript('user-top-tracks-details')
            reloadScript('user-top-artists-details')
            window.onload = getAPIs(access_token, "long_term");
        },
        false
      );
      } else {
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }
    }

  document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
              });
            });
          }, false);
}