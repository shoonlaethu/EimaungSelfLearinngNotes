

//-----------------------

// express ကို Import လုပ်ပါတယ်။ ပြီးတဲ့အခါ mongojs ကို Import လုပ်ပါတယ်။
// mongojs ကို သုံးပြီး MongoDB Server ကိုချိတ်နိုင
const express = require("express");
const app = express();
const mongojs = require("mongojs");

// Parameter က Database Name
// ဖြZစ်ပြီး ဒုတိယ Parameter က Collection Array
const db = mongojs("travel", [ "records" ]);

// body-parser ကို Import လုပ်ပြီး use() နဲ့ သူ့ရဲ့ လုပ်ဆောင်ချက်နှစ်ခုကို ကြားဖြZတ်ပြီး  
// URL Encoded String တွေကို JSON အနေနဲ့ Parse လုပ်Zို့ရယ်၊ JSON String တွေကို JSON အနေနဲ့ Parse လုပ်Z
const bodyParser= require("body-parser");
// urlencoded() အတွက်ပေးထားတဲ့ extended: false Option က မဖြZစ်မနေ ပေးရမယ်လို့ သတ်မှတ်ထား
// Node မှာ Build-in လုပ်ဆောင်ချက် ပါပါတယ်။ အဲ့ဒါကို သုံးချင်ရင် extended: false လို့ ပေးရတာပါ။ Node ရဲ့ လုပ်ဆောင်ချက်ကို မသုံးဘဲ body-parser နဲ့အတူပါတဲ့ လုပ်ဆောင်ချက်ကို သုံးချင်ရင် true ပေးရမှာ
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use() Function ကို Middleware တွေကြေညာ
// Middleware ဆိုတာ လိုရင်းအနှစ်ချုပ် ကတော့ Request တစ်ခုဝင်လာတာနဲ့ ကြားထဲကZမ်းပြီး အလုပ်လုပ်ပေးမယ့် လုပ်ဆောင်ချက်လေးတွေ ပါ။

app.get("/api/records", function(req, res){
    db.records.find(function(err, data) {
        //Error ဖြZစ်နေရင် 500 Internal Server Error ပြန်ပို့ပါတယ်။ Error မဖြZစ်ရင်တော့ Data Envelope ထဲမှာ data နဲ့အတူmeta.total ပါ ထည
    if(err) {
    return res.sendStatus(500);
    } else {
    return res.status(200).json({
    meta: { total: data.length },
    data
    });
    }
    });
});
//----------------------------------
//filer paging sorting
// URL Query တွေကို Express က ဘယ်လိုလက်ခံ စီမံသလဲ စမ်းကြည့်လို့ရအောင် အခု
// လိုလေး အရင်ရေးကြည့်သင့်ပါတယ်။

app.get("/test", function(req, res) {
 return res.json(req.query);
});
// >localhost:8000/test?sort[name]=1&filter[from]=Yangon&filter[to]=Yangon&page=2


app.get("/api/records", function(req, res){
    const options = req.query;
    // validate options, send 400 on error
    const sort = options.sort || {};
    const filter = options.filter || {};
    const limit = 10;
    const page = parseInt(options.page) || 1;
    const skip = (page - 1) * limit;
    for(i in sort) {
    sort[i] = parseInt(sort[i]);
    }
    db.records.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit, function(err, data) {
    if(err) {
    return res.sendStatus(500);
    } else {
    return res.status(200).json({
    meta: { total: data.length },
    data
    });
    }
    });
   });

//    localhost:8000/api/records?filter[to]=Yangon&sort[name]=1&page=1

// ။ filter မှာ name,Nrc, from, to, with ကြိုက်တာနဲ့ ရွေးထုတ်လို့ရ

res.status(200).json({
    meta: {
    skip,
    limit,
    sort,
    filter,
    page,
    total: data.length,
    },
    data,
    links: {
    self: req.originalUrl,
    }
});



