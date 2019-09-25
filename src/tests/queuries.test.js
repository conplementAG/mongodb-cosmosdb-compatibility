import User from '../model/User.js';
import DBConnectionFactory from '../DBConnectionFactory';
import faker from 'faker';
import asyncForEach from './helpers';

let user = undefined;

beforeAll(async () => {
  await DBConnectionFactory.createMongoDBConnection();
  user = new User({name: 'gzkras', email: 'gzkras@gz.com'});
})

it('Should get only name property', async done => {
    await user.save();

    let query = User.findOne({name: user.name});
    query.select('name');
    const res = await query.exec();
    
    expect(res).toBeDefined();
    expect(res._id).toBeDefined();
    expect(res.name).toBeDefined();

    expect(res.email).toBeUndefined();

    await user.delete();

    done()
})

it('Should get only 5 documents', async done => {
    let users = Array(10).fill(1)
        .map(v => new User({name: faker.name.firstName(), email: faker.internet.email()}));

    await asyncForEach(users, async u => await u.save());;

    let query = User.find()
        .limit(5)
        .sort({name: -1})
        .select({name: 1})

    const res = await query.exec();
    expect(res).toBeDefined();
    expect(res.length).toBe(5);

    await User.deleteMany();

    done()
})

it('Should count only 2 documents', async done => {
    let users = Array(2).fill(1)
        .map(v => new User({name: faker.name.firstName(), email: faker.internet.email()}));

    await asyncForEach(users, async u => await u.save());;

    const res = await User.find().count()

    expect(res).toBe(2);

    await User.deleteMany();

    done()
})

it('Should get only 5 users where age is greater then 20', async done => {
    let youngsters = Array(5).fill(1)
        .map(v => new User({name: faker.name.firstName(), email: faker.internet.email(), age: faker.random.number({min:15, max:20})}));
    
    let oldies = Array(5).fill(1)
        .map(v => new User({name: faker.name.firstName(), email: faker.internet.email(), age: faker.random.number({min:21, max:50})}));

    await asyncForEach(youngsters, async u => await u.save());;
    await asyncForEach(oldies, async u => await u.save());;

    let query = User.find().where('age').gt(20);

    const res = await query.exec();
    expect(res.length).toBe(5);

    await User.deleteMany();

    done()
})

afterAll(async done => {
    await DBConnectionFactory.closeConnection()
    done()
})