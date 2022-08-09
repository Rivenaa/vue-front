export default {
  namespaced: true,
  state: () => ({
    histories: []
  }),
  mutations: {
    addHistory(state, newHistory) {
      const index = state.histories.findIndex(item => item === newHistory)
      if (index !== -1) {
        state.histories.splice(index, 1)
      }
      state.histories.unshift(newHistory)
      console.log(state.histories)
    },
    deleteHistory(state, index) {
      state.histories.splice(index, 1)
    },
    deleteAllHistory(state) {
      state.histories = []
    }
  }
}
