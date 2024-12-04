import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPortfolioById, updatePortfolio } from '../api/portfolioApi'
import './../styles/EditPortfolio.css'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './Testimonials/Portfolio.css'
// import "./Testimonials/style.css";

import QuillToolbar, { modules, formats } from "./Blogs/EiditorTool"; // Assuming you have this toolbar

const EditPortfolio = () => {
  const { id } = useParams() // Extract Portfolio ID from the URL
  const navigate = useNavigate()





  const [portfolio, setPortfolio] = useState({
    title: "",
    content: "",
    image: "",
    author: ""
  }
  ) // State for Portfolio data
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const [content, setContent] = useState("") // Content state for Quill editor

  // Fetch Portfolio data when component mounts
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await getPortfolioById(id) // API call to get Portfolio by ID
        setPortfolio(response.portfolio) // Update state with fetched data
        setContent(response.portfolio.content || "") // Set initial content for Quill editor
      } catch (err) {
        console.error('Error fetching Portfolio:', err)
        setError('Failed to fetch Portfolio data')
      } finally {
        setLoading(false) // Stop loading spinner
      }
    }

    fetchPortfolio()
  }, [id])

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target
    setPortfolio(prevPortfolio => ({
      ...prevPortfolio,
      [name]: value
    }))
  }

  // Handle file input changes
  const handleFileChange = e => {
    const file = e.target.files[0]
    setPortfolio(prevPortfolio => ({
      ...prevPortfolio,
      image: file
    }))
  }

  // Handle content changes in Quill editor
    // Handle content changes in Quill editor
    const handleEditorChange = (value) => {
      setContent(value);
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', portfolio.title)
    formData.append('content', content) // Use the updated content from Quill editor
    if (portfolio.image instanceof File) {
      formData.append('image', portfolio.image) // Append file only if updated
    }
    formData.append('type', portfolio.type)
    // formData.append("shortDesc", portfolio.shortDesc)
    formData.append("projectType", portfolio.projectType)
    formData.append("branchType", portfolio.branchType)
    formData.append("program", portfolio.program)

    try {
      await updatePortfolio(id, formData) // Call API to update Portfolio
      alert('Portfolio updated successfully')
      navigate('/admin/portfolio') // Redirect to Portfolio list
    } catch (error) {
      console.error('Error updating Portfolio:', error)
      alert('Failed to update Portfolio')
    }
  }

  if (loading) return <p>Loading Portfolio data...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='edit-portfolio-page'>
      <h1>Edit Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={portfolio.title || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Image</label>
          <input type='file' name='image' onChange={handleFileChange} />
          {portfolio.image && !(portfolio.image instanceof File) && (
            <p>Current Image: {portfolio.image}</p>
          )}
        </div>

        <div className='form-group'>
          <label>Type</label>
          <input
            type='text'
            name='type'
            value={portfolio.type || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Content</label>
          <QuillToolbar />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
          />
        </div>

        <select
          name="projectType"
          value={portfolio.projectType}
          onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="mobile">mobile</option>
          <option value="web">web</option>
          <option value="desktop">desktop</option>
        </select>

        <input
          type="text"
          name="branchType"
          placeholder="Branch Type"
          value={portfolio.branchType}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="program"
          placeholder="Program"
          value={portfolio.program}
          onChange={handleInputChange}
        />
{/* 
        <input
          type="text"
          name="shortDesc"
          placeholder="Short Description"
          value={portfolio.shortDesc}
          onChange={handleInputChange}
        /> */}

        <button type='submit' className='btn-primary'>
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditPortfolio
