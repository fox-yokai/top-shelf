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
        console.log('in showWineDetails wineid = ' + wineid)
        var wineDetails = $(".wine-container .wineDetails");
        wineDetails.empty(); // prevents duplications appearing
        $.get('/api/wine/' + wineid)
            .then(response => {
                // const { id, name, variety, location, color, winery, year, numBottles, UserId } = response;
                // to dynamically create the button just not quite working
                var rateBtn = $("<Button>").attr({type: "button", class: "btn btn-primary"}).attr('data-toggle', "modal").attr('data-target', '#winerating').val("Rate & Review").html("</button>");
                var span1 = $("<span>").append("Name:  ", response.name)
                wineDetails.append(span1).append(rateBtn)
            })
    }

    $(document).on('click', '.moreBtn', function () {
        event.preventDefault();
        $("#show-wine-details").show();
        var wineid = this.id
        console.log('wineid:  ' + wineid)
        showWineDetails(wineid)

    })

});