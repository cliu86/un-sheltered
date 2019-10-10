import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    sidebarOpen: false,
    totalVideoCount: 8
  },
  mutations: {
    FETCH_VIDEOS(state, videos) {
      state.videos = videos
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    CLOSE_SIDEBAR(state) {
      state.sidebarOpen = false;
    }
  },
  getters: {
    getVideoId: (state) => (video) => {
      let uriParts = video.uri.split('/');
      return uriParts[2];
    },
    getEpisodeById: (state) => (id) => {
      return state.videos.find(video => video.uri.indexOf(id) > -1)
    },
    sidebarOpen: state => state.sidebarOpen,
    numUpcoming: (state) => {
      return state.totalVideoCount - state.videos.length;
    }
  },
  actions: {
    fetchVideos({ commit }) {
      return new Promise((resolve, reject) => {
          axios.get("https://api.vimeo.com/users/user83637455/videos?sort=date&direction=asc", {
            headers: {
              'Authorization': 'Bearer 0dc6848b4f1650f37c42e73084990f55'
            }
          })
            .then((response) => {
                commit("FETCH_VIDEOS", response.data.data);
                resolve();
            })
            .catch((error => {
                console.log(error);
            }));
      });
    },
    toggleSidebar ({ commit, state }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSidebar ({ commit, state }) {
      commit('CLOSE_SIDEBAR');
    }
  }
})
