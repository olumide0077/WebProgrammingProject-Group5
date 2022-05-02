const express = require('express')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT || 3000
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'*'}));
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Webproject Group5 REST API",
        description: "REST API Information, the base URL to access the api is (rest-api-webproject.herokuapp.com) ",
        contact: {
          name: "Harim Muzamil"
        },
        servers: ["https://rest-api-webproject.herokuapp.com"]
      }
    },
    
    apis: ['server.js','routes/*.js']
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
const authRoutes = require('./routes/auth/authRoutes')
const utilityRoute = require('./routes/auth/utility')
const brandRouter = require("./routes/brands")
const customerRouter = require("./routes/customers")
const orderRouter = require("./routes/orders")
const paymentRouter = require("./routes/payments")
const prodRouter = require("./routes/products")
const userRouter = require("./routes/users")

app.get('/',(req,res) => {
    res.json({message:"work in progress"})
} )

app.use("/brands",brandRouter)
app.use("/customers",customerRouter)
app.use("/orders",orderRouter)
app.use("/payments",paymentRouter)
app.use("/products",prodRouter)
app.use("/users",userRouter)
app.use(authRoutes)
app.use(utilityRoute)

app.listen(port, () => console.log(`Listening on port: ${port}` ))
