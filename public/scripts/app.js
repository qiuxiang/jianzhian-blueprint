angular.module("app",["ngRoute","controllers","directives","services","filters"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/app/main.html",controller:"Main"})}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),angular.module("controllers",[]).controller("Main",["$scope",function(a){function b(){a.metadata.rooms=_.map(_.range(3,Number(a.metadata.layer)+1,3),function(){return _.map(_.range(0,a.metadata.width),function(b){return _.map(_.range(0,a.metadata.height),function(c){var d={left:a.defines.board_types.none,right:a.defines.board_types.none,front:a.defines.board_types.none,back:a.defines.board_types.none};return 0==b&&(d.left=a.defines.board_types.board),0==c&&(d.back=b%2?a.defines.board_types.board:a.defines.board_types.window),c==a.metadata.height-1&&(d.front=b%2?a.defines.board_types.gate:a.defines.board_types.window),d.right=b%2?a.defines.board_types.board:a.defines.board_types.none,d})})})}function c(a,b){var c=document.createElement("a"),d=new Blob([b]),e=document.createEvent("HTMLEvents");e.initEvent("click",!1,!1),c.download=a,c.href=URL.createObjectURL(d),c.dispatchEvent(e)}a._=_,a.defines={blueprint:{width:1140,height:760},board_types:{none:0,window:1,gate:2,board:3},ruler:{margin:20},aisle_width:1e3,stairs_height:3e3,K:1820,P:950},a.metadata={width:10,height:3,layer:6,scale:.04,options:{stairs:{left:!0,right:!1}}},a.$watch("metadata.scale",function(){a.scaled={K:parseInt(a.defines.K*a.metadata.scale),P:parseInt(a.defines.P*a.metadata.scale),aisle_width:a.defines.aisle_width*a.metadata.scale,stairs_height:a.defines.stairs_height*a.metadata.scale},a.scaled.width=a.metadata.width*a.scaled.K,a.scaled.height=a.metadata.height*a.scaled.K,a.scaled.layer=a.metadata.layer*a.scaled.P}),a.$watch("metadata.height",function(){a.metadata.height=parseInt(a.metadata.height),a.scaled.height=a.metadata.height*a.scaled.K,b()}),a.$watch("metadata.width",function(){a.metadata.width=parseInt(a.metadata.width),a.scaled.width=a.metadata.width*a.scaled.K,b()}),a.$watch("metadata.layer",function(){a.metadata.layer=parseInt(a.metadata.layer),a.scaled.layer=a.metadata.layer*a.scaled.P,b(),a.metadata.layer<=3&&(a.metadata.options.stairs.left=!1,a.metadata.options.stairs.right=!1)}),a.exportMetadata=function(a){c("metadata.json",JSON.stringify(a,null,2))}}]),angular.module("directives",[]).directive("blueprintBaseFoundation",function(){return{templateUrl:"views/directives/blueprints/base/foundation.html",controller:["$scope",function(a){function b(){a.outer={diff:parseInt(380*a.metadata.scale)},a.outer.width=a.scaled.width+a.outer.diff,a.outer.height=a.scaled.height+a.outer.diff,a.center={diff:parseInt(80*a.metadata.scale)},a.center.offset=parseInt((a.outer.diff-a.center.diff)/2),a.center.width=a.scaled.width+a.center.diff,a.center.height=a.scaled.height+a.center.diff,a.inner={diff:parseInt(-220*a.metadata.scale)},a.inner.offset=parseInt((a.outer.diff-a.inner.diff)/2),a.inner.width=a.scaled.width+a.inner.diff,a.inner.height=a.scaled.height+a.inner.diff,a.inner.height=a.inner.height<0?0:a.inner.height}a.$watch("metadata.width",b),a.$watch("metadata.height",b),a.$watch("metadata.scale",b)}]}}).directive("blueprintSimpleFoundation",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/simple/foundation.html"}}).directive("blueprintCompleteFoundation",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/complete/foundation.html"}}).directive("blueprintBaseSide",function(){return{templateUrl:"views/directives/blueprints/base/side.html"}}).directive("blueprintSimpleSide",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/simple/side.html"}}).directive("blueprintCompleteSide",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/complete/side.html"}}).directive("blueprintBaseFront",function(){return{templateUrl:"views/directives/blueprints/base/front.html"}}).directive("blueprintSimpleFront",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/simple/front.html"}}).directive("blueprintCompleteFront",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/complete/front.html"}}).directive("blueprintBaseFlat",function(){return{templateUrl:"views/directives/blueprints/base/flat.html",controller:["$scope","$attrs",function(a,b){a._=_,a.metadata=a.$parent.metadata,a.defines=a.$parent.defines,a.attrs=b,a.clicked=function(b,c,d){var e={};e[a.defines.board_types.board]="墙",e[a.defines.board_types.gate]="门",e[a.defines.board_types.window]="窗",e[a.defines.board_types.none]="无",a.$parent.room_options={right:_.clone(e),front:_.clone(e),back:_.clone(e)},delete a.$parent.room_options.back[a.defines.board_types.gate],delete a.$parent.room_options.back[a.defines.board_types.none],0!=d&&delete a.$parent.room_options.back,a.rooms.indexOf(c)==a.metadata.width-1&&(delete a.$parent.room_options.right[a.defines.board_types.gate],delete a.$parent.room_options.right[a.defines.board_types.none]),$("#modal-flat").modal("show"),setTimeout(function(){a.$parent.$apply(function(){a.$parent.room=b})},100)}}]}}).directive("blueprintSimpleFlat",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/simple/flat.html"}}).directive("blueprintCompleteFlat",function(){return{restrict:"E",templateUrl:"views/directives/blueprints/flat.html"}}),angular.module("filters",[]).filter("t",function(){return function(a){var b={0:"一",1:"二",2:"三"};return b[a]}}).filter("letter",function(){return function(a){return String.fromCharCode(65+parseInt(a))}}),angular.module("services",[]);