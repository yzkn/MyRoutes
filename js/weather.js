const apiBaseUrl = 'https://tjwn.glitch.me';
const apiLocationUrl = '/location/';
const apiTargetLocations = ['秩父市', '飯能市', '所沢市'];


const retrieve = async _ => {
    console.log('retrieve');

    fetch(
        // apiLocationUrl + apiTargetLocations.join(',')
        "http://localhost/GitHub/MyRoutes/%E7%A7%A9%E7%88%B6%E5%B8%82,%E9%A3%AF%E8%83%BD%E5%B8%82,%E6%89%80%E6%B2%A2%E5%B8%82.json?1"
        , {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8"
            }
        })
        .then((response) => response.json())
        .then((jsonData) => {
            // console.log({ jsonData });

            Object.keys(jsonData).forEach((city) => {

                // console.log('jsonData[city]', jsonData[city]);

                let result = `<div><div title="${jsonData[city].hall.lat},${jsonData[city].hall.long}">${city}</div>`;

                let tjResult = '<div class="tj">';
                Object.keys(jsonData[city].tj).forEach((tjDate) => {
                    // console.log('jsonData[city].tj[tjDate]', jsonData[city].tj[tjDate]);
                    tjResult += `<img class="weatherIcon" title="${tjDate}" src="${jsonData[city].tj[tjDate].weatherIcon}">`;
                });
                tjResult += `</div>`;

                let wnResult = '<div class="wn">';
                Object.keys(jsonData[city].wn).forEach((wnDate) => {
                    wnResult += `<img class="weatherIcon" title="${wnDate}" src="${jsonData[city].wn[wnDate].weatherIcon}">`;
                });
                wnResult += `</div>`;

                result += tjResult + wnResult;
                result += `</div>`;


                console.log(result);


                // マーカー
                let divIcon = L.divIcon({
                    html: city,
                    className: 'marker',
                    iconSize: [100, 20]
                });

                marker = L.marker(
                    [
                        jsonData[city].hall.lat,
                        jsonData[city].hall.long
                    ],
                    { icon: divIcon }).addTo(map);
                marker.bindPopup(result, { autoClose: false, minWidth: 600 }).openPopup();
                // マーカー
            });

        })
        .catch(console.error);
};


const checkVersion = _ => {
    console.log('checkVersion');

    fetch(apiBaseUrl, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8"
        }
    }).then(response => {
        // console.log(response);
        if (response.status == 200) {
            retrieve();
        }
    });
};


const main = _ => {
    console.log('main');

    checkVersion();
};

main();
