if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
// require("dotenv/config");

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const mongoSanitize = require("express-mongo-sanitize");
const User = require("./models/user");
const methodOverride = require("method-override");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
const $ = require("jquery")(window);

const { cloudinary } = require("./cloudinary");

const ExpressError = require("./utils/ExpressError");

const uploadRoutes = require("./routes/uploads");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

const MongoDBStore = require("connect-mongo");
// connect to mongo and sends back error if something goes wrong


mongoose
	.connect(process.env.DB_ATLAS_URL)
	.then(() => {
		console.log("DataBase connected!!!");
	})
	.catch((err) => {
		console.log("OHHH NOO MONGO CONNECTION ERROR!!!");
		console.log(err);
	});

const app = express();

// Setting templating engine to EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// *
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json({ extended: true, limit: "1mb" }));
app.use(mongoSanitize());

// CONFIGURING COOKIES

const store = new MongoDBStore({
	mongoUrl: process.env.DB_ATLAS_URL,
	secret: process.env.SESSION_SECRET,
	touchAfter: 24 * 60 * 60,
});

store.on("errors", function (e) {
	console.log("SESSION STORE OPEN", e);
});

const sessionConfig = {
	store,
	name: "session",
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// ENABLE BEFORE PUTTING IT IN PRODUCTION MODE
		secure: true,
		expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

app.use(session(sessionConfig));
// helmet helps prevent injecting anything unintended to the page
app.use(helmet());

const scriptSrcUrls = [
	"https://stackpath.bootstrapcdn.com/",
	"https://kit.fontawesome.com/",
	"https://cdnjs.cloudflare.com/",
	"https://cdn.jsdelivr.net/",
	"https://res.cloudinary.com/dqdaf6ffk/"
];
const styleSrcUrls = [
	"https://kit-free.fontawesome.com/",
	"https://stackpath.bootstrapcdn.com/",
	"https://fonts.googleapis.com/",
	"https://use.fontawesome.com/",
	"https://cdn.jsdelivr.net/",
	"https://cdnjs.cloudflare.com",
	"https://res.cloudinary.com/dqdaf6ffk/",
];


app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: [],
				connectSrc: ["'self'", "https://res.cloudinary.com/dqdaf6ffk/"],
				scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
				styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
				workerSrc: ["'self'", "blob:"],
				objectSrc: [],
				imgSrc: [
					"'self'",
					"blob:",
					"data:",
					"https://res.cloudinary.com/dqdaf6ffk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
				],
				mediaSrc: ["https://res.cloudinary.com/dlzez5yga/"],
				childSrc: ["blob:"],
			},
		},
		crossOriginEmbedderPolicy: false,
	})
);

// CONFIGURING PASSPORT
// .session will keep you login on every route
// IMPORTANT to use session() before passport.session()
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// V how to store a user in a session V
passport.serializeUser(User.serializeUser());
// V how do you get a user out of that session V
passport.deserializeUser(User.deserializeUser());

// making the user info available on the req
app.use((req, res, next) => {
	res.locals.currentUser = req.user;

	next();
});

// IMPORTING ROUTES
app.use("/", userRoutes);
// app.use("/", searchRoute)
app.use("/uploads", uploadRoutes);
app.use("/uploads/:id/reviews", reviewRoutes);

// getting a home routes
app.get("/", (req, res) => {
	res.redirect("/uploads");
});

//* ==================
//*  error middleware
//* ==================

app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "OHh No, Something went wrong!";
	res.status(statusCode).render("error", { err });
});

// CONNECTING TO THE DATA BASE
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
