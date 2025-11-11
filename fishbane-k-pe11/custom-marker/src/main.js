 
 const init = () => {
 mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0LWZpc2giLCJhIjoiY21odGNtYTgzMXFhbjJscHFqbzJvOWRhayJ9.hk7zKGuQOnx1atdfbo2jAA';

        //code from step 5 will go here
        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-77.032, 38.913]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'Washington, D.C.'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-122.414, 37.776]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'San Francisco, California'
                    }
                },
                {
                  type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [121.56053151138678, 25.043681409959248]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'Taipei, Taiwan'
                       }
                       }
            ]
        };

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-96, 37.8],
            zoom: 3
        });

        //code from step 6 will go here
        // add markers to map
        for (const feature of geojson.features) {

            // code from step 7-1 will go here
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);

            //code from step 8 will go here
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                        )
                )
                .addTo(map);
        }
    };
    export { init };