$(document).ready(function () {

    function showWineDetails(wineid) {
        // console.log('in showWineDetails wineid = ' + wineid)
        var wineDetails = $(".wine-container .wineDetails");
        wineDetails.empty(); // prevents duplications appearing
        $.get('/api/wine/' + wineid)
            .then(response => {
                // const { id, name, variety, location, color, winery, year, numBottles, UserId } = response;
                // to dynamically create the button just not quite working
                var rateBtn = $("<Button>").attr({ type: "button", class: "btn btn-primary btn-sm", id: "rateBtnA", value: wineid }).attr('data-toggle', "modal").attr('data-target', '#winerating').append("Rate & Review");
                var addNotesBtn = $("<Button>").attr({ type: "button", class: "btn btn-primary btn-sm right", id: "notesBtnA", value: wineid }).attr('data-toggle', "modal").attr('data-target', '#notesModalCenter').append("Add tasting notes");
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
                wineDetails.append(div1, div2, div3, div4).append(rateBtn).append(addNotesBtn);
            })
    }

    function showRatingReview(wineid) {
        $("#show-rating-review").show();
        var ratingReview = $(".ratingReview");
        ratingReview.empty(); // prevents duplications appearing
        $.get('/api/rating_review/WineID/' + wineid)
            .then(response => {
                // console.log(wineid)
                console.log(response)
                // var ratingReviewId = response[0].id
                // console.log("rrid:  " + ratingReviewId)
                ratingReview.attr("id", response[0].id)
                var div1 = $("<div>").append("Rating:  ", response[0].rating)
                var div2 = $("<div>").append("Review:  ", response[0].review)
                var hr = $("<hr>")
                ratingReview.append(div1, div2, hr);
            })
    }

    function showNotes(wineid) {
        $("#show-notes").show();
        var notesList = $(".note-container .list-group");
        notesList.empty(); // prevents duplications appearing
        $.get('/api/notes/WineId/' + wineid)
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    var noteid = response[i].id;
                    var note = response[i].note;
                    var noteBtn = $("<button type='button' class='btn btn-outline-secondary btn-sm noteBtn'></button>");
                    noteBtn.attr("id", noteid)
                    noteBtn.text(note)
                    notesList.append(noteBtn);
                }
            })
    };




    $("#addNoteSaveBtn").on("click", function (event, wineid) {
        var settings = {
            "url": "/api/note",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "connect.sid=s%3AUjTf6jGQsqG-pyDj8b0ox_Uj8rG0B2Dg.6D7aYxKOBQSMv35DqVZvebjxsE6IbmZ0IFaKoKSAaW0"
            },
            "data": {
                "note": $("#wineNotesTxtArea").val(),
                "WineId": $(rateBtnA).val(),
            }
        };

        $.ajax(settings).done(function (response) {
            showNotes($(rateBtnA).val());
            return

        });
    });

    function reviseRatingReview(ratingReviewId) {
        console.log('in reviseRatingReview()')
        console.log(ratingReviewId)
    }

    $(document).on('click', '.moreBtn', function () {
        event.preventDefault();
        $("#show-wine-details").show();
        var wineid = this.id
        // console.log('wineid:  ' + wineid)
        showWineDetails(wineid)
        showRatingReview(wineid)
        showNotes(wineid)
    });

    $(document).on('click', '.ratingReview', function () {
        event.preventDefault();
        var rateReviewId = this.id
        reviseRatingReview(rateReviewId)
        // saves the rating
        $("#wineReviewBtn").on("click", function (event) {
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
                showWineDetails($(rateBtnA).val());
                showNotes($(rateBtnA).val());
                return
            });
        });



    });
});