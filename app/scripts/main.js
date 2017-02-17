var socket 	= io.connect('http://localhost:8080');

var client = contentful.createClient({
  accessToken: myAccessToken,
  space: mySpaceId
})

// Set number of taps here
var tapCount = 4;

var context = {
  taps: [],
  pints: 0
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
        if (entry.sys.contentType.sys.id === 'coffee') { entry.coffee = true; }
        if (entry.sys.contentType.sys.id === 'cider') { entry.cider = true; }
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

socket.on('pour done', function (data) {
    console.log('received pour done');
    var time = data.value / 1000,
        pints = time * 0.098827933;

    console.log('using round', Math.round(pints * 100) / 100);
    console.log('not rounded ', pints);
    context.pints = Math.round(pints * 100) / 100;
    // context.pints = pints;
    renderView();
	});
