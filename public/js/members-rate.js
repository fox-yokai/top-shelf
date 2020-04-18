$(document).ready(function () {
    $("#wineReviewBtn").on("click", function(event){
        var settings = {
            "url": "/api/rating_review",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
              "rating": $("#wineRatingRtg").val(),
              "review": $("#wineReviewText").val(),
              "WineId": $(rateBtnA).val()
            }
          };
          
          $.ajax(settings).done(function (response) {
              // in the future this should just clear and close the modal
                window.location = "/members";
          });
        });




});