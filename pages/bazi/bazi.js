var calendar = require('../../utils/calendar');
var jieqi = require('../../utils/jieqi.js');
Page({
  data: {
  detail:'',//显示干支
  },
  onLoad: function(options) {
    var that = this;
    //获取当前的年月日时分
    var timeCalc = '2019-11-07 16:21:26';
    var yearCalc = '2019';
    var shichen = '申';//可以根据时间计算出来
    //跟立春相比较
    var aleardyLichun = that.lichunStatus(timeCalc, yearCalc);
    // 跟当前月份的节气相比较
    var alreadyJq = that.jieqiStatus(timeCalc, yearCalc);
    
    var detail = calendar.solar2lunar('2019', '11', '07','16', aleardyLichun, alreadyJq, '申'); //阳历
    that.setData({
      detail:detail
    })
  },

  // 查看是否已经立春
  lichunStatus: function(timeCalc,yearCalc) {
    var that = this;
    var jieqiAll = jieqi.JQCalc(yearCalc);
    var lichunTime = Date.parse(jieqiAll[10].slice(4));//找出立春的时间,并转化成时间戳
    // 跟要计算的时间戳相比较，查看是否已经过了立春
    var timeCalc = Date.parse(timeCalc);
    if (timeCalc-lichunTime >= 0) {
      var aleadyLichun = true;
    } else {
      var aleadyLichun = false;
    }
    return aleadyLichun;
  },
  //查看是否已经过了当月的节气
  jieqiStatus: function (timeCalc, yearCalc) {
    var that = this;
    var jieqiTime = Date.parse(jieqi.ZJQMonth(yearCalc, timeCalc)); //当月的节气
    var timeCalc = Date.parse(timeCalc);
    if (timeCalc - jieqiTime>=0){
      var aleardyJq = true;
    }else{
      var aleardyJq = false;
    }
    return aleardyJq;
  },
})