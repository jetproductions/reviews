const reviewSchema = new Schema({
  id: Schema.Types.ObjectId,
  productId: Number,
  rating:{ 
    type: Number,
    min: 1,
    max: 5
  },
  summary: String,
  body: String,
  recommend: Boolean,
  response: String,
  helpfulness: {
    type: Number,
    default: 0
  },
  reported: Boolean,
  date: {
    type: Date,
    default: Date.now
  },
  reviewer: {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    }
  },
  photos: [String],
  characteristics: [{
    type: Schema.Types.ObjectId,
    ref: 'characteristicSchema'
  }]
})

const characteristicSchema = new Schema({
  id: Schema.Types.ObjectId,
  characteristicId: Number,
  productId: Number,
  name: String,
  value: {
    type: Number,
    min: 1,
    max: 5
  }
})

// const productCharacteristics = await Characteristic.find({ productId: 3 })

// var productCharacteristics = [
//   { characteristicId: 14, name: 'Size', value: 4},
//   { characteristicId: 14, name: 'Size', value: 3},
//   { characteristicId: 14, name: 'Size', value: 1},
//   { characteristicId: 15, name: 'Width', value: 2},
//   { characteristicId: 15, name: 'Width', value: 2},
//   { characteristicId: 15, name: 'Width', value: 1},
// ]

// var characteristics = productCharacteristics.reduce((acc, char) => {
//   const { characteristicId, name, value } = char
//   acc[name] = name in acc 
//               ? { ...acc[name], total: (acc[name].total + value), count: acc[name].count + 1, value: (acc[name].total + value) / (acc[name].count + 1) }
//               : { id: characteristicId, total: value, count: 1, value }
//   return acc
// }, {})

// console.log(JSON.stringify(characteristics))
// "{"Size":{"id":14,"value":2.666667},"Width":{"id":15,"value":1.666667}}"