$(document).ready(function () {

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

    function showNotes(wineid) {
        var notesList = $(".note-container .note-group");
        notesList.empty(); // prevents duplications appearing
        $.get('/api/notes/WineId/' + wineid)
            .then(response => {
                // console.log(wineid)
                console.log(response)
                for (let i = 0; i < response.length; i++) {
                    const { id, note, WineId } = response[i];
                    // console.log('wine id:  ' + id)
                    var li = $("<li class='list-group-item'>");
                    var div1 = $("<div>").append(response[i].note)
                    li.append(div1);
                    notesList.append(li);
                }


            })
    }

    $(document).on('click', '.moreBtn', function () {
        event.preventDefault();
        $("#show-wine-details").show();
        var wineid = this.id
        // console.log('wineid:  ' + wineid)
        showWineDetails(wineid)
        showNotes(wineid)
    })

});