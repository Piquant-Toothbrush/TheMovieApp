'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterContext = require('./RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

exports.default = function () {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  var withContext = middlewares.map(function (m) {
    return m.renderRouterContext;
  }).filter(function (f) {
    return f;
  });
  var withComponent = middlewares.map(function (m) {
    return m.renderRouteComponent;
  }).filter(function (f) {
    return f;
  });
  var makeCreateElement = function makeCreateElement() {
    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
    return function (Component, props) {
      return withComponent.reduceRight(function (previous, renderRouteComponent) {
        return renderRouteComponent(previous, props);
      }, baseCreateElement(Component, props));
    };
  };

  return function (renderProps) {
    return withContext.reduceRight(function (previous, renderRouterContext) {
      return renderRouterContext(previous, renderProps);
    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
      createElement: makeCreateElement(renderProps.createElement)
    })));
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9yZWFjdC1yb3V0ZXIvZXM2L2FwcGx5Um91dGVyTWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFIQSxJQUFJLFdBQVcsT0FBTyxNQUFQLElBQWlCLFVBQVUsTUFBVixFQUFrQjtBQUFFLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxVQUFVLE1BQTlCLEVBQXNDLEdBQXRDLEVBQTJDO0FBQUUsUUFBSSxTQUFTLFVBQVUsQ0FBVixDQUFiLENBQTJCLEtBQUssSUFBSSxHQUFULElBQWdCLE1BQWhCLEVBQXdCO0FBQUUsVUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsTUFBckMsRUFBNkMsR0FBN0MsQ0FBSixFQUF1RDtBQUFFLGVBQU8sR0FBUCxJQUFjLE9BQU8sR0FBUCxDQUFkO0FBQTRCO0FBQUU7QUFBRSxHQUFDLE9BQU8sTUFBUDtBQUFnQixDQUFoUTs7a0JBS2dCLFlBQVk7QUFDMUIsT0FBSyxJQUFJLE9BQU8sVUFBVSxNQUFyQixFQUE2QixjQUFjLE1BQU0sSUFBTixDQUEzQyxFQUF3RCxPQUFPLENBQXBFLEVBQXVFLE9BQU8sSUFBOUUsRUFBb0YsTUFBcEYsRUFBNEY7QUFDMUYsZ0JBQVksSUFBWixJQUFvQixVQUFVLElBQVYsQ0FBcEI7QUFDRDs7QUFFRCxNQUFJLGNBQWMsWUFBWSxHQUFaLENBQWdCLFVBQVUsQ0FBVixFQUFhO0FBQzdDLFdBQU8sRUFBRSxtQkFBVDtBQUNELEdBRmlCLEVBRWYsTUFGZSxDQUVSLFVBQVUsQ0FBVixFQUFhO0FBQ3JCLFdBQU8sQ0FBUDtBQUNELEdBSmlCLENBQWxCO0FBS0EsTUFBSSxnQkFBZ0IsWUFBWSxHQUFaLENBQWdCLFVBQVUsQ0FBVixFQUFhO0FBQy9DLFdBQU8sRUFBRSxvQkFBVDtBQUNELEdBRm1CLEVBRWpCLE1BRmlCLENBRVYsVUFBVSxDQUFWLEVBQWE7QUFDckIsV0FBTyxDQUFQO0FBQ0QsR0FKbUIsQ0FBcEI7QUFLQSxNQUFJLG9CQUFvQixTQUFTLGlCQUFULEdBQTZCO0FBQ25ELFFBQUksb0JBQW9CLFVBQVUsTUFBVixJQUFvQixDQUFwQixJQUF5QixVQUFVLENBQVYsTUFBaUIsU0FBMUMsMEJBQXNFLFVBQVUsQ0FBVixDQUE5RjtBQUNBLFdBQU8sVUFBVSxTQUFWLEVBQXFCLEtBQXJCLEVBQTRCO0FBQ2pDLGFBQU8sY0FBYyxXQUFkLENBQTBCLFVBQVUsUUFBVixFQUFvQixvQkFBcEIsRUFBMEM7QUFDekUsZUFBTyxxQkFBcUIsUUFBckIsRUFBK0IsS0FBL0IsQ0FBUDtBQUNELE9BRk0sRUFFSixrQkFBa0IsU0FBbEIsRUFBNkIsS0FBN0IsQ0FGSSxDQUFQO0FBR0QsS0FKRDtBQUtELEdBUEQ7O0FBU0EsU0FBTyxVQUFVLFdBQVYsRUFBdUI7QUFDNUIsV0FBTyxZQUFZLFdBQVosQ0FBd0IsVUFBVSxRQUFWLEVBQW9CLG1CQUFwQixFQUF5QztBQUN0RSxhQUFPLG9CQUFvQixRQUFwQixFQUE4QixXQUE5QixDQUFQO0FBQ0QsS0FGTSxFQUVKLGdCQUFNLGFBQU4sMEJBQW1DLFNBQVMsRUFBVCxFQUFhLFdBQWIsRUFBMEI7QUFDOUQscUJBQWUsa0JBQWtCLFlBQVksYUFBOUI7QUFEK0MsS0FBMUIsQ0FBbkMsQ0FGSSxDQUFQO0FBS0QsR0FORDtBQU9ELEMiLCJmaWxlIjoiYXBwbHlSb3V0ZXJNaWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUm91dGVyQ29udGV4dCBmcm9tICcuL1JvdXRlckNvbnRleHQnO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciB3aXRoQ29udGV4dCA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBtLnJlbmRlclJvdXRlckNvbnRleHQ7XG4gIH0pLmZpbHRlcihmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiBmO1xuICB9KTtcbiAgdmFyIHdpdGhDb21wb25lbnQgPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG0pIHtcbiAgICByZXR1cm4gbS5yZW5kZXJSb3V0ZUNvbXBvbmVudDtcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGY7XG4gIH0pO1xuICB2YXIgbWFrZUNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBtYWtlQ3JlYXRlRWxlbWVudCgpIHtcbiAgICB2YXIgYmFzZUNyZWF0ZUVsZW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBjcmVhdGVFbGVtZW50IDogYXJndW1lbnRzWzBdO1xuICAgIHJldHVybiBmdW5jdGlvbiAoQ29tcG9uZW50LCBwcm9wcykge1xuICAgICAgcmV0dXJuIHdpdGhDb21wb25lbnQucmVkdWNlUmlnaHQoZnVuY3Rpb24gKHByZXZpb3VzLCByZW5kZXJSb3V0ZUNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gcmVuZGVyUm91dGVDb21wb25lbnQocHJldmlvdXMsIHByb3BzKTtcbiAgICAgIH0sIGJhc2VDcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpKTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAocmVuZGVyUHJvcHMpIHtcbiAgICByZXR1cm4gd2l0aENvbnRleHQucmVkdWNlUmlnaHQoZnVuY3Rpb24gKHByZXZpb3VzLCByZW5kZXJSb3V0ZXJDb250ZXh0KSB7XG4gICAgICByZXR1cm4gcmVuZGVyUm91dGVyQ29udGV4dChwcmV2aW91cywgcmVuZGVyUHJvcHMpO1xuICAgIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyQ29udGV4dCwgX2V4dGVuZHMoe30sIHJlbmRlclByb3BzLCB7XG4gICAgICBjcmVhdGVFbGVtZW50OiBtYWtlQ3JlYXRlRWxlbWVudChyZW5kZXJQcm9wcy5jcmVhdGVFbGVtZW50KVxuICAgIH0pKSk7XG4gIH07XG59KTsiXX0=