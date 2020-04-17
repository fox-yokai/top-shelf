$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let userid = 0;
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    userid = data.id;

  });

  $.get('/api/wines/UserID/5')
    .then(response => {
      console.log('userid = ' + userid)
      console.log(response)
      console.log("response length: " + response.length)
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].name)
        const { id, name, variety, location, color, winery, year, numBottles, UserId } = response[i];
        $('#wine-name').text(name);
        $('#wine-variety').text(variety);


      }
    });

});
