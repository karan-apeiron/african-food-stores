const res = require("express/lib/response");

const iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
const icons = {
    parking: {
        name: 'Locations',
        icon: iconBase + 'red-dot.png',
    },
    library: {
        name: 'Banners',
        icon: iconBase + 'green-dot.png',
    },
};

function drawMap(markers) {
    const singleMark = markers[0];
    const myLatLng = {
        lat: Number.parseFloat(singleMark.lat),
        lng: Number.parseFloat(singleMark.lng),
    };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: myLatLng,
    });
    bounds = new google.maps.LatLngBounds();
    for (let m of markers) {
        let mark = new google.maps.Marker({
            position: {
                lat: Number.parseFloat(m.lat),
                lng: Number.parseFloat(m.lng),
            },
            title: m.title,
            icon: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
            map,
        });
        bounds.extend(mark.position);
    }
    // map.fitBounds(bounds);
    // map.panToBounds(bounds);
}

async function initMap() {
    fetch('./places.json').then(
        response => response.json()
    ).then(json => {
        drawMap(json)
    })
    // drawMap(markers);
    // await drawMap(markers.banners, 'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
}


// json data
