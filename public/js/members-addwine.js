$(document).ready(function () {

   // button event to add new wine
   $("form.add-wine").on("submit", function(event){
    event.preventDefault();
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

  function addWine(name, variety, location, color, winery, year, numBottles, UserId){
    console.log("adding wine...")
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
    .then(function(){
      window.location = "/members";
    })
    .catch(function(err){
      throw err;
    });

  };


  // shows the add wine panel
  $(".show-add-wine-btn").click(function(){
    $("#add-wine-form").show();
  });

});