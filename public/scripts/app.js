angular.module("app",["ngRoute","controllers","directives","services","filters"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/app/main.html",controller:"Main"})}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),angular.module("controllers",[]).controller("Main",["$scope",function(a){function b(){a.metadata.rooms=_.map(_.range(3,Number(a.metadata.layer)+1,3),function(){return _.map(_.range(0,a.metadata.width),function(b){return{front:b%2?a.defines.board_types.gate:a.defines.board_types.window,back:b%2?a.defines.board_types.board:a.defines.board_types.window,board:b%2==1}})})}a.defines={blueprint:{width:1140,height:760},board_types:{window:1,gate:2,board:3},numbers:{0:"一",1:"二",2:"三"},K:1820,P:950},a.metadata={width:10,height:3,layer:6,scale:.04,merges:[],options:{stairs:{left:!0,right:!1}}},a.$watch("metadata.scale",function(){a.scaled={K:parseInt(a.defines.K*a.metadata.scale)},a.scaled.width=a.metadata.width*a.scaled.K,a.scaled.height=a.metadata.height*a.scaled.K}),a.$watch("metadata.width",function(){b()}),a.$watch("metadata.layer",function(){b()})}]),angular.module("directives",[]).directive("blueprintFoundation",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/foundation.html",controller:["$scope",function(a){function b(){a.outer={diff:parseInt(380*a.metadata.scale)},a.outer.width=a.scaled.width+a.outer.diff,a.outer.height=a.scaled.height+a.outer.diff,a.center={diff:parseInt(80*a.metadata.scale)},a.center.offset=parseInt((a.outer.diff-a.center.diff)/2),a.center.width=a.scaled.width+a.center.diff,a.center.height=a.scaled.height+a.center.diff,a.inner={diff:parseInt(-220*a.metadata.scale)},a.inner.offset=parseInt((a.outer.diff-a.inner.diff)/2),a.inner.width=a.scaled.width+a.inner.diff,a.inner.height=a.scaled.height+a.inner.diff}a.$watch("metadata.width",b),a.$watch("metadata.height",b),a.$watch("metadata.scale",b)}]}}).directive("blueprintSide",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/side.html",controller:["$scope",function(){}]}}).directive("blueprintFlat",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/flat.html",controller:["$scope","$attrs",function(a,b){a.$attrs=b,console.log(a)}]}}),angular.module("filters",[]),angular.module("services",[]);