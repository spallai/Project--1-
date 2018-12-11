var recipeBaseUrl = "https://api.edamam.com/search?&app_id=c3d07cfd&app_key=2a58703995fceba093b9313f0c1ee00e&from=0&to=4&q="
console.log(recipeBaseUrl);
var searchTerm = "";

$("#submit").on("click", searchRecipe);

$("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search").click();
    }
});



function searchRecipe(event) {
    event.preventDefault();
    searchTerm = $("#search").val().trim();
    var recipeSearchURL = recipeBaseUrl + searchTerm;

    $.ajax({
        url: recipeSearchURL,
        method: "GET"
    }).then(function (response) {
        var results = response.hits;
        console.log(response);

        $("#leftCol").empty();
       
        for (i = 0; i < results.length; i++) {
            console.log(results[i]);

            //EXAMPLE
            var recipeDiv = $("<div>").addClass("recipe");
            
            var recipeLabel = $("<h3>").addClass("label");
            recipeLabel.text(results[i].recipe.label);
            
            var recipeImage = $("<img>").addClass("image");
            recipeImage.attr("src", results[i].recipe.image);
            
            var recipeURL = $("<a>").addClass("url");
            recipeURL.attr({
                href: results[i].recipe.url,
                target: "_blank"
            });
            
            recipeURL.text("Recipe Link");
            
            recipeDiv.append(recipeLabel);
            recipeDiv.append(recipeImage);
            recipeDiv.append(recipeURL);
            $("#recipeContainer").append(recipeDiv);
            
        }
        $("#search").val("");
    })

}