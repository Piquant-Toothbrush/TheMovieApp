'use strict';

var MovieList = function MovieList(_ref) {
	var movies = _ref.movies;
	var change = _ref.change;

	return React.createElement(
		'div',
		{ className: 'movieList' },
		movies.map(function (movie, i) {
			return React.createElement(MovieListEntry, {
				movie: movie,
				change: change,
				key: movie.title });
		})
	);
};

window.MovieList = MovieList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9jb21wb25lbnRzL21vdmllcy9Nb3ZpZUxpc3QuanMiXSwibmFtZXMiOlsiTW92aWVMaXN0IiwibW92aWVzIiwiY2hhbmdlIiwibWFwIiwibW92aWUiLCJpIiwidGl0bGUiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWSxTQUFaQSxTQUFZLE9BQXNCO0FBQUEsS0FBcEJDLE1BQW9CLFFBQXBCQSxNQUFvQjtBQUFBLEtBQVpDLE1BQVksUUFBWkEsTUFBWTs7QUFDckMsUUFBUTtBQUFBO0FBQUEsSUFBSyxXQUFVLFdBQWY7QUFDTEQsU0FBT0UsR0FBUCxDQUFXLFVBQUNDLEtBQUQsRUFBUUMsQ0FBUjtBQUFBLFVBQWMsb0JBQUMsY0FBRDtBQUN2QixXQUFTRCxLQURjO0FBRXZCLFlBQVVGLE1BRmE7QUFHdkIsU0FBT0UsTUFBTUUsS0FIVSxHQUFkO0FBQUEsR0FBWDtBQURLLEVBQVI7QUFPQSxDQVJEOztBQVVBQyxPQUFPUCxTQUFQLEdBQW1CQSxTQUFuQiIsImZpbGUiOiJNb3ZpZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTW92aWVMaXN0ID0gKHttb3ZpZXMsIGNoYW5nZX0pID0+IHtcclxuXHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdtb3ZpZUxpc3QnPlxyXG5cdFx0eyBtb3ZpZXMubWFwKChtb3ZpZSwgaSkgPT4gPE1vdmllTGlzdEVudHJ5IFxyXG4gICAgICBtb3ZpZSA9IHttb3ZpZX0gXHJcbiAgICAgIGNoYW5nZSA9IHtjaGFuZ2V9XHJcbiAgICAgIGtleSA9IHttb3ZpZS50aXRsZX0gLz4gKX1cclxuXHRcdFxyXG5cdDwvZGl2PilcclxufVxyXG5cclxud2luZG93Lk1vdmllTGlzdCA9IE1vdmllTGlzdDsiXX0=