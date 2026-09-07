import axios from 'axios'

const gradesApi = axios.create({
  baseURL: 'http://localhost:5000/api/grades',
})

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong'

const request = async (operation) => {
  try {
    const response = await operation()
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export const fetchGradesByCourse = (courseSlug) =>
  request(() => gradesApi.get(`/courses/${courseSlug}/grades`))

export const createGrade = (courseSlug, grade) =>
  request(() => gradesApi.post(`/courses/${courseSlug}/grades`, grade))

export const updateGrade = (id, grade) =>
  request(() => gradesApi.put(`/grades/${id}`, grade))

export const deleteGrade = (id) =>
  request(() => gradesApi.delete(`/grades/${id}`))

export const deleteGrades = (ids) =>
  request(() => gradesApi.delete('/grades', { data: { ids } }))

export const uploadGradePdf = (id, file) => {
  const formData = new FormData()
  formData.append('pdf', file)
  return request(() => gradesApi.post(`/grades/${id}/pdf`, formData))
}

export const deleteGradePdf = (id) =>
  request(() => gradesApi.delete(`/grades/${id}/pdf`))

export const fileUrl = (url) => `http://localhost:5000${url}`
