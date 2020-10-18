export const stationsDataToUi = data => {
  return data.map((station, i) => {
  return {
      type: "Feature",
        id: i,
      geometry: {
      type:"Point",
        coordinates:[+station.latitude, +station.longitude]
    },
      properties: {
        balloonContent: station.address,
          clusterCaption: station.stationNumber,
          hintContent: station.address
      },
     id_1558725749020199: 2462 + i*2,
   }
  })
}