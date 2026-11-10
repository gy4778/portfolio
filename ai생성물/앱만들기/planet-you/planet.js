"use strict";
const planetEmojis = ["🔭","🪐","🚀","🎈","🌲","🌙","🛟","🌱","🗿","♨️","⚙️","🥐","🛠️","🐚","⚡","🎭"];
const landmarks = {
  tower:'<path d="M-43 7L-24-14 0 5 25-18 44 7Z"/><path d="M-9 6L-4-31H4L9 6Z" fill="#f6deab"/>',
  ring:'<ellipse rx="43" ry="11" transform="rotate(-16)" fill="none" stroke-width="4"/><circle r="13" fill="#ecd6ed"/><circle cx="33" cy="-10" r="6"/>',
  routes:'<path d="M-44 11L0-5 44 11M0-5V20" fill="none" stroke-width="4"/><path d="M-10 0V-21H10V0Z"/><path d="M0-21V-34L17-29Z" fill="#f8db99"/>',
  isles:'<path d="M-44-6H-12L-27 12Z M-8-21H28L10 3Z M18 7H44L33 22Z"/><ellipse cx="-23" cy="-19" rx="12" ry="4" fill="#f4d3e1"/>',
  grove:'<path d="M-39 11L-24-22-8 11ZM-20 11L0-36 20 11ZM8 11L24-24 40 11Z"/><path d="M-41 16Q0 7 41 16" fill="none" stroke="#fff0df" stroke-width="4"/>',
  crescent:'<path d="M34-14C-24-37-53 19-11 23Q17 26 35 8C-3 25-18-4 34-14Z" fill="#9ccdd7"/><circle cx="9" cy="-7" r="4" fill="#fff0c8"/>',
  harbor:'<path d="M-43 10Q0-1 43 10V20H-43Z" fill="#a9d7db"/><path d="M-9 10L-6-24H6L9 10Z" fill="#ffebcb"/><path d="M-9-24L0-34 9-24Z"/>',
  wind:'<path d="M-43 15Q-11-17 10 8Q31-12 44 15Z"/><path d="M-12 6V-27L10-20-12-14M22 7V-16L37-12 22-7" fill="#fae2a6"/>',
  steps:'<path d="M-42 18V8H-28V-2H-14V-12H1V-22H16V-12H29V-2H42V18Z"/><path d="M-27 11H32M-13 1H24M1-9H15" stroke="#f5dfb5"/>',
  spring:'<ellipse rx="42" ry="16" cy="12" fill="#a6d8cf"/><path d="M-26 0V-16H22V0 M-36-16L-5-34 32-16Z"/><path d="M-10 14Q-18 8-10 3M12 14Q4 8 12 3" stroke="#fff3dc" fill="none"/>',
  lock:'<path d="M-41 12L-27-8H27L41 12V20H-41Z" fill="#a0cbd8"/><path d="M-28 13V-17H-18V13ZM18 13V-17H28V13ZM-18-7H18V3H-18Z"/>',
  table:'<ellipse rx="41" ry="17" cy="11"/><ellipse rx="26" ry="10" cy="8" fill="#ffe4b6"/><circle cx="-16" cy="8" r="4" fill="#fff7e4"/><circle cx="16" cy="8" r="4" fill="#fff7e4"/><path d="M-4 7V-16H4V7Z" fill="#f8c2d4"/>',
  garage:'<path d="M-44 17L-31-13-14-23H18L36-12 44 17Z"/><path d="M-25 17V-1Q0-25 25-1V17Z" fill="#303449"/><ellipse rx="16" ry="5" cy="9" fill="#c4e4db"/>',
  bay:'<path d="M-44 0Q-9-28 42-7Q25 5 39 18Q-17 29-44 0Z" fill="#a3d7df"/><path d="M-8 4Q-14-17 0-13Q14-17 8 4Z" fill="#f4c1d3"/>',
  glide:'<path d="M-45 18L-39-15H-18L-10 18ZM13 18L24-11H39L45 18Z"/><path d="M-32-16L33-13M-12-12L2-26 18-11Z" fill="#ffe0ac"/>',
  stage:'<path d="M-44 0Q0 37 44 0M-37-7Q0 24 37-7M-28-12Q0 12 28-12" fill="none" stroke-width="5"/><path d="M-17-5V-24H17V-5Z" fill="#f3cfdf"/>'
};
function sparkle(x,y,size,fill) {
  return `<path d="M0-${size}Q1-1 ${size} 0Q1 1 0 ${size}Q-1 1 -${size} 0Q-1-1 0-${size}Z" transform="translate(${x} ${y})" fill="${fill}"/>`;
}
const objects = {
  house:'<path d="M-12 7V-5L0-15 12-5V7Z" fill="#f7c1d1"/><path d="M-15-4L0-17 15-4" fill="none" stroke="#806b9d" stroke-width="3" stroke-linecap="round"/><rect x="-3" y="-2" width="6" height="9" rx="2" fill="#fff1bd"/>',
  flower:'<path d="M0 9V-2M0 7L-7 3M0 8L6 4" stroke="#629f92" stroke-width="2"/><path d="M0-9C-5-17-12-9-6-5C-13 1-4 6 0 0C4 6 13 1 6-5C12-9 5-17 0-9Z" fill="#f6bbd4"/><circle cy="-5" r="3" fill="#ffe9a2"/>',
  path:'<path d="M-15 6Q2 10-1 1T15-6" stroke="#fff0d3" fill="none" stroke-width="5" stroke-dasharray="4 5" stroke-linecap="round"/>',
  crystal:'<path d="M-9 8L-11-2 0-18 9-2 7 8Z" fill="#b8a7e8"/><path d="M0-18L-2 7 7 8 9-2Z" fill="#e5ddfa"/>',
  beacon:'<path d="M-6 8L-4-7H4L6 8Z" fill="#8d83bb"/><circle cy="-10" r="6" fill="#ffe2a0"/><circle cy="-10" r="2" fill="#fff7dc"/>',
  forest:'<path d="M-15 7L-8-9 0 7ZM-7 7L2-17 12 7ZM5 7L12-6 18 7Z" fill="#85b8a8"/><circle cx="2" cy="-8" r="2" fill="#dff1d2"/>',
  lake:'<path d="M-18 3Q-16-9 1-5Q21-5 17 4Q10 13-6 9Q-17 10-18 3Z" fill="#a1d9df" stroke="#fff2e9" stroke-width="2"/><path d="M-8 2Q0-1 9 2" fill="none" stroke="#e9ffff"/>',
  moon:'<circle r="9" fill="#f9e3aa"/><ellipse rx="15" ry="4" transform="rotate(-26)" fill="none" stroke="#eed5ee" stroke-width="2"/><circle cx="-2" cy="-3" r="2" fill="#dcb8ae"/>',
  cloud:'<path d="M-18 5Q-21-4-12-5Q-6-16 2-9Q11-14 15-4Q24-3 19 5Z" fill="#ede4f5" stroke="#fff4ec" stroke-width="1.5"/>'
};
function planetSVG(items = [], type, changed) {
  const profile = profiles[type];
  const [base, accent] = profile ? profile.slice(1,3) : ["#d9c8eb","#7b73a4"];
  const sky = Array.from({length:55},(_,i) => {
    const x = 12 + (i*137)%375, y = 11 + (i*89)%332;
    return i%7===0 ? sparkle(x,y,4+i%3,i%2 ? "#f9d6db" : "#ffe8b6") :
      `<circle cx="${x}" cy="${y}" r="${i%3===0 ? 1.5 : .8}" fill="#ddd5f1" opacity="${.35+i%5*.1}"/>`;
  }).join("");
  const terrain = [[126,125],[179,87],[234,90],[267,120],[105,174],[291,170],[124,215],[273,214],[148,250],[197,262],[243,247],[196,219]];
  const orbit = [[89,95],[120,61],[169,48],[225,44],[277,62],[311,90],[324,131],[332,188],[317,236],[284,272],[248,304],[189,313]];
  const features = items.map(({index,option,shape}) => {
    const isOrbit = shape==="moon" || shape==="cloud";
    const [x,y] = (isOrbit ? orbit : terrain)[index];
    const scale = isOrbit ? 1 : .86+option*.1;
    return `<g transform="translate(${x+(option-1.5)*5} ${y}) scale(${scale})"><g${index===changed ? ' class="new"' : ""}>${objects[shape]}</g></g>`;
  }).join("");
  const grit = Array.from({length:180},(_,i) => `<circle cx="${80+(i*97)%240}" cy="${54+(i*137)%237}" r="${i%8===0 ? 1.3 : .55}" fill="${i%2 ? "#fff8ee" : accent}" opacity=".26"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="350" viewBox="0 0 400 350" role="img" aria-label="별빛으로 자라는 작은 행성">
  <defs><clipPath id="globe"><circle cx="200" cy="171" r="115"/></clipPath></defs>
  ${sky}<ellipse cx="200" cy="171" rx="157" ry="55" transform="rotate(-19 200 171)" fill="none" stroke="#aaa2cf" opacity=".5" stroke-dasharray="2 6"/>
  <circle cx="200" cy="171" r="121" fill="none" stroke="#b5a9d2" opacity=".24"/>
  <g clip-path="url(#globe)">
  <circle cx="200" cy="171" r="115" fill="${base}"/>
  <path d="M67 144Q123 67 187 113T325 98V50H65Z" fill="#f7dfc8" opacity=".8"/>
  <path d="M64 222Q116 153 161 180T255 152T337 158V293H64Z" fill="#9ecfd9"/>
  <path d="M64 232Q116 163 161 190T255 162T337 168M61 249Q119 179 162 206T253 179T340 184" fill="none" stroke="#eef5ef" stroke-width="3" opacity=".8"/>
  <path d="M74 261Q121 208 167 227T259 214T330 214V296H74Z" fill="#edbdd3"/>
  <path d="M76 269Q118 218 165 237T264 222T331 224" fill="none" stroke="#ffebdb" stroke-width="3" opacity=".8"/>
  <path d="M79 155Q128 99 177 126T270 126M81 162Q128 110 169 136" fill="none" stroke="#fff4e7" opacity=".6" stroke-width="2"/>
  ${grit}
  </g>
  <circle cx="200" cy="171" r="114.5" fill="none" stroke="#fff0e4" opacity=".7" stroke-width="2"/>
  <g transform="translate(200 166)" fill="${accent}" stroke="${accent}" stroke-linejoin="round" stroke-linecap="round">${profile ? landmarks[profile[3]] : '<path d="M-17 10V-4H17V10Z" fill="#f2d9e6"/><path d="M-17-4A17 17 0 0 1 17-4Z" fill="#b3c9e8"/><path d="M0-20V-30"/><circle cy="-31" r="3" fill="#fff1ba"/><rect x="-4" y="0" width="8" height="10" rx="2" fill="#ffe7ac"/>'}</g>
  ${sparkle(99,77,8,"#fff0b7")}${sparkle(316,224,9,"#f9d2e2")}${sparkle(302,75,5,"#e5dafb")}
  ${features}</svg>`;
}
