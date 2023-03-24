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

function reloadScript(scriptTag) {
    if(document.getElementById(scriptTag) == null){
    var scriptElement = document.createElement('script');
    scriptElement.id = scriptTag;
    if(scriptTag == 'user-profile-template'){
        scriptElement.innerHTML = `<div class="subhead">
        <span class="headline hl11">All About {{display_name}}</span><br>
        <img src="{{images.0.url}}">`
    }
    if(scriptTag == 'user-top-tracks-details'){
        scriptElement.innerHTML = `<div class="head">
        <span class="headline hl3">Top Songs Over Selected Period</span>
      </div>                  
      {{#topItemsInResults 0 5 items}}
          <img src="{{this.album.images.0.url}}" style="height: 110px; width: 110px">
          <h3>{{this.name}}</h3>
          <p>{{this.artists.0.name}}</p>
        {{/topItemsInResults}}`
    }
    if(scriptTag == 'user-top-artists-details'){
        scriptElement.innerHTML = `<div class="head">
        <span id class="headline hl3">Top Artists Over Selected Period</span>
      </div>                  
      {{#topItemsInResults 0 5 items}}
          <img src="{{this.images.0.url}}" style="height: 110px; width: 110px">
          <h3>{{this.name}}</h3>
          <p>{{this.genres}}</p>
        {{/topItemsInResults}}`
    }
    document.head.appendChild(scriptElement);
    }
   }