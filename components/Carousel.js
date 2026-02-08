export default {
  props: ['carouselImages', 'carouselIndex', 'nextCarouselImage', 'prevCarouselImage'],
  template: `
    <div class="carousel-container">
      <img :src="carouselImages[carouselIndex].src" :alt="carouselImages[carouselIndex].alt" class="carousel-image" />
      <div style="text-align:center; margin-top:8px;">
        <button @click="prevCarouselImage">&#8592;</button>
        <button @click="nextCarouselImage">&#8594;</button>
      </div>
    </div>
  `
};
