require('dotenv').config();
const mongoose = require('mongoose');
const Participant = require('./models/Participant');

const names = [
  { name: 'Alice A', email: 'alice@example.com' },
  { name: 'Bob B', email: 'bob@example.com' },
  { name: 'Charlie C', email: 'charlie@example.com' }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Participant.deleteMany({});
  const created = await Participant.insertMany(names.map(n => ({ ...n, registrationId: require('uuid').v4() })));
  console.log('seeded', created);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
