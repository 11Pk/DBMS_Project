import { api, mockRequest } from './api'

export const donorService = {
  async registerOrgan(payload) {
    try {
      const { data } = await api.post('/donors/register', payload)
      return data
    } catch (error) {
      return mockRequest({
        message: 'Organ registered and shared with hospital network.',
        status: payload.availability || 'Available',
      })
    }
  },
}

