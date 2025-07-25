import route from "expressjs"

const post = route("/post")

const posts = []


post.get("/",function(req,res){
    const user = req.user
    return req.send(posts.filter(post.authorId == user.userId))
})

post.post("/",function(req,res){
    const user = req.user

    const body = req.body;
    const post = {
        "id": new Date().getTime(),
        "title":body.title,
        "subject":body.subject,
        "contant":body.contant,
        "authorId":user.userId,
        "published":true
    }

    posts.push(post)
    return req.send(posts.filter(post.authorId == user.userId))
})

post.get("/:id",function(req,res){
    const user = req.user

    const id = req.params.id

    const post = posts.filter(post => post.id == id && (post.published || post.authorId == user.userId))
    if(!post){
        res.status(404)
        return res.send({
            "message":"post not fount"
        })
    }
    return res.send(post)
})

post.patch("/:id",function(req,res){
    const user = req.user

    const id = req.params.id
    const body = req.body;
    const post = posts.filter(post => post.id == id &&  post.authorId == user.userId)

    if(!post){
        res.status(404)
        return res.send({
            "message":"post not fount"
        })
    }

    post = {...post,
        "title":body.title,
        "subject":body.subject,
        "contant":body.contant,
        "authorId":user.userId,
        "published":body.published
    }
    post.push(post)

    return res.send({"message":"post updated"})
})


post.delete("/:id",function(req,res){

})

export default post;
