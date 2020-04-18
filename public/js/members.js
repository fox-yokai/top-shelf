$(document).ready(function () {
  var $noteList = $(".list-container .list-group");
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    const userid = data.id;
    // console.log(data.id);
    $("#user-name").attr("data-user-id", data.id);
    $.get('/api/wines/UserID/' + userid)
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          // console.log(response[i].name)
          const { id, name, variety, location, color, winery, year, numBottles, UserId } = response[i];
          var $li = $("<li class='list-group-item'>");
          $li.attr("id", i);
          var $div1 = $("<div>").append("Name:  ", response[i].name)
          var $div2 = $("<div>").append("Year:  ", response[i].year);
          var $div3 = $("<div>").append("Winery:  ", response[i].winery);
          $li.append($div1, $div2, $div3);
          $noteList.append($li);

        }
      })
  });



});
