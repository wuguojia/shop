
$('#time').text(moment().format("YYYY-MM-DD"))
$('#shop').text('泛海国际商场')
setInterval(()=>{
  $('#time').text(moment().format("YYYY-MM-DD"))
  axios.get('https://mock.mengxuegu.com/mock/609541ecc7b7385be0a82b0f/daping/24data')
  .then(res=>{
      // 接口数据
      let all=res.data.all
      $('#all-flow').text(all.flow)
      $('#all-enter').text(all.enter)
      $('#all-month').text(all.month)
      $('#all-getPower').text(all.getPower)
      $('#all-avgDay').text(all.avgDay)
      $('#all-deep').text(all.deep)
  })
},3000)

let myChart=echarts.init(document.getElementById('myChart'))
let options={
      title: {
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data: ['客流量'],
          textStyle:{
            color:'white'
          }
      },
      toolbox: {
          feature: {
              // saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: false,
              data: timeIntval2(moment().subtract(24,'h').format('YYYY-MM-DD  HH:mm:ss'),moment().format('YYYY-MM-DD  HH:mm:ss')),
              axisLabel:{
                color:'white'
                // interval:0,
                // rotate:10
            }
          }
      ],
      yAxis: [
          {
              type: 'value',
              axisLabel:{
                color:'white'
                // interval:0,
                // rotate:10
            }
          }
      ],
      series: [
          {
              name: '客流量',
              type: 'line',
              // stack: '总量',
              
              lineStyle: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(198,167,107)'
                }, {
                    offset: 1,
                    color: 'rgba(208,65,84)'
                }])
            },
              areaStyle: {
                opacity: 0.3,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(198,167,107)'
              }, {
                  offset: 1,
                  color: 'rgba(208,65,84)'
              }])
            },
              emphasis: {
                  focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
          }
      ]
  }

    axios(`https://mock.mengxuegu.com/mock/609541ecc7b7385be0a82b0f/daping/24detail?lg=${timeIntval2(moment().subtract(24,'h').format('YYYY-MM-DD  HH:mm:ss'),moment().format('YYYY-MM-DD  HH:mm:ss')).length}`).then(res=>{
      options.series[0].data=res.data.list
      myChart.setOption(options)
    })
