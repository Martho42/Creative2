let mal_id = -1;

function PopMain() {
    const url = "https://api.jikan.moe/v3/anime/" + mal_id;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            //console.log(json);
            
            console.log(json.image_url);
            console.log(json.genres);
            console.log(json.title_english);
            console.log(json.synopsis);

            let results = "";
            results += '<h2 class="main-item">' + json.title_english + "</h2>";
            //results += "<h3 class='main-item'>main</h3>";
            results += '<img class="main-item main-image" src="' + json.image_url + '"/>';
            results += "<p class='main-item'>";
            for (let i = 0; i < json.genres.length; i++) {
                results += json.genres[i].name;
                if (i !== json.genres.length - 1)
                    results += ", "
            }
            results += "</p>";
            results += '<p class="main-item">' + json.synopsis + "</p>";
            document.getElementById("mainResults").innerHTML = results;
        });

   document.getElementById("switches").style.visibility = "visible";
 
}

document.getElementById("mainSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("animeInput").value;
    if (value === "")
        return;
    console.log(value);
    const url1 = "https://api.jikan.moe/v3/search/anime?q=" + encodeURIComponent(value);
    console.log(url1);
    fetch(url1)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            mal_id = json.results[0].mal_id;
            console.log(mal_id);
        }).then(function() {
            PopMain();
            PopChars();
        });


});

function PopChars() {
    const url2 = "https://api.jikan.moe/v3/anime/" + mal_id + "/characters_staff";
    fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let result = "";
            for (let i = 0; i < json.characters.length; i++) {
                result += "<div class='info-grid-item'>"
                result += '<img class="info-item item-image" src="' + json.characters[i].image_url + '"/>';

                result += "<h4 class='info-item'>" + json.characters[i].name + "</h4>";
                result += '<p class="info-item">Role: ' + json.characters[i].role + "</p>";
                result += "</div>"
            }
            document.getElementById("infoResults").innerHTML = result;
        });
}

document.getElementById("charsButton").addEventListener("click", function (event) {
    event.preventDefault();
    if (mal_id === -1)
        return;
    PopChars();
});

document.getElementById("recsButton").addEventListener("click", function (event) {
    event.preventDefault();

    if (mal_id === -1)
        return;
    const url2 = "https://api.jikan.moe/v3/anime/" + mal_id + "/recommendations";
    fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let result = "";
            for (let i = 0; i < json.recommendations.length; i++) {
                result += "<div class='info-grid-item'>"
                result += '<img class="info-item item-image" src="' + json.recommendations[i].image_url + '"/>';

                result += "<h4 class='info-item'>" + json.recommendations[i].title + "</h4>";
                result += "<p class='info-item'>" +
                    "# of votes:</br>" + json.recommendations[i].recommendation_count + "</p>";
                result += "</div>"
            }
            document.getElementById("infoResults").innerHTML = result;
        });
});