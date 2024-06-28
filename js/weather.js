const apiBaseUrl = 'https://tjwn.glitch.me';
const apiLocationUrl = '/location/';
const apiTargetLocations = ['秩父市', '飯能市', '所沢市'];


const retrieve = async _ => {
    fetch(
        // apiLocationUrl + apiTargetLocations.join(',')
        "http://localhost/GitHub/MyRoutes/%E7%A7%A9%E7%88%B6%E5%B8%82,%E9%A3%AF%E8%83%BD%E5%B8%82,%E6%89%80%E6%B2%A2%E5%B8%82.json"
        , {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8"
            }
        })
        .then((response) => response.json())
        .then((jsonData) => {
            Object.keys(jsonData).forEach((city) => {
                let result = `<div><div title="${jsonData[city].hall.lat},${jsonData[city].hall.long}">${city}</div>`;

                let tjResult = '<div class="tj">';
                Object.keys(jsonData[city].tj).forEach((tjDate) => {
                    tjResult += `<img class="weatherIcon" title="${tjDate} ${jsonData[city].tj[tjDate].temperature}℃" src="${jsonData[city].tj[tjDate].weatherIcon}">`;
                });
                tjResult += `</div>`;

                let wnResult = '<div class="wn">';
                Object.keys(jsonData[city].wn).forEach((wnDate) => {
                    wnResult += `<img class="weatherIcon" title="${wnDate} ${jsonData[city].wn[wnDate].temperature}℃" src="${jsonData[city].wn[wnDate].weatherIcon}">`;
                });
                wnResult += `</div>`;

                result += tjResult + wnResult;
                result += `</div>`;


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
                marker.bindPopup(result, { autoClose: false, minWidth: 400 }).openPopup();
                // マーカー
            });

        })
        .catch(console.error);
};


const checkVersion = _ => {
    fetch(apiBaseUrl, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8"
        }
    }).then(response => {
        if (response.status == 200) {
            retrieve();
        }
    });
};


const main = _ => {
    checkVersion();
};

main();
