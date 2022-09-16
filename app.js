if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
// require("dotenv/config");

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const User = require("./src/database/models/user");
const methodOverride = require("method-override");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
// const LocalStrategy = require("passport-local");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
const $ = require("jquery")(window);
require("./src/strategies/local");

const ExpressError = require("./src/utils/ExpressError");

const uploadRoutes = require("./src/routes/uploads");
const reviewRoutes = require("./src/routes/reviews");
// user routes will become auth routes less of a headache
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");

const MongoDBStore = require("connect-mongo");

const DB_URL = process.env.DB_ATLAS_URL || process.env.MONGO_URL;
// connect to mongo and sends back error if something goes wrong
require("./src/database/index");

const app = express();

// Setting templating engine to EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

// *
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json({ extended: true, limit: "1mb" }));
app.use(mongoSanitize());

// CONFIGURING COOKIES

const store = new MongoDBStore({
	mongoUrl: DB_URL,
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
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		// ENABLE BEFORE PUTTING IT IN PRODUCTION MODE
		// secure: true,
		expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

app.use(session(sessionConfig));
app.use(helmet());

const scriptSrcUrls = ["https://stackpath.bootstrapcdn.com/", "https://kit.fontawesome.com/", "https://cdnjs.cloudflare.com/", "https://cdn.jsdelivr.net/", "https://res.cloudinary.com/dqdaf6ffk/"];
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
app.use((req, res, next) => {
	console.log(`${req.method}:${req.url}`);
	next();
});

// CONFIGURING PASSPORT
// .session will keep you login on every route
// IMPORTANT to use session() before passport.session()
app.use(passport.initialize());
app.use(passport.session());

// V how to store a user in a session V
passport.serializeUser(User.serializeUser());
// V how do you get a user out of that session V
passport.deserializeUser(User.deserializeUser());




// making the user info available on the req
// app.use((req, res, next) => {
// 	res.locals.currentUser = req.user;

// 	next();
// });

// IMPORTING ROUTES
app.use("/", userRoutes);
// app.use("/", searchRoute)
app.use("/uploads", uploadRoutes);
app.use("/uploads/:id/reviews", reviewRoutes);
app.use("/auth", authRoutes);

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
// const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
