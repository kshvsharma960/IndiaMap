
   var map = new ol.Map({
      view:new ol.View({
        center:[0,0],
        zoom:1
      }),
      layers:[
        new ol.layer.Tile({
          source:new ol.source.OSM()
        })
      ],
      target:'map'
	
    });

var statesArr=["ALL","ARUNACHAL PRADESH","BIHAR","KERALA","PUNJAB","MEGHALAYA","MIZORAM","NAGALAND","DADRA AND NAGAR HAVELI","LAKSHADWEEP","SIKKIM","ANDAMAN AND NICOBAR ISLANDS","UTTAR PRADESH","PUNJAB","CHANDIGARH","PONDICHERRY","JAMMU AND KASHMIR","HARYANA","GOA","GUJARAT","MAHARASHTRA","TRIPURA","ANDHRA PRADESH","KARNATAKA","HIMACHAL PRADESH","DELHI","ASSAM","DAMAN AND DIU","MANIPUR","RAJASTHAN","TAMIL NADU","ORISSA","MADHYA PRADESH"];

var baseLayer = new ol.layer.Tile({
        DISPLAY_IN_SWITCHER:true,
        visible: false,
        preload: Infinity,
        source: new ol.source.BingMaps({
            key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
            imagerySet: 'AerialWithLabels'
        })
    });
///////////////////////////////////////////////////////////////////////////////
var indDist=new ol.source.ImageWMS({
      url:'http://10.213.45.103:8899/geoserver/webMap/wms',
      params:{layers:"webMap:indiandistricts"},
      serverType:"geoserver"
    });
  var IndianDistricts = new ol.layer.Image ({
title: 'Indian Districts',
    source:indDist
  });
/////////////////////////////////////////////////////////////////////////////
var indStates=new ol.source.ImageWMS({
      url:'http://10.213.45.103:8899/geoserver/webMap/wms',
      params:{layers:"webMap:indianstates"},
      serverType:"geoserver"

    });

    var IndianStates = new ol.layer.Image ({
      id:'state',
title: 'Indian States',
    source:indStates
  });

///////////////////////////////////////////////////////////////////////////////



var ind=new ol.source.ImageWMS({
      url:'http://10.213.45.103:8899/geoserver/webMap/wms',
      params:{layers:"webMap:india"},
      serverType:"geoserver"
    });

    var India = new ol.layer.Image ({
title: 'India',
    source:ind
  });

///////////////////////////////////////////////////////////////////////////////
      var highlightStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ff0000',
          width: 5
        })
      });

       var defaultStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#0000ff',
          width: 5
        })
      });

///////////////////////////////////////////////////////////////////////////////
      var selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick,
        toggleCondition: ol.events.condition.shiftKeyOnly,
        layers: function (layer) {
          return layer.get('id') == 'state';
        },
        style: highlightStyle
      });
///////////////////////////////////////////////////////////////////////////////
IndianDistricts.setOpacity(0.4);
IndianStates.setOpacity(0.6);
India.setOpacity(0.8);

///////////////////////////////////////////////////////////////////////////////
  var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Layer Switcher' // Optional label for button
    });
	
	map.addControl(layerSwitcher);
map.addLayer(India);

      map.addLayer(IndianStates);
      map.addLayer(IndianDistricts);
      
map.getView().setCenter(ol.proj.fromLonLat([79,21]));
map.getView().setZoom(4);

   map.addInteraction(selectInteraction);
///////////////////////////////////////////////////////////////////////////////
function changeCalled(e){
  var tempParam=null;
  if(e.dataItem!="ALL"){
      tempParam=e.dataItem;
  }
var st_params = {
                CQL_FILTER:  "state='"+tempParam+"'"
            };
var dt_params = {
                CQL_FILTER: "state='"+tempParam+"'"
            };
indStates.updateParams(st_params);
indDist.updateParams(dt_params);

    
}