$(document).ready(function () {

  // variables for add wine function
  var wineName = $("input#wine-name");
  var wineVariety = $("select#wine-variety");
  var wineLocation = $("input#wine-location");
  var wineColor = $("input#wine-color");
  var wineVintage = $("input#wine-year");
  var winery = $("input#winery");
  var numBottles = $("input#numBottles");

   // button event to add new wine
   $("form.add-wine").on("submit", function(event){
    event.preventDefault();
    var wineData = {
      name: wineName.val(),
      variety: wineVariety.children("option").filter(":selected").text(),
      location: wineLocation.val(),
      color: wineColor.val(),
      winery: winery.val(),
      year: wineVintage.val(),
      numBottles: numBottles.val()
    };
    console.log(wineData)
    addWine(wineData.name, wineData.variety, wineData.location, wineData.color, wineData.winery, wineData.year, wineData.numBottles);
  

  });

  function addWine(name, variety, location, color, winery, year, numBottles){
    console.log("adding wine...")
    $.post("/api/wine", {
      name: name,
      variety: variety,
      location: location,
      color: color,
      winery: winery,
      year: year,
      numBottles: numBottles
    })
    .then(function(){
      $("#add-wine-form").hide();
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