import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteBlog } from '../../api/BlogApi'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'

import './../../styles/Table.css'

const Table = ({ data = [], type, setData }) => {
  const navigate = useNavigate()


  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};




  const handleEdit = id => {
    console.log('Navigating to edit blog with ID:', id)

    navigate(`/admin/blog/edit-blog/${id}`)
  }

  const handleDelete = async id => {
    try {
      const result = await deleteBlog(id);
    if (result.status) {
      // Filter out the deleted blog from the current state
      setData((prevData) => ({
        ...prevData,
        blog: prevData.blog.filter((item) => item._id !== id),
      }));   
        
        
       alert('Blog deleted successfully')
        navigate("/admin/blog");

      } else {
        alert(result.message || 'Error deleting Blog')
      }
    } catch (error) {
      console.error('Error deleting Blog:', error)
      alert('Error deleting Blog: ' + error.message)
    }
  }
  if (!Array.isArray(data.blog)) {
    console.error('Invalid Blog passed to Table component:', data)
    return <p>Invalid Blog provided.</p>
  }

  const renderTableHeader = () => {
    if (type === 'blog') {
      return (
        <>
          <th key='title'>Title</th>
          <th key='image'>Image</th>
          {/* <th key='content'>content</th> */}
          <th key='author'>author</th>
          <th key='actions'>Actions</th>
        </>
      )
    }
  }

  const renderTableData = () => {
    console.log('Data in blog table: ', data)
    if (data && data.blog.length > 0) {
      return data.blog.map(item => (
        <tr key={item._id}>
          {type === 'blog' && (
            <>
              <td key={`title-${item._id}`}>{truncateText(item.title)}</td>
              <td key={`image-${item._id}`}>
                <img src={item.image} alt='Blog' width={100} />
              </td>
              {/* <td key={`content-${item._id}`}>{truncateText(item.content)}</td> */}
              <td key={`author-${item._id}`}>{item.author}</td>

              <td key={`actions-${item._id}`}>
                <FaEdit
                  style={{
                    cursor: 'pointer',
                    marginRight: '10px',
                    color: '#28a745'
                  }}
                  onClick={() => handleEdit(item._id)}
                />
                <FaTrash
                  style={{ cursor: 'pointer', color: '#dc3545' }}
                  onClick={() => handleDelete(item._id)}
                />
              </td>
            </>
          )}
        </tr>
      ))
    } else {
      return (
        <tr>
          <td colSpan='4'>No Blog items available</td>
        </tr>
      )
    }
  }

  return (
    <table>
      <thead>
        <tr>{renderTableHeader()}</tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default Table
