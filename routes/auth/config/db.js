const { ssl } = require("pg/lib/defaults");

const Pool = require("pg").Pool;
const pool = new Pool({
    connectionString:'postgres://ubczolyagzbnhl:9fd6db770d4f7ea3cc21891f2fd81c491277fb484da8ed09438f54a7359fa870@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d1ft8q7s4l71um',
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;