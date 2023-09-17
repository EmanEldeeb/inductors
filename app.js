let data = [{ cpu: 1 }, { cpu: 2 }, { cpu: 25 }, { cpu: 65 }];
const prog = document.querySelector(".prog");
const subIndicator = document.querySelector(".sub-indicator");
const subIndicatorContainer = document.querySelector(".sub-indicator .row");
let cpuCount = 0;
data.forEach((cpuel) => {
  cpuCount += cpuel.cpu;
});

window.addEventListener("load", () => {
  let result = createIndectors(prog);
  prog.innerHTML += result;
  const indicator = document.querySelectorAll(".indector");
  const indicatorPersentage = document.getElementById("prog-persentage");
  indicatorPersentage.innerHTML = cpuCount;
  lightIndector(cpuCount, indicator, indicatorPersentage);
});

function createIndectors() {
  let resultIndecctors = "";
  for (let i = 0; i < 100; i++) {
    resultIndecctors += `<div class="indector"  style="transform: rotate( ${
      3.6 * i
    }deg);"></div>`;
  }
  return resultIndecctors;
}

function lightIndector(num, indicator) {
  for (let i = 0; i < num; i++) {
    setTimeout(() => {
      if (num < 50) {
        indicator[i].style.background = "#36df00";
      } else if (num > 50 && num < 80) {
        indicator[i].style.background = "orange";
      } else if (num > 80) {
        indicator[i].style.background = "red";
      }
    }, i * 60);
  }
}

function createProgress(data) {
  let progElemnts = "";
  data.forEach((prog) => {
    progElemnts += `
    <div class="col-md-6 d-flex  justify-content-center align-items-center">
          <div class="box subBox">
            <div class="prog">
              <div class="prog-info">
                <span id="prog-persentage">${prog.cpu}</span><span>%</span>
                <p>cpu</p>
              </div>
              ${createIndectors()}
            </div>
          </div>
        </div>`;
  });
  subIndicatorContainer.innerHTML = progElemnts;
}

prog.addEventListener("click", () => {
  subIndicator.classList.remove("d-none");
  createProgress(data);
  const subIndicatorToLight = document.querySelectorAll(".subBox .prog ");
  subIndicatorToLight.forEach((progbar) => {
    const progressPersentage =
      progbar.querySelector("#prog-persentage").innerHTML;
    lightIndector(progressPersentage, progbar.querySelectorAll(".indector"));
  });
});
subIndicator.addEventListener("click", function (e) {
  if (e.target.classList.contains("sub-indicator")) {
    e.currentTarget.classList.add("d-none");
  }
});
