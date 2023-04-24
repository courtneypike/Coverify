/**
 * Developed By: Courtney Pike
 *
 */

//Parsing through JSON Array of top tracks to find popularity index and appending it to div
function findPopularityTracksJSON(data){
  var mainContainer = document.getElementById("topTracksPopularity");
  mainContainer.innerHTML = ''
  let userTotalPopularity = 0
  let overallTotalPopularity = 0
  let div 

  for (var i = 0; i < data.length; i++) {
    div = document.createElement("div");
    let popularity= data[i].popularity
    userTotalPopularity += popularity;
    overallTotalPopularity += 100;
    mainContainer.appendChild(div);
  }
  
  userTotalPopularity = userTotalPopularity/data.length
  overallTotalPopularity = overallTotalPopularity/data.length

  if(isNaN(overallTotalPopularity) == false){

  div.innerHTML = 
  `<div class ="row"><h3 id ="colHead">
  <span style="font-size: 0.7rem"> Your Tracks Rank
  <span style="color: black; font-size: 0.9rem">` 
  + Math.trunc(userTotalPopularity) + '</span> out of <span style="color: black; font-size: 0.9rem">' + overallTotalPopularity + 
  `</span> in Popularity</span></h3></div>`
  mainContainer.appendChild(div);
  }
  else{
    let logginContainer = document.getElementById("loggedin");
    logginContainer.innerHTML = '<p>There was an error in fetching your Spotify information. Please click the Coverify Logo to refresh your session and try again.</p>'
  }
}

//Parsing through JSON Array of top artists to find popularity index and appending it to div
function findPopularityArtistsJSON(data){
  var mainContainer = document.getElementById("topArtistsPopularity");
  mainContainer.innerHTML = ''
  let userTotalPopularity = 0
  let overallTotalPopularity = 0
  let div = document.createElement("div");
          for (var i = 0; i < data.length; i++) {
            let popularity= data[i].popularity
            userTotalPopularity += popularity;
            overallTotalPopularity += 100;
          }
  userTotalPopularity = userTotalPopularity/data.length
  overallTotalPopularity = overallTotalPopularity/data.length
  if(isNaN(overallTotalPopularity) == false){
  div.innerHTML = 
  `<div class ="row"><h3 id ="colHead">
  <span style="font-size: 0.7rem"> Your Artists Rank
  <span style="color: black; font-size: 0.9rem">` 
  + Math.trunc(userTotalPopularity) + '</span> out of <span style="color: black; font-size: 0.9rem">' + overallTotalPopularity + 
  `</span> in Popularity</span></h3></div>`
  mainContainer.appendChild(div);
  } 
  else{
    let logginContainer = document.getElementById("loggedin");
    logginContainer.innerHTML = '<p>There was an error in fetching your Spotify information. Please click the Coverify Logo to refresh your session and try again.</p>'
  }
}

//Finding most listened to genres for title of magazine and section on most listened to genres
function findGenresJSON(data){
    let titleMainContainer = document.getElementById("mostListenedToGenre");
    titleMainContainer.innerHTML = ''
    let titleDiv = document.createElement("div");
    let mainContainer = document.getElementById("topGenres");
    mainContainer.innerHTML = ''
    let div = document.createElement("div");
    let allGenres = []

    if(data.length > 1){
      for (let i = 0; i < data.length; i++) {
        let artistGenres = data[i].genres
        for (let j = 0; j < artistGenres.length; j++) {
          allGenres.push(artistGenres[j])
      }
    }

    let counter = {}
      for (element of allGenres.flat()) {
        if (counter[element]) {
            counter[element] += 1;
        } else {
            counter[element] = 1;
        }
      };

    topGenres = pickHighestAndSort(counter,5)
    let genre
    let firstGenre

    for (var i = 0; i < topGenres.length; i++) {
      let genreArray = topGenres[i]
      let genreFirstItem = genreArray[0]
      if(i ==0){
        genre = genreFirstItem
        firstGenre = genreFirstItem 
      }
      else{
        genre = genre + ', ' + genreFirstItem
      }
      }
    //top 5 genres
    div.innerHTML = genre
    mainContainer.appendChild(div);

    //top all time genre
    titleDiv.innerHTML = firstGenre
    titleMainContainer.appendChild(titleDiv);
    }
    else {
      let logginContainer = document.getElementById("loggedin");
      logginContainer.innerHTML = '<p>There was an error in fetching your Spotify information. Please click the Coverify Logo to refresh your session and try again.</p>'
    }
}

