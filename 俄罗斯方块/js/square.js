// 1.块构造器。。。明明是主角，就这么两行
function Square(){
  this.y = 0;
  this.x = 3;
  this.data = randomPiece();
};

// 3.未越界+没有实质数据(=1)的，可以继续设置
Square.prototype.boundary = function(i,j){
  if(i+this.y >= mainMap.length || j+this.x >= mainMap[0].length || i+this.y < 0 || j+this.x < 0){
    return false;
  }
  if(mainMap[i+this.y][j+this.x] == 2){
    return false;
  }
  return true;
}

// 3.落到底边停止
Square.prototype.bottomStop = function(x,y,posdata){
  var data = posdata || this.data;
  var row = data.length;
  var col = data[0].length;
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
      if(data[i][j] == 1){
        try{
          if(typeof(mainMap[y + i][x + j]) == 'undefined' || mainMap[y + i][x + j] == 2){
            return false;
          }
        }catch(err){
          console.log(err);
          return false;
        }
      }
    }
  }
  return true;
}

// 2.用来生成curr数据不断并入mainmap中，每次动作后都需要调用
Square.prototype.setData = function(){
  var row = this.data.length;
  var col = this.data[0].length;
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
      if(this.data[i][j]==1 && mainMap[this.y + i][this.x + j] == 2){
        cur.end();
      }
      if(this.boundary(i,j)){
        mainMap[this.y + i][this.x + j] = this.data[i][j];
      }
    }
  }
  render(gameMap,mainMap);
}

// 2.当初没有想到好的清理办法，后明白只需把current的块4x4全部清零就行
Square.prototype.clear = function(){
  var row = this.data.length;
  var col = this.data[0].length;
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
      if(this.boundary(i,j)){
        mainMap[this.y + i][this.x + j] = 0;
      }
    }
  }
}

// 本次块落到底后变色，变为沉淀块，新生块
Square.prototype.sink = function(){
  var row = this.data.length;
  var col = this.data[0].length;
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
      if(this.data[i][j] == 1){
        mainMap[this.y + i][this.x + j] = 2;
      }
    }
  }
  killSquare();
  cur = next;
  cur.init();
}

// 游戏初始化
Square.prototype.init = function(){
  next = new Square();
  render(gameMap,mainMap);
  render(nextMap,next.data);
  cur.setData();
}

Square.prototype.start = function(){
  time = setInterval(function(){
    cur.clear();
    cur.run();
  },400);
}
Square.prototype.end = function(){
  clearInterval(time);
  grade.innerHTML = "得分：" + gra + '</br>游戏已结束' + '</br>最高成绩：' + bestGra;
}
Square.prototype.reStart = function(){
  clearInterval(time);
  cur = new Square();
  mainMap = newMap(mainMap);
  bestGra = gra > bestGra ? gra : bestGra;
  gra = 0;
  time = setInterval(function(){
    cur.clear();
    cur.run();
  },400)
  grade.innerHTML = "得分：" + gra + '</br>游戏重新开始</br>最高成绩：' + bestGra;
}

// 总逻辑运行函数
Square.prototype.run = function(){
  if(this.bottomStop(this.x,this.y+1)){
    this.y += 1;
    this.setData();
  }else{
    this.sink();
  }
}

// 暂停游戏
Square.prototype.pause = (function(){
  var bools = true;
  return function(){
    if(bools && time != undefined){
      clearInterval(time);
      state = '游戏已暂停'
    }else{
      time = setInterval(function(){
        cur.clear();
        cur.run();
      },400);
      state = '游戏又运行了'
    }
    bools = !bools;
    grade.innerHTML = "得分：" + gra + '</br>' + state + '</br>最高成绩：' + bestGra;
  }
})()



/*以下是对于块的操作*/

Square.prototype.down = function(){
  while(this.bottomStop(this.x,this.y+1)){
    this.y += 1;
  }
  this.sink();
}

Square.prototype.left = function(){
  if(this.bottomStop(this.x-1,this.y)){
    this.x -= 1;
    this.setData();
  }
}
Square.prototype.right = function(){
  if(this.bottomStop(this.x+1,this.y)){
    this.x += 1;
    this.setData();
  }
}

// 块旋转逻辑
Square.prototype.rightRoute = function(){
  var newData = [];
  var oldData = this.data;
  newData = [
    [oldData[3][0],oldData[2][0],oldData[1][0],oldData[0][0]],
    [oldData[3][1],oldData[2][1],oldData[1][1],oldData[0][1]],
    [oldData[3][2],oldData[2][2],oldData[1][2],oldData[0][2]],
    [oldData[3][3],oldData[2][3],oldData[1][3],oldData[0][3]],
  ];
  if(this.bottomStop(this.x,this.y,newData)){
    this.data = newData;
  }
  this.setData();
}

Square.prototype.leftRoute = function(){
  var newData = [];
  var oldData = this.data;
  newData = [
    [oldData[0][3],oldData[1][3],oldData[2][3],oldData[3][3]],
    [oldData[0][2],oldData[1][2],oldData[2][2],oldData[3][2]],
    [oldData[0][1],oldData[1][1],oldData[2][1],oldData[3][1]],
    [oldData[0][0],oldData[1][0],oldData[2][0],oldData[3][0]],
  ];
  if(this.bottomStop(this.x,this.y,newData)){
    this.data = newData;
  }
  this.setData();
}
