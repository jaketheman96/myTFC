const user1 = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const loginSuccess = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY2OTA3NTk4fQ.VXZuMx6LZlMJzcadL3eTGvDIdBaPg7Lew9XWsGD1EhY'

const wrongToken = 'eyhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY2OTA3NTk4fQ.VXZuMx6LZlMJzcadL3eTGvDIdBaPg7Lew9XWsGD1EhY'

export default { user1, loginSuccess, token, wrongToken }