let flowChart=echarts.init(document.getElementById('flowRank'))
let getPowerChart=echarts.init(document.getElementById('getPowerRank'))
let flowOptions={
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)'
    formatter: function (params){
      console.log(params)
      return `${params.seriesName}</br>${params.name}:</br>排行：第${params.seriesIndex+1}名</br>客流量：${params.data.value}人</br>占比：${params.percent}%`
    }
},
  grid: {
    // left: '%',
    // right: '3%',
    // bottom: '3%',
    containLabel: true
},
  series: [{
      realtimeSort: true,
      name: '集客力',
      type: 'pie',
      radius: [20,110],
      center: ['50%', '60%'],
      roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
      data: [],
      label: {
          show: true,
          // 
          position: 'outer',
          margin:10,
          valueAnimation: true
      },
      labelLine: {
        show:true,
        lineStyle: {
          color: "#d71345"
        }
      }
  }],
  // legend: {
  //     show: true,
  //     textStyle:{
  //       color:'white'
  //     },
  //     top:'4%'
  // },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
}
let getPowerOptions={
  
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true
},
  xAxis: {
      max: 'dataMax',
      axisLabel:{
        color:'white'
        // interval:0,
        // rotate:10
    }
  },
  yAxis: {
      type: 'category',
      data: [],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 10, // only the largest 3 bars will be displayed
      axisLabel:{
        color:'white'
        // interval:0,
        // rotate:10
    }
  },
  series: [{
      realtimeSort: true,
      name: '集客力',
      type: 'bar',
      data: [],
      itemStyle: {
        opacity: 0.95,
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#f3956a'
        }, {
            offset: 1,
            color: '#d84a1b'
        }])
    },
      label: {
          show: true,
          position: 'right',
          valueAnimation: true
      }
  }],
  legend: {
      show: true,
      textStyle:{
        color:'white'
      },
      top:'4%'
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
}
let flowData=[]
axios('https://mock.mengxuegu.com/mock/609541ecc7b7385be0a82b0f/daping/getRank').then(res=>{
  let data=res.data.list
  getPowerOptions.yAxis.data=data.shopName
  getPowerOptions.series[0].data=data.shopGetPower
  getPowerChart.setOption(getPowerOptions)
  let newArr=[]
  for(let i=0;i<data.shopName.length;i++){
    newArr.push({value:data.shopFlow[i],name:data.shopName[i]})
  }
  newArr=newArr.sort((a,b)=>b.value-a.value)
  flowData=newArr
  flowOptions.series[0].data=newArr.slice(0,10)
  flowChart.setOption(flowOptions)
})
//30日
let monthChart=echarts.init(document.getElementById('monthChart'))
let monthOptions={
  title: {
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
  },
  legend: {
      data: ['客流量'],
      textStyle:{
        color:'white'
      }
  },
  toolbox: {
      feature: {
          // saveAsImage: {}
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: [
      {
          type: 'category',
          boundaryGap: false,
          data: timeIntval(moment().subtract(30,'days').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')),
          axisLabel:{
            color:'white'
            // interval:0,
            // rotate:10
        }
      }
  ],
  yAxis: [
      {
          type: 'value',
          axisLabel:{
            color:'white'
            // interval:0,
            // rotate:10
        }
      }
  ],
  series: [
      {
          name: '客流量',
          type: 'bar',
          // stack: '总量',
          itemStyle: {
            borderRadius: [12, 12, 12, 12],
            opacity: 0.96,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#ffec3d'
            }, {
                offset: 1,
                color: 'rgba(27,233,254)'
            }])
        },
          emphasis: {
              focus: 'series',
              blurScope: 'coordinateSystem'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
      }
  ]
}
axios('https://mock.mengxuegu.com/mock/609541ecc7b7385be0a82b0f/daping/24data?lg=31').then(res=>{
  monthOptions.series[0].data=res.data.dataMonth 
  monthChart.setOption(monthOptions)
})







function run () {
  let data = getPowerOptions.series[0].data;
  // let flowData=flowOptions.series[0].data
  for (let i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
          data[i] += Math.round(Math.random() * 2000);
          flowData[i].value+=Math.round(Math.random() * 2000)
      }
      else {
          data[i] += Math.round(Math.random() * 200);
          flowData[i].value+=Math.round(Math.random() * 200)
      }
  }
  flowData=flowData.sort((a,b)=>b.value-a.value)
  flowOptions.series[0].data=flowData.slice(0,10)
  getPowerChart.setOption(getPowerOptions);
  flowChart.setOption(flowOptions)
}

setInterval(()=>{
  run();
}, 3000);
setInterval(()=>{
  axios(`https://mock.mengxuegu.com/mock/609541ecc7b7385be0a82b0f/daping/24detail?lg=1`).then(res=>{
    let axisData=moment().format('HH:mm')
    let data = options.series[0].data;
    data.shift();
    data.push(res.data.list[0]);
    options.xAxis[0].data.shift();
    options.xAxis[0].data.push(axisData);

    myChart.setOption(options);
  })
}, 60000);


window.addEventListener("resize", ()=>{
  myChart.resize()
  flowChart.resize()
  getPowerChart.resize()
  mapChart.resize()
})

function timeIntval(startTime,endTime){
  let arr = []
  // let moment=this.$moment
  startTime = moment(startTime).format('YYYY-MM-DD')
  endTime = moment(endTime).format('YYYY-MM-DD')
  while (moment(startTime).isBefore(endTime)) {
    arr.push(moment(startTime).format('MM-DD'))
    startTime = moment(startTime).add(1, 'days').format('YYYY-MM-DD')
  }
  arr.push(moment(endTime).format('MM-DD'))
  return arr
}
function timeIntval2(startTime,endTime){
  let arr = []
  // let moment=this.$moment
  startTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss')
  endTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss')
  while (moment(startTime).isBefore(endTime)) {
    arr.push(moment(startTime).format('HH:mm'))
    startTime = moment(startTime).add(5, 'm').format('YYYY-MM-DD HH:mm:ss')
  }
  arr.push(moment(endTime).format('HH:mm'))
  return arr
}
