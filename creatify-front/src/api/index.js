import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

// ===== ACTIVITÉS =====
export const getActivites = () =>
  api.get('/activites')

export const getActiviteById = (id) =>
  api.get(`/activites/${id}`)

// ===== RECOMMANDATIONS =====
export const getRecommandations = (data) =>
  api.post('/recommandations', data)

// ===== CRÉATIONS =====
export const getCreations = () =>
  api.get('/creations')

export const getCreationById = (id) =>
  api.get(`/creations/${id}`)

export const postCreation = (data) =>
  api.post('/creations', data)

// ===== UPLOAD IMAGE =====
export const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/creations/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// ===== RÉACTIONS =====
export const getReactions = (id) =>
  api.get(`/creations/${id}/reactions`)

export const addReaction = (id, reaction) =>
  api.post(`/creations/${id}/reactions`, reaction)

export default api