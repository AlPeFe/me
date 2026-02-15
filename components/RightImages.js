export default {
  props: ['imagesRightPanel'],
  template: `
    <div class="right-images-container">
      <div class="right-images">
        <img v-for="(image, index) in imagesRightPanel" :key="index" :src="image.src" :alt="image.alt" class="right-image" />
      </div>
    </div>
  `
};
