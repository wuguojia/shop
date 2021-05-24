

let map = new BMapGL.Map("map");          // 创建地图实例 
let point = new BMapGL.Point(114.2526,30.605714);  // 创建点坐标 
map.centerAndZoom(point,19);  
map.enableScrollWheelZoom(true);

map.setHeading(-64.5);   //设置地图旋转角度
map.setTilt(73);  
$.getJSON('./js/china.json',data=>{
    map.setMapStyleV2({
        styleJson:data
    });
	// option.bmap.mapStyle.styleJson=data
	
})
let indoorManager = new BMapLib.IndoorManager(map)
indoorManager.disableIndoor()