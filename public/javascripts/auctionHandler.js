$(document).ready(function() {  // jQuery Starts

  // User clicked on an edit button
  $(".editButton").click(function () {
    window.location.href = "/auction/" + $(this)[0].id;
  });

  // User clicked on a delete button
  $(".deleteButton").click(function () {
    var auctionItemId = $(this)[0].id;
    console.log("auctionItemId: ",auctionItemId);
    $.ajax({
      url: "/auction",
      method: "DELETE",
      data: {
        product_id: auctionItemId
      },
      success: function (response) {
        console.log("auctionItemId: ", auctionItemId);
        $('#'+auctionItemId).remove();  // Remove the DOM element on success
      }
    });
  });



});
