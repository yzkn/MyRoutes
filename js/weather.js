'use strict';


// Var
var L;
var control;
var map;
var osm;
var thisUrl = location.href;


// 地図設定
var baseMaps = {
    'Esri(航空写真)': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
    'OSM': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: 'c OpenStreetMap contributors'
        }),
    '地理院タイル': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：電子地形図（タイル））です。'
        }),
    '淡色地図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：電子地形図（タイル））です。　Shoreline data is derived from: United States. National Imagery and Mapping Agency. "Vector Map Level 0 (VMAP0)." Bethesda, MD: Denver, CO: The Agency; USGS Information Services, 1997.（ズームレベル2-8）'
        }),
    '写真': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは「電子国土基本図（オルソ画像）」、「東日本大震災後正射画像」、「森林（国有林・民有林）の空中写真（林野庁）」、「地方公共団体等の空中写真」、「簡易空中写真」、「国土画像情報」から作成しております。　Images on 世界衛星モザイク画像 obtained from site https://lpdaac.usgs.gov/data_access maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota, (Year). Source of image data product.（ズームレベル2-8）　データソース：Landsat8画像（GSI,TSIC,GEO Grid/AIST）, Landsat8画像（courtesy of the U.S. Geological Survey）, 海底地形（GEBCO）（ズームレベル9-13）'
        }),

    '地理院地図Vector（道路）': L.maplibreGL({
        style: `style/road.json`,
        attribution: '出典：地理院地図Vector(https://maps.gsi.go.jp/vector/)'
    }),
    '地理院地図Vector（標準地図）': L.maplibreGL({
        style: `style/std.json`,
        attribution: '出典：地理院地図Vector提供実験(https://github.com/gsi-cyberjapan/gsimaps-vector-experiment) https://github.com/gsi-cyberjapan/gsivectortile-mapbox-gl-js'
    }),
    '地理院地図Vector（淡色地図）': L.maplibreGL({
        style: `style/pale.json`,
        attribution: '出典：地理院地図Vector提供実験(https://github.com/gsi-cyberjapan/gsimaps-vector-experiment) https://github.com/gsi-cyberjapan/gsivectortile-mapbox-gl-js'
    }),

    '地理院地図Vector（ベクトルタイルを用いた3D風地図）': L.maplibreGL({
        style: `style/3d/building3d.json`,
        attribution: '出典：地理院地図Vector提供実験(https://github.com/gsi-cyberjapan/gsimaps-vector-experiment) https://github.com/gsi-cyberjapan/gsivectortile-3d-like-building'
    }),
    '地理院地図Vector（ベクトルタイルを用いた3D風地図）building3ddark': L.maplibreGL({
        style: `style/3d/building3ddark.json`,
        attribution: '出典：地理院地図Vector提供実験(https://github.com/gsi-cyberjapan/gsimaps-vector-experiment) https://github.com/gsi-cyberjapan/gsivectortile-3d-like-building'
    }),
    '地理院地図Vector（ベクトルタイルを用いた3D風地図）building3dphoto': L.maplibreGL({
        style: `style/3d/building3dphoto.json`,
        attribution: '出典：地理院地図Vector提供実験(https://github.com/gsi-cyberjapan/gsimaps-vector-experiment) https://github.com/gsi-cyberjapan/gsivectortile-3d-like-building'
    }),

    '地質図（産総研地質調査総合センター）': L.tileLayer('https://gbank.gsj.jp/seamless/v2/api/1.2/tiles/{z}/{y}/{x}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　20万分の1日本シームレス地質図ウェブサイト(https://gbank.gsj.jp/seamless/)'
        }),

    'Google Maps': L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
            attribution: '&copy; Google'
        }),
    'Google Roads': L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
        {
            attribution: '&copy; Google'
        }),
    'Google Satellite': L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            attribution: '&copy; Google'
        }),
    'Google Satellite Hybrid': L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        {
            attribution: '&copy; Google'
        }),
    'Google Streets': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
        {
            attribution: '&copy; Google'
        }),
};

var overlayMaps = {
    'OSM 20%': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            opacity: 0.2
        }),
    'OSM 40%': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            opacity: 0.4
        }),
    '地理院タイル 20%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
        {
            opacity: 0.2
        }),
    '地理院タイル 40%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
        {
            opacity: 0.4
        }),
    '淡色地図 20%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
        {
            opacity: 0.2
        }),
    '淡色地図 40%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
        {
            opacity: 0.4
        }),
    '写真 20%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
        {
            opacity: 0.2
        }),
    '写真 40%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
        {
            opacity: 0.4
        }),
    '地質図（産総研地質調査総合センター） 20%': L.tileLayer('https://gbank.gsj.jp/seamless/v2/api/1.2/tiles/{z}/{y}/{x}.png',
        {
            opacity: 0.2
        }),
    '地質図（産総研地質調査総合センター） 40%': L.tileLayer('https://gbank.gsj.jp/seamless/v2/api/1.2/tiles/{z}/{y}/{x}.png',
        {
            opacity: 0.4
        }),
    'Google Maps 20%': L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
            opacity: 0.2
        }),
    'Google Maps 40%': L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
            opacity: 0.4
        }),
    'Google Roads 20%': L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
        {
            opacity: 0.2
        }),
    'Google Roads 40%': L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
        {
            opacity: 0.4
        })
};


