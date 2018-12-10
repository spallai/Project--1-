var recipeBaseUrl = "https://api.edamam.com/search?&app_id=c3d07cfd&app_key=2a58703995fceba093b9313f0c1ee00e&from=0&to=3&calories=591-722&health=alcohol-free&q="
console.log(recipeBaseUrl);

var recipeTerm = "";

$("#submit").on("click", function(event) {
    event.preventDefault();
    recipeTerm = $("#search").val().trim();
    var recipeSearchURL = recipeBaseUrl + recipeTerm;
    console.log(recipeSearchURL);
});

