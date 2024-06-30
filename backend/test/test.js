const createBillByUserId = require('../controllers/Bills/createBillByUserId'); // Replace with the correct module path
const schemas = require('../mongodb/schemas/schemas');

// Mocking the dependencies
jest.mock('../mongodb/schemas/schemas', () => ({
  User: {
    findOne: jest.fn(),
    find: jest.fn(),
  },
  Tax: {
    findOne: jest.fn(),
  },
  Orders: {
    find: jest.fn(),
  },
  Drink: {
    findOne: jest.fn(),
  },
  Food: {
    findOne: jest.fn(),
  },
  OtpVerify: {
    findOne: jest.fn(),
  },
  Bills: jest.fn(),
}));

describe('createBillByUserId', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        user_id: 'user123',
        donationAmount: 10,
        membership_id: 'membership123',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 if user is not found', async () => {
    schemas.User.findOne.mockResolvedValue(null);

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found.' });
  });

  it('should return 403 if user status is not allowed', async () => {
    schemas.User.findOne.mockResolvedValue({ userStatus: '1' });

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'User status is not allowed to create a bill.' });
  });

  it('should create a bill and return a 200 status code', async () => {
    const user = { userStatus: '2' }; // User status allows bill creation
    schemas.User.findOne.mockResolvedValue(user);
    schemas.Bills.mockReturnValueOnce({ save: jest.fn() });

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bill created successfully.' });
  });

  it('should return a 403 status code if user status is on the edge', async () => {
    const user = { userStatus: '0' }; // User status is on the edge
    schemas.User.findOne.mockResolvedValue(user);

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'User status is not allowed to create a bill.' });
  });

  it('should return a 400 status code if membership ID is missing', async () => {
    req.params.membership_id = undefined;

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Membership ID is required.' });
  });

  it('should return a 400 status code if donation amount is not a positive number', async () => {
    req.params.donationAmount = -10;

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Donation amount must be a positive number.' });
  });

  it('should return a 400 status code if user ID is invalid', async () => {
    req.params.user_id = 'invalid_user_id';
    schemas.User.findOne.mockResolvedValue(null);

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user ID.' });
  });

  it('should return a 400 status code if request is empty', async () => {
    req = {}; // Empty request object

    await createBillByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request.' });
  });
});
