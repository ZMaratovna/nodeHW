const mongoose = require('mongoose');

const { User } = require('./models/User');

const userData = { name: 'John', password: 'qwerty12345', jwt: 'ncjdggvgev33i900' };
const uri = 'mongodb://localhost:27017';

describe('User Model Test', () => {

  beforeAll(async () => {
    await mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
  });

  it('Should create & save user successfully', async () => {

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.createdAt).toBeDefined();
  });


  it('Should insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new User({ name: 'John', password: 'qwerty12345', nickname: 'Handsome' });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });

  it('Creation without required field should  be failed', async () => {
    const userWithoutRequiredField = new User({ name: 'John' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.password).toBeDefined();
  });
})