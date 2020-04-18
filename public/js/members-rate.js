$(document).ready(function () {
  console.log('LISTENTING')
    $("#wineReviewBtn").on("click", function(event){
        event.preventDefault();
        console.log("Save was clicked on");
        var settings = {
            // change before pushing to master
            "url": "/api/rating_review",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "rating": $("#wineRating").val(),
              "review": $("#wineReview").text(),
              // WineId set to 1 for testing
              "WineId": "1"
            }
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        });




});