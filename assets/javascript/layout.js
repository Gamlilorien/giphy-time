// ********** VARIABLES
    // we want an array of superheroes titled 'topics'
    var topics = [
        "Superman",
        "Batman",
        "Aquaman",
        "Spiderman",
        "Groot"
    ];



//********** FUNCTIONS
    //Buttons get rebuilt each time so we need a function
    function createButtons () {
        // first we need to empty the current giphs if any...
        $("#button-view").empty();

        // now loop through 'topics' array and make a button for each
        for (i =0; i < topics.length; i++) {
            //now create a new button element, assign it a css class, and label it with the array value
            var newButton = $("<button>");
            newButton = newButton.addClass("add-superhero").text(topics[i]);
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

//*********** MAIN CODE
    // We need a onClick trigger for the +Add form button
    $("#add-superhero").on("click", function(event) {
        
        event.preventDefault(); // this prevents the html form from relaoding the page on submit
        //now add this new value to the 'topics' array, and then update the buttons
        addNewButton();

        createButtons();
    });


    //Call the createButtons function automatically (ie when page loads)
    createButtons();