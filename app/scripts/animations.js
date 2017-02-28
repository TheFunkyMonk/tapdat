var Animations = (function(){
  var index             = 0
    , loop_speed        = 4000
    , data              = null
    , tap_count         = null
    , tap_map           = []
    , count_up_options  = {
        suffix: '%'
      }

  function start(contentful_data) {
    data = contentful_data

    create_map()
    loopy()
  }

  function create_map() {
    // local var to help our tapMap
    var nodes = $('.tap')
    tap_count = nodes.length

    // for each tap datum
    data.forEach(function(data, i){
      // coffee item
      if (!data.fields.abv) {
        return tap_map[i] = {
          node: $(nodes[i])
        , data: data
        }
      }

      // tap item
      tap_map[i] = {
        node:     $(nodes[i])
      , data:     data
      , countup:  new CountUp(
          $(nodes[i]).find('.abv')[0]
          , 0
          , data.fields.abv
          , 1
          , 2
          , count_up_options
        )
      }
    })
  }

  function loopy(){
    setInterval(function(){
      var tap = tap_map[index]
      animate_title(tap)
      animate_tap(tap)
      animate_icons(tap)
      animate_bg(tap)
      set_index()
    }, loop_speed)
  }

  function set_index() {
    index = index == tap_count - 1 ? 0 : index + 1
  }

  function animate_coffee(tap) {
    tap.node
      .find('.description > span')
      .velocity('callout.pulse', { stagger: 100, drag: true })
  }

  function animate_tap(tap) {
    if (!tap.countup) {
      if (tap.data.coffee) animate_coffee(tap)
      return
    }

    tap.countup.reset()
    tap.countup.start()
  }

  function animate_icons(tap) {
    // coffee
    tap.node
      .find('.icons.beans > span:lt('+ tap.data.fields.level +')')
      .velocity('callout.pulse', { stagger: 100, drag: true, delay: 1300 })

    // cider
    tap.node
      .find('.icons.apple > span:lt('+ tap.data.fields.sweetness +')')
      .velocity('callout.pulse', { stagger: 100, drag: true, delay: 1300 })

    // hops
    tap.node
      .find('.icons.hops > span:lt('+ tap.data.fields.hoppiness +')')
      .velocity('callout.pulse', { stagger: 100, drag: true, delay: 1300 })

    // malt
    tap.node
      .find('.icons.malt > span:lt('+ tap.data.fields.maltiness +')')
      .velocity('callout.pulse', { stagger: 100, drag: true, delay: 1600 })
  }

  function animate_title(tap) {
    tap.node
      .find('.title-card')
      .velocity({
        translateY: ['-15%', [500, 20]]
      }, {
        duration: 1000,
        complete: function() {
          setTimeout(function(){
            tap.node.find('.title-card').velocity('reverse')
          }, 2000)
        }
      })
  }

  function animate_bg(tap) {
    tap.node
      .find('.hero')
      .velocity({
        scaleX: 1.03
      , scaleY: 1.03
      , easing: 'easeInSine'
      }, {
        duration: 4000
      , complete: function(){
          tap.node.find('.hero').velocity('reverse')
        }
      })
  }

  return {
    start: start
  }
})()
