// random helper function
const rnd = (f,t)=>Math.random() * (t - f) + f;

// play header video on click if autoplay is not working 
const headerElement = document.querySelector("body>main>header");
const headerVideo = headerElement.children[0];
function playHeaderVideo(event) {
  event.preventDefault();
  headerVideo.currentTime < 0.1 || headerVideo.paused ? headerVideo.play() : console.log("not paused");
}
headerElement.addEventListener("click", playHeaderVideo);

// datapoint thingie at the bottom edge of video header
const ns = "http://www.w3.org/2000/svg";
const dataSvg = document.createElementNS(ns, "svg");
dataSvg.setAttribute("xmlns", ns);
dataSvg.setAttribute("viewBox", "0 0 1000 100");
dataSvg.setAttribute("preserveAspectRatio", "xMidYMid slice");
document.getElementById("intro").appendChild(dataSvg);
const pathNode = document.createElementNS(ns, "path");
const fakeData = x=>Math.cos(x * 0.002) * Math.sin(x * 0.01) * 0.5 * rnd(50, 100) + 50;
const pathData = new Array(1000).fill(0).map((j,i)=>`M ${i} 100 L ${i} ${fakeData(i).toFixed(2)} `);
pathNode.setAttribute("d", pathData.join(" "));
dataSvg.appendChild(pathNode);

// random padding variation on the first four textblocks
const introTextBlocks = document.querySelectorAll("#info li");
for (var introTextBlock of introTextBlocks) {
  introTextBlock.style.paddingTop = Math.round(rnd(0, 14)) + "em";
  introTextBlock.style.paddingBottom = Math.round(rnd(0, 14)) + "em";
}

// add offsets to projects
const projects = Array.from(document.querySelectorAll("#projectlist a>*"));
projects.map(p=>p.style.transform = `rotate3d(0,-1,1,16deg) translate3d(${rnd(-10, 10)}em,0em,${rnd(-200, 0)}em)`);

const impressionss = document.getElementById("impressions");
let lastActive;
const clickHandler = event=>{
  document.body.style.backgroundSize = rnd(0.1, 10) + "em";

  if (lastActive) {
    if (lastActive.nodeName === "IMG") {
      lastActive.classList.remove("active");
    }
  }
  if (event.target.nodeName === "IMG") {
    event.target.classList.toggle("active");
    if (event.target.src.indexOf("-o.jpg") == -1) {
      let yo = event.target.src.replace(".jpg", "-o.jpg");
      event.target.src = yo;
      event.target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } 

    lastActive = event.target;
  }
}
impressionss.addEventListener("click", clickHandler);

const footerish = Array.from(document.querySelectorAll("footer a,footer h4"));
footerish.map(el=>{
  el.style.border = (Math.random() * 5) + "vw solid";
  el.style.margin = Math.random() * 2 + "vw solid";

}
);
