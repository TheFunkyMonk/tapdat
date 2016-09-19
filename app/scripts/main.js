var client = contentful.createClient({
  accessToken: myAccessToken,
  space: mySpaceId
})

var context = {
  taps: []
};

client.getEntries()
  .then(function (entries) {
    // Log entry for each published entry
    entries.items.forEach(function (entry) {
      context.taps.push(entry);
    })
    renderView();
  });

function renderView() {
  // Render Handlebars views
  var mainContent = tapdat.templates.main(context);
  document.getElementById('content').innerHTML = mainContent;
}