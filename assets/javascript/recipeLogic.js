var recipeBaseUrl = "https://api.edamam.com/search?&app_id=c3d07cfd&app_key=2a58703995fceba093b9313f0c1ee00e&from=0&to=4&q="
console.log(recipeBaseUrl);
var searchTerm = "";

$("#submit").on("click", searchRecipe);

// $(document).on("click",'[name="entree"] was created and given a function to call deleteMarker and searchMap from app.js. 
//What we changed in app.js on line 45 by turning it into a standalone function is what gives the ability to use both functions in recipeLogic


//When we click the element with name entree, which was added on line 47, it passes an event containing data about that element 
$(document).on("click",'[name="entree"]', function(event){//pass the event to that function
    console.log(event); //used to find data
    deleteMarkers(); //function from app.js
    searchMap(event.currentTarget.textContent);
    console.log(event.currentTarget.textContent);
    //where data for textContent registers and used the data from the event for app.js function
});//accessing data from click event to render to searchMap

// $("#submit").keyup(function(event) {
//     if (event.keyCode === 13) {
//         $("#submit").click();
//     }
    
// }); Don't need this piece of code, it does not work, "FOCUS" is making the enter button work

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

        $("#recipeContainer").empty();
       
        for (i = 0; i < results.length; i++) {
            console.log(results[i]);

            //EXAMPLE
            var recipeDiv = $("<div>").addClass("recipe");
            
            var recipeLabel = $("<h3>").addClass("label");
            recipeLabel.attr("name", "entree");
            recipeLabel.text(results[i].recipe.label);
            
            var recipeImage = $("<img>").addClass("image");
            recipeImage.attr("src", results[i].recipe.image);
            
            var recipeURL = $("<a>").addClass("url");
            recipeURL.attr({
                href: results[i].recipe.url,
                target: "_blank"
            });
            
            recipeURL.text("Recipe Link");
            
            recipeDiv.append(recipeImage);
            recipeDiv.append(recipeLabel);
            recipeDiv.append(recipeURL);
            $("#recipeContainer").append(recipeDiv);
           
        }
        $("#search").val("");
    })

}