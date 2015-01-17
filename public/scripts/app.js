window.views_dir=window.views_dir||"views",angular.module("app",["ngRoute","controllers","directives","services","filters"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:window.views_dir+"/app/main.html",controller:"Main"})}]),angular.element(document).ready(function(){angular.bootstrap(document,["app"])}),angular.module("controllers",[]).controller("Main",["$scope","$http",function(a,b){function c(b){a.metadata=_.cloneDeep(b),setTimeout(function(){a.metadata.rooms=_.cloneDeep(b.rooms),a.$apply()},1e3)}function d(){a.metadata.rooms=_.map(_.range(3,Number(a.metadata.layer)+1,3),function(){return _.map(_.range(0,a.metadata.width),function(b){return _.map(_.range(0,a.metadata.height),function(c){var d={left:a.defines.board_types.none,right:a.defines.board_types.none,front:a.defines.board_types.none,back:a.defines.board_types.none,middle:a.defines.board_types.none};return 0==b&&(d.left=a.defines.board_types.board),0==c&&(d.back=b%2?a.defines.board_types.board:a.defines.board_types.window),c==a.metadata.height-1&&(d.front=b%2?a.defines.board_types.gate_right_right:a.defines.board_types.window),d.right=b%2?a.defines.board_types.board:a.defines.board_types.none,d})})})}function e(a,b){var c=document.createElement("a"),d=new Blob([b]),e=document.createEvent("HTMLEvents");e.initEvent("click",!1,!1),c.download=a,c.href=URL.createObjectURL(d),c.dispatchEvent(e)}a._=_,a.defines={blueprint:{width:1046,height:736},board_types:{none:0,window:1,window_half_left:10,window_half_right:11,board:2,board_half_left:20,board_half_right:21,gate_dual:3,gate_left_left:4,gate_left_right:5,gate_right_left:6,gate_right_right:7,gate_left_left_no_border:40,gate_left_right_no_border:50,gate_right_left_no_border:60,gate_right_right_no_border:70},aisle_width:1e3,aisle_height:1e3,stairs_height:3200,K:1820,P:950},a.metadata={width:4,height:3,layer:6,scale:.04,options:{stairs:{left:!0,right:!1,front_left:!1,front_right:!1},fireproof:0,gate_type:0,board_type:0,tile_type:0,tile_class:0,has_awning:0,awning_type:0,display:0}},"undefined"!=typeof window.get_url&&b.get(window.get_url).then(function(a){c(a.data)}),a.$watch("metadata.options.stairs",function(){a.has_front_stairs=a.metadata.options.stairs.front_left||a.metadata.options.stairs.front_right},!0),a.$watch("metadata.scale",function(){a.scaled={K:parseInt(a.defines.K*a.metadata.scale),P:parseInt(a.defines.P*a.metadata.scale),aisle_width:a.defines.aisle_width*a.metadata.scale,aisle_height:a.defines.aisle_height*a.metadata.scale,stairs_height:a.defines.stairs_height*a.metadata.scale},a.scaled.width=a.metadata.width*a.scaled.K,a.scaled.height=a.metadata.height*a.scaled.K,a.scaled.layer=a.metadata.layer*a.scaled.P}),a.$watch("metadata.height",function(){a.metadata.height=parseInt(a.metadata.height),a.scaled.height=a.metadata.height*a.scaled.K,d()}),a.$watch("metadata.width",function(){a.metadata.width=parseInt(a.metadata.width),a.scaled.width=a.metadata.width*a.scaled.K,d()}),a.$watch("metadata.layer",function(){a.metadata.layer=parseInt(a.metadata.layer),a.scaled.layer=a.metadata.layer*a.scaled.P,d(),a.metadata.layer<=3&&(a.metadata.options.stairs.left=!1,a.metadata.options.stairs.right=!1)}),a.exportMetadataToFile=function(a){a.rooms=_.map(a.rooms,function(a){return _.map(a,function(a){return _.map(a,function(a){return delete a.$$hashKey,a})})}),e("metadata.json",JSON.stringify(a,null,2))},a.saveMetadata=function(a){"undefined"!=typeof window.post_url&&b.post(window.post_url,a).then(function(){console.log(!0)},function(){console.log(!1)})},a.importMetadata=function(a){c(JSON.parse(a))},a.copy=function(a){a.width*=2,_.forEach(a.rooms,function(a){return _.forEach(a,function(b){a.push(_.map(b,function(a){return delete a.$$hashKey,a}))})})}}]),function(){var a=["$scope",function(a){function b(){a.outer={diff:parseInt(380*a.metadata.scale)},a.outer.width=a.scaled.width+a.outer.diff,a.outer.height=a.scaled.height+a.outer.diff,a.center={diff:parseInt(80*a.metadata.scale)},a.center.offset=parseInt((a.outer.diff-a.center.diff)/2),a.center.width=a.scaled.width+a.center.diff,a.center.height=a.scaled.height+a.center.diff,a.inner={diff:parseInt(-220*a.metadata.scale)},a.inner.offset=parseInt((a.outer.diff-a.inner.diff)/2),a.inner.width=a.scaled.width+a.inner.diff,a.inner.height=a.scaled.height+a.inner.diff,a.inner.height=a.inner.height<0?0:a.inner.height}a.$watch("metadata.width",b),a.$watch("metadata.height",b),a.$watch("metadata.scale",b)}],b=["$scope","$attrs",function(a,b){a._=_,a.metadata=a.$parent.$parent.metadata,a.defines=a.$parent.$parent.defines,a.has_front_stairs=a.$parent.$parent.has_front_stairs,a.attrs=b,a.clicked=function(b,c,d){var e={"墙":{},"窗":{},"左侧左开门":{},"左侧右开门":{},"右侧左开门":{},"右侧右开门":{}};e["墙"][a.defines.board_types.board]="墙",e["墙"][a.defines.board_types.board_half_left]="左半（窗）",e["墙"][a.defines.board_types.board_half_right]="右半（窗）",e["窗"][a.defines.board_types.window]="窗",e["窗"][a.defines.board_types.window_half_left]="左半（窗）",e["窗"][a.defines.board_types.window_half_right]="右半（窗）",e["左侧左开门"][a.defines.board_types.gate_left_left]="带墙（左侧左开门）",e["左侧左开门"][a.defines.board_types.gate_left_left_no_border]="无墙（左侧左开门）",e["左侧右开门"][a.defines.board_types.gate_left_right]="带墙（左侧右开门）",e["左侧右开门"][a.defines.board_types.gate_left_right_no_border]="无墙（左侧右开门）",e["右侧左开门"][a.defines.board_types.gate_right_left]="带墙（右侧左开门）",e["右侧左开门"][a.defines.board_types.gate_right_left_no_border]="无墙（右侧左开门）",e["右侧右开门"][a.defines.board_types.gate_right_right]="带墙（右侧右开门）",e["右侧右开门"][a.defines.board_types.gate_right_right_no_border]="无墙（右侧右开门）",a.$parent.$parent.room_options={middle:_.clone(e),right:_.clone(e),front:_.clone(e),back:_.clone(e)},0!=d&&delete a.$parent.$parent.room_options.back,0==a.rooms.indexOf(c)&&(a.$parent.$parent.room_options.left=_.clone(e)),$("#modal-flat").modal("show"),setTimeout(function(){a.$parent.$parent.$apply(function(){a.$parent.$parent.room=b})},100)}}];angular.module("directives",[]).directive("blueprintSimpleFoundation",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/simple/foundation.html",controller:a}}).directive("blueprintCompleteFoundation",function(){return{restrict:"E,A,A",templateUrl:window.views_dir+"/directives/blueprints/complete/foundation.html",controller:a}}).directive("blueprintSimpleSide",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/simple/side.html"}}).directive("blueprintCompleteSide",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/complete/side.html"}}).directive("blueprintSimpleFront",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/simple/front.html"}}).directive("blueprintCompleteFront",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/complete/front.html"}}).directive("blueprintSimpleFlat",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/simple/flat.html",controller:b}}).directive("blueprintCompleteFlat",function(){return{restrict:"E,A",templateUrl:window.views_dir+"/directives/blueprints/complete/flat.html",controller:b}})}(),angular.module("filters",[]).filter("t",function(){return function(a){var b={0:"一",1:"二",2:"三"};return b[a]}}).filter("letter",function(){return function(a){return String.fromCharCode(65+parseInt(a))}}),angular.module("services",[]);