
/* ═══════════════════════════════════════════
   WORKOUT PLAN
═══════════════════════════════════════════ */
const PLAN = {
  MON:{name:'Chest + Triceps',focus:'Push Focus',color:'#c8f060',
    A:[{n:'Barbell Bench Press',s:4,r:'8'},{n:'Incline DB Press',s:3,r:'10'},{n:'Chest Press Machine',s:3,r:'12'},{n:'Tricep Rope Pushdown (Cable)',s:3,r:'12'},{n:'Overhead Tricep Ext. (Cable)',s:3,r:'12'},{n:'Wrist Curls (Barbell)',s:3,r:'15'}],
    B:[{n:'DB Flat Bench Press',s:4,r:'10'},{n:'Cable Chest Fly (Low-to-High)',s:3,r:'12'},{n:'Pec Deck / Butterfly Machine',s:3,r:'12'},{n:'Tricep Pushdown (Straight Bar)',s:3,r:'12'},{n:'Skull Crushers (EZ Bar)',s:3,r:'10'},{n:'Reverse Wrist Curls',s:3,r:'15'}]},
  TUE:{name:'Legs + Abs',focus:'Quad & Hamstring Focus',color:'#60d4f0',
    A:[{n:'Barbell Back Squat',s:4,r:'8'},{n:'Seated Leg Press',s:3,r:'12'},{n:'Lying Leg Curl',s:3,r:'12'},{n:'Seated Calf Raise',s:4,r:'15'},{n:'Plank',s:3,r:'45s'},{n:'Hanging Leg Raises',s:3,r:'12'}],
    B:[{n:'Goblet Squat (DB)',s:4,r:'10'},{n:'Standing Leg Press',s:3,r:'12'},{n:'Seated Leg Curl',s:3,r:'12'},{n:'Standing Calf Raise',s:4,r:'15'},{n:'Ab Crunch Machine',s:3,r:'15'},{n:'Russian Twists',s:3,r:'20'}]},
  WED:{name:'Legs + Abs',focus:'Glute, Hamstring & Core',color:'#f0a060',
    A:[{n:'Romanian Deadlift (RDL)',s:4,r:'10'},{n:'Walking Lunges (DB)',s:3,r:'12e'},{n:'Lying Leg Curl',s:3,r:'12'},{n:'Seated Calf Raise',s:4,r:'15'},{n:'Cable Woodchop',s:3,r:'15e'},{n:'Decline Sit-Ups',s:3,r:'15'}],
    B:[{n:'Sumo Squat (DB)',s:4,r:'10'},{n:'Step-Ups (DB)',s:3,r:'12e'},{n:'Seated Leg Curl',s:3,r:'12'},{n:'Standing Calf Raise',s:4,r:'15'},{n:'Hollow Body Hold',s:3,r:'30s'},{n:'Bicycle Crunches',s:3,r:'20'}]},
  THU:{name:'Back + Biceps',focus:'Pull Focus + Forearms',color:'#c084fc',
    A:[{n:'Pull-Ups / Lat Pulldown',s:4,r:'8'},{n:'Seated Cable Row',s:3,r:'10'},{n:'Single-Arm DB Row',s:3,r:'10e'},{n:'Barbell Bicep Curl',s:3,r:'12'},{n:'Cable Bicep Curl',s:3,r:'12'},{n:"Farmer's Carry",s:3,r:'30m'}],
    B:[{n:'Wide-Grip Lat Pulldown',s:4,r:'10'},{n:'Face Pulls (Cable)',s:3,r:'15'},{n:'T-Bar / Chest-Supported Row',s:3,r:'10'},{n:'Concentrated DB Curl',s:3,r:'12'},{n:'Hammer Curls',s:3,r:'12'},{n:'Dead Hangs',s:3,r:'30s'}]}
};

const ALL_EXERCISES = {
  'Chest':['Barbell Bench Press','DB Flat Bench Press','Incline DB Press','Incline Barbell Press','Decline DB Press','Cable Chest Fly (Low-to-High)','Pec Deck / Butterfly Machine','Chest Press Machine','Push-Ups','Weighted Dips'],
  'Back':['Pull-Ups / Lat Pulldown','Wide-Grip Lat Pulldown','Seated Cable Row','Single-Arm DB Row','T-Bar / Chest-Supported Row','Face Pulls (Cable)','Romanian Deadlift (RDL)','Deadlift','Good Mornings','Hyperextensions'],
  'Legs':['Barbell Back Squat','Goblet Squat (DB)','Sumo Squat (DB)','Standing Leg Press','Seated Leg Press','Leg Extension','Lying Leg Curl','Seated Leg Curl','Standing Calf Raise','Seated Calf Raise','Walking Lunges (DB)','Step-Ups (DB)','Bulgarian Split Squat','Hip Thrust'],
  'Shoulders':['Overhead Press (Barbell)','DB Shoulder Press','Arnold Press','Lateral Raises (DB)','Front Raises (DB)','Reverse Fly (DB)','Cable Lateral Raise','Upright Row'],
  'Biceps':['Barbell Bicep Curl','Cable Bicep Curl','Concentrated DB Curl','Hammer Curls','Preacher Curl','EZ Bar Curl','Incline DB Curl'],
  'Triceps':['Tricep Rope Pushdown (Cable)','Overhead Tricep Ext. (Cable)','Tricep Pushdown (Straight Bar)','Skull Crushers (EZ Bar)','Close-Grip Bench Press','Tricep Dips','Kickbacks (DB)'],
  'Core':['Plank','Side Plank','Hanging Leg Raises','Ab Crunch Machine','Cable Crunch','Russian Twists','Bicycle Crunches','Decline Sit-Ups','Hollow Body Hold','Dead Bug','Cable Woodchop','Ab Wheel Rollout'],
  'Forearms':['Wrist Curls (Barbell)','Reverse Wrist Curls',"Farmer's Carry",'Dead Hangs','Plate Pinches'],
};

/* ═══════════════════════════════════════════
   FOOD DATA
═══════════════════════════════════════════ */
const FOOD_ITEMS = {
  breakfast:[
    {name:'Protein Shake',desc:'Banana · PB · Oats · Milk · Nuts · Whey',kcal:450,pro:35,carb:48,fat:14},
    {name:'2 Whole Eggs',desc:'Scrambled or boiled',kcal:140,pro:12,carb:1,fat:10},
  ],
  lunch:[
    {name:'Chicken Curry',desc:'~200g chicken breast',kcal:320,pro:38,carb:10,fat:12},
    {name:'Paneer Curry',desc:'~150g paneer',kcal:280,pro:18,carb:8,fat:20},
    {name:'Rajma Curry',desc:'1 cup cooked',kcal:220,pro:12,carb:38,fat:3},
    {name:'Mushroom + Broccoli',desc:'Stir-fry',kcal:75,pro:6,carb:8,fat:3},
    {name:'Carrot + Beans + Cauliflower',desc:'Veggie mix',kcal:95,pro:4,carb:18,fat:1},
    {name:'Rice',desc:'1 cup cooked (~150g)',kcal:200,pro:4,carb:44,fat:0},
    {name:'Chapati',desc:'1 piece (whole wheat)',kcal:115,pro:3,carb:20,fat:3},
  ],
  dinner:[
    {name:'Chicken Curry',desc:'~200g chicken breast',kcal:320,pro:38,carb:10,fat:12},
    {name:'Paneer Curry',desc:'~150g paneer',kcal:280,pro:18,carb:8,fat:20},
    {name:'Rajma Curry',desc:'1 cup cooked',kcal:220,pro:12,carb:38,fat:3},
    {name:'Grilled Salmon',desc:'~180g',kcal:370,pro:36,carb:0,fat:22},
    {name:'Mushroom + Broccoli',desc:'Stir-fry',kcal:75,pro:6,carb:8,fat:3},
    {name:'Carrot + Beans + Cauliflower',desc:'Veggie mix',kcal:95,pro:4,carb:18,fat:1},
    {name:'Sweet Potato',desc:'1 medium (~150g)',kcal:130,pro:2,carb:30,fat:0},
    {name:'Rice',desc:'1 cup cooked (~150g)',kcal:200,pro:4,carb:44,fat:0},
    {name:'Chapati',desc:'1 piece (whole wheat)',kcal:115,pro:3,carb:20,fat:3},
  ],
  pre:[
    {name:'2 Eggs',desc:'Pre-workout fuel',kcal:140,pro:12,carb:1,fat:10},
    {name:'Banana',desc:'Fast carbs',kcal:100,pro:1,carb:25,fat:0},
    {name:'Oats (half cup)',desc:'Slow-release carbs',kcal:150,pro:5,carb:27,fat:3},
    {name:'Peanut Butter (1 tbsp)',desc:'Healthy fats',kcal:95,pro:4,carb:3,fat:8},
  ],
  post:[
    {name:'Levels Whey (1 scoop)',desc:'In milk or water',kcal:120,pro:25,carb:4,fat:2},
    {name:'Dates (5-6 pieces)',desc:'Fast recovery carbs',kcal:85,pro:1,carb:22,fat:0},
    {name:'Banana',desc:'Glycogen replenishment',kcal:100,pro:1,carb:25,fat:0},
    {name:'Rice Cakes (3-4)',desc:'Light carbs',kcal:80,pro:2,carb:18,fat:0},
  ],
};
const CAL_TARGET=2800, PRO_TARGET=155;

