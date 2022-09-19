const { verifyUser } = require("../../strategies/local");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");

const email = "ahahh@gmail.com";
const password = "registered";

const req = {
	body: {
		email: "fake_email",
		password: "fake_password",
	},
};

const done = jest.fn((x) => x);
const missingCreds = () => {
	verifyUser(undefined, undefined);
};






// describe("User verify function", () => {
it("should throw Error if email || password fields are empty", async () => {
	// User.findOne.mockResolvedValueOnce(() => ({
	// 	id: 1,
	// 	email: " ",
	// 	password: " ",
	// }));
	// await verifyUser(email, password, done);
	expect(verifyUser).toThrowError(MissingCredentialsError);
});

it("throw if User not found", async () => {
	User.findOne.mockResolvedValueOnce(() => ({
		id: 1,
		email: "email",
		password: "password",
	}));
	await verifyUser(email, password);
	expect(verifyUser).toThrowError(UserNotFoundError);
});
// });
