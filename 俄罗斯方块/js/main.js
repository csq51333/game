var gameMap = document.getElementById('gameMap');
var nextMap = document.getElementById('next');
var grade = document.getElementById('grade');

var cur = new Square();
var next, // 下一次的块
time, // 定时器
bestGra=0, // 最好成绩
gra = 0, // 目前成绩
level_time = 400;
var state = '游戏运行中';

// 今天在这里结尾03.23：
// 1.怎么一边生成新的current一边定时器下移动？
// 2.怎么让curr实例 = 上次next的值？

// 1.这些需要整合到一个init里去
/*render(nextMap,next.data);
render(gameMap,mainMap);
cur.setData();*/
cur.init();
cur.start();

// 2.键盘事件
document.addEventListener('keyup',function(e){
	console.log(e.keyCode);
	var _code = e.keyCode;
	cur.clear();
	switch(_code){
		case 32:
			cur.pause();
			break;
		case 37:
			cur.left();
			break;
		case 38:
			cur.rightRoute();
			break;
		case 39:
			cur.right();
			break;
		case 40:
			cur.down();
			break;
		case 69:
			cur.leftRoute();
			break;
		case 81:
			cur.rightRoute();
			break;
		case 82:
			cur.reStart();
			break;
		default:break;
	}
})