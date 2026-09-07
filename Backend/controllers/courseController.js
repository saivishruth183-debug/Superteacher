import Course from '../modules/Course.js'

const toSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message })
  }
}

// GET /api/courses/:slug
export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch course', error: err.message })
  }
}

// POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const { name, short, color, description } = req.body
    if (!name || !short || !color || !description) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const slug = toSlug(name)
    const exists = await Course.findOne({ slug })
    if (exists) return res.status(409).json({ message: 'A course with this name already exists' })

    const course = await Course.create({ name, slug, short, color, description })
    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create course', error: err.message })
  }
}

// PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const { name, short, color, description } = req.body
    const update = { short, color, description }
    if (name) {
      update.name = name
      update.slug = toSlug(name)
    }

    const course = await Course.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    })
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update course', error: err.message })
  }
}

// DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ message: 'Course not found' })
    res.json({ message: 'Course deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course', error: err.message })
  }
}

// DELETE /api/courses
export const deleteCourses = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No course ids provided" });
    }

    const result = await Course.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Courses deleted", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete courses", error: err.message });
  }
};