import AboutSection from './AboutSection.js';
import TodoList from './TodoList.js';
import Calendar from './Calendar.js';
import Navigation from './Navigation.js';
import RightImages from './RightImages.js';
import Carousel from './Carousel.js';
import Taskbar from './Taskbar.js';

export default {
  components: { AboutSection, TodoList, Calendar, Navigation, RightImages, Carousel, Taskbar },
  setup() {
    const { ref, onMounted, onBeforeUnmount } = Vue;
    const now = new Date();
    const imagesRightPanel = ref([
      { src: './img/melon.gif', alt: 'Melon Image' },
      { src: './img/melon0.gif', alt: 'Melon Image 0' },
      { src: './img/sega_miku.jpg', alt: 'Sega Miku' },
      { src: './img/hp_memori.gif', alt: 'hp' },
      { src: './img/erin.gif', alt: 'erin' },
      { src: './img/iosys.gif', alt: 'io' },
      { src: './img/pestcontrol.png', alt: 'opest' }
    ]);
    const carouselImages = ref([
      { src: './img/karina.jpg', alt: 'karina' },
      { src: './img/ian.jpg', alt: 'ian' },
      { src: './img/hanni.jpg', alt: 'hanni' },
      { src: './img/moka.jpg', alt: 'moka' }
    ]);
    const carouselIndex = ref(0);
    let carouselInterval = null;
    const calendar = ref([]);
    const month = ref(now.getMonth() + 1);
    const currentDay = ref(now.getDate());
    const currentMonth = ref(now.getMonth());

    function highlightToday(day) {
      if (day === currentDay.value && month.value - 1 === currentMonth.value) {
        return 'background: yellow; font-weight: bold;';
      }
      return '';
    }
    function nextCarouselImage() {
      carouselIndex.value = (carouselIndex.value + 1) % carouselImages.value.length;
    }
    function prevCarouselImage() {
      carouselIndex.value = (carouselIndex.value - 1 + carouselImages.value.length) % carouselImages.value.length;
    }
    function startCarousel() {
      if (carouselInterval) return;
      carouselInterval = setInterval(() => {
        nextCarouselImage();
      }, 2000);
    }
    function stopCarousel() {
      if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
      }
    }
    function generateCalendar() {
      const today = new Date();
      const year = today.getFullYear();
      const monthNum = today.getMonth();
      const firstDay = new Date(year, monthNum, 1).getDay();
      const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
      const weeks = [];
      let week = new Array(firstDay).fill(null);
      for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      if (week.length) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
      }
      calendar.value = weeks;
    }
    function dayColor(index) {
      if (index === 0) return 'color:red;';
      if (index === 6) return 'color:blue;';
      return '';
    }

    onMounted(() => {
      generateCalendar();
      startCarousel();
    });
    onBeforeUnmount(() => {
      stopCarousel();
    });

    return {
      imagesRightPanel,
      carouselImages,
      carouselIndex,
      calendar,
      month,
      currentDay,
      currentMonth,
      highlightToday,
      nextCarouselImage,
      prevCarouselImage,
      dayColor
    };
  },
  template: `
    <div>
      <div id="container">
        <div id="contentBox">
          <div class="win95-window">
            <div class="win95-title-bar">
              <div class="win95-title-text">
                <span>⊞</span>
                <span>Polaper.exe - [About Me]</span>
              </div>
              <div class="win95-controls">
                <div class="win95-button">_</div>
                <div class="win95-button">□</div>
                <div class="win95-button">×</div>
              </div>
            </div>
            <div class="win95-menu-bar">
              <div class="win95-menu-item">File</div>
              <div class="win95-menu-item">Edit</div>
              <div class="win95-menu-item">View</div>
              <div class="win95-menu-item">Help</div>
            </div>
            <div class="win95-content win95-scrollbar">
              <div class="main-layout">
                <div id="middleColumn">
                  <navigation></navigation>
                  <div class="grad1"><img src="./img/an56.gif" class="gif-icon" />About Me.txt</div>
                  <about-section></about-section>
                  <div class="grad1"><img src="./img/an57.gif" class="gif-icon" />Current Focus - Roadmap.doc</div>
                  <div class="nezukocontent">
                    <p>
                      I've been programming for quite a while and have built a lot of things along the way, especially in healthcare software development. I work mainly with C# .NET and feel comfortable creating enterprise applications. I'm passionate about technology and these days I'm focusing on Artificial Intelligence and Application Security (AppSec).
                    </p>
                    <todo-list></todo-list>
                  </div>
                </div>
                <div id="rightColumn">
                  <calendar :calendar="calendar" :month="month" :currentDay="currentDay" :currentMonth="currentMonth" :dayColor="dayColor" :highlightToday="highlightToday"></calendar>
                  <right-images :imagesRightPanel="imagesRightPanel"></right-images>
                  <carousel :carouselImages="carouselImages" :carouselIndex="carouselIndex" :nextCarouselImage="nextCarouselImage" :prevCarouselImage="prevCarouselImage"></carousel>
                </div>
              </div>
            </div>
            <div class="win95-status-bar">
              <div class="win95-status-section">Ready</div>
              <div class="win95-status-section" style="flex: 0 0 auto; width: 100px;">Y2K Aesthetic</div>
            </div>
          </div>
        </div>
      </div>
      <taskbar></taskbar>
    </div>
  `
};
