//get first n items from Handlebars, reduces API calls
Handlebars.registerHelper('topItemsInResults', function (from, to, context, options){
    var item = "";
    for (var i = from, j = to; i < j; i++) {
        item = item + options.fn(context[i]);
    }
    return item;
});        

//for token authentication 
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

//sort through an object and pick the largest ones based off num provided
function pickHighestAndSort(obj, num){
    const requiredObj = {};
    if(num > Object.keys(obj).length){
       return false;
    };
    Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) =>
    {
       if(ind < num){
          requiredObj[key] = obj[key];
       }
    });
    let sortedObject = Object.entries(requiredObj).sort(([,a],[,b]) => b-a)
    return Object.values(sortedObject);
}

function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}

//Forcefully reload script tags after first use
function reloadScript(scriptTag) {
    if(document.getElementById(scriptTag) == null){
    var scriptElement = document.createElement('script');
    scriptElement.id = scriptTag;
    if(scriptTag == 'user-profile-template'){
        scriptElement.innerHTML = `<div class="future-cop">
        <p class="future" id="mostListenedToGenre" style = "float: left;">
        </p>
    </div>
  <div class ="row" style ="margin-right: 0px; margin-left: 0px">
    <div class ="col" style ="margin-right: 0px; margin-left: 0px">
    <div>
      <a href ="{{this.external_urls.spotify}}" target="_blank">
        <img id = "profilePic" src="{{images.0.url}}" class="box box3">
        </a>
    </div>
      </div>  
    <div class ="col" style ="margin-right: 0px; margin-left: 0px; width:100%">
      <p class= "all-about-name" id ="topGenresBox">
        <a href ="{{this.external_urls.spotify}}" target="_blank" style ="color: #EB219B;">
        {{display_name}}
        </a>
      </p>
        <div class ="row" style="text-align: center; margin-right: 15px; margin-left: 15px; ">
          <div class ="row" id ="topGenresBox">
            <h3 id ="colHead" style="width:100%">Most Listened to Genres
              <div id="topGenres">
              </div>
            </h3>
          </div>
        </div>
        </div>
      </div>`
    }
    if(scriptTag == 'user-top-tracks-details'){
        scriptElement.innerHTML = `<div class ="row">          
        <h3 id ="colHead">Your Overall Track Popularity
      </h3>
    <div class = "col" id="topTracksPopularity">
    </div>
  </div>                
  <h3 id ="colHead" >Top Songs</h3>
    {{#topItemsInResults 0 5 items}}
    <figure style ="display:inline-block; margin-right: 0px; margin-left: 0px; padding:2px; margin: 0 0 0rem;">
      <a href ="{{this.external_urls.spotify}}" target="_blank">
        <img src="{{this.album.images.0.url}}" id ="covers" class="box box3">
      </a>                 
      <a href ="{{this.external_urls.spotify}}" target="_blank" style="color: black;">
        <figcaption style="padding:2px"><b>{{this.name}}</b> {{this.artists.0.name}}</figcaption>
    </a>
      {{/topItemsInResults}}
    </figure>`
    }
    if(scriptTag == 'user-top-artists-details'){
        scriptElement.innerHTML = `<div class ="row">          
        <h3 id ="colHead">Your Overall Artist Popularity</h3>
        <div class = "col" id="topArtistsPopularity">
        </div>
      </div>                       
      <h3 id ="colHead">
        Top Artists
      </h3>
      {{#topItemsInResults 0 5 items}}
      <figure style ="display:inline-block; margin-right: 0px; margin-left: 0px; padding:2px; margin: 0 0 0rem;">
        <a href ="{{this.external_urls.spotify}}" target="_blank">
        <img src="{{this.images.0.url}}" id ="covers" class="box box3" style="float: right">    
        </a>               
        <a href ="{{this.external_urls.spotify}}" target="_blank" style="color: black;">
          <figcaption style="padding:2px"><b>{{this.name}}</b></figcaption>
        </a>
        {{/topItemsInResults}}
      </figure>`
    }
    document.head.appendChild(scriptElement);
    }
   }