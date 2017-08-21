const usersController={};

usersController.create=(req,res)=>{
    const salt=bcrypt.genSaltSync();
    const has=bcrypt.hashSync(req.body.password,salt);
    User.create({
        username:req.body.username,
        password_digest:hash,
        display_name:req.body.display_name,
        email:req.body.email,
    })
    .then(user=>{
        req.login(user,(err)=>{
            if(err)return next(err);
            res.json({
                message:'ok',
                user:user,
                auth:true,
            })
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
}

usersController.index=(req,res)=>{
    res.json({
        user:req.user,
        data:'Put a user profile on this route'
    });
}

module.exports=usersController;