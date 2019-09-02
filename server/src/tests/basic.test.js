import User from "../models/User";
import mongoose from "mongoose";

require("should-http");

const hostUrl = "http://localhost:5000";
const server = require("../server");
const request = require("supertest");
const should = require("should");

const testServer = process.env.NODE_ENV === "testing" ? server : hostUrl;
const newUser = {
	name: "Christian Test",
	email: "christian-test@anneblom.se",
	password: "secret",
};
const existingUser = {
	name: "Christian Test",
	email: "christian-test-existing@anneblom.se",
	password: "secret",
};

describe("Database tests", function () {
	before(function (done) {
		async function clearDB() {
			await User.deleteMany({}).exec();
			const saveUser = new User(existingUser);
			await saveUser.save();
			done();
		}

		if (mongoose.connection.readyState === 0) {
			mongoose.connect(
				process.env.MONGO_TEST_CONNECTION,
				{ useNewUrlParser: true },
				function (err) {
					if (err) {
						throw err;
					}
					clearDB();
				}
			);
		} else {
			clearDB();
		}
	});

	describe("User tests", function () {
		it("should return missing name", function (done) {
			request(testServer)
				.post(`/api/users`)
				.send({
					email: newUser.email,
					password: newUser.password
				})
				.expect(400)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body);
					res.body.errors[0].msg.should.equal("Name is required");
					done();
				});
		});

		it("should return missing email", function (done) {
			request(testServer)
				.post(`/api/users`)
				.send({
					name: newUser.name,
					password: newUser.password
				})
				.expect(400)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body);
					res.body.errors[0].msg.should.equal("Please include a valid email");
					done();
				});
		});

		it("should return password must be longer than 6 characters", function (done) {
			request(testServer)
				.post(`/api/users`)
				.send({
					name: newUser.name,
					email: newUser.email,
					password: "test",
				})
				.expect(400)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body);
					res.body.errors[0].msg.should.equal("Please enter a password with 6 or more characters");
					done();
				});
		});

		it("should return 'User already exists'", function (done) {
			request(testServer)
				.post(`/api/users`)
				.send(existingUser)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body);
					res.body.errors[0].msg.should.equal("User already exists");
					done();
				});
		});

		it("should return token on register", function (done) {
			request(testServer)
				.post(`/api/users`)
				.send(newUser)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body.token);
					done();
				});
		});

		it("should return token on login", function (done) {
			request(testServer)
				.post(`/api/auth`)
				.send({ email: "christian-test@anneblom.se", password: "secret" })
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body.token);
					done();
				});
		});

		it("should respond with user not found when wrong email", function (done) {
			request(testServer)
				.post(`/api/auth`)
				.send({ email: "bla@bla.com", password: "hejhej" })
				.expect(401)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body);
					res.body.errors[0].msg.should.equal("Invalid credentials");
					done();
				});
		});

		it("should respond with incorrect password when wrong password", function (done) {
			request(testServer)
				.post(`/api/auth`)
				.send({ email: newUser.email, password: "hejhej" })
				.expect(401)
				.end(function (err, res) {
					if (err) return done(err);
					should.exist(res.body);
					res.body.errors[0].msg.should.equal("Invalid credentials");
					done();
				});
		});
	});
});
