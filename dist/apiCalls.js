
      function getAPIs(access_token, term) {
            $('#loggedin').show();
            console.log(access_token)
            getUserProfile(access_token)
            console.log(access_token)

            getTopTracks(access_token, term)
            console.log(access_token)

            getUserTopArtists(access_token, term)
      }

      //User profile API call
      function getUserProfile(access_token){
        try {
              $.ajax({
                  url: 'https://api.spotify.com/v1/me/',
                  headers: {
                    'Authorization': 'Bearer ' + access_token
                  },
                  success: function(response) {
                    let userProfileSource = document.getElementById('user-profile-template').innerHTML,
                    userProfileTemplate = Handlebars.compile(userProfileSource),
                    userProfilePlaceholder = document.getElementById('user-profile');
                    
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                    $('#selectionsComplete').show();
                  }
              });
            }
            catch (error){
              console.error('Error accessing innerHTML:', error);
            }
      } 

      //top tracks API call
      function getTopTracks(access_token, term){
        try {
              $.ajax({
                  url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range='+ term,
                  headers: {
                    'Authorization': 'Bearer ' + access_token
                  },
                  success: function(response) {
                    let userTopTracksSource = document.getElementById('user-top-tracks-details').innerHTML,
                    userTopTracksTemplate = Handlebars.compile(userTopTracksSource),
                    userTopTrackPlaceholder = document.getElementById('user-top-tracks');

                    userTopTrackPlaceholder.innerHTML = userTopTracksTemplate(response);
                    findPopularityTracksJSON(response.items)
                    $('#selectionsComplete').show();
                    document.getElementById("selectionsComplete").style.display = "inline-block";

                  }
              });
            }
            catch (error){
              console.error('Error accessing innerHTML:', error);
            }
        }

      //User profile API call
      function getUserTopArtists(access_token, term){
        try{
              $.ajax({
                  url: 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range='+ term,
                  headers: {
                    'Authorization': 'Bearer ' + access_token
                  },
                  success: function(response) {
                    let userTopArtistsSource = document.getElementById('user-top-artists-details').innerHTML,
                    userTopArtistsTemplate = Handlebars.compile(userTopArtistsSource),
                    userTopArtistsPlaceholder = document.getElementById('user-top-artists');
          
                    userTopArtistsPlaceholder.innerHTML = userTopArtistsTemplate(response);
                    findPopularityArtistsJSON(response.items)
                    findGenresJSON(response.items)
                    $('#selectionsComplete').show();
                  }
              });
            }
            catch (error){
              console.error('Error accessing innerHTML:', error);
            }
      } 