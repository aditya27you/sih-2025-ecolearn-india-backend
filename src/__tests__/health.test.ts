import request from 'supertest';
import app from '../app';

describe('Health Check API', () => {
  it('should return 200 and success message', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'EcoLearn India API is running');
  });

  it('should return 200 for root welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('EcoLearn India Backend API');
  });
});
