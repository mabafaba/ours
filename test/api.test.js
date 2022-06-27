// for unit testing for api endpoints roughly following https://medium.com/@xoor/building-a-node-js-rest-api-8-unit-testing-822c32a587df

const assert = require('assert');

describe("User API", () => {
	describe("/signup", () => {
		it("should increase the total number of users by one", async function () {});
		it("should return error if the username or email already exists", async function () {});
		it("should return error if password constraints are not met", async function () {});
		it("should return error if email address constraints are not met", async function () {});
		it("should return error if any of the vital arguments are missing", async function () {});
	})

	describe("/login", () => {
		it("should make user argument accessible in session", async function () {});
		it("should return error if email or password missmatch", async function () {});
		it("should return an error if user is already logged in", async function () {});

	})

	describe("/logout", () => {
		it("should remove user argument from session", async function(){});
		it("should stop access to user specific database calls", async function(){});
	});  

})





