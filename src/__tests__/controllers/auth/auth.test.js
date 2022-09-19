const userController = require("../../../controllers/auth");
const User = require("../../../database/models/user");
const { hashPassword } = require("../../../utils/helpers");

jest.mock("../../../utils/helpers", () => ({
	hashPassword: jest.fn(() => "hash password"),
}));

jest.mock("../../../database/models/user");

// mocking the data
const req = {
	body: {
		email: "fake_email",
		password: "fake_password",
	},
};
const res = {
	status: jest.fn((x) => x),
	send: jest.fn((x) => x),
	redirect: jest.fn((x) => x),
};

// works fine
it("should send a status of 400 if user exists", async () => {
	User.findOne.mockImplementationOnce(() => ({
		id: 1,
		email: "email",
		password: "password",
	}));
	await userController.register(req, res);
	expect(res.status).toHaveBeenCalledWith(400);
	expect(res.send).toHaveBeenCalledTimes(1);
});

it("should send a status code of 201 when new user is registered", async () => {
	User.findOne.mockResolvedValueOnce(undefined);
	User.create.mockResolvedValueOnce({
		id: 1,
		email: "email",
		password: "password",
	});
	await userController.register(req, res);
	expect(hashPassword).toHaveBeenCalledWith("fake_password");
	expect(User.create).toHaveBeenCalledWith({
		email: "fake_email",
		password: "hash password",
	});
	expect(res.redirect).toHaveBeenCalledTimes(1);
	expect(res.send).toHaveBeenCalledWith(201);
});