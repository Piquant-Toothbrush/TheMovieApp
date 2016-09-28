'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = {
      movies: [],
      view: 'recentRelease',
      focalMovie: null,
      recentRelease: true,
      search: '',
      loading: true
    };
    return _this;
  }

  //should have its own change view function


  _createClass(Home, [{
    key: 'changeViews',
    value: function changeViews(targetState) {
      this.setState({
        view: targetState
      });
    }

    //show render a list of recent releases on initialize

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getRecentReleasesInitialize();
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({
        search: event.target.value
      });
    }
  }, {
    key: 'getRecentReleasesInitialize',
    value: function getRecentReleasesInitialize() {
      var _this2 = this;

      $.get(Url + '/recentRelease').then(function (moviesWithRatings) {
        // console.log('response from server', moviesWithRatings);
        _this2.setState({
          movies: moviesWithRatings,
          recentRelease: true,
          loading: false
        });
      });
    }

    //function that takes movies from external API and query the database for ratings
    //will set the movies state after ratings are successfully retrived

  }, {
    key: 'getUserRatingsForMovies',
    value: function getUserRatingsForMovies(moviesFromOMDB) {
      var _this3 = this;

      if (moviesFromOMDB.length === 0) {
        this.setState({
          movies: [],
          recentRelease: false
        });
      } else {
        // console.log('posting to:', Url + '/getMultipleMovieRatings');
        $.post(Url + '/getMultipleMovieRatings', { movies: moviesFromOMDB }).done(function (moviesWithRatings) {
          // console.log('response from server', moviesWithRatings);
          _this3.setState({
            movies: moviesWithRatings,
            recentRelease: false
          });
        });
      }
    }

    //////////////////////
    /////Event Handlers
    //////////////////////

    //this will call search for a movie from external API, do a database query for rating
    //and set the reponse to the movies state

  }, {
    key: 'handleSearch',
    value: function handleSearch(event) {
      if (event.charCode === 13 || event === 'clicked') {
        var that = this;
        this.setState({ loading: true });
        //this will search TMDB for movie and send it to server to retrive user ratings
        $.ajax({
          url: "https://api.themoviedb.org/3/search/movie",
          jsonp: "callback",
          dataType: "jsonp",
          data: {
            query: this.state.search,
            api_key: "9d3b035ef1cd669aed398400b17fcea2",
            format: "json"
          },
          success: function success(response) {
            var sorted = _.sortBy(response.results, 'imdbRating');
            that.getUserRatingsForMovies(sorted);
            setTimeout(function () {
              that.setState({ loading: false });
            }, 1000);
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var lable = 'Recent Releases';
      var feedbackMsg = '';
      if (this.state.recentRelease === false) {
        lable = 'back to recent releases';
        if (this.state.movies.length === 0) {
          feedbackMsg = React.createElement(
            'div',
            { className: 'errorMsg' },
            'no match found, please try another title'
          );
        } else {
          feedbackMsg = React.createElement(
            'div',
            { className: 'updatedMsg' },
            'all match results:'
          );
        }
      }
      return React.createElement(
        'div',
        { className: 'Home collection' },
        this.state.loading ? React.createElement(
          'div',
          { className: 'progress loadingBar' },
          ' ',
          React.createElement('div', { className: 'indeterminate' }),
          ' '
        ) : null,
        React.createElement(
          'div',
          { className: 'header', onClick: this.getRecentReleasesInitialize.bind(this) },
          lable
        ),
        React.createElement(
          'div',
          { className: 'searchMovie' },
          React.createElement('input', { type: 'text', id: 'movieInput',
            className: 'movieInput',
            placeholder: 'find a movie',
            value: this.state.search,
            onChange: this.handleChange.bind(this),
            onKeyPress: this.handleSearch.bind(this) }),
          React.createElement(
            'a',
            { className: 'waves-effect waves-light btn', onClick: function onClick() {
                return _this4.handleSearch.bind(_this4)('clicked');
              } },
            'search'
          )
        ),
        feedbackMsg,
        React.createElement(MovieList, { movies: this.state.movies,
          change: this.props.change.bind(this)
        })
      );
    }
  }]);

  return Home;
}(React.Component);

window.Home = Home;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9jb21wb25lbnRzL2hvbWUvaG9tZS5qcyJdLCJuYW1lcyI6WyJIb21lIiwicHJvcHMiLCJzdGF0ZSIsIm1vdmllcyIsInZpZXciLCJmb2NhbE1vdmllIiwicmVjZW50UmVsZWFzZSIsInNlYXJjaCIsImxvYWRpbmciLCJ0YXJnZXRTdGF0ZSIsInNldFN0YXRlIiwiZ2V0UmVjZW50UmVsZWFzZXNJbml0aWFsaXplIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIiQiLCJnZXQiLCJVcmwiLCJ0aGVuIiwibW92aWVzV2l0aFJhdGluZ3MiLCJtb3ZpZXNGcm9tT01EQiIsImxlbmd0aCIsInBvc3QiLCJkb25lIiwiY2hhckNvZGUiLCJ0aGF0IiwiYWpheCIsInVybCIsImpzb25wIiwiZGF0YVR5cGUiLCJkYXRhIiwicXVlcnkiLCJhcGlfa2V5IiwiZm9ybWF0Iiwic3VjY2VzcyIsInJlc3BvbnNlIiwic29ydGVkIiwiXyIsInNvcnRCeSIsInJlc3VsdHMiLCJnZXRVc2VyUmF0aW5nc0Zvck1vdmllcyIsInNldFRpbWVvdXQiLCJsYWJsZSIsImZlZWRiYWNrTXNnIiwiYmluZCIsImhhbmRsZUNoYW5nZSIsImhhbmRsZVNlYXJjaCIsImNoYW5nZSIsIlJlYWN0IiwiQ29tcG9uZW50Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEk7OztBQUNKLGdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNEdBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxjQUFRLEVBREc7QUFFWEMsWUFBTSxlQUZLO0FBR1hDLGtCQUFZLElBSEQ7QUFJWEMscUJBQWUsSUFKSjtBQUtYQyxjQUFRLEVBTEc7QUFNWEMsZUFBUztBQU5FLEtBQWI7QUFIaUI7QUFXbEI7O0FBRUQ7Ozs7O2dDQUNZQyxXLEVBQWE7QUFDdkIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pOLGNBQU1LO0FBRE0sT0FBZDtBQUdEOztBQUVEOzs7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LFdBQVUsYUFBZjtBQUNFLHlDQUFPLE1BQU0sTUFBYixFQUFvQixJQUFHLFlBQXZCO0FBQ0UsdUJBQVUsWUFEWjtBQUVFLHlCQUFZLGNBRmQ7QUFHRSxtQkFBTyxLQUFLeEMsS0FBTCxDQUFXSyxNQUhwQjtBQUlFLHNCQUFVLEtBQUtzQyxZQUFMLENBQWtCRCxJQUFsQixDQUF1QixJQUF2QixDQUpaO0FBS0Usd0JBQVksS0FBS0UsWUFBTCxDQUFrQkYsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FMZCxHQURGO0FBT0U7QUFBQTtBQUFBLGNBQUcsV0FBVSw4QkFBYixFQUE0QyxTQUFTO0FBQUEsdUJBQU0sT0FBS0UsWUFBTCxDQUFrQkYsSUFBbEIsU0FBNkIsU0FBN0IsQ0FBTjtBQUFBLGVBQXJEO0FBQUE7QUFBQTtBQVBGLFNBSEY7QUFZR0QsbUJBWkg7QUFhRSw0QkFBQyxTQUFELElBQVcsUUFBUSxLQUFLekMsS0FBTCxDQUFXQyxNQUE5QjtBQUNFLGtCQUFRLEtBQUtGLEtBQUwsQ0FBVzhDLE1BQVgsQ0FBa0JILElBQWxCLENBQXVCLElBQXZCO0FBRFY7QUFiRixPQURGO0FBbUJEOzs7O0VBN0hnQkksTUFBTUMsUzs7QUFnSXpCQyxPQUFPbEQsSUFBUCxHQUFjQSxJQUFkIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIG1vdmllczogW10sXHJcbiAgICAgIHZpZXc6ICdyZWNlbnRSZWxlYXNlJyxcclxuICAgICAgZm9jYWxNb3ZpZTogbnVsbCxcclxuICAgICAgcmVjZW50UmVsZWFzZTogdHJ1ZSxcclxuICAgICAgc2VhcmNoOiAnJyxcclxuICAgICAgbG9hZGluZzogdHJ1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vc2hvdWxkIGhhdmUgaXRzIG93biBjaGFuZ2UgdmlldyBmdW5jdGlvblxyXG4gIGNoYW5nZVZpZXdzKHRhcmdldFN0YXRlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgdmlldzogdGFyZ2V0U3RhdGVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9zaG93IHJlbmRlciBhIGxpc3Qgb2YgcmVjZW50IHJlbGVhc2VzIG9uIGluaXRpYWxpemVcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuZ2V0UmVjZW50UmVsZWFzZXNJbml0aWFsaXplKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBzZWFyY2g6IGV2ZW50LnRhcmdldC52YWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZWNlbnRSZWxlYXNlc0luaXRpYWxpemUoKSB7XHJcbiAgICAkLmdldChVcmwgKyAnL3JlY2VudFJlbGVhc2UnKVxyXG4gICAgLnRoZW4obW92aWVzV2l0aFJhdGluZ3MgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVzcG9uc2UgZnJvbSBzZXJ2ZXInLCBtb3ZpZXNXaXRoUmF0aW5ncyk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG1vdmllczogbW92aWVzV2l0aFJhdGluZ3MsXHJcbiAgICAgICAgcmVjZW50UmVsZWFzZTogdHJ1ZSxcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9mdW5jdGlvbiB0aGF0IHRha2VzIG1vdmllcyBmcm9tIGV4dGVybmFsIEFQSSBhbmQgcXVlcnkgdGhlIGRhdGFiYXNlIGZvciByYXRpbmdzXHJcbiAgLy93aWxsIHNldCB0aGUgbW92aWVzIHN0YXRlIGFmdGVyIHJhdGluZ3MgYXJlIHN1Y2Nlc3NmdWxseSByZXRyaXZlZFxyXG4gIGdldFVzZXJSYXRpbmdzRm9yTW92aWVzKG1vdmllc0Zyb21PTURCKSB7XHJcbiAgICBpZiAobW92aWVzRnJvbU9NREIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIG1vdmllczogW10sXHJcbiAgICAgICAgcmVjZW50UmVsZWFzZTogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygncG9zdGluZyB0bzonLCBVcmwgKyAnL2dldE11bHRpcGxlTW92aWVSYXRpbmdzJyk7XHJcbiAgICAgICQucG9zdChVcmwgKyAnL2dldE11bHRpcGxlTW92aWVSYXRpbmdzJywgeyBtb3ZpZXM6IG1vdmllc0Zyb21PTURCIH0pXHJcbiAgICAgIC5kb25lKG1vdmllc1dpdGhSYXRpbmdzID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzcG9uc2UgZnJvbSBzZXJ2ZXInLCBtb3ZpZXNXaXRoUmF0aW5ncyk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBtb3ZpZXM6IG1vdmllc1dpdGhSYXRpbmdzLFxyXG4gICAgICAgICAgcmVjZW50UmVsZWFzZTogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8vLy9FdmVudCBIYW5kbGVyc1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgLy90aGlzIHdpbGwgY2FsbCBzZWFyY2ggZm9yIGEgbW92aWUgZnJvbSBleHRlcm5hbCBBUEksIGRvIGEgZGF0YWJhc2UgcXVlcnkgZm9yIHJhdGluZ1xyXG4gIC8vYW5kIHNldCB0aGUgcmVwb25zZSB0byB0aGUgbW92aWVzIHN0YXRlXHJcbiAgaGFuZGxlU2VhcmNoKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuY2hhckNvZGUgPT09IDEzIHx8IGV2ZW50ID09PSAnY2xpY2tlZCcpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWV9KTtcclxuICAgICAgLy90aGlzIHdpbGwgc2VhcmNoIFRNREIgZm9yIG1vdmllIGFuZCBzZW5kIGl0IHRvIHNlcnZlciB0byByZXRyaXZlIHVzZXIgcmF0aW5nc1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL3NlYXJjaC9tb3ZpZVwiLFxyXG4gICAgICAgIGpzb25wOiBcImNhbGxiYWNrXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvbnBcIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnN0YXRlLnNlYXJjaCxcclxuICAgICAgICAgICAgYXBpX2tleTogXCI5ZDNiMDM1ZWYxY2Q2NjlhZWQzOTg0MDBiMTdmY2VhMlwiLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgIHZhciBzb3J0ZWQgPSBfLnNvcnRCeShyZXNwb25zZS5yZXN1bHRzLCAnaW1kYlJhdGluZycpO1xyXG4gICAgICAgICAgdGhhdC5nZXRVc2VyUmF0aW5nc0Zvck1vdmllcyhzb3J0ZWQpO1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKT0+e3RoYXQuc2V0U3RhdGUoe2xvYWRpbmc6ZmFsc2V9KX0sMTAwMClcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG5cclxuICAgIHZhciBsYWJsZSA9ICdSZWNlbnQgUmVsZWFzZXMnO1xyXG4gICAgdmFyIGZlZWRiYWNrTXNnID0gJyc7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5yZWNlbnRSZWxlYXNlID09PSBmYWxzZSkge1xyXG4gICAgICBsYWJsZSA9ICdiYWNrIHRvIHJlY2VudCByZWxlYXNlcyc7XHJcbiAgICAgIGlmICh0aGlzLnN0YXRlLm1vdmllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBmZWVkYmFja01zZyA9ICg8ZGl2IGNsYXNzTmFtZT1cImVycm9yTXNnXCI+bm8gbWF0Y2ggZm91bmQsIHBsZWFzZSB0cnkgYW5vdGhlciB0aXRsZTwvZGl2Pik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmVlZGJhY2tNc2cgPSAoPGRpdiBjbGFzc05hbWU9XCJ1cGRhdGVkTXNnXCI+YWxsIG1hdGNoIHJlc3VsdHM6PC9kaXY+KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9J0hvbWUgY29sbGVjdGlvbic+XHJcbiAgICAgIHt0aGlzLnN0YXRlLmxvYWRpbmcgPyA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzIGxvYWRpbmdCYXJcIj4gPGRpdiBjbGFzc05hbWU9XCJpbmRldGVybWluYXRlXCI+PC9kaXY+IDwvZGl2PiA6IG51bGx9XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2hlYWRlcicgb25DbGljaz17dGhpcy5nZXRSZWNlbnRSZWxlYXNlc0luaXRpYWxpemUuYmluZCh0aGlzKX0+e2xhYmxlfTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzZWFyY2hNb3ZpZSc+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZSA9J3RleHQnIGlkPSdtb3ZpZUlucHV0JyBcclxuICAgICAgICAgICAgY2xhc3NOYW1lPSdtb3ZpZUlucHV0J1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj0nZmluZCBhIG1vdmllJ1xyXG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2h9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICBvbktleVByZXNzPXt0aGlzLmhhbmRsZVNlYXJjaC5iaW5kKHRoaXMpfS8+XHJcbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgb25DbGljaz17KCkgPT4gdGhpcy5oYW5kbGVTZWFyY2guYmluZCh0aGlzKSgnY2xpY2tlZCcpfT5zZWFyY2g8L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge2ZlZWRiYWNrTXNnfVxyXG4gICAgICAgIDxNb3ZpZUxpc3QgbW92aWVzPXt0aGlzLnN0YXRlLm1vdmllc31cclxuICAgICAgICAgIGNoYW5nZT17dGhpcy5wcm9wcy5jaGFuZ2UuYmluZCh0aGlzKX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuSG9tZSA9IEhvbWU7Il19