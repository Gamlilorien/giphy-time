// ********** VARIABLES
    // we want an array of superheroes titled 'topics'
    var topics = [
        "Superman",
        "Batman",
        "Aquaman",
        "Spiderman",
        "Wolverine",
        "Thor",
        "TMNT"
    ];

    //we want a way to save the returned giphy results for later parsing
    var giphyResults = {};

//********** FUNCTIONS
    //Buttons get rebuilt each time so we need a function
    function createButtons () {
        // first we need to empty the current giphs if any...
        $("#button-view").empty();

        // now loop through 'topics' array and make a button for each
        for (i =0; i < topics.length; i++) {
            //now create a new button element, assign it a css class, and label it with the array value
            var newButton = $("<button>");
            newButton = newButton.addClass("get-superhero").text(topics[i]);
            $("#button-view").append(newButton);
        }
    };

    function addNewButton () {
        //get the input VALUE as a variable. TRIM any excess spaces or characters
        var newSuperhero = $("#superhero-input").val().trim();
        //don't forget to empty the form textbox after submiting
        $("#superhero-input").val("");
        //PUSH this new value to the 'topics' array
        topics.push(newSuperhero);
    };

//**************** GIPHY API
//Code for connecting to and parsing data from the Giphy API
//see https://developers.giphy.com/explorer/

//sample SEARCH request
// https://api.giphy.com/v1/gifs/search?api_key=pwoVnnT9lpebiS2XpkHvqJ1Ehl8Q1CnH&q=superman&limit=10&offset=0&rating=G&lang=en
    function parseGiphyResults() {
        //we want to loop through the results and grab the fixed width image, and image rating
        for (i = 0; 1 < giphyResults.length; i++) {
            //create new <img> element
            var still = giphyResults[i].images.fixed_height_still.url;
            var giff = giphyResults[i].images.fixed_height.url;
            //also add a "giff" class to it, the initial src url, and data-animate, data-still, and data-state attributes too.
            var newImg = $("<img>").addClass("giff").attr({"src": still, "data-animate": giff, "data-still": still, "data-state": "still"});
            console.log(newImg);

            //now add this image to the HTML
            $("#giphy-view").append(newImg);
        }
    };

    function displayGiffs() {

        //fist, clear previous images if any
        $("#giphy-view").empty();
        
        //define temp variables
        var method = "search";
        var apiKey = "pwoVnnT9lpebiS2XpkHvqJ1Ehl8Q1CnH";
        var search = $(this).text();

        var queryURL = "https://api.giphy.com/v1/gifs/" +method +"?api_key=" +apiKey +"&q=" +search +"&limit=10&offset=0&lang=en";
        // console.log(queryURL);

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            // console.log(response);
            //save results as global variable for parsing
            giphyResults = response.data;

            //now parse giphyResults and insert into the page
            //this NEEDS to be included here and not below due to the slight lag in response from the API. Otherwise it tries to immediately run and results in an error...
            parseGiphyResults();
        });

    };

    function toggleGiffs() {
        console.log(this);
        //we will toggle each giff to either STILL or ANIMATE
        var state = $(this).attr("data-state");
  
        if (state == "still") {
          console.log("still");
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate")
        }
  
        if (state == "animate") {
          console.log("animate");
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  
    };

//*********** ADD NEW BUTTON and CREATE BUTTONS
    // We need a onClick trigger for the +Add form button
    $("#add-superhero").on("click", function(event) {
        
        event.preventDefault(); // this prevents the html form from relaoding the page on submit
        //now add this new value to the 'topics' array, and then update the buttons
        addNewButton();

        createButtons();
    });


//Call the createButtons function automatically (ie when page loads)
    createButtons();


    // Adding click event listeners to all elements with a class of "get-superhero"
    // using $(".get-superhero").on("click", function(event) was inconsistent in use...
    $(document).on("click", ".get-superhero", displayGiffs);
    

    $(document).on("click", ".giff", toggleGiffs);
    // Again trying to use this DIDN'T work $(".gif").on("click", function() {
   