(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  // MY CODE STARTS HERE

  // onclick of search button do this
  $('.btn-large').click(function(event){
    event.preventDefault()
    // gets value of input which is a string
    var input = $('#search').val();

    // prevent search if blank input
    if (input !== ''){
      var $xhr = $.getJSON('https://omdb-api.now.sh/?s='+input+'/')
      $xhr.done(function(data) {
        if ($xhr.status !== 200) {
            return
          }
        // query database
        var title = data.Search
        // console.log(movie)
        var render = 0
        for (var i = 0; i < title.length; i++) {
          var movie_card = {
            title: title[i]['Title'],
            poster: title[i]['Poster'],
            id: title[i]['imdbID'],
            year: title[i]['Year']
            // plot: title[i]['Plot']
            }
            console.log(movie_card['id'])
            movies.push(movie_card);
          }
          renderMovies();
          movies.splice(0,movies.length)
        });
      }
    })// MY CODE ENDS HERE
})();
