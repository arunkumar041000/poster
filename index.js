import express from "express"
import auth from "./auth"
import post from "./post"

const app = express()


app.routes(auth)
app.use(authMiddleware)
app.routes(post)

app.listen("3000",() => console.log(" application running 3000 port... "))
