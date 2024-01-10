import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import Map from 'ol/Map';
import View from 'ol/View';
import { transform } from 'ol/proj';
import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source.js';
import XYZ from 'ol/source/XYZ.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import OGCMapTile from 'ol/source/OGCMapTile.js';
import OGCVectorTile from 'ol/source/OGCVectorTile.js';

import LayerSwitcher from 'ol-layerswitcher';

var map = new Map(
  {
    target: 'map',
    layers: [
        new LayerGroup({
            'title': 'Base maps',
            layers: [
                new TileLayer({
                    title: 'OSM',
                    type: 'base',
                    visible: true,
                    source: new OSM()
                }),
                new TileLayer({
                    title: 'Esri Nat Geo World Map',
                    type: 'base',
                    visible: true,
                    source: new XYZ({
                      attributions:
                        'Tiles &copy; Esri &mdash; National Geographic, Esri, ' +
                        'DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
                      url:
                        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                        'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
                    }),
                  }),
/*                 new TileLayer({
                    title: 'Esri Tile Layer',
                    type: 'base',
                    visible: true,
                    source: new XYZ({
                      attributions:
                        'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                      url:
                        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                        'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                    }),
                  })
 */            ]
        }),
         new LayerGroup({
            title: 'OGC API - Tiles',
            layers: [
                new TileLayer({
                    title: 'Blue Marble',
                    visible: false,
                    source: new OGCMapTile({
                      url: 'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WorldCRS84Quad',
                    }),
                  }),
                  new TileLayer({
                    title: 'General Bathymetric Chart of the Oceans',
                    visible: false,
                    source: new OGCMapTile({
                      url: 'https://maps.gnosis.earth/ogcapi/collections/gebco/map/tiles/WorldCRS84Quad',
                    }),
                  }),

            ]
        })
    ],
    view: new View({
        center: [0,0],
        zoom: 2,
        projection: 'EPSG:4326'
    })
});

var layerSwitcher = new LayerSwitcher();
map.addControl(layerSwitcher);
