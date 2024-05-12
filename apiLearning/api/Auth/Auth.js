const jwt = require("jsonwebtoken");
const secret = "horse battery staple";

const users = [
    { username: "Alice", password: "password", role: "admin" },
    { username: "Bob", password: "password", role: "user" },
];
// User Account နှစ်ခ user admin
app.post("/api/login", function(req, res) {
    const { username, password } = req.body;
    const user = users.find(function(u) {
    return u.username === username && u.password === password;
    });
    if(auth) {
        // jwt.sign() ကိုသုံးပြီး Token Zန်တီးယူ
    jwt.sign(user, secret, { 

    expiresIn: "1h" 
    }, function(err, token) {
    return res.status(200).json({ token });
    });
    } else {
    return res.sendStatus(401);
    }
});
//Parameter (၄) ခု ပေးထားပါ User Data, Secret, Expire Time နဲ့ Callback Function
// Request 
// POST /api/login
// Content-type: appliction/json
// { username: "Bob", password: "password" }
//Postman test

// Token ဟာ (၁) နာရီသက်တမ်းအတွင်းပဲ Valid

// Token မှန်မမှန်စစ်တဲ့ Function
function auth(req, res, next) {
    const authHeader = req.headers["authorization"];
    //    Authorization Header ပါမပါ စစ်ပါတယ်။ မပါရင် 401 ပြန်ပ
    if(!authHeader) return res.sendStatus(401);
    const [ type, token ] = authHeader.split(" ");
    //Authorization: Bearer [token]
    if(type !== "Bearer") return res.sendStatus(401);
    // Token ကို verify() နဲ့ မှန်မမှန်စစ်ပါ တယ်။ မှန်တယ်ဆိုတော့မှ next() နဲ့ ဆက်အလုပ်လု
    jwt.verify(token, secret, function(err, data) {
    if(err) return res.sendStatus(401);
    else next();
    });
}

function onlyAdmin(req, res, next) {
 
    const [ type, token ] = req.headers["authorization"].split(" ");
    jwt.verify(token, secret, function(err, user) {
    if(user.role === "admin") next();
    else return res.sendStatus(403);
    });
   }

