// 韓國 5 日遊行程
const itinerary = [
  {
    day: "Day 1 - 抵達首爾",
    places: [
      { name: "仁川國際機場", lat: 37.4602, lng: 126.4407 },
      { name: "北漢江大橋", lat: 37.55088015598259, lng: 127.317197204837  }
    ],
    activities: [
          "北漢江大橋",
          "南山塔"
        ],
  },
  {
    day: "Day 2 - 廣藏市場",
    places: [
      { name: "廣藏市場", lat: 37.57028426959685, lng: 127.0000526496786 }
    ]
  },
  {
    day: "Day 3 - 現代百貨",
    places: [
      { name: "現代百貨", lat: 37.556186217878924, lng: 126.93583906646455  }
    ]
  },
  {
    day: "Day 4 - PARK滑雪度假村",
    places: [
      { name: "PARK滑雪度假村", lat: 37.4858696333613, lng: 128.2475291140076  }
    ]
  },
  {
    day: "Day 5 - 弘大商圈",
    places: [
      { name: "弘大商圈", lat: 37.55440241116128, lng: 126.922472567985 }
    ]
  },
  {
    day: "Day all - 所有景點",
    places: [
      { name: "北漢江大橋", lat: 37.55088015598259, lng: 127.317197204837  },
      { name: "廣藏市場", lat: 37.57028426959685, lng: 127.0000526496786 },
      { name: "現代百貨", lat: 37.556186217878924, lng: 126.93583906646455  },
      { name: "PARK滑雪度假村", lat: 37.4858696333613, lng: 128.2475291140076  },
      { name: "弘大商圈", lat: 37.55440241116128, lng: 126.922472567985 }
    ]
  }
];

let map;
let markers = [];

function initMap() {
  // 初始化地圖（中心設在首爾市區）
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: { lat: 37.5665, lng: 126.978 }, // 首爾市中心
  });

  // 把 map 塞進 container 右邊
  const container = document.querySelector(".container");
  const mapDiv = document.createElement("div");
  mapDiv.id = "map";
  mapDiv.style.height = "500px";
  mapDiv.style.borderRadius = "12px";
  container.appendChild(mapDiv);
  map.setMapTypeId("roadmap");
  map.setOptions({ mapTypeControl: false });
  mapDiv.appendChild(map.getDiv());

  // 建立左邊行程列表
  const itineraryDiv = document.getElementById("itinerary");
  itinerary.forEach((day, index) => {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerHTML = `<h2>${day.day}</h2>`;
    dayDiv.style.cursor = "pointer";

    dayDiv.addEventListener("click", () => {
      showDay(day);
    });

    if (index === 0) {
      showDay(day); // 預設顯示 Day 1
    }

    itineraryDiv.appendChild(dayDiv);
  });
}

// 顯示某一天的行程點
function showDay(day) {
  // 先清掉舊的 marker
  markers.forEach(m => m.setMap(null));
  markers = [];

  // 用 LatLngBounds 計算所有 marker 的範圍
  const bounds = new google.maps.LatLngBounds();

  day.places.forEach(place => {
    const marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      title: place.name,
      label: place.name
    });

    const info = new google.maps.InfoWindow({
      content: `<b>${day.day}</b><br>${place.name}`
    });

    marker.addListener("click", () => {
      info.open(map, marker);
    });

    markers.push(marker);
    bounds.extend(marker.position);
  });

  // 調整地圖中心和縮放
  map.fitBounds(bounds);

  // 限制最大 zoom 為 15
  const listener = google.maps.event.addListener(map, "bounds_changed", function() {
    if (map.getZoom() > 15) map.setZoom(15);
    google.maps.event.removeListener(listener);
  });
}

//翻譯區
// Accordion 點擊收折
document.querySelectorAll(".card-header").forEach(header => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    if (body.style.maxHeight) {
      body.style.maxHeight = null;
      body.classList.remove("open");
    } else {
      // 收起其他卡片
      document.querySelectorAll(".card-body").forEach(b => {
        b.style.maxHeight = null;
        b.classList.remove("open");
      });
      // 展開這個卡片
      body.style.maxHeight = body.scrollHeight + "px";
      body.classList.add("open");
    }
  });
});

// TTS 朗讀功能
document.querySelectorAll(".tts-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const text = btn.getAttribute("data-text");

    // 使用瀏覽器 Web Speech API
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; // 韓語，如要中文 'zh-TW'
    speechSynthesis.speak(utterance);

    const voices = speechSynthesis.getVoices();
    alert(voices); // 看手機是否有 ko-KR
  });
});

//timeLine
function toggleList(item) {
  const details = item.querySelector('.details');
  const isVisible = details.style.display === 'block';
  
  // 先隱藏所有其他 details
  document.querySelectorAll('.timeline-item .details').forEach(d => d.style.display = 'none');

  // 切換當前
  details.style.display = isVisible ? 'none' : 'block';
}

//回到頂端
// 取得按鈕
const backToTopBtn = document.getElementById("backToTop");

// 當頁面滾動時顯示或隱藏按鈕
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// 點擊按鈕滾回最上層
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

