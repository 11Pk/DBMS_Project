import { api, mockRequest } from './api'

export const adminService = {
  async reviewQualityCheck(id, decision) {
    try {
      const { data } = await api.patch(`/quality-checks/${id}`, { decision })
      return data
    } catch (error) {
      return mockRequest({
        id,
        status: decision,
        message: `Quality check marked as ${decision}`,
      })
    }
  },
}

