
var GifArray =["lancer","office","cheese","spongebob","thanos","GOT"];

function getUserInput(){
	var userInput= $("#Gif-input").val().trim();
	console.log(userInput);
	return userInput;
}

function getQueryString(str){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    str + "&api_key=dc6zaTOxFJmzC&limit=25";
    console.log(queryURL);
    return queryURL;
}

function createButton(arr){
	$("#Gif").empty();
	for(var i =0; i< arr.length; i++){
		var GifButton = $("<button>");
		GifButton.addClass("giphy");
    GifButton.addClass("btn btn-primary");
		GifButton.attr("type","button");
		GifButton.attr("data-name",arr[i]);
		GifButton.text(arr[i]);
		$("#Gif").append(GifButton);
	}
}
createButton(GifArray);

$("#addGif").on("click",function(event){
	event.preventDefault();
	var userInput= getUserInput();
	GifArray.push(userInput);
	createButton(GifArray);
});

function giphInfo(){
	$("#gifs").empty();
	var myGif = $(this).attr("data-name");
	console.log(myGif);

	var queryString=getQueryString(myGif);

	$.ajax({
          url: queryString,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          var GifDiv = $("<div id=giphyGifsDiv>");

          for(var i=0;i<results.length; i++){

          	var GifImage = $("<img>");
            var GifImageDiv = $("<div id=imageDiv>");

            var ratingParagraph = $("<p>");
            ratingParagraph.attr("id","ratings");
            ratingParagraph.text(results[i].rating);

          	GifImage.attr('src',results[i].images.fixed_height_still.url);
          	GifImage.attr("data-state", "still");
          	GifImage.attr("data-still", results[i].images.fixed_height_still.url);
          	GifImage.attr("data-animate", results[i].images.fixed_height.url);
          	GifImage.addClass("GifGifs");

            GifImageDiv.append(ratingParagraph);
            GifImageDiv.append(GifImage);
            $("#gifs").append(GifImageDiv);
          }
      });
	}

    $(document).on("click", ".giphy", giphInfo);
    function clickedGifs(){
    $(".GifGifs").on("click", function(){
	var gifState = $(this).attr("data-state");
	
	if (gifState === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
}
$(document).on("click", ".GifGifs", clickedGifs);