/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
const DAYS=['SUN','MON','TUE','WED','THU','FRI','SAT'];
const ACTLABELS={gym:'🏋️ Gym',soccer:'⚽ Soccer',run:'🏃 Run',rest:'😴 Rest'};

let actualToday = new Date();
let urlParams = new URLSearchParams(window.location.search);
let isEmbed = urlParams.get('embed');
let today = urlParams.get('date') ? new Date(urlParams.get('date') + 'T12:00:00') : new Date();
let todayStr = fmtDate(today);
let curDay = DAYS[today.getDay()];
let setType = getSetType();
let pickedAct = null;
let td = {weight:null,activities:[],workoutLogs:{},notes:'',sleep:null};
let foodState = {};
let curMealTab = 'lunch';
let customExercises = [];
let weightChart = null, exChart = null, calChart = null, proChart = null;
let homeWorkoutChart = null, homeDietChart = null, homeRoutineChart = null;
let analysisLoaded = false, foodLoaded = false, routineLoaded = false;
let timerInterval = null, timerStart = 0, timerElapsed = 0, timerRunning = false, timerLaps = [];
let calViewDate = new Date(actualToday);
let analysisData = null;
let routineData = null;
let selectedWorkoutDay = null;

/* ═══════════════════════════════════════════
   UTILS
═══════════════════════════════════════════ */
function fmtDate(d){return d.toISOString().split('T')[0];}
function getSetType(){const d=new Date(today);const j=new Date(d.getFullYear(),0,1);const wk=Math.ceil(((d-j)/864e5+j.getDay()+1)/7);return wk%2===1?'A':'B';}
function toast(msg,ms=2200){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),ms);}
function isGym(d){return['MON','TUE','WED','THU'].includes(d);}
function isSoccer(d){return['FRI','SAT'].includes(d);}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function fmtTime(ms){const s=Math.floor(ms/1000);const m=Math.floor(s/60);return String(m).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}

/* ═══════════════════════════════════════════
   API
═══════════════════════════════════════════ */
async function apiFetch(path,method='GET',body=null){
  const opts={method,headers:{'Content-Type':'application/json'}};
  if(body) opts.body=JSON.stringify(body);
  const res=await fetch(path,opts);
  if(!res.ok) throw new Error('HTTP '+res.status);
  return res.json();
}

/* ═══════════════════════════════════════════
   WORKOUT TAB — LOAD & RENDER
═══════════════════════════════════════════ */
async function loadToday(){
  try{
    td=await apiFetch('/api/today?date='+todayStr);
    document.getElementById('log-spinner').style.display='none';
    document.getElementById('log-body').style.display='block';
    renderLog();
  }catch(e){
    document.getElementById('log-spinner').innerHTML='<div class="err">⚠️ Could not load data.<br><a href="/api/init" style="color:var(--accent2)">Init DB first →</a></div>';
  }
}

function renderLog(){
  const opts={weekday:'long',year:'numeric',month:'long',day:'numeric'};
  document.getElementById('hdr-date').textContent=today.toLocaleDateString('en-US',opts);
  const dp=PLAN[curDay];
  const dayHdr=document.getElementById('hdr-day');
  if(dp){dayHdr.innerHTML=`<div style="text-align:right"><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:${dp.color};letter-spacing:1px">${curDay}</div><div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.8px">Set ${setType}</div></div>`;}
  else{dayHdr.innerHTML=`<div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--muted)">${isSoccer(curDay)?'⚽ Soccer':'😴 Rest'}</div>`;}
  if(td.weight){document.getElementById('inp-weight').value=td.weight;document.getElementById('lbl-lastw').textContent='Last: '+td.weight+' lb';}
  if(td.sleep){
    if(td.sleep.hours_slept) document.getElementById('inp-sleep-hrs').value=td.sleep.hours_slept;
    if(td.sleep.bedtime) document.getElementById('inp-sleep-bed').value=td.sleep.bedtime;
    if(td.sleep.waketime) document.getElementById('inp-sleep-wake').value=td.sleep.waketime;
    document.getElementById('sleep-saved-lbl').textContent=td.sleep.hours_slept?td.sleep.hours_slept+'h logged':'';
  }
  renderActs();
  renderWorkout();
  if(td.notes) document.getElementById('inp-notes').value=td.notes;
}

/* ── Weight ── */
async function saveWeight(){
  const v=parseFloat(document.getElementById('inp-weight').value);
  if(!v||v<50||v>500){toast('Enter a valid weight');return;}
  try{await apiFetch('/api/weight','POST',{date:todayStr,weight_lb:v});document.getElementById('lbl-lastw').textContent='Saved: '+v+' lb';toast('✅ Weight saved!');}
  catch{toast('❌ Could not save');}
}

/* ── Activity ── */
function pickAct(type){
  if(pickedAct===type){pickedAct=null;document.querySelectorAll('#act-chips .chip').forEach(c=>c.classList.remove('on'));document.getElementById('act-dur-row').style.display='none';return;}
  pickedAct=type;
  document.querySelectorAll('#act-chips .chip').forEach(c=>c.classList.remove('on'));
  document.querySelector('#act-chips .chip[onclick="pickAct(\''+type+'\')"]').classList.add('on');
  document.getElementById('act-dur-row').style.display=(type==='rest')?'none':'block';
  if(type==='rest') saveAct();
}
async function saveAct(){
  if(!pickedAct){toast('Pick an activity');return;}
  const dur=parseInt(document.getElementById('inp-dur')?.value)||null;
  try{
    await apiFetch('/api/activities','POST',{date:todayStr,activity_type:pickedAct,duration_minutes:dur});
    td.activities.push({activity_type:pickedAct,duration_minutes:dur});
    toast('✅ Activity logged!');renderActs();renderWorkout();
    pickedAct=null;document.querySelectorAll('#act-chips .chip').forEach(c=>c.classList.remove('on'));
    document.getElementById('act-dur-row').style.display='none';
    if(document.getElementById('inp-dur')) document.getElementById('inp-dur').value='';
  }catch{toast('❌ Could not log activity');}
}
function renderActs(){
  const el=document.getElementById('acts-logged');
  if(!td.activities||!td.activities.length){el.innerHTML='';return;}
  el.innerHTML=td.activities.map(a=>'<span class="act-badge">'+((ACTLABELS[a.activity_type]||a.activity_type))+(a.duration_minutes?' — '+a.duration_minutes+' min':'')+'</span>').join('');
}

/* ── Sleep ── */
async function saveSleep(){
  const hrs=parseFloat(document.getElementById('inp-sleep-hrs').value)||null;
  const bed=document.getElementById('inp-sleep-bed').value||null;
  const wake=document.getElementById('inp-sleep-wake').value||null;
  try{
    await apiFetch('/api/sleep','POST',{date:todayStr,hours_slept:hrs,bedtime:bed,waketime:wake});
    document.getElementById('sleep-saved-lbl').textContent=hrs?hrs+'h logged':'Saved';
    toast('✅ Sleep saved!');
  }catch{toast('❌ Could not save sleep');}
}

