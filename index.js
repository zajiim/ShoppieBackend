const express = require("express")
const mongoose = require("mongoose")
const signUpRoute = require("./routes/auth/user/auth/signup")
const signInRoute = require("./routes/auth/user/auth/signin")
const adminSignInRoute = require("./routes/auth/admin/signin")
const adminSignUpRoute = require("./routes/auth/admin/signup")
const addProductsRoute = require("./routes/auth/admin/add_products")
const getProductsRoute = require("./routes/auth/admin/get_all_products")
const getPopularBrandsRoute = require("./routes/auth/user/home/get_popular_brands")
const getPopularBrandRoute = require("./routes/auth/user/home/get_popular_brand")
const getNewArrivalsRoute = require("./routes/auth/user/home/get_new_arrivals")
const suggestedForYouRoute = require("./routes/auth/user/home/suggested_for_you")
const topRatedRoute = require("./routes/auth/user/home/get_top_rated")
const trendingShoesRoute = require("./routes/auth/user/home/get_trending_shoes")
const userMainRoute = require("./routes/auth/user/home/get_all_products")
const userDetailsRoute = require("./routes/auth/user/home/details/get_item_details")
const PORT = 3000
const app = express()
const DB = "mongodb+srv://shoppie:shoppiepassword@cluster0.rx0w3v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(express.json())
app.use(signUpRoute)
app.use(signInRoute)
app.use(adminSignInRoute)
app.use(adminSignUpRoute)
app.use(addProductsRoute)
app.use(getProductsRoute)
app.use(getPopularBrandsRoute)
app.use(getPopularBrandRoute)
app.use(getNewArrivalsRoute)
app.use(suggestedForYouRoute)
app.use(topRatedRoute)
app.use(trendingShoesRoute)
app.use(userMainRoute)
app.use(userDetailsRoute)

mongoose.connect(DB)
.then(() => {
    console.log("Mongodb connection success");
}).catch((e) => {
    console.log(e);
})



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected to port ${PORT}`);
})


