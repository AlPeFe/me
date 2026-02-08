export default {
  data() {
    return {
      posts: [
        { title: 'Welcome to my site', content: 'Just started building this retro website. Work in progress!' },
        { title: 'Learning Vue.js', content: 'Experimenting with Vue.js for this project. Pretty cool!' },
        { title: 'Y2K aesthetics', content: 'Love the retro vibes. Reminds me of the early internet days.' },
        { title: 'New updates coming', content: 'Planning to add more sections soon. Stay tuned!' },
        { title: 'Coding sessions', content: 'Spent the weekend working on the layout. Happy with the results.' }
      ]
    };
  },
  template: `
    <div>
      <h4>---Micro-Blog---</h4>
      <div id="micro-blog">
        <div v-for="(post, idx) in posts" :key="idx" class="microblog-post" style="border-bottom: 1px dotted #B5C0D0; margin-bottom: 10px; padding-bottom: 8px;">
          <p style="font-size: 1em; font-weight: bold; margin-bottom: 2px;">{{ post.title }}</p>
          <p style="font-size: 0.95em; margin-bottom: 2px; color: #444;">{{ post.content }}</p>
        </div>
      </div>
    </div>
  `
};