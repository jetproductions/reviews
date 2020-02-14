const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const entries = process.argv[2];

//create write stream to write to
const ws = fs.createWriteStream('reviews.csv');

// createFakeReview uses faker to create a fake review line
function createFakeReview(id){
  let product_id = Math.ceil(Math.random() * entries) 
  let review = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)]
  let date = moment(Math.floor(new Date().getTime() * Math.random())).format('YYYY-MM-DD') 
  let summary = faker.lorem.paragraph()
  let body = faker.lorem.paragraph()
  let recommend = Boolean([0, 1][Math.floor(Math.random() * 2)])
  let reported = false 
  let reviewer_name = faker.name.findName()
  let reviewer_email = faker.internet.email()
  let response = faker.lorem.paragraph()
  let helpfulness = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)]
  return `${product_id},${review},${date},${summary},${body},${recommend},${reported},${reviewer_name},${reviewer_email},${response},${helpfulness}\n`
}
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeOneMillionTimes(writer, encoding, callback) {
  let i = entries;
  function write() {
    let ok = true;
    do {
      let id = (entries - i) + 1
      i--;
      const data = createFakeReview(id);
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  //invoke write
  write();
}

ws.write(`product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness\n`, 'utf-8')
writeOneMillionTimes(ws, 'utf-8', () => {
  ws.end()
})