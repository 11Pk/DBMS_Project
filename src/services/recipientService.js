import { api, mockRequest } from './api'

export const recipientService = {
  async requestOrgan(payload) {
    try {
      const { data } = await api.post('/recipients/request', payload)
      return data
    } catch (error) {
      return mockRequest({
        message: 'Request submitted. You will be notified when a match is available.',
        status: 'Pending',
      })
    }
  },
}

