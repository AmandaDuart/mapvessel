export const addVessels = (map) => {

  let source = [
    {"name":"Chang-Fisher", "latitude":0, "longitude":0},
    {"name":"Hull-Gallegos", "latitude":0, "longitude":0},
    {"name":"Wagner LLC", "latitude":0, "longitude":0},
    {"name":"Lloyd, Archer and Patel", "latitude":0, "longitude":0},
    {"name":"Collins Ltd", "latitude":0, "longitude":0},
    {"name":"Rivera, Castro and Gomez", "latitude":0, "longitude":0},
    {"name":"Levy Group", "latitude":0, "longitude":0},
    {"name":"Brown-Sellers", "latitude":0, "longitude":0},
    {"name":"Larsen, Page and Glover", "latitude":0, "longitude":0},
    {"name":"Clayton-Cook", "latitude":0, "longitude":0},
    {"name":"Lee PLC", "latitude":0, "longitude":0},
    {"name":"Pratt Group", "latitude":0, "longitude":0},
    {"name":"Bolton, Burns and Turner", "latitude":0, "longitude":0},
    {"name":"Cook, Nielsen and Harris", "latitude":0, "longitude":0},
    {"name":"Roberts, Davis and Yates", "latitude":0, "longitude":0},
    {"name":"White-Underwood", "latitude":0, "longitude":0},
    {"name":"Alvarez-Davis", "latitude":0, "longitude":0},
    {"name":"Mclean Inc", "latitude":0, "longitude":0},
    {"name":"Vega, Massey and Warren", "latitude":0, "longitude":0},
    {"name":"Jacobson PLC", "latitude":0, "longitude":0},
    {"name":"Hill, Vasquez and Davidson", "latitude":0, "longitude":0},
    {"name":"Miller-Salazar", "latitude":0, "longitude":0},
    {"name":"Bruce-Sanchez", "latitude":0, "longitude":0},
    {"name":"Robinson, Norton and Cook", "latitude":0, "longitude":0},
    {"name":"Wyatt and Sons", "latitude":0, "longitude":0},

  ]
  //representa itens ja adicionados no mao
  let included = []

  setInterval(() => {
    //chamada da api
    let vessels = getVessels()
    
    vessels.then((it)=>{
      //percorre o array
      it.forEach((it)=>{
        
        //percorre o banco fake e atualiza com os dados da api
        source.forEach((item)=>{
          if(it.name == item.name){
            item.latitude = it.latitude
            item.longitude = it.longitude
          }
        })
        //se nao foi adicionado
        if (!included.includes(it.name)){
          //adicionao os recurso
          map.current.addSource(it.name, {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [it.latitude, it.longitude],
                        },
                    },
                ],
            },
        });
      
        map.current.addLayer({
            id: it.name,
            type: 'symbol',
            source: it.name,
            layout: {
                // This icon is a part of the Mapbox Streets style.
                // To view all images available in a Mapbox style, open
                // the style in Mapbox Studio and click the "Images" tab.
                // To add a new image to the style at runtime see
                // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                'icon-image': 'vessel',
            },
        });
        included.push(it.name)
        }
      })
    })

    updateData(source, map, included)
    
  }, 5000);

  
  

  async function getVessels(){

    try{
      const response = await fetch(
        'https://vessels-mock.herokuapp.com/',
        { method: 'GET' }
        );
        const parsed = await response.json()
        return parsed
    } catch (err) {
      throw new Error(err);
      }

  }
}

function updateData(source, map, included){
  source.forEach((it)=>{
      
    if(it.latitude != 0 && included.includes(it.name)){
      map.current.getSource(it.name).setData({
        "type": "FeatureCollection",
        "features": [{
        "type": "Feature",
        "properties": {"name": it.name},
        "geometry": {
        "type": "Point",
        //substituir pelas coordenadas da api para ver a atualização real
        "coordinates": [ it.latitude, it.longitude ]
        }
        }]
        });
    }
    console.log("Atualizando!")
  })
}
