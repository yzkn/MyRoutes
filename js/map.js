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
    'English': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：電子地形図（タイル））です。'
        }),
    '数値地図25000（土地条件）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（数値地図25000（土地条件）））です。'
        }),
    '土地条件図（初期整備版）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lcm25k/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（土地条件図））です。'
        }),
    '沿岸海域土地条件図（平成元年以降）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ccm1/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（沿岸海域土地条件図））です。'
        }),
    '沿岸海域土地条件図（昭和63年以前）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ccm2/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（沿岸海域土地条件図））です。'
        }),
    '火山基本図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/vbm/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（火山基本図））です。'
        }),
    '火山基本図データ（基図）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/vbmd_bm/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（火山基本図データ））です。'
        }),
    '火山基本図データ（陰影段彩図）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/vbmd_colorrel/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（火山基本図データ））です。'
        }),
    '火山基本図データ（写真地図）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/vbmd_pm/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（火山基本図データ））です。'
        }),
    '火山土地条件図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/vlcd/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（火山土地条件図））です。'
        }),
    '宅地利用動向調査（首都圏 2005年）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lum4bl_capital2005/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果です。'
        }),
    '宅地利用動向調査（首都圏 2000年）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lum4bl_capital2000/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果です。'
        }),
    '宅地利用動向調査（中部圏 2003年）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lum4bl_chubu2003/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果です。'
        }),
    '宅地利用動向調査（近畿圏 2008年）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lum4bl_kinki2008/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果です。'
        }),
    '宅地利用動向調査（近畿圏 2001年）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lum4bl_kinki2001/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果です。'
        }),
    '20万分1土地利用図（1982～1983年）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lum200k/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果です。'
        }),
    '湖沼図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lake1/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（湖沼図））です。'
        }),
    '湖沼データ': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lakedata/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：地理院タイル（湖沼データ））です。'
        }),
    '白地図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '写真': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは「電子国土基本図（オルソ画像）」、「東日本大震災後正射画像」、「森林（国有林・民有林）の空中写真（林野庁）」、「地方公共団体等の空中写真」、「簡易空中写真」、「国土画像情報」から作成しております。　Images on 世界衛星モザイク画像 obtained from site https://lpdaac.usgs.gov/data_access maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota, (Year). Source of image data product.（ズームレベル2-8）　データソース：Landsat8画像（GSI,TSIC,GEO Grid/AIST）, Landsat8画像（courtesy of the U.S. Geological Survey）, 海底地形（GEBCO）（ズームレベル9-13）'
        }),
    '年度別空中写真（2007年以降） 2007年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2007/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2008年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2008/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2009年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2009/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2010年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2010/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2011年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2011/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2012年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2012/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2013年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2013/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2014年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2014/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2015年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2015/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2016年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2016/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2017年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2017/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2018年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2018/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2019年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2019/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2020年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2020/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2021年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2021/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2022年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2022/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2023年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2023/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年度別空中写真（2007年以降） 2024年度': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/nendophoto2024/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは、電子国土基本図（オルソ画像）、森林（国有林・民有林）の空中写真、地方公共団体等の空中写真、簡易空中写真を撮影年度ごとにまとめたものです。'
        }),
    '年代別の写真 1987年～1990年': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1984年～1986年': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1979年～1983年': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1974年～1978年': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1961年～1969年': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1945年～1950年': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1936年～1942年頃': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_riku10/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 1928年頃': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort_1928/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 電子国土基本図（オルソ画像）（2007年～）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '年代別の写真 簡易空中写真（2004年～）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　航空レーザ測量の点検用等に撮影した写真をつなぎ合わせて、ウェブ地図として閲覧できるようにしたものです。'
        }),
    '年代別の写真 全国ランドサットモザイク画像': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lndst/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　データソース：Landsat8画像（GSI,TSIC,GEO Grid/AIST）, Landsat8画像（courtesy of the U.S. Geological Survey）, 海底地形（GEBCO）'
        }),
    '年代別の写真 世界衛星モザイク画像': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/modis/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　Images on 世界衛星モザイク画像 obtained from site https://lpdaac.usgs.gov/data_access maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota, (Year). Source of image data product.'
        }),
    '色別標高図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　海域部は海上保安庁海洋情報部の資料を使用して作成'
        }),
    // デジタル標高地形図
    'アナグリフ（カラー）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_color/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    'アナグリフ（グレー）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_gray/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '陰影起伏図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '陰影起伏図（全球版）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '傾斜量図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '全国傾斜量区分図（雪崩関連）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/slopezone1map/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '活断層図（都市圏活断層図）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　https://www.gsi.go.jp/bousaichiri/guidebook.html'
        }),
    // 火山土地条件図　数値データ（火山地形分類）
    '治水地形分類図': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lcmfc2/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '明治期の低湿地': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/swale/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    // 宅地利用動向調査成果
    // 全国植生指標データ（250m）
    // 基準点・地磁気・地殻変動
    // 災害伝承・避難場所
    // 震災伝承施設
    '森林（国有林）の空中写真（林野庁）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/rinya/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　林野庁が2011年以降に整備した森林（国有林）の空中写真をウェブ上で閲覧できるように加工したものです。'
        }),
    '森林（民有林）の空中写真': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/rinya_m/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　都道府県が2013年以降に整備した森林（民有林）の空中写真をウェブ上で閲覧できるように加工したものです。'
        }),
    // みなとオアシス
    '土地被覆（GLCNMO）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gmld_glcnmo2/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html) c 国土地理院・千葉大学・協働機関'
        }),
    '植生（樹木被覆率）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gmld_ptc2/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html) c 国土地理院・千葉大学・協働機関'
        }),
    '標高タイル（基盤地図情報数値標高モデル）（DEM10B PNG形式）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '標高タイル（基盤地図情報数値標高モデル）（DEM5A PNG形式）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/dem5a_png/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '標高タイル（基盤地図情報数値標高モデル）（DEM5B PNG形式）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/dem5b_png/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '標高タイル（基盤地図情報数値標高モデル）（DEM5C PNG形式）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/dem5c_png/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '標高タイル（地球地図全球版標高第2版）': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/demgm_png/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '湖水深タイル': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lakedepth/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '基準水面標高タイル': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/lakedepth_standard/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)'
        }),
    '土地分類基本調査（土地履歴調査）（国土政策局）（地形分類図）': L.tileLayer('https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/terrainclassification/terrainclassification1/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　国土交通省国土政策局総合計画課国土管理企画室 '
        }),
    '土地分類基本調査（土地履歴調査）（国土政策局）（土地利用分類（第一期：明治期））': L.tileLayer('https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/landuseclassification/landuseclassification1/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　国土交通省国土政策局総合計画課国土管理企画室 '
        }),
    '土地分類基本調査（土地履歴調査）（国土政策局）（土地利用分類（第二期：昭和期））': L.tileLayer('https://nlftp.mlit.go.jp/kokjo/inspect/tile/landclassification/land_history/landuseclassification/landuseclassification2/{z}/{x}/{y}.png',
        {
            attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　国土交通省国土政策局総合計画課国土管理企画室 '
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
    '地理院地図Vector（白地図）': L.maplibreGL({
        style: `style/blank.json`,
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
    'Google Terrain': L.tileLayer('https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}',
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
    '白地図 20%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
        {
            opacity: 0.2
        }),
    '白地図 40%': L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
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
        }),
    'Google Roads 100%': L.tileLayer('https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
        {
            opacity: 1
        })
};


// Initialize

function initMap2() {
    L = window.L;
    map = L.map('map', {
        center: [35.681236, 139.767125],
        zoom: 11
    }).addLayer(baseMaps['淡色地図']);
    // L.control.layers(baseMaps).addTo(map);
    L.Permalink.setup(map);
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    L.geolet({ position: 'topleft' }).addTo(map);

    L.Control.betterFileLayer({
        position: 'topleft', // Leaflet control position
        fileSizeLimit: 1024000, // File size limit in kb (default: 1024 kb)
        style: {}, // Overwrite the default BFL GeoJSON style function
        onEachFeature: () => { }, // Overwrite the default BFL GeoJSON onEachFeature function
        layer: L.customLayer, // If you want a custom layer to be used (must be a GeoJSON class inheritance)
        // // Restrict accepted file formats (default: .gpx, .kml, .kmz, .geojson, .json, .csv, .topojson, .wkt, .shp, .shx, .prj, .dbf, .zip)
        // formats: ['.geojson', '.kml', '.gpx'],
        importOptions: { // Some file types may have import options, for now, just csv is documented
            csv: {
                delimiter: ';',
                latfield: 'LAT',
                lonfield: 'LONG',
            },
        },
        text: { // If you need translate
            title: "Import a layer", // Plugin Button Text
        },
    })
        .addTo(map);

    map.pm.addControls({
        position: 'topright'
    });

    L.control.ruler({
        position: 'topleft',         // Leaflet control position option
        // circleMarker: {               // Leaflet circle marker options for points used in this plugin
        //     color: 'red',
        //     radius: 2
        // },
        // lineStyle: {                  // Leaflet polyline options for lines used in this plugin
        //     color: 'red',
        //     dashArray: '1,6'
        // },
        // lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
        //     display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
        //     decimal: 2,                 // Distance result will be fixed to this value.
        //     factor: null,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)
        //     label: 'Distance:'
        // },
        // angleUnit: {
        //     display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
        //     decimal: 2,                 // Bearing result will be fixed to this value.
        //     factor: null,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
        //     label: 'Bearing:'
        // }
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