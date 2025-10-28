<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>تقديم وزارة الداخلية</title>
<style>
:root {
  --accent: #206694;
  --bg: #0c1622;
  --text: #f1f5f9;
  --muted: #94a3b8;
}
body {
  font-family: "Cairo", sans-serif;
  margin: 0;
  background: linear-gradient(180deg, #08111c, #0e1b2d);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 95%;
  max-width: 750px;
  background: rgba(255,255,255,0.03);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.6);
}
h1 {
  text-align: center;
  color: var(--accent);
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 6px;
  color: var(--muted);
  font-weight: 600;
}
input, select, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.06);
  color: var(--text);
  font-size: 15px;
  margin-bottom: 14px;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--accent);
  outline: none;
}
button {
  width: 100%;
  background: var(--accent);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.2s;
}
button:hover {
  opacity: 0.9;
}
.error {
  border: 2px solid red !important;
}
.note {
  font-size: 13px;
  color: var(--muted);
  text-align: left;
  margin-bottom: 12px;
}
.hidden {
  display: none;
}
.center {
  text-align: center;
}

/* ✅ Animation (success checkmark) */
.success-wrap {
  text-align: center;
  display: none;
}
.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-block;
  border: 4px solid var(--accent);
  position: relative;
  animation: popIn 0.4s ease;
}
@keyframes popIn {
  0% { transform: scale(0.3); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.checkmark::after {
  content: "";
  position: absolute;
  left: 25px;
  top: 50px;
  width: 25px;
  height: 50px;
  border-right: 5px solid var(--accent);
  border-bottom: 5px solid var(--accent);
  transform: rotate(45deg);
}
.success-msg {
  margin-top: 20px;
  font-size: 20px;
  color: #c7f5c4;
}
</style>
</head>
<body>
<div class="container" id="mainContainer">
  <h1>تقديم وزارة الداخلية</h1>
  <div id="closed" class="center hidden">
    <h2>التقديم مغلق</h2>
  </div>

  <div id="form1">
    <label>الاسم الثلاثي</label>
    <input type="text" id="name">

    <label>اسمك في ديسكورد</label>
    <input type="text" id="discord">

    <label>العمر</label>
    <input type="number" id="age">

    <button onclick="nextStep()">تسجيل</button>
  </div>

  <div id="form2" class="hidden">
    <p class="note">يرجى الإجابة دون عشوائية واجوبه مفهومه</p>

    <label>ماهو جهازك؟</label>
    <input type="text" id="device">

    <label>ما مدى تواجدك اليومي؟</label>
    <input type="text" id="activity">

    <label>ماهي وظيفتك السابقة؟</label>
    <select id="job">
      <option value="">اختر</option>
      <option>منسوبي وزارة الداخلية</option>
      <option>منسوبي امن الدولة</option>
      <option>منسوبي وزارة العدل</option>
      <option>منسوبي وزارة الصحة</option>
      <option>العصابات</option>
      <option>مواطن</option>
    </select>

    <label>ما سبب فصلك من الوظيفة السابقة؟</label>
    <textarea id="reason"></textarea>

    <label>أضف الدليل هنا:</label>
    <input type="file" id="file">

    <label>خبراتك العسكرية؟</label>
    <textarea id="exp"></textarea>

    <button onclick="submitForm()">تسجيل</button>
  </div>

  <div class="success-wrap" id="success">
    <div class="checkmark"></div>
    <div class="success-msg">تم إرسال التقديم بنجاح</div>
  </div>
</div>

<script>
let status = "unlock"; // 🔒 غلق التقديم = "lock" / فتح التقديم = "unlock"

const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const closed = document.getElementById('closed');
const successBox = document.getElementById('success');

if (status === "lock") {
  form1.style.display = "none";
  closed.classList.remove("hidden");
}

function nextStep(){
  const name = document.getElementById('name');
  const discord = document.getElementById('discord');
  const age = document.getElementById('age');
  let valid = true;

  [name, discord, age].forEach(el=>{
    if(!el.value.trim()){ el.classList.add('error'); valid = false; }
    else el.classList.remove('error');
  });

  if(!valid) return;

  form1.classList.add('hidden');
  form2.classList.remove('hidden');
}

async function submitForm(){
  const fields = {
    device: document.getElementById('device'),
    activity: document.getElementById('activity'),
    job: document.getElementById('job'),
    reason: document.getElementById('reason'),
    exp: document.getElementById('exp')
  };
  let valid = true;

  for (const key in fields){
    if(!fields[key].value.trim()){
      fields[key].classList.add('error');
      valid = false;
    } else fields[key].classList.remove('error');
  }

  if(!valid) return;

  // جمع البيانات
  const data = {
    الاسم: document.getElementById('name').value,
    الديسكورد: document.getElementById('discord').value,
    العمر: document.getElementById('age').value,
    الجهاز: fields.device.value,
    التواجد: fields.activity.value,
    الوظيفة_السابقة: fields.job.value,
    سبب_الفصل: fields.reason.value,
    الخبرات: fields.exp.value,
  };

  // إرسال للويبهوك
  await fetch("https://discord.com/api/webhooks/1432695350732259420/wknw2XsqCnLSMgFK59h_D1O44AVCvFjFAvlgq-fNdjFokGlZ0sBqPkwSKp7Zf09IlzAo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "📩 **تقديم جديد لوزارة الداخلية**\n" + 
      Object.entries(data).map(([k,v])=>`**${k}:** ${v}`).join("\n") })
  });

  form2.style.display = "none";
  successBox.style.display = "unlock";
}
</script>
</body>
</html>