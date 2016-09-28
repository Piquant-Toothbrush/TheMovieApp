'use strict';

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '12345',
    database: process.env.DATABASE_NAME || 'MainDatabase',
    charset: 'utf8'
  },
  pool: { min: 0, max: 6 }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('movies').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('movies', function (movie) {
      movie.integer('id').primary();
      movie.string('title', 255);
      movie.string('genre', 255);
      movie.string('poster', 255);
      movie.string('release_date', 255);
      movie.string('description', 255);
      movie.integer('imdbRating');
    }).raw('ALTER TABLE movies ADD FULLTEXT (title)').then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('ratings').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('ratings', function (rating) {
      rating.increments('id').primary();
      rating.integer('score');
      rating.integer('movieid');
      rating.integer('userid');
      rating.string('review', 255);
      rating.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255).unique();
      user.string('password', 255);
      user.string('email', 255);
      user.string('firstName', 255);
      user.string('lastName', 255);
      user.string('profilePicture', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  } //
});

db.knex.schema.hasTable('relations').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('relations', function (relation) {
      relation.increments('id').primary();
      relation.integer('user1id');
      relation.integer('user2id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('allRequests').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('allRequests', function (request) {
      request.increments('id').primary();
      request.string('requestor', 255);
      request.string('requestee', 255);
      request.string('requestTyp', 255);
      request.string('movie', 255);
      request.string('message', 255);
      request.string('response', 255);
      request.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9kYkNvbm5lY3Rpb24uanMiXSwibmFtZXMiOlsia25leCIsInJlcXVpcmUiLCJjbGllbnQiLCJjb25uZWN0aW9uIiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJEQVRBQkFTRV9IT1NUIiwidXNlciIsIkRBVEFCQVNFX1VTRVIiLCJwYXNzd29yZCIsIkRBVEFCQVNFX1BBU1NXT1JEIiwiZGF0YWJhc2UiLCJEQVRBQkFTRV9OQU1FIiwiY2hhcnNldCIsInBvb2wiLCJtaW4iLCJtYXgiLCJkYiIsInNjaGVtYSIsImhhc1RhYmxlIiwidGhlbiIsImV4aXN0cyIsImNyZWF0ZVRhYmxlIiwibW92aWUiLCJpbnRlZ2VyIiwicHJpbWFyeSIsInN0cmluZyIsInJhdyIsInRhYmxlIiwiY29uc29sZSIsImxvZyIsInJhdGluZyIsImluY3JlbWVudHMiLCJ0aW1lc3RhbXBzIiwidW5pcXVlIiwicmVsYXRpb24iLCJyZXF1ZXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxPQUFPQyxRQUFRLE1BQVIsRUFBZ0I7QUFDekJDLFVBQVEsT0FEaUI7QUFFekJDLGNBQVk7QUFDVkMsVUFBTUMsUUFBUUMsR0FBUixDQUFZQyxhQUFaLElBQTZCLFdBRHpCO0FBRVZDLFVBQU1ILFFBQVFDLEdBQVIsQ0FBWUcsYUFBWixJQUE2QixNQUZ6QjtBQUdWQyxjQUFVTCxRQUFRQyxHQUFSLENBQVlLLGlCQUFaLElBQWlDLE9BSGpDO0FBSVZDLGNBQVVQLFFBQVFDLEdBQVIsQ0FBWU8sYUFBWixJQUE2QixjQUo3QjtBQUtWQyxhQUFXO0FBTEQsR0FGYTtBQVN6QkMsUUFBTSxFQUFFQyxLQUFLLENBQVAsRUFBVUMsS0FBSyxDQUFmO0FBVG1CLENBQWhCLENBQVg7O0FBWUEsSUFBSUMsS0FBS2pCLFFBQVEsV0FBUixFQUFxQkQsSUFBckIsQ0FBVDs7QUFFQWtCLEdBQUdsQixJQUFILENBQVFtQixNQUFSLENBQWVDLFFBQWYsQ0FBd0IsUUFB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dCI6WyJ2YXIga25leCA9IHJlcXVpcmUoJ2tuZXgnKSh7XHJcbiAgY2xpZW50OiAnbXlzcWwnLFxyXG4gIGNvbm5lY3Rpb246IHtcclxuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRBVEFCQVNFX0hPU1QgfHwgJzEyNy4wLjAuMScsXHJcbiAgICB1c2VyOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VU0VSIHx8ICdyb290JyxcclxuICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9QQVNTV09SRCB8fCAnMTIzNDUnLFxyXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRBVEFCQVNFX05BTUUgfHwgJ01haW5EYXRhYmFzZScsXHJcbiAgICBjaGFyc2V0ICA6ICd1dGY4J1xyXG4gIH0sXHJcbiAgcG9vbDogeyBtaW46IDAsIG1heDogNiB9XHJcbn0pO1xyXG5cclxudmFyIGRiID0gcmVxdWlyZSgnYm9va3NoZWxmJykoa25leCk7XHJcblxyXG5kYi5rbmV4LnNjaGVtYS5oYXNUYWJsZSgnbW92aWVzJykudGhlbihmdW5jdGlvbihleGlzdHMpIHtcclxuICBpZiAoIWV4aXN0cykge1xyXG4gICAgZGIua25leC5zY2hlbWEuY3JlYXRlVGFibGUoJ21vdmllcycsIGZ1bmN0aW9uIChtb3ZpZSkge1xyXG4gICAgICBtb3ZpZS5pbnRlZ2VyKCdpZCcpLnByaW1hcnkoKTtcclxuICAgICAgbW92aWUuc3RyaW5nKCd0aXRsZScsIDI1NSk7XHJcbiAgICAgIG1vdmllLnN0cmluZygnZ2VucmUnLCAyNTUpO1xyXG4gICAgICBtb3ZpZS5zdHJpbmcoJ3Bvc3RlcicsIDI1NSk7XHJcbiAgICAgIG1vdmllLnN0cmluZygncmVsZWFzZV9kYXRlJywgMjU1KTtcclxuICAgICAgbW92aWUuc3RyaW5nKCdkZXNjcmlwdGlvbicsIDI1NSk7XHJcbiAgICAgIG1vdmllLmludGVnZXIoJ2ltZGJSYXRpbmcnKTtcclxuICAgIH0pXHJcbiAgICAucmF3KGBBTFRFUiBUQUJMRSBtb3ZpZXMgQUREIEZVTExURVhUICh0aXRsZSlgKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHRhYmxlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVkIFRhYmxlJywgdGFibGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmRiLmtuZXguc2NoZW1hLmhhc1RhYmxlKCdyYXRpbmdzJykudGhlbihmdW5jdGlvbihleGlzdHMpIHtcclxuICBpZiAoIWV4aXN0cykge1xyXG4gICAgZGIua25leC5zY2hlbWEuY3JlYXRlVGFibGUoJ3JhdGluZ3MnLCBmdW5jdGlvbiAocmF0aW5nKSB7XHJcbiAgICAgIHJhdGluZy5pbmNyZW1lbnRzKCdpZCcpLnByaW1hcnkoKTtcclxuICAgICAgcmF0aW5nLmludGVnZXIoJ3Njb3JlJyk7XHJcbiAgICAgIHJhdGluZy5pbnRlZ2VyKCdtb3ZpZWlkJyk7XHJcbiAgICAgIHJhdGluZy5pbnRlZ2VyKCd1c2VyaWQnKTtcclxuICAgICAgcmF0aW5nLnN0cmluZygncmV2aWV3JywgMjU1KTtcclxuICAgICAgcmF0aW5nLnRpbWVzdGFtcHMoKTtcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRhYmxlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVkIFRhYmxlJywgdGFibGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmRiLmtuZXguc2NoZW1hLmhhc1RhYmxlKCd1c2VycycpLnRoZW4oZnVuY3Rpb24oZXhpc3RzKSB7XHJcbiAgaWYgKCFleGlzdHMpIHtcclxuICAgIGRiLmtuZXguc2NoZW1hLmNyZWF0ZVRhYmxlKCd1c2VycycsIGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgdXNlci5pbmNyZW1lbnRzKCdpZCcpLnByaW1hcnkoKTtcclxuICAgICAgdXNlci5zdHJpbmcoJ3VzZXJuYW1lJywgMjU1KS51bmlxdWUoKTtcclxuICAgICAgdXNlci5zdHJpbmcoJ3Bhc3N3b3JkJywgMjU1KTtcclxuICAgICAgdXNlci5zdHJpbmcoJ2VtYWlsJywgMjU1KTtcclxuICAgICAgdXNlci5zdHJpbmcoJ2ZpcnN0TmFtZScsIDI1NSk7XHJcbiAgICAgIHVzZXIuc3RyaW5nKCdsYXN0TmFtZScsIDI1NSk7XHJcbiAgICAgIHVzZXIuc3RyaW5nKCdwcm9maWxlUGljdHVyZScsIDI1NSk7XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh0YWJsZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ3JlYXRlZCBUYWJsZScsIHRhYmxlKTtcclxuICAgIH0pO1xyXG4gIH0vL1xyXG59KTtcclxuXHJcbmRiLmtuZXguc2NoZW1hLmhhc1RhYmxlKCdyZWxhdGlvbnMnKS50aGVuKGZ1bmN0aW9uKGV4aXN0cykge1xyXG4gIGlmICghZXhpc3RzKSB7XHJcbiAgICBkYi5rbmV4LnNjaGVtYS5jcmVhdGVUYWJsZSgncmVsYXRpb25zJywgZnVuY3Rpb24ocmVsYXRpb24pIHtcclxuICAgICAgcmVsYXRpb24uaW5jcmVtZW50cygnaWQnKS5wcmltYXJ5KCk7XHJcbiAgICAgIHJlbGF0aW9uLmludGVnZXIoJ3VzZXIxaWQnKTtcclxuICAgICAgcmVsYXRpb24uaW50ZWdlcigndXNlcjJpZCcpO1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAodGFibGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZWQgVGFibGUnLCB0YWJsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZGIua25leC5zY2hlbWEuaGFzVGFibGUoJ2FsbFJlcXVlc3RzJykudGhlbihmdW5jdGlvbihleGlzdHMpIHtcclxuICBpZiAoIWV4aXN0cykge1xyXG4gICAgZGIua25leC5zY2hlbWEuY3JlYXRlVGFibGUoJ2FsbFJlcXVlc3RzJywgZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gICAgICByZXF1ZXN0LmluY3JlbWVudHMoJ2lkJykucHJpbWFyeSgpO1xyXG4gICAgICByZXF1ZXN0LnN0cmluZygncmVxdWVzdG9yJywgMjU1KTtcclxuICAgICAgcmVxdWVzdC5zdHJpbmcoJ3JlcXVlc3RlZScsIDI1NSk7XHJcbiAgICAgIHJlcXVlc3Quc3RyaW5nKCdyZXF1ZXN0VHlwJywgMjU1KTtcclxuICAgICAgcmVxdWVzdC5zdHJpbmcoJ21vdmllJywyNTUpO1xyXG4gICAgICByZXF1ZXN0LnN0cmluZygnbWVzc2FnZScsIDI1NSk7XHJcbiAgICAgIHJlcXVlc3Quc3RyaW5nKCdyZXNwb25zZScsIDI1NSk7XHJcbiAgICAgIHJlcXVlc3QudGltZXN0YW1wcygpO1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAodGFibGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZWQgVGFibGUnLCB0YWJsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcclxuXHJcblxyXG5cclxuIl19