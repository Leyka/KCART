const seeder = require('mongoose-seed')
const path = require('path')
const config = require(path.resolve('config'))

seeder.connect(config.db.url, () => {
  seeder.loadModels([
    path.join(__dirname, 'location')
  ])
  seeder.populateModels(data, () => {
    seeder.disconnect()
  })
})

const data = [
  {
    model: 'Location',
    documents: [
      {
        publicId: 80002,
        label: 'Greater Montreal'
      }
    ]
  }
]
