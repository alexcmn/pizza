const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

// MODELS
const { User } = require('./models/user');
const { Payement } = require('./models/payement');
const { Product } = require('./models/product');

// MIDDLEWARERS
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//========================================
//               PRODUCTS
//========================================

app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item =>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.find({'_id': {$in: items}}).exec((err, docs)=>{
        return res.status(200).send(docs)
    })
})

app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success: false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

app.get('/api/product/article', (req,res)=>{
    Product.find({},(err,products)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(products)
    })
})

//========================================
//               PAYEMENT
//========================================

app.post('/api/payement/checkout',auth,(req,res)=>{
    const payement = new Payement(req.body);
    let history = [];

    payement.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true
            // checkout: doc
        })
    })
})

// app.get('/api/product/checkout', (req,res)=>{
//     Payement.find({},(err,checkout)=>{
//         if(err) return res.status(400).send(err);
//         res.status(200).send(checkout)
//     })
// })

//========================================
//               USERS
//========================================

app.get('/api/users/auth',auth,(req, res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.post('/api/users/register', (req, res)=>{
    const user = new User(req.body);
    
    user.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            // userdata: doc
        })
    })
})

app.post('/api/users/login', (req, res)=>{
    User.findOne({'email': req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess: false, message: 'Auth failed! Email not found'});

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong Password'})
            
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                });
            })
        })
    })
})

app.get('/api/users/logout', auth,(req, res)=>{
    User.findOneAndUpdate(
        { _id: req.user._id},
        { token: ''},
        (err, doc)=>{
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/api/users/addToCart', auth, (req, res)=>{
    User.findOne({_id: req.user._id}, (err, doc)=>{
        let duplicate = false;
        
        doc.cart.forEach((item) => {
            if(item.id == req.query.productId){
                duplicate = true;
            }
        });

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId)},
                {$inc: {"cart.$.quantity": 1} },
                { new: true },
                ()=>{
                    if(err) return res.json({ success: false, err});
                    res.status(200).json(doc.cart)
                }
            )
        }else{
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity: 1,
                    date: Date.now()
                } }},
                { new: true},
                (err, doc) =>{
                    if(err) return res.json({ success: false, err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})

app.get('/api/users/removeFromCart', auth, (req, res)=>{
    User.findOneAndUpdate(
        {_id: req.user._id},
        { "$pull":
            { "cart": {"id": mongoose.Types.ObjectId(req.query._id)}}
        },
        { new: true},
        (err, doc) =>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product.find({'_id': { $in: array }}).exec((err, cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    )
})

app.post('/api/users/successBuy',auth,(req, res)=>{
    let history = [];

    req.body.cartDetail.forEach(item => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity
        });
    });

    console.log(history)

    User.findOneAndUpdate(
        { _id: req.user._id},
        { $push: { history: history}, $set: {cart: []}},
        { new: true},
        (err, user)=>{
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true,
                cart: user.cart,
                cartDetail: []
            })
        }
    )
})

app.post('/api/users/update_profile',auth,(req, res)=>{
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        }
    )
})

// DEFAULT 
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 3002;

app.listen(port, ()=>{
    console.log(`Server Running ar ${port}`)
})