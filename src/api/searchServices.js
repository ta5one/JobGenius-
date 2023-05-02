import axios from "axios"

export const search = async searchTerm => {
  try {
    const response = await axios.get(`/api/search?query=${searchTerm}`)
    return response.data
  } catch (error) {
    console.error("Error searching:", error)
    return []
  }
}

export const searchSuggestions = async searchTerm => {
  try {
    const response = await axios.get(`/api/suggestions?query=${searchTerm}`)
    return response.data
  } catch (error) {
    console.error("Error fetching suggestions:", error)
    return []
  }
}

export const getCategories = async searchTerm => {
  try {
    const response = await axios.get(`/api/categories?query=${searchTerm}`)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
