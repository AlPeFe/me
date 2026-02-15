export default {
  props: ['images'],
  template: `
    <div class="marquee-container">
      <div class="vue-marquee" style="animation-play-state: running;">
        <img v-for="(image, index) in images.concat(images).concat(images)" :key="index" :src="image.src" :alt="image.alt" class="marquee-image" />
      </div>
    </div>
  `
};
