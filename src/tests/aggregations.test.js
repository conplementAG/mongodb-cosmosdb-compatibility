import User from '../model/User.js';
import DBConnectionFactory from '../DBConnectionFactory';
import faker from 'faker';
import asyncForEach from './helpers';


beforeAll(async () => {
  await DBConnectionFactory.create();
})

it('Aggregate should get only 5 users where age is greater then 20', async done => {
    let youngsters = Array(5).fill(1)
        .map(v => new User({name: faker.name.firstName(), email: faker.internet.email(), age: faker.random.number({min:15, max:20})}));
    
    let oldies = Array(5).fill(1)
        .map(v => new User({name: faker.name.firstName(), email: faker.internet.email(), age: faker.random.number({min:21, max:50})}));

    await asyncForEach(youngsters, async u => await u.save());;
    await asyncForEach(oldies, async u => await u.save());;

    const aggregate = User.aggregate([
        {
            $project: { name: 1, age: 1 }
        }
    ]);

    const agePipeline = [{ $match: { age: { $gt: 20} } }]
    aggregate.append(agePipeline);
    
    const res = await aggregate.exec();
    expect(res.length).toBe(5);
    await User.deleteMany();

    done()
})

afterAll(async done => {
    await DBConnectionFactory.closeConnection()
    done()
})