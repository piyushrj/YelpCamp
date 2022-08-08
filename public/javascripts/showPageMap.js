mapboxgl.accessToken = mapToken;
const campData = JSON.parse(campground);

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campData.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

const marker = new mapboxgl.Marker()
    .setLngLat(campData.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${campData.title}</h4><p>${campData.location}</p>`
            )
    )
    .addTo(map);
