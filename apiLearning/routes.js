
const express = require("express");
const router = express.Router();

// app ရဲ့ Method (၂) ခုကို သုံးထားပါတယ်။ get() နဲ့ listen() တို့ဖြZစ်ပါတယ်။
// Request Method ပေါ်မူတည်ပြီး get(), post(), put(), patch(), delete()



// Route Method တွေဟာ URL နဲ့ Callback Function တို့ကို Parameter များအနေနဲ့ လက်ခ
// URL က /api/people အတိအကျဖြZစ်ရပါမယ်။ Request Header နဲ့ Body ကတော့ ပေးပို့သူကြိုက်သလို
// data လို့ခေါ်တဲ့ Sample JSON Array တစ်ခုရှိပါတယ်။
// res.status() ကိုသုံးပြီး Status Code သတ်မှတ

router.get("/api/routerpeople", function(req, res) {
    // URL က Static
 const data = [
 { name: "Bobo", age: 22 },
 { name: "Nini", age: 23 },
 ];
 // res.status(200).json(data) Status Code 200, Content-type: application/json နဲ့ data ကို Response Body
 return res.status(200).json(data);
});

// *******
// API Server ကို Ctrl + C နဲ့ ရပ်လိုက်ပြီး နောက်တစ်ခါ
// node index.js နဲ့ ပြန် Run ပေးZို့ လိုအပ်ပါတယ်။ အသစ်ထပ်ထည့်လိုက်တဲ့ကုဒ် အလုပ်လုပ်Zို့
// အတွက် အခုလို Server ကို ပြန်စပေးရတာပါ
router.get("/api/routerpeople/:id", function(req, res) {
    // req.params.id ဆိုပြီးတော့ ပြန်ယူ
  const id = req.params.id; // Assign req.params.id to the constant 'id'

  return res.status(200).json({ id });
});

module.exports=router;
//auth
app.get("/api/records", auth, function(req, res){

 });
 app.delete("/api/records/:id", auth, onlyAdmin, function(req, res) {
  
 });