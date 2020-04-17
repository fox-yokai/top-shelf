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
          // var $name = response[i].name;
          var $div1 = $("<div>").append("Name:  ", response[i].name)
          // $div1.append.($name);
          var $div2 = $("<div>").append("Year:  ", response[i].year);
          var $div3 = $("<div>").append("Winery:  ", response[i].winery);
          $li.append($div1, $div2, $div3);
          $noteList.append($li);

        }
      })
  });



});
