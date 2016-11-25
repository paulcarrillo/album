$(document).ready( function() {
  function getAllTracks() {
    $.ajax({
      url: '/tracks',
      type: 'GET',
      dataType: 'JSON'
    }).done( function(tracks) {
      updateTrackList(tracks);
    }).fail( function(msg) {
      console.log(msg);
    })
  }

  function updateTrackList(tracks) {
      var list = $('#track_list');
      list.empty();
      tracks.forEach( function(track) {
        $.ajax({
          url: '/tracks/track_template',
          type: 'POST',
          dataType: 'HTML',
          data: { id: track._id, title: track.title, complete: track.complete }
        }).done( function(html) {
          console.log(html);
          list.append(html);
        });
      });
    }


  getAllTracks();

  $(document).on('click', '.remove-track', function() {
    var  url = '/tracks/' + $(this).data('id');
    $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( function() {
      getAllTracks();
    });
  });


  $(document).on('change', '#track_list input', function() {
    var input = $(this);
    var url = '/tracks/' + input.attr('id');
    $.ajax({
      url: url,
      type: 'PUT',
      dataType: 'JSON',
      data: { complete: input.is(':checked') }
    }).done( function() {
      input.parent().closest('.row').find('.title').toggleClass('checked');
    });
  });


  $('#add_track').on('submit', function(e) {
    e.preventDefault();
    var title = $(this).children('input').val();

    $.ajax({
      url: '/tracks',
      type: 'POST',
      data: { title: title },
      dataType: 'JSON'
    }).done( function(track) {
      $('#add_track input').val('');
      getAllTracks();
    }).fail( function(msg) {
      //error handling here
    });
  });
});
