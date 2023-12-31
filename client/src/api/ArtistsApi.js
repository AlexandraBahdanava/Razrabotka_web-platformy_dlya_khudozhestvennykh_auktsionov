import host from ".";

const api = {
  createArtist: async (artistData) => {
    try {
      const response = await host.post("/artists", artistData);
      return response.data;
    } catch (error) {
      console.error('Error creating artist:', error);
      throw error;
    }
  },

  updateArtist: async (artistId, artistData) => {
    try {
      const response = await host.put(`/artists/${artistId}`, artistData);
      return response.data;
    } catch (error) {
      console.error('Error updating artist:', error);
      throw error;
    }
  },

  getEmailById: async (artistId) => {
    try {
      const response = await host.get(`/artists/${artistId}/email`);
      return response.data;
    } catch (error) {
      console.error('Error getting artist email:', error);
      throw error;
    }
  },
};

export default api;
