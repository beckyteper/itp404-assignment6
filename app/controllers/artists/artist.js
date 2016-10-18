import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createSong: function(e) {
      e.preventDefault();

      var price = this.get('price');
      var title = this.get('songName');
      var createdBy = this.get('createdBy');

      console.log(title, price, createdBy);

      var promise = $.ajax({
        type: 'post',
        url: 'http://itp-api.herokuapp.com/api/songs',
        data: {
          title: title,
          artist: this.get('model.id'),
          genre: 1,
          price: price,
          createdBy: createdBy
        }
      });

      promise.then((response) => {
        //alert('yay');
        this.set('songName', null);
        this.set('price', null);
        this.set('createdBy', null);
        var songs = this.get('model.songs');
        //songs.pushObject(response.song); alternate way of doing the next two lines
        var newSongs = songs.concat(response.song);
        this.set('model.songs', newSongs);
      }, function() {
        alert('error');
      });
    }
  }
});
