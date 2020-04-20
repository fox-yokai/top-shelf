$(document).ready(function () {

    function showWineList(userid) {
        // console.log('in showWineList  ' + userid)
        var wineList = $(".list-container .list-group");
        wineList.empty();
        var wineid = 0;
        $.get('/api/wines/UserID/' + userid)
            .then(response => {
                for (let i = 0; i < response.length; i++) {
                    const { id, name, variety, location, color, winery, year, numBottles, UserId } = response[i];
                    console.log('wine id:  ' + id)
                    wineid = id;
                    var $moreBtn = $("<button type='button' class='btn btn-info btn-sm moreBtn'>More</button>")
                    var $li = $("<li class='list-group-item'>");
                    $moreBtn.attr("id", id);
                    var $div1 = $("<div>").append("Name:  ", response[i].name)
                    var $div2 = $("<div>").append("Year:  ", response[i].year);
                    var $div3 = $("<div>").append("Winery:  ", response[i].winery);
                    var $div4 = $("<div>").append($moreBtn)
                    var hr = $("<hr>")
                    $li.append($div1, $div2, $div3, $div4, hr);
                    wineList.append($li);
                }
                showWineDetails(wineid)

            })
    }

    function showWineDetails(wineid) {
        $("#show-wine-details").show();
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
        // console.log('in showRR:  ' + wineid)
        var ratingReview = $(".ratingReview");
        ratingReview.empty(); // prevents duplications appearing
        $.get('/api/rating_review/WineID/' + wineid)
            .then(response => {
                // console.log(wineid)
                console.log(response)
                // var ratingReviewId = response[0].id
                // console.log("rrid:  " + ratingReviewId)
                if (!response[0]) {
                    $("#show-rating-review").hide();
                } else {
                    ratingReview.attr("id", response[0].id)
                    var div1 = $("<div>").append("Rating:  ", response[0].rating)
                    var div2 = $("<div>").append("Review:  ", response[0].review)
                    var hr = $("<hr>")
                    ratingReview.append(div1, div2, hr);
                }
            })
    }

    function showNotes(wineid) {
        $("#show-notes").show();
        var notesList = $(".note-container .list-group");
        notesList.empty(); // prevents duplications appearing
        $.get('/api/notes/WineId/' + wineid)
            .then(response => {
                if (!response[0]) {
                    $("#show-notes").hide();
                }
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




    $("#addNoteSaveBtn").on("click", function (event) {
        var wineid = $(rateBtnA).val()
        console.log('in addnote wineid= ' + wineid)
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

    function addRatingReview(rating, review, wineid) {
        console.log('in addRatingReview()')
        console.log(wineid + "  " + rating + "  " + review)
        // var ratingReview = $(".ratingReview");
        // ratingReview.empty();
        $.post("/api/rating_review", {
            rating: rating,
            review: review,
            WineId: wineid
        })
            .then(function () {
                showWineDetails(wineid)
                showNotes(wineid)
                showRatingReview(wineid)
            })
        // .catch(function (err) {
        //     throw err;
        // });

    }

    $(document).on('click', '.moreBtn', function () {
        event.preventDefault();
        // $("#show-wine-details").show();
        var wineid = this.id
        // console.log('wineid:  ' + wineid)
        showWineDetails(wineid)
        showNotes(wineid)
        showRatingReview(wineid)

    });

    $(".closeBtn").on("click", function () {
        event.preventDefault();
        $("#show-wine-details").hide();
    });


    $("#wineReviewBtn").on("click", function (event) {
        event.preventDefault();
        // var wineid = this.id
        var wineid = $(rateBtnA).val()
        var rating = $("#wineRatingRtg").val()
        var review = $("#wineReviewText").val()
        console.log('in addRR wineid= ' + wineid + "  rating: " + rating + " review: " + review)
        addRatingReview(rating, review, wineid)
    });

    // button event to add new wine
    $(document).on('click', '#addWineSaveBtn', function (event) {
        event.preventDefault();
        console.log('in addwine EL')
        var wineName = $("input#wine-name");
        var wineVariety = $("select#wine-variety");
        var wineLocation = $("input#wine-location");
        var wineColor = $("input#wine-color");
        var wineVintage = $("input#wine-year");
        var winery = $("input#winery");
        var numBottles = $("input#numBottles");
        var UserId = $("#user-name").attr("data-user-id");
        console.log(UserId);

        var wineData = {
            name: wineName.val(),
            variety: wineVariety.children("option").filter(":selected").text(),
            location: wineLocation.val(),
            color: wineColor.val(),
            winery: winery.val(),
            year: wineVintage.val(),
            numBottles: numBottles.val(),
            UserId: UserId

        };
        console.log(wineData)
        addWine(wineData.name, wineData.variety, wineData.location, wineData.color, wineData.winery, wineData.year, wineData.numBottles, wineData.UserId);


    });

    function addWine(name, variety, location, color, winery, year, numBottles, UserId) {
        console.log("adding wine..." + UserId)

        $.post("/api/wine", {
            name: name,
            variety: variety,
            location: location,
            color: color,
            winery: winery,
            year: year,
            numBottles: numBottles,
            UserId: UserId
        })
            .then(function () {
                console.log(UserId)
                showWineList(UserId)

                // showWineDetails(wineid)
                // showNotes(wineid)
                // showRatingReview(wineid)
            })
        // .catch(function (err) {
        //   throw err;
        // });

    };


});