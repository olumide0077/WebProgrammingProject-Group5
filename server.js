const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT || 3000
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        servers: ["http://localhost:3000"]
      }
    },
    
    apis: ['server.js','routes/*.js']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/',(req,res) => {
    res.json({message:"work in progress"})
} )


const brandRouter = require("./routes/brands")
app.use("/brands",brandRouter)

const customerRouter = require("./routes/customers")
app.use("/customers",customerRouter)

const orderRouter = require("./routes/orders")
app.use("/orders",orderRouter)

const paymentRouter = require("./routes/payments")
app.use("/payments",paymentRouter)

const prodRouter = require("./routes/products")
app.use("/products",prodRouter)

const userRouter = require("./routes/users")
app.use("/users",userRouter)


app.listen(port, () => console.log("Listening on port:" +port))
