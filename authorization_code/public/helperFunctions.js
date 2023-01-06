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