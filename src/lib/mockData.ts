export const dataGoogleAnalytics =()=>new Promise((res, rej)=>{
res({
    "vistasPagina": [
      { "fecha": "2024-08-01", "vistas": 300 },
      { "fecha": "2024-08-02", "vistas": 450 }
    ],
    "sesiones": [
      { "fecha": "2024-08-01", "sesiones": 200, "tasaRebote": 0.35 },
      { "fecha": "2024-08-02", "sesiones": 300, "tasaRebote": 0.40 }
    ],
    "demografía": {
      "edad": [
        { "rango": "18-24", "porcentaje": 25, "isGrow":false },
        { "rango": "25-34", "porcentaje": 40, "isGrow":true  }
      ],
      "género": [
        { "tipo": "hombre", "porcentaje": 55,  "isGrow":true },
        { "tipo": "mujer", "porcentaje": 45, "isGrow":false  }
      ]
    }
  })
  rej({reason:"Error we have a problem to call data from google analytics"})
})

export const dataGoogleAds = ()=>new Promise((res, rej)=>{
  res({
    "campañas": [
      {
        "nombre": "Campaña 1",
        "impresiones": 1000,
        "clics": 150,
        "conversiones": 20,
        "costo": 200,
      },
      {
        "nombre": "Campaña 2",
        "impresiones": 2000,
        "clics": 300,
        "conversiones": 50,
        "costo": 350
      }
    ]
  })
  rej({reason:"Error we have a problem to get data from google ads"})
})