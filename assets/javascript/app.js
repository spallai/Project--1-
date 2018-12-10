var recipeBaseUrl = "https://api.edamam.com/search?&app_id=c3d07cfd&app_key=2a58703995fceba093b9313f0c1ee00e&from=0&to=4&q="
console.log(recipeBaseUrl);


$("#submit").on("click", searchRecipe);



function searchRecipe(event) {
    event.preventDefault();
    var recipeTerm = $("#search").val().trim();
    var recipeSearchURL = recipeBaseUrl + recipeTerm;

    $.ajax({
        url: recipeSearchURL,
        method: "GET"
    }).then(function (response) {
        var results = response.hits;
        console.log(response);

        for (i = 0; i < results.length; i++) {
            console.log(results[i]);


            //EXAMPLE

        

        }
    })

}