// Initialize

function initMap() {
    L = window.L;
    map = L.map('map', {
        center: [35.681236, 139.767125],
        zoom: 11
    }).addLayer(baseMaps['淡色地図']);
    L.Permalink.setup(map);
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    L.geolet({ position: 'topleft' }).addTo(map);

    L.Control.betterFileLayer({
        position: 'topleft',
        fileSizeLimit: 1024000,
        style: {},
        onEachFeature: () => { },
        layer: L.customLayer,
        importOptions: {
            csv: {
                delimiter: ';',
                latfield: 'LAT',
                lonfield: 'LONG',
            },
        },
        text: {
            title: "Import a layer",
        },
    })
        .addTo(map);

    map.pm.addControls({
        position: 'topright'
    });

    L.control.ruler({
        position: 'topleft'
    }).addTo(map);

    L.control.BigImage({
        downloadTitle: 'Download',
        inputTitle: ' Download your png file: ',
        maxScale: 3,
        position: 'topleft',
        printControlTitle: 'Capture image',
        title: 'Capture image',
    }).addTo(map);

    L.easyButton('<img class="icon" src="img/share.svg" title="Share this map (You need to use Chrome for Android.)"/>', function (btn, map) {
        shareImage();
    }).addTo(map);

    map.on('moveend', async function (e) {
        document.title = 'mytrack (' + await reverseGeocoding(map.getCenter().lat, map.getCenter().lng) + '付近)';
    });

}

function shareImage() {
    domtoimage.toPng(document.getElementsByClassName('leaflet-pane leaflet-map-pane')[0])
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;

            img.onload = () => {
                var mapDiv = document.getElementById('map');
                const canvas = document.createElement('canvas');
                canvas.width = mapDiv.clientWidth;
                canvas.height = mapDiv.clientHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, mapDiv.clientWidth, mapDiv.clientHeight, 0, 0, mapDiv.clientWidth, mapDiv.clientHeight);

                canvas.toBlob((blob) => {
                    const image = new File([blob], 'map.png', { type: 'image/png' });
                    if (navigator.canShare && navigator.canShare({ files: [image] })) {
                        navigator.share({
                            text: 'mytrackで作成した軌跡画像を共有します。',
                            url: thisUrl,
                            files: [image]
                        }).then(() => {
                            console.log('共有に成功しました。')
                        }).catch((error) => {
                            console.log('共有に失敗しました。', error)
                        })
                    }
                });
            };
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}

function addWeatherLayer() {
    const NOWCAST_URL = 'https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N2.json';
    const RASRF_URL = 'https://www.jma.go.jp/bosai/jmatile/data/rasrf/targetTimes.json';

    const overlayMapsOpacity01 = {}
    // 雨雲の動き
    fetch(NOWCAST_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (json) {
            json.sort(function (a, b) {
                return a.validtime - b.validtime;
            });

            json.forEach(element => {
                const basetime = element.basetime;
                const validtime = element.validtime;
                const sourceId = `Nowcast${basetime}${validtime}`;

                const key = `nowcast ${sourceId}`;
                overlayMaps[key + ' 100%'] = L.tileLayer(`https://www.jma.go.jp/bosai/jmatile/data/nowc/${element.basetime}/none/${element.validtime}/surf/hrpns/{z}/{x}/{y}.png`,
                    {
                        opacity: 1
                    });
                overlayMapsOpacity01[key + ' 10%'] = L.tileLayer(`https://www.jma.go.jp/bosai/jmatile/data/nowc/${element.basetime}/none/${element.validtime}/surf/hrpns/{z}/{x}/{y}.png`,
                    {
                        opacity: 0.1
                    });
            });

            // 今後の雨
            fetch(RASRF_URL)
                .then(function (data) {
                    return data.json();
                })
                .then(function (json) {
                    json.sort(function (a, b) {
                        return a.validtime - b.validtime;
                    });

                    json.forEach(element => {
                        const basetime = element.basetime;
                        const validtime = element.validtime;
                        const sourceId = `Nowcast${basetime}${validtime}`;

                        const key = `rasrf ${sourceId}`;
                        overlayMaps[key + ' 100%'] = L.tileLayer(`https://www.jma.go.jp/bosai/jmatile/data/rasrf/${element.basetime}/immed/${element.validtime}/surf/rasrf/{z}/{x}/{y}.png`,
                            {
                                opacity: 1
                            });
                        overlayMapsOpacity01[key + ' 10%'] = L.tileLayer(`https://www.jma.go.jp/bosai/jmatile/data/rasrf/${element.basetime}/immed/${element.validtime}/surf/rasrf/{z}/{x}/{y}.png`,
                            {
                                opacity: 0.1
                            });
                    });

                    Object.assign(overlayMaps, overlayMapsOpacity01);

                    initMap();
                });
        });
}
