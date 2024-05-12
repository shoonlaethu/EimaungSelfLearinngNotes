
//  Service နဲ့ API တွေZန်တီးZို့အတွက် အဓိကအသုံးပြုက
//  ့ Express ကိုသုံးပြီး API
//  URL သတ်မှတ်ပုံနဲ့ Server Run ပုံ Run နည်း
const express = require("express");
const app = express();
// ပထမဆုံး express ကို Import လုပ်ယူပါတယ်။ ပြီးတဲ့အခါသူ့ကို Run ပြီးတော့ app Object

const routes = require("../../routes");
app.use("/api", routes);

// app ရဲ့ Method (၂) ခုကို သုံးထားပါတယ်။ get() နဲ့ listen() တို့ဖြZစ်ပါတယ်။
// Request Method ပေါ်မူတည်ပြီး get(), post(), put(), patch(), delete()


// Route Method တွေဟာ URL နဲ့ Callback Function တို့ကို Parameter များအနေနဲ့ လက်ခ
// URL က /api/people အတိအကျဖြZစ်ရပါမယ်။ Request Header နဲ့ Body ကတော့ ပေးပို့သူကြိုက်သလို
// data လို့ခေါ်တဲ့ Sample JSON Array တစ်ခုရှိပါတယ်။
// res.status() ကိုသုံးပြီး Status Code သတ်မှတ

// app.get("/api/people", function(req, res) {
//     // URL က Static
//  const data = [
//  { name: "Bobo", age: 22 },
//  { name: "Nini", age: 23 },
//  ];
//  // res.status(200).json(data) Status Code 200, Content-type: application/json နဲ့ data ကို Response Body
//  return res.status(200).json(data);
// });

// *******
// API Server ကို Ctrl + C နဲ့ ရပ်လိုက်ပြီး နောက်တစ်ခါ
// node index.js နဲ့ ပြန် Run ပေးZို့ လိုအပ်ပါတယ်။ အသစ်ထပ်ထည့်လိုက်တဲ့ကုဒ် အလုပ်လုပ်Zို့
// အတွက် အခုလို Server ကို ပြန်စပေးရတာပါ
app.get("/api/people/:id", function(req, res) {
    // req.params.id ဆိုပြီးတော့ ပြန်ယူ
  const id = req.params.id; // Assign req.params.id to the constant 'id'

  return res.status(200).json({ id });
});

// listen() ကိုသုံးပြီး Server Run ခိုင်းထားပါတယ်။
// Port နံပါတ်နဲ့ Callback Function ပေးရပါတယ်။ Port နံပါတ်ကို 8000 လို့ပေးထားပြီး Callback Function ကတော့Server Run ပြီးရင် အလုပ်လုပ
app.listen(8000, function() {
 console.log("Server running at port 8000...");
});





// ျိုးအစားပေါ်မူတည်ပြီး ပို့လို့ရတဲ့ လုပ်ဆောင်ချက်တွေ ရှိပါသေးတယ်။ ဒါ
// ပေမယ့် ကျွန်တော်တို့ကတော့ json() ကိုပဲ သုံးဖြZစ်မှာပါ။ end() ဆိုတဲ့ လုပ်ဆောင်ချက်တစ်ခုတော့
// ရံZန်ရံခါလိုနိုင်ပါတယ်။ ဥပမာ -
// res.status(204).end()
//Express ကိုသုံးပြီး API URL သတ်မှတ်ပုံနဲ့ Server Run ပုံ Run နည်း

// Response Header တွေ သတ်မှတ်လိုရင် res.set() ကိုသုံးနိုင်ပါတယ်။ ဥပမာ -
// res.set({
//  "Location": "http://domain/api/people/3",
//  "X-Rate-Limit-Limit": 60,
// });
// res.append() ကိုလည်းသုံးနိုင်ပါတယ်။ သူကတော့ Header တွေကို အခုလိုတစ်ခါတည်း အကုန်မသတ်မှတ်ဘဲ တစ်ခုချင်း ထပ်တိုးချင်ရင်
// res.append("X-Rate-Limit-Remaining": 58);


// >node index.js
//localhost:8000/api/people


