/* ── Timer ── */
function timerToggle(){
  if(timerRunning){
    // Stop
    timerElapsed+=Date.now()-timerStart;
    clearInterval(timerInterval);timerRunning=false;
    document.getElementById('timer-start-btn').textContent='Resume';
    document.getElementById('timer-lap-btn').style.display='none';
  }else{
    timerStart=Date.now();
    timerInterval=setInterval(()=>{
      document.getElementById('timer-display').textContent=fmtTime(timerElapsed+Date.now()-timerStart);
    },100);
    timerRunning=true;
    document.getElementById('timer-start-btn').textContent='Stop';
    document.getElementById('timer-lap-btn').style.display='block';
  }
}
function timerReset(){
  clearInterval(timerInterval);timerRunning=false;timerElapsed=0;timerLaps=[];
  document.getElementById('timer-display').textContent='00:00';
  document.getElementById('timer-start-btn').textContent='Start';
  document.getElementById('timer-lap-btn').style.display='none';
  document.getElementById('timer-laps').innerHTML='';
}
function timerLap(){
  const t=timerElapsed+Date.now()-timerStart;
  timerLaps.push(t);
  document.getElementById('timer-laps').innerHTML=timerLaps.map((l,i)=>'<span style="margin-right:10px">Lap '+(i+1)+': '+fmtTime(l)+'</span>').join('');
}

/* ── Workout ── */
function changeWorkoutPlan(plan){
  selectedWorkoutDay = plan;
  renderWorkout();
}

function renderWorkout(){
  const sec=document.getElementById('workout-section');
  const hasGym=td.activities?.some(a=>a.activity_type==='gym');
  let useDay = selectedWorkoutDay && selectedWorkoutDay !== 'AUTO' ? selectedWorkoutDay : curDay;

  if(useDay==='REST' || (!isGym(useDay)&&!hasGym)){
    if(isSoccer(useDay)){sec.innerHTML='<div class="card"><div class="card-body" style="text-align:center;padding:20px"><div style="font-size:32px">⚽</div><div style="font-size:13px;color:var(--muted);margin-top:8px">Soccer Day — log gym activity above to show workout</div></div></div>';}
    else{sec.innerHTML='<div class="card"><div class="card-body" style="text-align:center;color:var(--muted);padding:20px"><div style="font-size:32px">😴</div><div style="margin-top:8px">Rest Day selected</div></div></div>';}
    return;
  }
  const dp=PLAN[useDay]||PLAN.MON;
  const allEx=[...dp[setType],...customExercises];
  let html='<div class="card"><div class="card-header"><span>💪</span><span class="card-title">'+esc(dp.name)+'</span><span class="ml-auto txt-sm txt-muted">Set '+setType+' · '+useDay+'</span></div><div class="card-body-sm" id="ex-body">';
  allEx.forEach((ex,ei)=>{html+=buildExerciseHTML(ex,ei);});
  html+='</div><div class="add-ex-row" style="display:flex;gap:8px;align-items:center"><button class="btn btn-primary btn-sm" style="white-space:nowrap" onclick="saveAllSets()">💾 Save Session</button><div class="add-set-btn" style="color:var(--accent);margin:0;flex:1;justify-content:center" onclick="openAddExModal()">＋ Add Exercise</div></div></div>';
  sec.innerHTML=html;
}

function buildExerciseHTML(ex,ei){
  const prev=td.workoutLogs?.[ex.n]||[];
  const prevW=prev.find(p=>p)?.weight;
  let html='<div class="ex-item" id="ex-item-'+ei+'"><div class="ex-top"><div style="flex:1;min-width:0"><div class="ex-name"><span style="flex:1">'+esc(ex.n)+'</span><button class="ex-vid-btn" data-exname="'+esc(ex.n)+'" onclick="openVideoModal(this.dataset.exname)" title="Watch demo">🎬</button></div>'+(prevW!=null?'<div class="ex-prev">Last: <strong>'+prevW+' lb</strong></div>':'')+'</div><span class="ex-target">'+esc(ex.s)+'×'+esc(ex.r)+'</span></div>';
  html+='<div class="set-labels"><div class="set-lbl"></div><div class="set-lbl">Weight</div><div class="set-lbl">Reps</div><div class="set-lbl">✓</div><div class="set-lbl"></div></div>';
  html+='<div class="sets-grid" id="sets-grid-'+ei+'" data-ei="'+ei+'" data-exname="'+esc(ex.n)+'">';
  for(let s=1;s<=ex.s;s++){html+=buildSetRow(ei,s,prev[s-1]);}
  html+='</div><div class="add-set-btn" data-ei="'+ei+'" onclick="addSetRow(this.dataset.ei)">＋ Add Set</div></div>';
  return html;
}

function buildSetRow(ei,s,saved){
  const id=saved?.id||'';
  const done=saved!=null;
  return `<div class="set-row" id="set-row-${ei}-${s}" data-id="${id}" data-ei="${ei}" data-s="${s}">
    <div class="set-num">${s}</div>
    <input type="number" class="set-inp" id="w-${ei}-${s}" placeholder="lbs" step="2.5" value="${saved?.weight??''}" data-ei="${ei}" data-s="${s}" oninput="schedSave(this)">
    <input type="number" class="set-inp" id="r-${ei}-${s}" placeholder="${saved?.reps??'reps'}" value="${saved?.reps??''}" data-ei="${ei}" data-s="${s}" oninput="onRepInput(this)">
    <div class="set-check ${done?'done':''}" id="chk-${ei}-${s}" data-ei="${ei}" data-s="${s}" onclick="checkSet(this)">${done?'✓':''}</div>
    <div class="set-del" data-ei="${ei}" data-s="${s}" onclick="deleteSet(this)">×</div>
  </div>`;
}

function addSetRow(ei){
  const grid=document.getElementById('sets-grid-'+ei);
  const s=grid.querySelectorAll('.set-row').length+1;
  grid.insertAdjacentHTML('beforeend',buildSetRow(parseInt(ei),s,null));
  document.getElementById('w-'+ei+'-'+s)?.focus();
}

/* Auto-fill reps downward with debounce.
   Tracks which sets were auto-filled so they update when source changes,
   but manually typed sets are never overwritten. */
let _afTimers={}, _afFilled=new Set();
function onRepInput(el){
  const ei=el.dataset.ei, s=el.dataset.s;
  _afFilled.delete(ei+'-'+s);          // this set was manually entered
  schedSave(el);
  clearTimeout(_afTimers[ei+'-'+s]);
  _afTimers[ei+'-'+s]=setTimeout(()=>{
    const val=document.getElementById('r-'+ei+'-'+s)?.value;
    if(!val) return;
    const grid=document.getElementById('sets-grid-'+ei);
    if(!grid) return;
    grid.querySelectorAll('.set-row').forEach(row=>{
      const rs=parseInt(row.dataset.s);
      if(rs>parseInt(s)){
        const k=ei+'-'+rs;
        const inp=document.getElementById('r-'+ei+'-'+rs);
        if(inp&&(!inp.value||_afFilled.has(k))){inp.value=val;_afFilled.add(k);}
      }
    });
  },380);
}
async function saveAllSets(){
  const body=document.getElementById('ex-body');
  if(!body){toast('No workout loaded');return;}
  let saved=0,skipped=0;
  const items=body.querySelectorAll('.ex-item');
  for(const item of items){
    const match=item.id.match(/ex-item-(\d+)/);
    if(!match) continue;
    const ei=parseInt(match[1]);
    const grid=document.getElementById('sets-grid-'+ei);
    if(!grid) continue;
    const rows=grid.querySelectorAll('.set-row');
    for(const row of rows){
      const s=parseInt(row.dataset.s);
      const w=document.getElementById('w-'+ei+'-'+s)?.value;
      if(w){await doSaveSet(ei,s,false);saved++;}else skipped++;
    }
  }
  toast(saved?'✅ '+saved+' set'+(saved>1?'s':'')+' saved!':(skipped?'⚠️ Fill in weights to save':'Nothing to save'));
}

