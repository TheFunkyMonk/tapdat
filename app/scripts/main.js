var client = contentful.createClient({
  accessToken: myAccessToken,
  space: mySpaceId
})

// Set number of taps here
var tapCount = 4;

var context = {
  taps: []
};

Handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; i++) {
    accum += block.fn(i);
  }
  return accum;
});

function formatAbv(entry) {
  if (entry.fields.abv < 10) {
    entry.fields.abv = entry.fields.abv.toFixed(1);
  } else {
    entry.fields.abv = Math.round(entry.fields.abv);
  }
}

function buildEmptyTaps(n) {
  for (var i = 0; i < n; i++) {
   context.taps[i] = {tap: i + 1, empty: true};
  }
};

client.getEntries({})
  .then(function (entries) {
    buildEmptyTaps(tapCount);
    entries.items.forEach(function (entry) {
      if (entry.fields.tap) {
        if (entry.fields.abv) { formatAbv(entry); }
        context.taps[entry.fields.tap - 1] = entry;
      }
    })
    console.table(context);
    renderView();
  });

function renderView() {
  // Render Handlebars views
  var mainContent = tapdat.templates.main(context);
  document.getElementById('content').innerHTML = mainContent;
}
