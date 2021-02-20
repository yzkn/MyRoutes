'use strict';

// Var
var L;
var control;
var map;
var osm;
var thisUrl = location.href;


// Initialize
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
            pointToLayer: function (data, latlng) {
                // return L.circleMarker(
                //     latlng,
                //     { style: style }
                // );
            }
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
}

function initMiniMap() {
    var osm2 = new L.TileLayer(uriMini, { attribution: attr });
    var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);
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