let _timers={};
function schedSave(inp){
  const ei=inp.dataset.ei,s=inp.dataset.s,k=ei+'-'+s;
  clearTimeout(_timers[k]);
  _timers[k]=setTimeout(()=>doSaveSet(parseInt(ei),parseInt(s),false),900);
}
async function checkSet(el){await doSaveSet(parseInt(el.dataset.ei),parseInt(el.dataset.s),true);}
async function doSaveSet(ei,s,explicit){
  const grid=document.getElementById('sets-grid-'+ei);
  if(!grid) return;
  const exName=grid.dataset.exname;
  const w=document.getElementById('w-'+ei+'-'+s)?.value;
  const r=document.getElementById('r-'+ei+'-'+s)?.value;
  if(!w&&!explicit) return;
  if(!w){if(explicit) toast('Enter weight first');return;}
  try{
    const row=await apiFetch('/api/logs','POST',{date:todayStr,day_type:curDay,set_type:setType,exercise:exName,set_number:s,reps:parseInt(r)||0,weight:parseFloat(w)||0});
    if(!td.workoutLogs[exName]) td.workoutLogs[exName]=[];
    td.workoutLogs[exName][s-1]={id:row.id,weight:parseFloat(row.weight)||0,reps:row.reps};
    // Update row data-id
    const rowEl=document.getElementById('set-row-'+ei+'-'+s);
    if(rowEl) rowEl.dataset.id=row.id||'';
    const chk=document.getElementById('chk-'+ei+'-'+s);
    if(chk){chk.className='set-check done';chk.textContent='✓';}
    if(explicit) toast('✅ Set saved!');
  }catch{if(explicit) toast('❌ Could not save set');}
}

async function deleteSet(el){
  const ei=el.dataset.ei,s=el.dataset.s;
  const rowEl=document.getElementById('set-row-'+ei+'-'+s);
  const id=rowEl?.dataset.id;
  if(id){
    try{
      await apiFetch('/api/logs?id='+id,'DELETE');
      rowEl.remove();
      toast('Set removed');
    }catch{toast('❌ Could not delete');}
  }else{
    rowEl?.remove();
  }
}

/* ── Notes ── */
async function saveNotes(){
  const n=document.getElementById('inp-notes').value;
  try{await apiFetch('/api/notes','POST',{date:todayStr,notes:n});toast('✅ Notes saved!');}
  catch{toast('❌ Could not save notes');}
}

/* ═══════════════════════════════════════════
   ADD EXERCISE MODAL
═══════════════════════════════════════════ */
let addExCat='All';
function openAddExModal(){
  addExCat='All';
  document.getElementById('add-ex-search').value='';
  buildCatChips();
  renderAddExList('');
  document.getElementById('add-ex-modal').classList.add('open');
}
function closeAddExModal(e){if(!e||e.target===document.getElementById('add-ex-modal')) document.getElementById('add-ex-modal').classList.remove('open');}
function buildCatChips(){
  const cats=['All',...Object.keys(ALL_EXERCISES)];
  document.getElementById('cat-chips').innerHTML=cats.map(c=>'<div class="cat-chip'+(c===addExCat?' on':'')+'" onclick="setAddExCat(\''+c+'\')">'+c+'</div>').join('');
}
function setAddExCat(cat){addExCat=cat;buildCatChips();renderAddExList(document.getElementById('add-ex-search').value);}
function filterAddEx(){renderAddExList(document.getElementById('add-ex-search').value);}
function renderAddExList(q){
  const ql=q.toLowerCase();
  let all=[];
  const cats=addExCat==='All'?Object.keys(ALL_EXERCISES):[addExCat];
  cats.forEach(cat=>ALL_EXERCISES[cat].forEach(ex=>{if(!ql||ex.toLowerCase().includes(ql)) all.push({ex,cat});}));
  document.getElementById('add-ex-list').innerHTML=all.map(({ex,cat})=>'<div class="add-ex-item" data-ex="'+esc(ex)+'" onclick="addExercise(this.dataset.ex)"><span class="add-ex-name">'+esc(ex)+'</span><span class="add-ex-cat-lbl">'+cat+'</span></div>').join('');
}
function addExercise(exName){
  // Avoid duplicates
  const dp=PLAN[curDay];
  const existing=[...(dp?dp[setType]:[]),...customExercises];
  if(existing.some(e=>e.n===exName)){toast('Already in today\'s workout');return;}
  customExercises.push({n:exName,s:3,r:'10'});
  renderWorkout();
  closeAddExModal();
  toast('✅ '+exName+' added');
  // Scroll to workout section
  setTimeout(()=>document.getElementById('workout-section')?.scrollIntoView({behavior:'smooth',block:'end'}),100);
}

/* ═══════════════════════════════════════════
   VIDEO MODAL
═══════════════════════════════════════════ */
function openVideoModal(exName){
  document.getElementById('vid-modal-title').textContent=exName;
  document.getElementById('vid-modal-body').innerHTML='<div class="loading">Loading demo…</div>';
  document.getElementById('vid-modal').classList.add('open');
  fetchExerciseDemo(exName);
}
function closeVideoModal(e){if(!e||e.target===document.getElementById('vid-modal')) document.getElementById('vid-modal').classList.remove('open');}

let _exCache = null;
async function fetchExerciseDemo(exName){
  const body=document.getElementById('vid-modal-body');
  const ytLink='<a href="https://www.youtube.com/results?search_query='+encodeURIComponent(exName+' exercise form')+'" target="_blank" style="color:var(--accent2);font-size:12px;display:block;text-align:center;margin-top:12px">📺 Search on YouTube →</a>';
  try{
    if(!_exCache) {
      _exCache = await fetch('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json').then(r=>r.json());
    }
    const variants=[
      exName.toLowerCase().replace(/ \/ /g,' ').replace(/[()]/g,'').replace(/\s+/g,' ').trim(),
      exName.toLowerCase().split(' ')[0]
    ];
    let ex=null;
    for(const name of variants){
      ex = _exCache.find(e => e.name.toLowerCase().includes(name));
      if(ex) break;
    }
    if(!ex){
      body.innerHTML='<div style="text-align:center;padding:20px;color:var(--muted)"><div style="font-size:32px">📷</div><div style="margin-top:8px;font-size:12px">No demo found in the exercise library.</div>'+ytLink+'</div>';
      return;
    }
    const imagesHtml = (ex.images||[]).slice(0, 2).map(img => '<img src="https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/'+img+'" style="width:48%; border-radius:8px; margin-bottom:8px">').join('');
    const bodyPart = ex.primaryMuscles ? ex.primaryMuscles.join(', ') : '';
    const target = ex.secondaryMuscles ? ex.secondaryMuscles.join(', ') : '';
    const equipment = ex.equipment || '';
    const instructions = ex.instructions || [];
    body.innerHTML=
      '<div style="display:flex;gap:4px;justify-content:center">' + imagesHtml + '</div>' +
      '<div class="vid-meta">'+
        (bodyPart?'<span class="vid-tag">🎯 '+esc(bodyPart)+'</span>':'')+
        (equipment?'<span class="vid-tag">🔧 '+esc(equipment)+'</span>':'')+
      '</div>'+
      (instructions.length?
        '<div class="vid-steps"><div class="vid-step-hdr">How to perform</div>'+
        instructions.map((step,i)=>'<div class="vid-step"><div class="vid-step-num">'+(i+1)+'</div><div>'+esc(step)+'</div></div>').join('')+
        '</div>':
        '<div style="font-size:12px;color:var(--muted);margin-top:8px">No instructions available for this exercise.</div>'
      )+ytLink;
  }catch(err){
    body.innerHTML='<div style="text-align:center;padding:20px;color:var(--muted)"><div style="font-size:32px">🌐</div><div style="margin-top:8px;font-size:12px">Could not load demo. Check your connection.</div>'+ytLink+'</div>';
  }
}

/* ═══════════════════════════════════════════
   DIET TAB
═══════════════════════════════════════════ */
async function loadFood(){
  if(foodLoaded) return;
  document.getElementById('food-spinner').style.display='block';
  
  try{
    const yest = new Date(today); yest.setDate(yest.getDate()-1); 
    const yestRows = await apiFetch('/api/food?date='+fmtDate(yest));
    const yestKcal = yestRows.reduce((sum,r)=>sum+(parseInt(r.calories)||0), 0);
    document.getElementById('diet-yest-val').textContent = yestKcal > 0 ? yestKcal.toLocaleString() + ' kcal' : '-- kcal';
  }catch(e){}

  try{
    const rows=await apiFetch('/api/food?date='+todayStr);
    foodState={};
    rows.forEach(r=>{
      const baseItem = FOOD_ITEMS[r.meal_timing]?.find(i=>i.name===r.food_item);
      let q = 1;
      if(baseItem && baseItem.kcal>0){ q = Math.round(r.calories / baseItem.kcal); }
      if(q<1) q=1;
      foodState[r.meal_timing+'|'+r.food_item]=q;
    });
  }catch(e){console.error('Food load error',e);}
  document.getElementById('food-spinner').style.display='none';
  foodLoaded=true;
  renderFoodSection('breakfast','food-breakfast');
  renderFoodSection('lunch','food-lunch');
  renderFoodSection('dinner','food-dinner');
  renderFoodSection('pre','food-pre');
  renderFoodSection('post','food-post');
  updateCalSummary();
}

