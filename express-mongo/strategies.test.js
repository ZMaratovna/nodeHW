const mongoose = require('mongoose');
const {
  Strategy,
  localStrategyCallback,
  bearerStrategyCallback,
  mockUser
} = require('./mock-strategy');

const doneMock = jest.fn()
const localStrategy = new Strategy('local', doneMock);
const bearerStrategy = new Strategy('bearer', doneMock);

const [name, password, jwt] = ['John', 'qwerty12345', 'vjhvhhiy8y'];

describe('strategies test', () => {

  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://localhost:27017',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
  });;

  test('searching for user', async () => {
    await localStrategy.authenticate();
    expect(doneMock).toHaveBeenCalled();
    expect(doneMock.mock.calls[0][2]).toEqual(mockUser);
  });
  test('searching for user', async () => {
    await bearerStrategy.authenticate();
    expect(doneMock).toHaveBeenCalled();
  });
  test('local strategy callback should successfully done with user info', async () => {
    await localStrategyCallback(name, password, doneMock);
    expect(doneMock).toHaveBeenCalled();
    expect(doneMock.mock.calls[0][2]).toEqual(mockUser);
  });
  test('bearer strategy callback should successfully done with user info', async () => {
    await bearerStrategyCallback({ jwt }, doneMock);
    expect(doneMock).toHaveBeenCalled();
    expect(doneMock.mock.calls[0][2]).toEqual(mockUser);
  });
  test('Should sends an error when token is invalid', async () => {
    await bearerStrategyCallback({ jwt: 'jvjhfhvhehv' }, doneMock);
    expect(doneMock).toHaveBeenCalled();
    expect(doneMock.mock.calls[0][1]).toBeFalsy();
  });
})
