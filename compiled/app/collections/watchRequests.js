'use strict';

var db = require('../dbConnection');
var WatchRequest = require('../models/watchRequest');

//create WatchRequests collection
var WatchRequests = new db.Collection();
WatchRequests.model = WatchRequest;

module.exports = WatchRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9jb2xsZWN0aW9ucy93YXRjaFJlcXVlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxLQUFLLFFBQVEsaUJBQVIsQ0FBVDtBQUNBLElBQUksZUFBZSxRQUFRLHdCQUFSLENBQW5COzs7QUFHQSxJQUFJLGdCQUFnQixJQUFJLEdBQUcsVUFBUCxFQUFwQjtBQUNBLGNBQWMsS0FBZCxHQUFzQixZQUF0Qjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsWUFBakIiLCJmaWxlIjoid2F0Y2hSZXF1ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkYiA9IHJlcXVpcmUoJy4uL2RiQ29ubmVjdGlvbicpO1xudmFyIFdhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4uL21vZGVscy93YXRjaFJlcXVlc3QnKTtcblxuLy9jcmVhdGUgV2F0Y2hSZXF1ZXN0cyBjb2xsZWN0aW9uXG52YXIgV2F0Y2hSZXF1ZXN0cyA9IG5ldyBkYi5Db2xsZWN0aW9uKCk7XG5XYXRjaFJlcXVlc3RzLm1vZGVsID0gV2F0Y2hSZXF1ZXN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdhdGNoUmVxdWVzdDsiXX0=