function renderFoodSection(timing,containerId){
  const items=FOOD_ITEMS[timing]||[];
  const el=document.getElementById(containerId);
  el.innerHTML=items.map(item=>{
    const key=timing+'|'+item.name;
    const qty=foodState[key]||0;
    const checked=qty>0;
    return '<div class="food-item" data-timing="'+timing+'" data-name="'+encodeURIComponent(item.name)+'" data-kcal="'+item.kcal+'" data-pro="'+item.pro+'" data-carb="'+item.carb+'" data-fat="'+item.fat+'" onclick="toggleFood(this)">'+
    '<div class="food-cb '+(checked?'checked':'')+'">'+(checked?'✓':'')+'</div>'+
    '<div class="food-info"><div class="food-name">'+item.name+'</div><div class="food-desc">'+item.desc+'</div></div>'+
    '<div class="food-qty" style="display:flex;align-items:center;gap:8px" onclick="event.stopPropagation()">'+
      '<button class="qty-btn" onclick="changeQty(this,-1)">-</button><span style="min-width:12px;text-align:center">'+qty+'</span><button class="qty-btn" onclick="changeQty(this,1)">+</button>'+
    '</div>'+
    '<div class="food-macros"><div class="food-kcal">'+item.kcal+'</div><div class="food-pro">'+item.pro+'g P</div></div></div>';
  }).join('');
}

async function toggleFood(el){
  const timing=el.dataset.timing,name=decodeURIComponent(el.dataset.name);
  const key=timing+'|'+name;
  const nowQty = (foodState[key]||0)>0 ? 0 : 1;
  await saveFoodQty(el, key, nowQty);
}
async function changeQty(btn, delta){
  const el=btn.closest('.food-item');
  const timing=el.dataset.timing,name=decodeURIComponent(el.dataset.name);
  const key=timing+'|'+name;
  let nowQty = (foodState[key]||0) + delta;
  if(nowQty<0) nowQty=0;
  await saveFoodQty(el, key, nowQty);
}
async function saveFoodQty(el, key, qty){
  const timing=el.dataset.timing,name=decodeURIComponent(el.dataset.name);
  const kcal=parseInt(el.dataset.kcal),pro=parseInt(el.dataset.pro),carb=parseInt(el.dataset.carb),fat=parseInt(el.dataset.fat);
  foodState[key]=qty;
  const cb=el.querySelector('.food-cb');
  cb.className='food-cb'+(qty>0?' checked':'');cb.textContent=qty>0?'✓':'';
  el.querySelector('.food-qty span').textContent=qty;
  updateCalSummary();
  
  try{await apiFetch('/api/food','POST',{date:todayStr,meal_timing:timing,food_item:name,calories:kcal*qty,protein:pro*qty,carbs:carb*qty,fats:fat*qty,checked:qty>0});}
  catch{toast('❌ Could not save');}
}

async function syncFood(){
  const order=['breakfast','lunch','dinner','pre','post'];
  let saved=0,failed=0;
  for(const timing of order){
    for(const item of (FOOD_ITEMS[timing]||[])){
      const key=timing+'|'+item.name;
      const qty=foodState[key]||0;
      if(qty>0){
        try{
          await apiFetch('/api/food','POST',{date:todayStr,meal_timing:timing,food_item:item.name,calories:item.kcal*qty,protein:item.pro*qty,carbs:item.carb*qty,fats:item.fat*qty,checked:true});
          saved++;
        }catch{failed++;}
      }
    }
  }
  if(failed) toast('⚠️ '+saved+' saved, '+failed+' failed');
  else toast('✅ Diet saved! ('+saved+' items)');
}

function updateCalSummary(){
  let kcal=0,pro=0,carb=0,fat=0;
  const tKcal={breakfast:0,lunch:0,dinner:0,pre:0,post:0};
  Object.entries(foodState).forEach(([key,qty])=>{
    if(!qty) return;
    const sep=key.indexOf('|');
    const timing=key.substring(0,sep),name=key.substring(sep+1);
    const item=FOOD_ITEMS[timing]?.find(f=>f.name===name);
    if(!item) return;
    kcal+=item.kcal*qty;pro+=item.pro*qty;carb+=item.carb*qty;fat+=item.fat*qty;
    if(tKcal[timing]!=null) tKcal[timing]+=item.kcal*qty;
  });
  document.getElementById('cal-total').textContent=kcal.toLocaleString();
  document.getElementById('cal-pro').textContent=pro+'g';
  document.getElementById('cal-carb').textContent=carb+'g';
  document.getElementById('cal-fat').textContent=fat+'g';
  const rem=CAL_TARGET-kcal;
  document.getElementById('cal-rem').textContent=rem>0?rem.toLocaleString()+' kcal remaining':'🎯 Goal reached!';
  const pct=Math.min(100,Math.round(kcal/CAL_TARGET*100));
  const proPct=Math.min(100,Math.round(pro/PRO_TARGET*100));
  document.getElementById('cal-pct').textContent=pct+'% of calorie goal';
  document.getElementById('pro-pct').textContent='Protein: '+proPct+'%';
  const bar=document.getElementById('cal-bar-fill');
  bar.style.width=pct+'%';bar.className='pbar-fill'+(pct>=100?' over':pct>=85?' near':'');
  document.getElementById('kcal-breakfast').textContent=tKcal.breakfast+' kcal';
  document.getElementById('kcal-ld').textContent=tKcal[curMealTab]+' kcal';
  document.getElementById('kcal-pre').textContent=tKcal.pre+' kcal';
  document.getElementById('kcal-post').textContent=tKcal.post+' kcal';
}

function switchMealTab(tab){
  curMealTab=tab;
  document.getElementById('tab-lunch').className='subtab'+(tab==='lunch'?' on':'');
  document.getElementById('tab-dinner').className='subtab'+(tab==='dinner'?' on':'');
  document.getElementById('food-lunch').style.display=tab==='lunch'?'block':'none';
  document.getElementById('food-dinner').style.display=tab==='dinner'?'block':'none';
  document.getElementById('ld-title').textContent=tab==='lunch'?'☀️ LUNCH':'🌙 DINNER';
  updateCalSummary();
}

/* ── Export ── */
function exportCSV(){
  const rows=[['Date','Meal','Food Item','Calories (kcal)','Protein (g)','Carbs (g)','Fats (g)']];
  ['breakfast','lunch','dinner','pre','post'].forEach(timing=>{
    FOOD_ITEMS[timing].forEach(item=>{if(foodState[timing+'|'+item.name]) rows.push([todayStr,timing,item.name,item.kcal,item.pro,item.carb,item.fat]);});
  });
  const wVal=document.getElementById('inp-weight').value;
  if(wVal) rows.push([todayStr,'body_weight','Weight (lb)',wVal,'','','']);
  let tK=0,tP=0,tC=0,tF=0;
  rows.slice(1).forEach(r=>{if(typeof r[3]==='number'){tK+=r[3];tP+=r[4];tC+=r[5];tF+=r[6];}});
  rows.push(['','','TOTAL',tK,tP,tC,tF]);
  const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='jithu-food-'+todayStr+'.csv';a.click();
  URL.revokeObjectURL(url);toast('✅ CSV downloaded!');
}

