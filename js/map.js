'use strict';

// Var
var L;
var control;
var map;
var osm;
var thisUrl = location.href;


// Util
function mapmove() {
    if (map != null) {
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;
        const zoom = document.getElementById('zoom').value;
        map.panTo(new L.LatLng(roundlatlng(parseFloat(latitude)), roundlatlng(parseFloat(longitude))));
        map.setZoom(parseInt(zoom));
        console.log(
            'map.panTo()',
            roundlatlng(parseFloat(latitude)), roundlatlng(parseFloat(longitude)), parseInt(zoom)
        );
    }
}

function roundlatlng(val) {
    const base = 0.0000001 // 約1cm相当の経緯度
    return Math.round(val / base) * base;
}


// Initialize
function initMenu() {
    var menu = document.getElementById('menu');
    menu.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item"><a href="osm.html" target="_blank">OSM</a></li>
            <li class="list-group-item"><a href="index.html" target="_blank">Esri(航空写真)</a></li>
            <li class="list-group-item"><a href="gsistd.html" target="_blank">地理院タイル</a></li>
            <li class="list-group-item"><a href="gsipale.html" target="_blank">淡色地図</a></li>
            <li class="list-group-item"><a href="gsirelief.html" target="_blank">色別標高図</a></li>
            <li class="list-group-item"><a href="gsilum200k.html" target="_blank">20万分1土地利用図</a></li>
        </ul>`;

    var latlngzoom = document.getElementById('latlngzoom');
    latlngzoom.innerHTML = `
        <form>
            <div class="form-group">
                <label for="latitude">Latitude</label>
                <input type="number" step="0.000001" min="-90" max="90" class="form-control" id="latitude" placeholder="Enter latitude" value="35.681236">
            </div>
            <div class="form-group">
                <label for="longitude">Longitude</label>
                <input type="number" step="0.000001" min="-180" max="180" class="form-control" id="longitude" placeholder="longitude" value="139.767125">
            </div>
            <div class="form-group">
                <label for="zoom">Zoom level</label>
                <input type="range" step="1" min="1" max="30" class="form-control-range" id="zoom" value="11">
            </div>
            <button type="button" class="btn btn-primary" id="mapmove">Move</button>
        </form>`;

    const mapmoveElement = document.getElementById('mapmove');
    mapmoveElement.addEventListener('click', (event) => {
        mapmove();
    });
}

function initMap() {
    L = window.L;
    osm = L.tileLayer(uri, {
        attribution: attr
    });
    map = L.map('map', {
        center: [35.681236, 139.767125],
        zoom: 11
    }).addLayer(osm);
    var style = {
        color: 'red',
        opacity: 1.0,
        fillOpacity: 1.0,
        weight: 1,
        clickable: false
    };
    L.Control.FileLayerLoad.LABEL = '<img class="icon" src="img/pin.svg" />';
    control = L.Control.fileLayerLoad({
        fileSizeLimit: 1024000,
        fitBounds: true,
        layerOptions: {
            style: style,
            pointToLayer: function (data, latlng) { }
        }
    });
    control.addTo(map);
    control.loader.on('data:loaded', function (e) {
        var layer = e.layer;
        console.log(layer);
    });

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

    map.on('moveend', function (e) {
        const latitude = document.getElementById('latitude');
        const longitude = document.getElementById('longitude');
        const zoom = document.getElementById('zoom');
        console.log(
            'moveend',
            map.getCenter().lat, map.getCenter().lng, map.getZoom(),
            latitude.value, longitude.value, zoom.value
        );
        latitude.value = roundlatlng(map.getCenter().lat);
        longitude.value = roundlatlng(map.getCenter().lng);
        zoom.value = map.getZoom();
    });
}

function initMiniMap() {
    var osm2 = new L.TileLayer(uriMini, { attribution: attr });
    var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);
}

function initGeoman() {
    map.pm.addControls({
        position: 'topleft'
    });
}

//

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
                            text: 'MyRoutesで作成した軌跡画像を共有します。',
                            url: thisUrl,
                            files: [image]
                        }).then(() => {
                            console.log('共有に成功しました。')
                        }).catch((error) => {
                            console.log('共有に失敗しました。', error)
                        })
                    } else {
                        window.alert("このブラウザは Web Share API に対応していないようです。Chrome for Android をご利用ください。");

                        var resultDiv = document.getElementById('result');
                        const details = document.createElement('details');
                        resultDiv.textContent += '出力画像';
                        resultDiv.appendChild(details);
                        details.appendChild(canvas);
                    }
                });
            };
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}