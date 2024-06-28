// const apiBaseUrl = 'https://tjwn.glitch.me';
const apiBaseUrl = 'http://localhost:3000';

const apiLocationUrl = '/location/';

const apiTargetLocations = [
    '練馬区', '所沢市', '鶴ヶ島市',
    '東松山市', '嵐山町', '高崎市',
    // '渋川市', '沼田市', 'みなかみ町', '湯沢町', '南魚沼市', '魚沼市', '小千谷市', '長岡市',
    // '三条市', '新潟市',
    // '富岡市', '軽井沢町', '佐久市',
    // '小海町',
    // '上田市', '千曲市',
    // '杉並区', '府中市', '八王子市', '上野原市', '大月市',
    // '都留市', '富士吉田市',
    // '甲州市', '甲府市', '甲斐市',
    // '富士川町', '身延町', '南部町',
    // '北杜市', '富士見町', '茅野市', '岡谷市',
    // '松本市', '麻績村',
    // '伊那市', '飯田市', '中津川市', '多治見市', '小牧市', '名古屋市',
    // '町田市', '海老名市', '秦野市', '松田町', '山北町', '小山町',
    // '御殿場市', '裾野市', '沼津市',
    // '三島市', '伊豆市', '河津町', '下田市',
    // '富士市', '静岡市清水区', '静岡市', '島田市',
    // '浜松市', '豊川市', '岡崎市', '豊田市', '刈谷市'
];


const retrieve = async _ => {
    fetch(
        apiBaseUrl + apiLocationUrl + apiTargetLocations.join(',')
        // "http://localhost/GitHub/MyRoutes/%E7%A7%A9%E7%88%B6%E5%B8%82,%E9%A3%AF%E8%83%BD%E5%B8%82,%E6%89%80%E6%B2%A2%E5%B8%82.json"
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
