$(document).ready(function () {
  var $noteList = $(".list-container .list-group");
  // let userid = 2;
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    let userid = data.id;
    console.log("7 userid:  " + userid)
    $.get('/api/wines/UserID/' + userid)
      .then(response => {
        console.log('userid = ' + userid)
        console.log(response)
        console.log("response length: " + response.length)
        for (let i = 0; i < response.length; i++) {
          console.log(response[i].name)
          const { id, name, variety, location, color, winery, year, numBottles, UserId } = response[i];
          // $('#wine-name').text(name);
          // $('#wine-variety').text(variety);
          // create a new li element with class="list-group-item"
          var $li = $("<li class='list-group-item'>");
          // add the attribut id="i" to apply a unique id to each li element
          $li.attr("id", i);
          //  create a span element to hold the title of the note
          var $span1 = $("<span>").text(name);
          var $span2 = $("<span>").text(year);
          var $span3 = $("<span>").text(winery);
          $li.append($span1, $span2, $span3);
          $noteList.append($li);

        }
      })
  });



});
