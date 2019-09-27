import User from '../model/User.js';
import DBConnectionFactory from '../DBConnectionFactory';

function arrangeUser() {
  return new User({name: 'gzkras', email:'gzkras@gz.com'});
}

let user = undefined;

beforeAll(async () => {
  await DBConnectionFactory.create();
  user = arrangeUser();
})

it('Should save user to database', async done => {
    const res = await user.save()
    expect(res).toBeDefined();
    expect(res._id).toBeDefined();
    done()
})

it('Should query user to database', async done => {
  const res = await User.findOne({ email: user.email })
  expect(res).toBeDefined();
  expect(res._id).toBeDefined();
  done()
})

it('Should update user to database', async done => {
  const userResult = await User.findOne({ email: user.email })
  userResult.name = 'updated';
  const res = await userResult.save();
  expect(res).toBeDefined();
  expect(res.name).toBe(userResult.name);
  done()
})

it('Should delete user to database', async done => {
  const userResult = await User.findOne({ email: user.email })
  await userResult.delete();

  const res = await User.findOne({ email: user.email })
  expect(res).toBe(null);

  done()
})

afterAll(async done => {
    await DBConnectionFactory.closeConnection()
    done()
})