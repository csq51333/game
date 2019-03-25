//1.
var mainMap = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

var blockPiece = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

var longPiece = [
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0]
];

var tPiece = [
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
];

var zlPiece = [
  [0, 0, 0, 0],
  [0, 0, 1, 1],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

var zrPiece = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 0]
];

var llPiece = [
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

var lrPiece = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

// 1.游戏渲染函数
function render(contain,map){
  var row = map.length;
  var col = map[0].length;
  contain.innerHTML = "";
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
      var div = document.createElement('div');
      var className = '';
      switch(map[i][j]){
        case 0:
          className = 'none';
          break;
        case 1:
          className = 'curr';
          break;
        case 2:
          className = 'preci';
          break;
        default:break;
      }
      div.className = className;
      div.style.top = (i * 20) + 'px';
      div.style.left = (j * 20) + 'px';
      contain.appendChild(div);
    }
  }
}

// 1.闭包，为了每次都生成的与上次不一样
function nextArr(){
  var last = Math.floor(Math.random()*7);
  return function(){
    var _arr = [blockPiece, longPiece, tPiece, zlPiece, zrPiece, llPiece, lrPiece];
    var randoms = Math.floor(Math.random()*7);
    while(randoms == last){
      randoms = Math.floor(Math.random()*7);
    }
    last = randoms;
    return _arr[randoms];
  }
}

var randomPiece = nextArr();

// 5.消除一排块
function killSquare(){
  var total = 0;
  var _arr = [0,10,30,60,100];
  for(var row = mainMap.length,i=row-1; i > 0; i--){
    if (mainMap[i].indexOf(1) == -1 && mainMap[i].indexOf(0) == -1) {
      mainMap.splice(i,1);
      mainMap.unshift([0,0,0,0,0,0,0,0,0,0]);
      i++;
      total++;
    }
  }
  gra += _arr[total];
  grade.innerHTML = "得分：" + gra + '</br>' + state + '</br>最高成绩：' + bestGra;
}

// 初始化
function newMap(map){
  var _map = [];
  for(var i = 0,len = map.length; i < len; i++){
    var _mapj = []
    for(var j = 0; j < map[0].length; j++){
      _mapj.push(0);
    }
    _map.push(_mapj);
  }
  return _map;
}