//-------------------------
//validator
// body, param နဲ့ validationResult ဆိုတဲ့ (၃) ခု express-validator ကနေ Import
// body ကိုသုံးပြီး Request Body တွေကို Validate စစ်ပါမယ်။
//  param ကိုသုံးပြီးDynamic Route တန်Zိုးတွေကို Validate စစ
//  query တို့ header တို့ကိုလည်း စစ်ချင်ရင် စစ်လို့ရ
//  စစ်ဆေးမှုရလဒ်ကို validationResult
const { 
    body,
    param, 
    validationResult 
} = require("express-validator");

//Method POST ကိုသုံးရမှာဖြZစ်ပြီး URL ကတော့ /api/records ပါပဲ။ Callback Function မတိုင်ခင်
// ကြားထဲက ဒုတိယ Parameter အနေနဲ့ Validation စစ်ထား
app.post("/api/records", [
    body("name").not().isEmpty(),
    body("from").not().isEmpty(),
    body("to").not().isEmpty(),
   ], function(req, res) {
    const errors = validationResult(req);
    // Validation Result ကို စစ်ကြည့်ပြီး Error ရှိနေတယ်ဆိုရင် 400
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    // Validation Error မရှိဘူးဆိုတော့မှ insert()
    db.records.insert(req.body, function(err, data) {
    if(err) {
    return res.status(500);
    }
    const _id = data._id
    res.append("Location", "/api/records/" + _id);
    return res.status(201).json({ meta: { _id }, data });
    });
 });


//PUT AND PATCH METHOD
 app.put("/api/records/:id", [
    param("id").isMongoId(),
   ], function(req, res) {
    const _id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    db.records.count({
    _id: mongojs.ObjectId(_id)
    }, function(err, count) {
    if(count) {
    const record = {
    _id: mongojs.ObjectId(_id),
    ...req.body
    };
    
    db.records.save(record, function(err, data) {
    return res.status(200).json({
    meta: { _id },
    data
    });
    });
    } else{
    db.records.save(req.body, function(err, data) {
    return res.status(201).json({
    meta: { _id: data._id },
    data
    });
    });
    }
    });
 });
// ID နဲ့ရှာမတွေ့ရင် အသစ်ထည့်မပေးတော့ပါဘူး။ 404 ကိုပဲပြန်
// ပေးလိုက်ပါတော့တယ်။ ရှာလို့ တွေ့ပြီဆိုတော့မှာ update() နဲ့ ပြင
 app.patch("/api/records/:id", function(req, res) {
    // iD ဟုတ်မဟုတ် param() နဲ့ Validation စစ်ထား
    const _id = req.params.id;
    db.records.count({ 
    _id: mongojs.ObjectId(_id) 
    }, function(err, count) {
    //  \PUT Method ဖြZစ်ပြီး save()
    // Function ကိုသုံးတဲ့အတွက် အစားထိုးတဲ့နည်းနဲ့ Update လုပ်မှာပါ။ ရှာလို့ မတွေ့ရင်တော့ အသစ်တစ်ခုအနေနဲ့ ထည့်ပေးမှာဖြZစ်ပါတယ်။ _id ကို ObjectId() ထဲမှာ ထည့်ပေးရ
    if(count) {
    db.records.update(
    { _id: mongojs.ObjectId(_id) },
    { $set: req.body },
    { multi: false },
    function(err, data) {
    db.records.find({
    _id: mongojs.ObjectId(_id) 
    }, function(err, data) {
    return res.status(200).json({
    meta: { _id }, data 
    });
    });
    }
    )
    } else {
    return res.sendStatus(404);
    }
    });
 });

//  ID နဲ့ ရှာလို့တွေ့ရင်Zျက်ပြီး 204 ကို ပြန်ပေးပါတယ်။ မတွေ့ရင်တော့ 404 ကို ပြန်ပေးလ
 app.delete("/api/records/:id", function(req, res) {
    const _id = req.params.id;
    db.records.count({
    _id: mongojs.ObjectId(_id) 
    }, function(err, count) {
    if(count) {
    db.records.remove({
    _id: mongojs.ObjectId(_id)
    }, function(err, data) {
    return res.sendStatus(204);
    });
    } else{
    return res.sendStatus(404);
    }
    });
   });

   

























