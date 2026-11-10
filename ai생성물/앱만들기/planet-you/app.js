"use strict";
const app = document.querySelector("#app");
const notice = document.querySelector("#notice");
const saveKey = "planet-you.v1";
const manual = new Set([0,5,11]);
const emptyAnswers = () => Array(story.length).fill(null);
const clean = answers => story.map((_,i) => Number.isInteger(answers?.[i]) && answers[i]>=0 && answers[i]<4 ? answers[i] : null);
const complete = answers => answers.every(answer => answer !== null);
let saved = {};
try { saved = JSON.parse(localStorage.getItem(saveKey)) || {}; } catch {}
let journey = saved.journey ? {answers:clean(saved.journey.answers), index:saved.journey.index} : null;
if (journey) {
  const first = journey.answers.indexOf(null);
  const limit = first === -1 ? story.length-1 : first;
  journey.index = Number.isInteger(journey.index) ? Math.max(0,Math.min(limit,journey.index)) : limit;
}
let passport = clean(saved.passport);
if (!complete(passport)) passport = null;
let screen = "home";
let advanceTimer, noticeTimer;
let shareFile;
function announce(message) {
  notice.textContent = message;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.textContent = "",4200);
}
function save() {
  try { localStorage.setItem(saveKey,JSON.stringify({journey,passport})); }
  catch { announce("이 브라우저에서는 진행 기록을 저장할 수 없어요."); }
}
function scene(items, caption, type) {
  return `<figure class="scene"><div id="planet">${planetSVG(items,type)}</div><figcaption>${caption}</figcaption></figure>`;
}
function button(action,label,primary=false) {
  return `<button type="button" data-action="${action}"${primary ? ' class="primary"' : ""}>${label}</button>`;
}
function featured(items) {
  return [0,5,11].map(index => items.find(item => item.index===index));
}
function resultData() {
  const type = classify(passport);
  const items = discoveries(passport);
  return {type,items,profile:profiles[type],emblem:planetEmojis[Object.keys(profiles).indexOf(type)]};
}
function show(next,focus=true) {
  clearTimeout(advanceTimer);
  screen = next;
  app.className = next;
  if (next==="home") {
    app.innerHTML = `${scene([], "FIG. 01 · 별빛 관측소")}<section>
      <p class="eyebrow"><span class="signal"></span> 관측 일지 001 · 미확인 신호</p>
      <h1 tabindex="-1">당신이라는<br>행성<span class="title-star">✦</span></h1>
      <p>지도에 없는 별빛이 깜빡입니다.<br>열두 번의 교신을 따라가며, 발견한 빛으로 당신의 행성을 키워 보세요.</p>
      <div class="actions">${journey ? button("resume","이어하기 →",true) : button("start","탐험 시작 →",true)}${passport ? button("passport","내 행성 보기") : ""}</div>
      <p class="footnote">12번의 교신 · 엔터테인먼트 성향 테스트</p>
      </section>`;
  } else if (next==="quiz") {
    const {index,answers} = journey;
    const [,title,description,choices] = story[index];
    const current = answers[index];
    const items = discoveries(answers);
    const progress = story.map((_,i) => `<i class="${i===index ? "current" : answers[i]!==null ? "filled" : ""}"></i>`).join("");
    app.innerHTML = `${scene(items,"LIVE · 내 행성 관측 중")}<section>
      <div class="quiz-meta"><span class="eyebrow">제 ${Math.floor(index/4)+1}막 · ${chapters[Math.floor(index/4)]}</span><span aria-label="12개 교신 중 ${index+1}번째">${String(index+1).padStart(2,"0")} / 12</span></div>
      <div class="progress" aria-hidden="true">${progress}</div>
      <h2 tabindex="-1">${title}</h2><p>${description}</p>
      <div class="choices">${choices.map((choice,i) => `<button type="button" class="choice" data-choice="${i}" aria-pressed="${current===i}"><span aria-hidden="true">${"ABCD"[i]}</span>${choice[1]}</button>`).join("")}</div>
      <p class="readout" aria-live="polite">${current===null ? "" : "✦ "+choices[current][2]+" 발견"}</p>
      <div class="actions"><button type="button" data-action="previous" ${index===0 ? "disabled" : ""}>← 이전</button>
      <button type="button" class="primary" data-action="next" ${current===null ? "disabled" : ""}>${index===11 ? "행성 여권 발급" : "다음 교신 →"}</button></div>
      </section>`;
  } else {
    const data = resultData();
    const {type,items,profile,emblem} = data;
    shareFile = null;
    if (navigator.canShare) {
      const snapshot = passport;
      passportImage(data).then(blob => {
        if (passport === snapshot) shareFile = new File([blob], `PLANET-YOU-${type}.png`, {type:"image/png"});
      }).catch(() => {});
    }
    const [name,,,,description,strong,weak,resident,caution,ally] = profile;
    app.innerHTML = `<div class="passport">
      <div class="passport-top"><span>✦ PLANET YOU</span><span>행성 여권</span></div>
      ${scene(items,"별빛 관측 완료",type)}
      <div class="passport-info"><span class="eyebrow">${type}</span><h1 tabindex="-1">${emblem} ${name}</h1><p>${description}</p>
      <div>${featured(items).map(item => `<span class="stamp">${item.name}</span>`).join("")}</div></div>
      </div>
      <section><p class="eyebrow">FIELD NOTES · 관측 일지</p><h2>주민 안내서</h2>
      <dl><dt>강점</dt><dd>${strong}</dd><dt>약점</dt><dd>${weak}</dd><dt>주민</dt><dd>${resident}</dd><dt>방문 주의</dt><dd>${caution}</dd><dt>우호 행성</dt><dd>${profiles[ally][0]} · ${ally}</dd></dl>
      <p class="footnote">이번 탐험의 선택을 바탕으로 만든 엔터테인먼트 테스트입니다.</p>
      <div class="actions">${button("download","PNG 저장",true)}${button("share","결과 공유하기")}${button("restart","다시 하기")}${journey ? button("resume","탐험 이어하기") : ""}</div></section>`;
  }
  if (focus) {
    app.querySelector("h1,h2").focus({preventScroll:true});
    window.scrollTo(0,0);
  }
}
function start() {
  journey = {index:0,answers:emptyAnswers()};
  save();
  show("quiz");
}
function next() {
  if (screen!=="quiz" || journey.answers[journey.index]===null) return;
  if (journey.index===story.length-1) {
    if (!complete(journey.answers)) return;
    passport = journey.answers.slice();
    journey = null;
    save();
    show("result");
  } else {
    journey.index++;
    save();
    show("quiz");
  }
}
function choose(option) {
  const {index,answers} = journey;
  clearTimeout(advanceTimer);
  if (answers[index]!==option) {
    answers[index] = option;
    save();
    document.querySelector("#planet").innerHTML = planetSVG(discoveries(answers),undefined,index);
    app.querySelectorAll("[data-choice]").forEach(el => el.setAttribute("aria-pressed",Number(el.dataset.choice)===option));
    app.querySelector(".readout").textContent = "✦ "+story[index][3][option][2]+" 발견";
    app.querySelector('[data-action="next"]').disabled = false;
  }
  if (!manual.has(index)) advanceTimer = setTimeout(next,950);
}
async function passportImage(data) {
  const {type,items,profile,emblem} = data;
  const canvas = document.createElement("canvas");
  canvas.width=800;
  canvas.height=980;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  const url = URL.createObjectURL(new Blob([planetSVG(items,type)],{type:"image/svg+xml;charset=utf-8"}));
  try {
    image.src = url;
    await image.decode();
    ctx.fillStyle="#23243d";
    ctx.fillRect(0,0,800,980);
    ctx.strokeStyle="#837a9c";
    ctx.strokeRect(26,26,748,928);
    ctx.textAlign="center";
    function line(value,y,font,color) {
      ctx.font=font;
      ctx.fillStyle=color;
      ctx.fillText(value,400,y,700);
    }
    line("✦  PLANET YOU  ·  행성 여권",90,"bold 25px sans-serif","#f6c5d6");
    ctx.drawImage(image,64,108,672,588);
    line(type,710,"bold 25px sans-serif","#f6c5d6");
    line(emblem+" "+profile[0],776,"bold 57px sans-serif","#f6edf3");
    line(profile[4],835,"28px sans-serif","#f6edf3");
    line(featured(items).map(item=>item.name).join("  ·  "),901,"23px sans-serif","#f9d7ad");
    return await new Promise((resolve,reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(Error("PNG")), "image/png"));
  } finally { URL.revokeObjectURL(url); }
}
async function download() {
  const data = resultData();
  try {
    const url = URL.createObjectURL(await passportImage(data));
    const link = document.createElement("a");
    link.href=url;
    link.download=`PLANET-YOU-${data.type}.png`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url),10000);
  } catch { announce("여권 이미지를 저장할 수 없어요."); }
}
function share() {
  const {type,profile} = resultData();
  const page = /^https?:$/.test(location.protocol) ? new URL("index.html",location.href).href : "";
  const summary = `✦ PLANET YOU | ${profile[0]} · ${type}\n${profile[4]}`;
  const text = page ? summary+"\n"+page : summary;
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); announce("결과를 복사했어요."); }
    catch { window.prompt("결과를 복사해 공유하세요.",text); }
  };
  if (navigator.share) {
    const payload = {title:"당신이라는 행성",text:summary,...(page ? {url:page} : {})};
    if (shareFile && navigator.canShare({files:[shareFile]})) payload.files = [shareFile];
    navigator.share(payload).catch(error => {
      if (error.name!=="AbortError") copy();
    });
  } else copy();
}
app.addEventListener("click",event => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.choice!==undefined) {
    choose(Number(target.dataset.choice));
    return;
  }
  switch(target.dataset.action) {
    case "start": start(); break;
    case "restart":
      if (!journey || window.confirm("진행 중인 탐험을 지우고 처음부터 시작할까요?")) start();
      break;
    case "resume": show("quiz"); break;
    case "passport": show("result"); break;
    case "previous": journey.index--; save(); show("quiz"); break;
    case "next": next(); break;
    case "download": download(); break;
    case "share": share(); break;
  }
});
document.querySelector("#home").addEventListener("click",()=>show("home"));
show("home",false);
