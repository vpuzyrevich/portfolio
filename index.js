"use strick";
import i18Obj from "./translate.js";

const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".nav"),
  menuItem = document.querySelectorAll(".nav-item"),
  portfolioBtns = document.querySelector(".buttons-block"),
  portfolioBtn = document.querySelectorAll(".button-transporent"),
  portfolioImages = document.querySelectorAll(".portfolio-image"),
  langBlock = document.querySelector(".header-lang"),
  langs = document.querySelectorAll(".lang-link"),
  dataAtr = document.querySelectorAll("[data-i18]"),
  sun = document.querySelector(".sun"),
  lightTheme = document.querySelectorAll(
    ".skills, .portfolio, .video, .price, .section-title, .button-transporent"
  );

// Hamburger menu
hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
  hamburger.classList.toggle("active");
});
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("open");
  });
});

// Images Portfolio
const changeImage = (event) => {
  let season = event.target.dataset.season;
  if (event.target.classList.contains("button-transporent")) {
    portfolioImages.forEach(
      (img, index) => (img.src = `./assets/img/${season}/${index + 1}.jpg`)
    );
  }
};
portfolioBtns.addEventListener("click", changeImage);

// Cash
const seasons = ["winter", "spring", "summer", "autumn"];
seasons.forEach((item) => {
  function preloadImages() {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${item}/${i}.jpg`;
    }
  }
  preloadImages();
});

// Active button

const changeClassActive = (event) => {
  if (event.target.classList.contains("button-transporent")) {
    portfolioBtn.forEach((item) => item.classList.remove("active"));
  }
  event.target.classList.add("active");
};
portfolioBtns.addEventListener("click", changeClassActive);

// Translation
let lang = "en";
const getTranslate = (lang) => {
  dataAtr.forEach((item) => {
    item.textContent = i18Obj[lang][item.dataset.i18];
    if (item.placeholder) {
      item.placeholder = i18Obj[lang][item.dataset.i18];
      item.textContent = "";
    }
  });
};
const changeLang = (event) => {
  lang = event.target.textContent;
  if (event.target.classList.contains("lang-link")) {
    langs.forEach((item) => item.classList.remove("active"));
  }
  event.target.classList.add("active");
  getTranslate(event.target.textContent);
};
langBlock.addEventListener("click", changeLang);

// Switch theme
let theme = "dark";
const changeTheme = (theme) => {
  lightTheme.forEach((item) => {
    item.classList.toggle("light-theme");
    if (theme === "dark") {
      item.classList.remove("light-theme");
      sun.classList.add("active");
    } else {
      item.classList.add("light-theme");
      sun.classList.remove("active");
    }
  });
};
sun.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  setLocalStorage(theme, "theme");
  changeTheme(theme);
});

// local storage
function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem("theme", theme);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    lang = localStorage.getItem("lang");
    getTranslate(lang);
  }
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    changeTheme(theme);
  }
  if (lang === "ru") {
    langs.forEach((item) => item.classList.toggle("active"));
  }
}
window.addEventListener("load", getLocalStorage);

// Video-player
const video = document.querySelector('.viewer');
const playBtnIcon = document.querySelector('.play');
const volumeBtnIcon = document.querySelector('.volume-icon');
const play = document.querySelector('.toggle-play');
const volume = document.querySelector('.volume');
const progressBar = document.querySelector('.progress');
const buttonCenter = document.querySelector('.button-video');
const time = document.querySelector('.time');
const fullScreenIcon = document.querySelector('.fullscreen');
const poster = document.querySelector('.poster');


const removePoster = () => {
    setTimeout(() => {
        poster.style.display = 'none';
    }, 1000);
};
const hidePoster = () => {
    if(!poster.classList.contains('animation')) {
        poster.classList.add('animation');
    }
    removePoster();
};
const toggleVideo = () => {
    if (video.paused) {
        video.play();
        playBtnIcon.src = './assets/svg/video-player/pause.svg';
        buttonCenter.style.display = 'none';
        hidePoster();
    } else {
        video.pause();
        playBtnIcon.src = './assets/svg/video-player/play.svg';
        buttonCenter.style.display = 'block';
    }
};
const videoProgress = () => {
    let percent = Math.round((video.currentTime / video.duration) * 100);
    progressBar.style.background = `linear-gradient(
        to right,
        #bdae82 0%,
        #bdae82 ${percent}%,
        #c8c8c8 ${percent}%,
        #c8c8c8 100%
    )`;
};
const timer = () => {
    progressBar.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }
    time.innerHTML = `${minutes} : ${seconds}`;
};

const setProgress = () => {
    video.currentTime = (progressBar.value * video.duration) / 100;
};
const makeFullScreen = () => {
    if(video.webkitSupportsFullscreen) {
        video.webkitEnterFullScreen();
    }
};
const muteVolume = () => {
    if(!volumeBtnIcon.classList.contains('mute')) {
        volumeBtnIcon.classList.add('mute');
        video.volume = 0.0;
        volume.value = 0;
        volumeBtnIcon.value = video.currentTime;
        volumeProgress();
    } else {
        volumeBtnIcon.classList.remove('mute');
        video.volume = 0.3;
        volume.value = 30;
        volumeProgress();
    }
};
const volumeProgress = () => {
    let percent = volume.value;
    volume.style.background = `linear-gradient(
        to right,
        #bdae82 0%,
        #bdae82 ${percent}%,
        #c8c8c8 ${percent}%,
        #c8c8c8 100%
    )`;
};
const changeVolume = () => {
    video.volume = volume.value / 100;
    volumeProgress();
    if(video.volume === 0) {
        volumeBtnIcon.classList.add('mute');
    } else {
        volumeBtnIcon.classList.remove('mute');
    }
};

play.addEventListener('click', toggleVideo);
poster.addEventListener('click', toggleVideo);
buttonCenter.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);
video.addEventListener('timeupdate', timer);
video.addEventListener('timeupdate', videoProgress);
progressBar.addEventListener('input', setProgress);
fullScreenIcon.addEventListener('click', makeFullScreen);
volumeBtnIcon.addEventListener('click', muteVolume);
volume.addEventListener('input', changeVolume);
video.addEventListener('ended', () => playBtnIcon.src = './assets/svg/video-player/play.svg');






console.log(
  "Вёрстка +10\nКнопка Play/Pause на панели управления +10\nПрогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10\nДПри перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10\nДПри клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10\nКнопка Play/Pause в центре видео +10\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10"
);
