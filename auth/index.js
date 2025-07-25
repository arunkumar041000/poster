import route from "expressjs"

const auth = route("/auth")

export const users = []
export const sessions =  {}

auth.post("/register", function (req, res) {
    const body = req.body;
    const username = body["username"]
    const email = body["email"]
    const password = body["password"]

    if(users.filter(user => user.email == email).length > 0){
        res.status(402)
        res.send({
            "message":"user already exist"
        })
        return 
    }
    let userId = Math.round() * 1000;
    users.push({ userId, username, email, password })
    res.send({
        "message": "user created successfully"
    })
});

auth.post("/login", function (req, res) {
    const body = req.body;
    const email = body["email"]
    const password = body["password"]

    const loginUser = users.filter(user => user.email == email && user.password == password);
    if(loginUser.length > 0){
        const token = Math.random()*1000;
        res.header["x-token"] = token
        sessions[token] = loginUser.at(0)
        res.send({
            "message":"login successfully"
        })
         
    }else{
        res.status(403)
        res.send({
            "message":"invalid creditiols"
        })
    }
});

export default auth;