function printSummary(){
  let tK=0,tP=0,tC=0,tF=0;
  const sections={breakfast:[],lunch:[],dinner:[],pre:[],post:[]};
  const labels={breakfast:'🌅 Breakfast',lunch:'☀️ Lunch',dinner:'🌙 Dinner',pre:'⚡ Pre-Workout',post:'🔄 Post-Workout'};
  Object.entries(foodState).forEach(([key,checked])=>{
    if(!checked) return;
    const sep=key.indexOf('|');const timing=key.substring(0,sep),name=key.substring(sep+1);
    const item=FOOD_ITEMS[timing]?.find(f=>f.name===name);if(!item) return;
    tK+=item.kcal;tP+=item.pro;tC+=item.carb;tF+=item.fat;
    sections[timing].push({name,kcal:item.kcal,pro:item.pro});
  });
  const wVal=document.getElementById('inp-weight').value;
  const notesVal=document.getElementById('inp-notes').value;
  const dateStr=today.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const actStr=td.activities?.map(a=>(ACTLABELS[a.activity_type]||a.activity_type)+(a.duration_minutes?' ('+a.duration_minutes+' min)':'')).join(', ')||'None logged';
  const sHTML=Object.entries(sections).map(([timing,items])=>{if(!items.length) return '';return '<h3 style="font-size:13px;margin:14px 0 5px;color:#333">'+labels[timing]+'</h3><table style="width:100%;border-collapse:collapse;font-size:12px"><tr style="background:#f5f5f5"><th style="text-align:left;padding:5px 8px">Food</th><th style="text-align:right;padding:5px 8px">kcal</th><th style="text-align:right;padding:5px 8px">Protein</th></tr>'+items.map(i=>'<tr style="border-bottom:1px solid #eee"><td style="padding:5px 8px">'+i.name+'</td><td style="text-align:right;padding:5px 8px">'+i.kcal+'</td><td style="text-align:right;padding:5px 8px">'+i.pro+'g</td></tr>').join('')+'</table>';}).join('');
  const win=window.open('','_blank');
  win.document.write('<!DOCTYPE html><html><head><title>Jithu Log — '+dateStr+'</title><style>body{font-family:system-ui,sans-serif;max-width:600px;margin:24px auto;padding:0 16px;color:#111;font-size:13px}h1{font-size:20px;margin-bottom:4px}h2{font-size:13px;color:#666;font-weight:400;margin-bottom:16px}hr{border:none;border-top:1px solid #ddd;margin:16px 0}.summary{background:#f9f9f9;border:1px solid #ddd;border-radius:6px;padding:14px;margin-top:16px}</style></head><body><h1>TRACKR — Daily Log</h1><h2>'+dateStr+'</h2><hr><p><strong>Body Weight:</strong> '+(wVal?wVal+' lb':'—')+'</p><p><strong>Activity:</strong> '+actStr+'</p>'+(notesVal?'<p><strong>Notes:</strong> '+notesVal+'</p>':'')+'<h3 style="margin-top:16px;font-size:14px">🍽️ Food Log</h3>'+(sHTML||'<p style="color:#888">No food logged today</p>')+'<div class="summary"><table style="width:100%;border-collapse:collapse"><tr><td><strong>Total Calories</strong></td><td style="text-align:right"><strong>'+tK+' kcal</strong> / 2,800 target</td></tr><tr><td>Protein</td><td style="text-align:right">'+tP+'g / 155g target</td></tr><tr><td>Carbohydrates</td><td style="text-align:right">'+tC+'g / 330g target</td></tr><tr><td>Fats</td><td style="text-align:right">'+tF+'g / 75g target</td></tr></table></div><p style="font-size:10px;color:#aaa;margin-top:20px">Generated by TRACKR · '+new Date().toLocaleString()+'<\/p><script>window.onload=()=>window.print()<\/script></body></html>');
  win.document.close();
}

/* ═══════════════════════════════════════════
   ANALYSIS TAB
═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   HOME & ROUTINE
═══════════════════════════════════════════ */
async function loadHome() {
  if (analysisLoaded) return;
  analysisLoaded = true;
  try {
    const [aData, rData] = await Promise.all([
      apiFetch('/api/insights?type=home'),
      apiFetch('/api/routine?range=7')
    ]);
    analysisData = aData;
    routineData = rData;
    renderHome();
  } catch(e) { console.error('Home error', e); }
}

function renderHome() {
  if(!analysisData) return;
  const {weights,activitiesByDate,foodByDate,sleepByDate,streak}=analysisData;
  const todayDate = new Date();
  
  // Greeting
  const hr = todayDate.getHours();
  const greeting = hr < 12 ? 'Good Morning' : hr < 18 ? 'Good Afternoon' : 'Good Evening';
  document.getElementById('home-greeting').textContent = `${greeting}, Jithu`;

  // Streak badge in header
  if(streak>0){
    document.getElementById('streak-num').textContent=streak;
    document.getElementById('streak-badge').style.display='flex';
    document.getElementById('home-streak').textContent=streak;
  } else {
    document.getElementById('home-streak').textContent=0;
  }

  // Current weight
  if(weights.length) document.getElementById('home-cw').textContent=weights[0].weight_lb;

  // Yesterday's Score
  let yesterdayScore = '—';
  let bestScore = '—';
  if(routineData && routineData.length > 0) {
    const yestDate = new Date(actualToday);
    yestDate.setDate(yestDate.getDate() - 1);
    const yStr = fmtDate(yestDate);
    const yestObj = routineData.find(r => r.date === yStr);
    if(yestObj) yesterdayScore = yestObj.total_score;
    
    // Best this week
    const last7 = routineData.slice(-7);
    const maxScore = Math.max(...last7.map(r => r.total_score || 0));
    bestScore = maxScore;
  }
  document.getElementById('home-score').textContent = yesterdayScore;
  document.getElementById('home-best').textContent = bestScore;

  // Charts data
  const labels7=[], workoutData=[], dietData=[], routineChartData=[];
  for(let i=6;i>=0;i--){
    const d=new Date(actualToday);d.setDate(d.getDate()-i);
    const ds=fmtDate(d);
    labels7.push((d.getMonth()+1)+'/'+d.getDate());
    
    // workout
    const hasGym = (activitiesByDate[ds]||[]).some(a=>a.type==='gym') ? 1 : 0;
    workoutData.push(hasGym);
    
    // diet
    dietData.push(foodByDate[ds]?.calories||0);
    
    // routine
    const rObj = routineData?.find(r => r.date === ds);
    routineChartData.push(rObj ? rObj.total_score : 0);
  }

  // Draw mini charts
  const commonOpts = { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{enabled:false}}, scales:{x:{display:false}, y:{display:false}}, layout:{padding:0} };

  if(homeWorkoutChart) homeWorkoutChart.destroy();
  homeWorkoutChart = new Chart(document.getElementById('home-workout-chart'), { type:'bar', data:{labels:labels7, datasets:[{data:workoutData, backgroundColor:workoutData.map(v=>v?'var(--accent)':'var(--card2)'), borderRadius:4}]}, options:commonOpts });

  if(homeDietChart) homeDietChart.destroy();
  homeDietChart = new Chart(document.getElementById('home-diet-chart'), { type:'bar', data:{labels:labels7, datasets:[{data:dietData, backgroundColor:'var(--accent3)', borderRadius:4}, {data:Array(7).fill(2800), type:'line', borderColor:'rgba(255,255,255,0.2)', borderDash:[4,4], borderWidth:1, pointRadius:0, fill:false}]}, options:commonOpts });

  if(homeRoutineChart) homeRoutineChart.destroy();
  homeRoutineChart = new Chart(document.getElementById('home-routine-chart'), { type:'bar', data:{labels:labels7, datasets:[{data:routineChartData, backgroundColor:'var(--accent2)', borderRadius:4}, {data:Array(7).fill(70), type:'line', borderColor:'rgba(255,255,255,0.2)', borderDash:[4,4], borderWidth:1, pointRadius:0, fill:false}]}, options:commonOpts });

  renderCalendar();
}

