export default {
  setup() {
    const { ref, onMounted, onBeforeUnmount } = Vue;
    const currentTime = ref('');

    function updateTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      currentTime.value = `${hours}:${minutes}`;
    }

    let timeInterval = null;

    onMounted(() => {
      updateTime();
      timeInterval = setInterval(updateTime, 60000); // Update every minute
    });

    onBeforeUnmount(() => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    });

    return {
      currentTime
    };
  },
  template: `
    <div class="win95-taskbar">
      <div class="win95-start-button">
        <span style="font-size: 14px;">⊞</span>
        <span>Start</span>
      </div>
      <div class="win95-taskbar-divider"></div>
      <div class="win95-clock">
        🕐 {{ currentTime }}
      </div>
    </div>
  `
};
