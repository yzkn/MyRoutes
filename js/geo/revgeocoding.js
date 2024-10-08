const reverseGeocoding = async (lat, lon) => {
    const response = await fetch(
        `https://revgeocoding.yuz.workers.dev/?lat=${lat}&lon=${lon}`
    );
    if (!response.ok) {
        return undefined;
    }

    const result = await response.json();
    return result.city + result.lv01Nm;
};
