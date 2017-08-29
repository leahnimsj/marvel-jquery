//self invoking function to control scope
(function(){

  //code in here wont run until the DOM is loaded
  $(function(){

    //initialize some variables for the DOM items of interest
    let searchButton = $("#searchButton");
    let searchTerm = $("#searchTerm");
    let characterList = $("#characterList");



    //initialize character endpoint for use with the application
    let characterUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=YOURPUBLICKEYHERE&hash=YOURHASHHERE"

    function getCharacters(url){
      //make a get AJAX request using the character URL to get the data from the API
      $.get(url, function(data){

        //pull just the characters out of the API response and store in a variable
        let characters = data.data.results;

        //empty out table body before trying to add hero rows.
        characterList.html("");

        //loop over each character using $.each from jquery
        //@see http://api.jquery.com/jquery.each/
        $.each(characters, function(index, character){

          //append a new row to the tbody of the table (id: charaterList) for each character
          characterList.append(`
            <tr>
              <td>
                <a data-characterid="${character.id}" class="characterName" href="#">${character.name}</a>
              </td>
              <td>
                <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" alt="${character.name}">
              </td>
            </tr>
            `)
        })
      })
    }

    getCharacters(characterUrl);

    searchButton.click(function(event){

      //wtf: @see http://api.jquery.com/click/ <--look at the handler parameter
      //prevents the default behavior that would typically happen when you click the button
      //in this case it prevents the form from submitting
      event.preventDefault();

      //initialize a variable for the search URL
      let searchURL = characterUrl;

      //if the search term is provided then append it to the end of the search URL
      if(searchTerm.val() !== ""){
        searchURL += "&nameStartsWith=" + searchTerm.val()
      }

      //get characters based on the new url
      getCharacters(searchURL);
    })

    //listen to the characterList and add a click event to the hero name
    //$(this) represents the actual character name you clicked on
    characterList.on("click", ".characterName", function(e){
      e.preventDefault();
      alert($(this).data("characterid"))
    })

  })

})();