async function loadRoutine() {
  if(!routineLoaded) {
    try {
      const rd = await apiFetch('/api/routine?date=' + todayStr);
      if(rd) {
        document.getElementById('hab-piano').value = rd.piano_mins || '';
        document.getElementById('hab-read').value = rd.reading_mins || '';
        document.getElementById('hab-study').value = rd.study_hours || '';
        if(rd.early_wakeup) document.getElementById('hab-wakeup').classList.add('on');
        if(rd.morning_walk) document.getElementById('hab-walk').classList.add('on');
        if(rd.supplements) document.getElementById('hab-supps').classList.add('on');
        
        document.getElementById('hab-wakeup').textContent = rd.early_wakeup ? 'YES' : 'NO';
        document.getElementById('hab-walk').textContent = rd.morning_walk ? 'YES' : 'NO';
        document.getElementById('hab-supps').textContent = rd.supplements ? 'YES' : 'NO';
      }
      routineLoaded = true;
    } catch(e) { console.error('Routine fetch err', e); }
  }
  updateRoutineScore();

  if(!routineData) {
    try { routineData = await apiFetch('/api/routine?range=7'); } catch(e){}
  }
  
  if(routineData && routineData.length > 0) {
    let histHTML = '';
    const last7 = routineData.slice(-7).reverse();
    for(let r of last7) {
      const dt = new Date(r.date);
      histHTML += `<div class="hist-row"><div>${DAYS[dt.getDay()]} ${dt.getDate()}</div><div class="hist-val">${r.total_score}</div></div>`;
    }
    document.getElementById('routine-history').innerHTML = histHTML;
  } else {
    document.getElementById('routine-history').innerHTML = '<div class="txt-muted" style="font-size:12px">No history yet</div>';
  }
}

function toggleHabit(el) {
  el.classList.toggle('on');
  el.textContent = el.classList.contains('on') ? 'YES' : 'NO';
  updateRoutineScore();
}

function updateRoutineScore() {
  const piano = parseInt(document.getElementById('hab-piano').value) || 0;
  const read = parseInt(document.getElementById('hab-read').value) || 0;
  const study = parseFloat(document.getElementById('hab-study').value) || 0;
  const wakeup = document.getElementById('hab-wakeup').classList.contains('on');
  const walk = document.getElementById('hab-walk').classList.contains('on');
  const supps = document.getElementById('hab-supps').classList.contains('on');

  let s = 0;
  s += Math.min(20, Math.floor(piano / 3));
  s += Math.min(20, Math.floor(read / 3));
  s += wakeup ? 15 : 0;
  s += walk ? 15 : 0;
  s += Math.min(20, Math.floor(study * 4));
  s += supps ? 10 : 0;

  document.getElementById('routine-score-val').textContent = s;
  
  let emoji = '💤 Rest';
  if(s>=90) emoji = '🌟 Elite';
  else if(s>=70) emoji = '✅ Strong';
  else if(s>=50) emoji = '🔶 Building';
  else if(s>=30) emoji = '📈 Starting';

  document.getElementById('routine-emoji').textContent = emoji;

  const deg = Math.round((s / 100) * 360);
  const ring = document.getElementById('routine-ring');
  let color = 'var(--accent)';
  if(s<50) color = 'var(--accent3)';
  if(s<30) color = 'var(--muted)';
  ring.style.background = `conic-gradient(${color} ${deg}deg, var(--card2) ${deg}deg)`;
  document.getElementById('routine-score-val').style.color = color;
}

async function saveRoutine() {
  const piano_mins = parseInt(document.getElementById('hab-piano').value) || 0;
  const reading_mins = parseInt(document.getElementById('hab-read').value) || 0;
  const study_hours = parseFloat(document.getElementById('hab-study').value) || 0;
  const early_wakeup = document.getElementById('hab-wakeup').classList.contains('on');
  const morning_walk = document.getElementById('hab-walk').classList.contains('on');
  const supplements = document.getElementById('hab-supps').classList.contains('on');

  try {
    await apiFetch('/api/routine', 'POST', {
      date: todayStr, piano_mins, reading_mins, study_hours,
      early_wakeup, morning_walk, supplements
    });
    toast('✅ Routine saved!');
    routineData = null; // force reload next time
  } catch(e) { toast('❌ Could not save routine'); }
}

/* ── Exercise history ── */
async function loadExHistory(){
  const ex=document.getElementById('sel-ex').value,el=document.getElementById('ex-hist');
  if(!ex){el.innerHTML='';return;}
  el.innerHTML='<div class="loading" style="padding:16px">Loading…</div>';
  try{
    const rows=await apiFetch('/api/logs?exercise='+encodeURIComponent(ex));
    if(!rows||!rows.length){el.innerHTML='<div class="loading" style="padding:12px">No data yet</div>';return;}
    const byDate={};
    rows.forEach(r=>{if(!byDate[r.date]) byDate[r.date]=[];byDate[r.date].push(r);});
    const dates=Object.keys(byDate).sort().reverse().slice(0,8);
    const maxWts=dates.map(d=>Math.max(...byDate[d].map(r=>parseFloat(r.weight)||0)));
    const gMax=Math.max(...maxWts);
    const dL=dates.map(d=>{const dt=new Date(d);return (dt.getMonth()+1)+'/'+dt.getDate();}).reverse();
    el.innerHTML='<div class="chart-wrap" style="height:150px"><canvas id="ex-canvas"></canvas></div><div style="margin-top:8px">'+dates.map((d,i)=>{const dt=new Date(d);const ds=dt.toLocaleDateString('en-US',{month:'short',day:'numeric'});const w=maxWts[i];return '<div class="hist-row"><div><div>'+ds+(w===gMax?'<span class="pr-badge">PR</span>':'')+'</div><div class="hist-date">'+byDate[d].length+' sets</div></div><div class="hist-val">'+w+'<span style="font-size:12px;color:var(--muted)"> lb</span></div></div>';}).join('')+'</div>';
    setTimeout(()=>{const c=document.getElementById('ex-canvas')?.getContext('2d');if(!c) return;if(exChart) exChart.destroy();exChart=new Chart(c,{type:'line',data:{labels:dL,datasets:[{data:[...maxWts].reverse(),borderColor:'#60d4f0',backgroundColor:'rgba(96,212,240,.07)',borderWidth:2,pointBackgroundColor:'#60d4f0',pointRadius:4,fill:true,tension:.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'#2a2a2a'},ticks:{color:'#666',font:{size:10}}},y:{grid:{color:'#2a2a2a'},ticks:{color:'#666',font:{size:10}}}}}});},50);
  }catch{el.innerHTML='<div class="err">Error loading history</div>';}
}

/* ── Calendar ── */
const CAL_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
let selectedCalDate=null;

function calPrevMonth(){calViewDate.setMonth(calViewDate.getMonth()-1);renderCalendar();}
function calNextMonth(){calViewDate.setMonth(calViewDate.getMonth()+1);renderCalendar();}

function renderCalendar(){
  if(!analysisData) return;
  const {activitiesByDate,foodByDate,sleepByDate}=analysisData;
  const yr=calViewDate.getFullYear(),mo=calViewDate.getMonth();
  document.getElementById('cal-month-lbl').textContent=CAL_MONTHS[mo]+' '+yr;

  const firstDay=new Date(yr,mo,1).getDay(); // 0=Sun
  const daysInMonth=new Date(yr,mo+1,0).getDate();
  const todayDs=fmtDate(today);

  let html='';
  // Day-of-week headers
  ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d=>{html+='<div class="cal-dow">'+d+'</div>';});
  // Empty cells before 1st
  for(let i=0;i<firstDay;i++) html+='<div class="cal-cell empty"></div>';
  // Day cells
  for(let day=1;day<=daysInMonth;day++){
    const ds=yr+'-'+String(mo+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    const acts=activitiesByDate[ds]||[];
    const hasGymDay=acts.some(a=>a.type==='gym');
    const hasMove=acts.some(a=>['soccer','run'].includes(a.type));
    const hasFood=!!foodByDate[ds];
    const hasSleep=!!sleepByDate[ds];
    const isToday=ds===todayDs;
    const isSel=ds===selectedCalDate;
    let dots='';
    if(hasGymDay) dots+='<div class="cal-dot dot-gym"></div>';
    if(hasMove) dots+='<div class="cal-dot dot-move"></div>';
    if(hasFood) dots+='<div class="cal-dot dot-food"></div>';
    if(hasSleep) dots+='<div class="cal-dot dot-sleep"></div>';
    html+='<div class="cal-cell'+(isToday?' today':'')+(isSel?' selected':'')+'" data-ds="'+ds+'" onclick="calSelectDay(\''+ds+'\')"><div class="cal-num">'+day+'</div><div class="cal-dots">'+dots+'</div></div>';
  }
  document.getElementById('cal-grid').innerHTML=html;
  if(selectedCalDate) renderCalDetail(selectedCalDate);
}

