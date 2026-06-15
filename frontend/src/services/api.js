const API_BASE = '/api';

// Helper to get auth header
const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Generic fetch wrapper
const request = async (url, options = {}) => {
  const headers = getHeaders();
  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  };

  const response = await fetch(`${API_BASE}${url}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.msg || `HTTP Error ${response.status}`);
  }
  
  return response.json();
};

export const api = {
  // Auth
  login: async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  verifyToken: async () => {
    return request('/auth/verify');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Projects
  getProjects: async () => {
    return request('/projects');
  },
  
  getProject: async (id) => {
    return request(`/projects/${id}`);
  },
  
  createProject: async (data) => {
    return request('/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  updateProject: async (id, data) => {
    return request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  deleteProject: async (id) => {
    return request(`/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // Blogs
  getBlogs: async (search = '', category = '') => {
    let url = '/blogs';
    const params = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    return request(url);
  },
  
  getBlog: async (slug) => {
    return request(`/blogs/${slug}`);
  },
  
  createBlog: async (data) => {
    return request('/blogs', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  updateBlog: async (id, data) => {
    return request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  deleteBlog: async (id) => {
    return request(`/blogs/${id}`, {
      method: 'DELETE'
    });
  },

  // Skills
  getSkills: async () => {
    return request('/skills');
  },
  
  createSkill: async (data) => {
    return request('/skills', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  updateSkill: async (id, data) => {
    return request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  deleteSkill: async (id) => {
    return request(`/skills/${id}`, {
      method: 'DELETE'
    });
  },

  // Certifications
  getCertifications: async () => {
    return request('/certifications');
  },
  
  createCertification: async (data) => {
    return request('/certifications', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  deleteCertification: async (id) => {
    return request(`/certifications/${id}`, {
      method: 'DELETE'
    });
  },

  // Achievements
  getAchievements: async () => {
    return request('/achievements');
  },
  
  createAchievement: async (data) => {
    return request('/achievements', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  deleteAchievement: async (id) => {
    return request(`/achievements/${id}`, {
      method: 'DELETE'
    });
  },

  // Messages
  sendMessage: async (data) => {
    return request('/contact/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  getMessages: async () => {
    return request('/contact/messages');
  },
  
  deleteMessage: async (id) => {
    return request(`/contact/messages/${id}`, {
      method: 'DELETE'
    });
  },

  // Analytics
  getAnalytics: async () => {
    return request('/analytics');
  }
};
