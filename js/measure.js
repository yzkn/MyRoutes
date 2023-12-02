function initMeasure() {
    const property = {
        color: "navy",
        opacity: 0.6,
        weight: 8
    };
    const result = document.getElementById("result");

    let path = [];
    let line = null;
    let origin, destination;
    let totalDist = 0;

    const measureDist = (pos1, pos2) => {
        return pos1.distanceTo(pos2);
    };

    const updateDist = (delta) => {
        totalDist += delta;
        result.innerHTML = "距離: " + (totalDist >= 1000 ? Math.round(totalDist * 10 / 1000) / 10 + "km" : Math.round(totalDist * 100) / 100 + "m");
    };

    map.on("click", (e) => {
        const label = e.latlng.lat + " , " + e.latlng.lng;

        map.doubleClickZoom.disable();

        if (path.length > 1 && e.latlng.lat == path[path.length - 1].lat && e.latlng.lng == path[path.length - 1].lng) {
            return null;
        }

        path.push(e.latlng);

        if (path.length == 1) {
            origin = L.marker(path[0]).addTo(map).bindPopup(label);
            destination = L.marker(path[0]).addTo(map).bindPopup(label);
            line = L.polyline(path, property).addTo(map);
            result.innerHTML = label;
        } else {
            line.addLatLng(e.latlng);
            destination.setLatLng(e.latlng);
        }

        if (path.length > 1) {
            updateDist(measureDist(path[path.length - 2], path[path.length - 1]));
        }

        if (e.originalEvent.shiftKey) {
            resetPath(e);
        }
    });

    document.getElementById("undo").addEventListener("click", (e) => {
        if (path.length > 1) {
            let rm = path.pop();
            updateDist(-measureDist(rm, path[path.length - 1]));
            line.setLatLngs(path);
            destination.setLatLng(path[path.length - 1]);
            map.panTo(path[path.length - 1]);
        }
    });

    document.getElementById("finish").addEventListener("click", () => {
        origin.remove(map);
        destination.remove(map);
        line.remove(map);
        line = origin = destination = null;
        path = [];
        totalDist = 0;
        map.doubleClickZoom.enable();
    });
}