function calSelectDay(ds){
  selectedCalDate=(selectedCalDate===ds)?null:ds;
  // Update selected style
  document.querySelectorAll('.cal-cell').forEach(c=>{
    c.classList.toggle('selected',c.dataset.ds===selectedCalDate);
  });
  renderCalDetail(selectedCalDate);
}

function renderCalDetail(ds){
  const wrap=document.getElementById('cal-detail-wrap');
  if(!ds||!analysisData){wrap.innerHTML='';return;}
  const {activitiesByDate,foodByDate,sleepByDate}=analysisData;
  const acts=activitiesByDate[ds]||[];
  const food=foodByDate[ds];
  const sleep=sleepByDate[ds];
  const dt=new Date(ds+'T12:00:00');
  const dateLabel=dt.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  let rows='';
  if(acts.length){
    const actStr=acts.map(a=>(ACTLABELS[a.type]||a.type)+(a.duration?' ('+a.duration+' min)':'')).join(', ');
    rows+='<div class="cal-drow"><span class="cal-drow-lbl">Activity</span><span class="cal-drow-val">'+esc(actStr)+'</span></div>';
  }else{rows+='<div class="cal-drow"><span class="cal-drow-lbl">Activity</span><span class="cal-drow-val txt-muted">Rest day</span></div>';}
  if(food){rows+='<div class="cal-drow"><span class="cal-drow-lbl">Calories</span><span class="cal-drow-val" style="color:var(--accent3)">'+food.calories+' kcal</span></div><div class="cal-drow"><span class="cal-drow-lbl">Protein</span><span class="cal-drow-val" style="color:var(--accent2)">'+food.protein+'g</span></div>';}
  if(sleep&&sleep.hours){rows+='<div class="cal-drow"><span class="cal-drow-lbl">Sleep</span><span class="cal-drow-val" style="color:var(--accent4)">'+sleep.hours+' hrs</span></div>';}
  if(!acts.length&&!food&&!sleep){wrap.innerHTML='<div class="cal-detail"><div class="cal-detail-title">'+esc(dateLabel)+'</div><div style="color:var(--muted);font-size:12px">Nothing logged this day.</div></div>';return;}
  wrap.innerHTML='<div class="cal-detail"><div class="cal-detail-title">'+esc(dateLabel)+'</div>'+rows+'</div>';
}

/* ═══════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════ */
function goPanel(id,el){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  if(el) el.classList.add('active');
  if(id==='diet') loadFood();
  if(id==='home') loadHome();
  if(id==='routine') loadRoutine();
  if(id.endsWith('-detail')){
    const section=id.split('-')[0];
    switchDetailTab(section,'analysis');
  }
}

function switchDetailTab(section, tab){
  document.getElementById('btn-'+section+'-analysis').classList.toggle('active', tab==='analysis');
  document.getElementById('btn-'+section+'-records').classList.toggle('active', tab==='records');
  document.getElementById(section+'-analysis').style.display=tab==='analysis'?'block':'none';
  document.getElementById(section+'-records').style.display=tab==='records'?'block':'none';
  
  if(tab==='analysis') loadDetailAnalysis(section);
  else loadDetailRecords(section);
}

let detailCharts = {};
async function loadDetailAnalysis(section){
  try {
    const commonOpts = { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false},ticks:{color:'#666',font:{size:10}}},y:{grid:{color:'#222'},ticks:{color:'#666',font:{size:10}}}} };
    
    if(section==='workout') {
      const data = await apiFetch('/api/insights?type=workout');
      document.getElementById('wd-top-ex').innerHTML = (data.topExercises||[]).map(e=>'<div class="hist-row"><div>'+e.exercise_name+'</div><div class="hist-val">'+e.sets_done+' sets</div></div>').join('');
      // Chart
      if (data.weights && data.weights.length > 0) {
        const labels = data.weights.map(w => new Date(w.date).getDate()+'/'+(new Date(w.date).getMonth()+1)).reverse();
        const vals = data.weights.map(w => w.weight_lb).reverse();
        if(detailCharts.workout) detailCharts.workout.destroy();
        detailCharts.workout = new Chart(document.getElementById('wd-weight-chart'), { type:'line', data:{labels, datasets:[{data:vals, borderColor:'var(--accent)', tension:0.3, pointBackgroundColor:'var(--accent)'}]}, options:commonOpts });
      }
    } else if(section==='diet') {
      const data = await apiFetch('/api/insights?type=diet');
      document.getElementById('dd-top-foods').innerHTML = (data.topFoods||[]).map(f=>'<div class="hist-row"><div>'+f.food_item+' ('+f.meal_timing+')</div><div class="hist-val">'+f.times_logged+' logs</div></div>').join('');
      // Chart
      if (data.history && data.history.length > 0) {
        const labels = data.history.map(d => new Date(d.date).getDate()+'/'+(new Date(d.date).getMonth()+1)).reverse();
        const cals = data.history.map(d => d.total_calories).reverse();
        if(detailCharts.diet) detailCharts.diet.destroy();
        detailCharts.diet = new Chart(document.getElementById('dd-cal-chart'), { type:'bar', data:{labels, datasets:[{data:cals, backgroundColor:'var(--accent3)', borderRadius:4}]}, options:commonOpts });
      }
    } else if(section==='routine') {
      const data = await apiFetch('/api/insights?type=routine');
      document.getElementById('rd-missed').innerHTML = Object.entries(data.missed||{}).map(([k,v])=>'<div class="hist-row"><div>'+k+'</div><div class="hist-val">'+v+' misses</div></div>').join('');
      // Chart
      if (data.history && data.history.length > 0) {
        const labels = data.history.map(d => new Date(d.date).getDate()+'/'+(new Date(d.date).getMonth()+1)).reverse();
        const scores = data.history.map(d => d.total_score || 0).reverse();
        if(detailCharts.routine) detailCharts.routine.destroy();
        detailCharts.routine = new Chart(document.getElementById('rd-score-chart'), { type:'line', data:{labels, datasets:[{data:scores, borderColor:'var(--accent2)', tension:0.3, pointBackgroundColor:'var(--accent2)', fill:true, backgroundColor:'rgba(168,240,150,0.1)'}]}, options:commonOpts });
      }
    }
  } catch(e) {
    document.getElementById(section==='workout'?'wd-top-ex':section==='diet'?'dd-top-foods':'rd-missed').innerHTML = '<div class="err">Failed to load insights</div>';
  }
}

function loadDetailRecords(section){
  const el = document.getElementById(section==='workout'?'wd-records-list':section==='diet'?'dd-records-list':'rd-records-list');
  el.innerHTML = '<div class="card"><div class="card-body" style="text-align:center;color:var(--muted);padding:16px"><div style="margin-bottom:8px">Select a date to edit past records independently.</div><input type="date" class="inp" id="date-pick-'+section+'" value="'+todayStr+'" max="'+fmtDate(actualToday)+'" onchange="loadEmbedFrame(\\''+section+'\\', this.value)" style="margin:8px auto;width:auto;display:block;background:var(--surface)"></div></div><div id="embed-wrap-'+section+'" style="margin-top:16px;border-radius:12px;overflow:hidden;min-height:500px"></div>';
  
  // Auto-load today's embed
  loadEmbedFrame(section, todayStr);
}

function loadEmbedFrame(section, dateVal){
  const wrap = document.getElementById('embed-wrap-'+section);
  if(wrap) {
    wrap.innerHTML = '<iframe src="?date='+dateVal+'&embed='+section+'" style="width:100%;height:800px;border:none;background:var(--bg)"></iframe>';
  }
}

function changeGlobalDate(ds){
  // Legacy function kept for other potential calls
}

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
if(isEmbed) {
  // Hide bottom nav and detail panels, only show the relevant base panel
  document.querySelector('.bottom-nav').style.display = 'none';
  document.querySelectorAll('.back-btn, .sub-nav').forEach(el => el.style.display = 'none');
  
  if (isEmbed === 'workout') {
    goPanel('workout', null);
  } else if (isEmbed === 'diet') {
    goPanel('diet', null);
    loadFood();
  } else if (isEmbed === 'routine') {
    goPanel('routine', null);
    loadRoutine();
  }
  loadToday();
} else {
  loadToday();
  // Navigate to home by default
  goPanel('home', document.querySelector('.nav-item[onclick*=\'home\']'));
}

