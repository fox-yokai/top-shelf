$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // let userid = 0;

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    //  userid = data.id;
    //  console.log('userid = ' + userid)
  });

  $.get('/api/wines/UserID/1').then(response => {
    console.log(response)
    // for (let i = 0; i < response.length; i++) {
    //   const { name, variety, location, color, winery, year, numBottes, UserID, id } = response[i];
    //   const bookDetailLink = $(`<a href=/bookDetail/${id}>`)
    //   const card = $('<div class="card">').addClass('card');
    //   const bookCover = $('<img class="img-thumbnail float-left book-image">').attr('src', coverPhoto)

    //   const cardBody = $('<div>').addClass('card-body');
    //   const bookTitle = $('<h4 class="card-title text-center">').text(title);
    //   const author = $('<p class="card-text">').text(`Author: ${firstName} ${lastName}`);

    //   bookTitle.append(author)
    //   bookDetailLink.append(bookCover)
    //   cardBody.append(bookDetailLink, bookTitle)
    //   card.append(cardBody);
    //   $('#books').append(card)
    // }
  })

});
