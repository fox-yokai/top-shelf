$(document).ready(function () {
    // .get("/api/user_data").then(function (data) {
    //     $(".member-name").text(data.email);
    //     var userid = data.id;
    //     // console.log(data.id);
    //     $("#user-name").attr("data-user-id", data.id);
    // var WineId = $("#user-name").attr("data-user-id");
    // console.log('in showDetails 3:  ' + WineId)
    // shows the add wine panel

    function showWineDetails(wineid) {
        // console.log('in showWineDetails wineid = ' + wineid)
        var wineDetails = $(".wine-container .wineDetails");
        wineDetails.empty(); // prevents duplications appearing
        $.get('/api/wine/' + wineid)
            .then(response => {
                // const { id, name, variety, location, color, winery, year, numBottles, UserId } = response;
                // to dynamically create the button just not quite working
                console.log("wine details ID:", wineid)
                var rateBtn = $("<Button>").attr({ type: "button", class: "btn btn-primary btn-sm", id: "rateBtnA",value: wineid }).attr('data-toggle', "modal").attr('data-target', '#winerating').append("Rate & Review");
                var span1 = $("<span>").append("Name:  ", response[0].name)
                var span2 = $("<span class='right'>").append("Variety:  ", response[0].variety)
                var div1 = $("<div>").append(span1, span2)
                var span1 = $("<span>").append("Location:  ", response[0].location)
                var span2 = $("<span class='right'>").append("Color:  ", response[0].color)
                var div2 = $("<div>").append(span1, span2)
                var span1 = $("<span>").append("Winery:  ", response[0].winery)
                var span2 = $("<span class='right'>").append("Year:  ", response[0].year)
                var div3 = $("<div>").append(span1, span2)
                var span1 = $("<span>").append("Number of bottles:  ", response[0].numBottles)
                var div4 = $("<div>").append(span1)
                wineDetails.append(div1, div2, div3, div4).append(rateBtn)
            })
    }

    $(document).on('click', '.moreBtn', function () {
        event.preventDefault();
        $("#show-wine-details").show();
        var wineid = this.id
        // console.log('wineid:  ' + wineid)
        showWineDetails(wineid)

    })

});