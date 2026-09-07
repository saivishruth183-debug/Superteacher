import axios from 'axios'

const coursesApi = axios.create({
  baseURL: 'http://localhost:5000/api/courses',
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

export const fetchCourses = () => request(() => coursesApi.get('/'))

export const createCourse = (course) => request(() => coursesApi.post('/', course))

export const updateCourse = (id, course) => request(() => coursesApi.put(`/${id}`, course))

export const deleteCourse = (id) => request(() => coursesApi.delete(`/${id}`))

export const deleteCourses = (ids) =>
  request(() => coursesApi.delete('/', { data: { ids } }))
