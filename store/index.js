import { DataStore } from '@aws-amplify/datastore'
import { Project } from '../src/models'

export const state = () => ({
  mapView: [0, 0],
  projectDrawer: false,
  projects: []
})

export const actions = {
  setProjectDrawer({ commit }, projectDrawer) {
    commit('SET_PROJECT_DRAWER', projectDrawer)
  },
  async getProjects({ commit }) {
    const projects = await DataStore.query(Project)
    commit('SET_PROJECTS', projects)
  }
}

export const mutations = {
  SET_MAP_VIEW: (state, payload) => (state.mapView = payload),
  SET_PROJECT_DRAWER: (state, payload) => (state.projectDrawer = payload),
  SET_PROJECTS: (state, payload) => (state.projects = payload)
}
