var client = contentful.createClient({
  accessToken: myAccessToken,
  space: mySpaceId
})

var context = {
  taps: []
};

Handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});

function sortByTapNumber(items) {
  items.sort(function (a, b) {
    if (a.fields.tap > b.fields.tap) {
      return 1;
    }
    if (a.fields.tap < b.fields.tap) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
};

client.getEntries({
  'content_type': 'beer',
  'fields.onTap': true
})
  .then(function (entries) {
    // Log entry for each published entry
    entries.items.forEach(function (entry) {
      context.taps.push(entry);
    })
    sortByTapNumber(context.taps);
    console.table(context);
    renderView();
  });

function renderView() {
  // Render Handlebars views
  var mainContent = tapdat.templates.main(context);
  document.getElementById('content').innerHTML = mainContent;
}