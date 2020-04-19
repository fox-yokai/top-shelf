$(document).ready(function () {
  var $wineList = $(".list-container .list-group");
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

    const userid = data.id;

    // console.log(data.id);
    $("#user-name").attr("data-user-id", data.id);
    $.get('/api/wines/UserID/' + userid)
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          const { id, name, variety, location, color, winery, year, numBottles, UserId } = response[i];
          // console.log('wine id:  ' + id)
          var $moreBtn = $("<button type='button' class='btn btn-info btn-sm moreBtn'>More</button>")
          var $li = $("<li class='list-group-item'>");
          $moreBtn.attr("id", id);
          var $div1 = $("<div>").append("Name:  ", response[i].name)
          var $div2 = $("<div>").append("Year:  ", response[i].year);
          var $div3 = $("<div>").append("Winery:  ", response[i].winery);
          var $div4 = $("<div>").append($moreBtn)
          var hr = $("<hr>")
          $li.append($div1, $div2, $div3, $div4, hr);
          $wineList.append($li);
        }
      })
  });



});
