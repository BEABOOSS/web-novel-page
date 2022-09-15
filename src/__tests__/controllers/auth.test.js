const { expectCt } = require("helmet");
const userController = require("../../controllers/users");
const User = require("../../models/user");

jest.mock("../../models/user");

// mocking the data
const req = {
	body: {
		email: "fake_email",
		username: "fake_username",
		password: "fake_password",
	},
    login: jest.fn((x) => x),
};

const res = {
	status: jest.fn((x) => x),
	send: jest.fn((x) => x),
};
it("should send a status of 400 if user exists", async () => {
	User.findOne.mockImplementationOnce(() => ({
		id: 1,
		email: "email",
		password: "password",
		username: "username",
	}));
	await userController.register(req, res);
	expect(res.status).toHaveBeenCalledWith(400);
	expect(res.send).toHaveBeenCalledTimes(1);
});

it("should send a status code of 201 when new user is registered", async () => {
	User.findOne.mockResolvedValueOnce(undefined);

	await userController.register(req, res);

	expect(res.send).toHaveBeenCalledWith(201);
});
