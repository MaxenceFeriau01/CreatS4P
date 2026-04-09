import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export const getActivites = () => api.get('/activites')

export const getRecommandations = (data) => api.post('/recommandations', data)

export const getCreations = () => api.get('/creations')

export const postCreation = (data) => api.post('/creations', data)

export const addReaction = (id, reaction) => api.post(`/creations/${id}/reactions`, reaction)

export const getReactions = (id) => api.get(`/creations/${id}/reactions`)