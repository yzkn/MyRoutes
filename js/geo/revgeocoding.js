const reverseGeocoding = async (lat, lon) => {
    const result = await getMuniCd(lat, lon);
    const muniCd = result?.muniCd;
    const lv01Nm = result?.lv01Nm;
    if (!muniCd && !lv01Nm) {
        return '---';
    }

    return getPrefecture(muniCd) + lv01Nm;
};

const getMuniCd = async (lat, lon) => {
    const response = await fetch(
        `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lon}`
    );
    if (!response.ok) {
        return undefined;
    }

    const lonLatToAddress = await response.json();
    return lonLatToAddress.results;
};

const getPrefecture = (muniCdInput) => {
    const muniCd =
        muniCdInput.substring(0, 1) === "0" ? muniCdInput.slice(1) : muniCdInput;
    const muniContents = MUNI_ARRAY[muniCd];
    if (!muniContents) {
        return undefined;
    }

    return muniContents.split(",")[3];
};