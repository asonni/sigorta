var jwt = require('jsonwebtoken')
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTQwNTdkNDljNzRjYjAwMTEzODRjZTMiLCJ0b2tlbiI6IjIyZTBmZTg3YjJhYTFiNDU5YjFmOTZjZDNmM2QwOWFiIiwidXBkYXRlZEF0IjoiMjAxNy0wNi0xM1QyMToyMzozNC41MjlaIiwiY3JlYXRlZEF0IjoiMjAxNy0wNi0xM1QyMToyMzozNC41MjlaIiwiZm5hbWUiOiJUb20iLCJsbmFtZSI6Ik1jbGF1Z2hsaW4iLCJlbWFpbCI6InRvbUBmcmFua2FwcC5jb20iLCJwYXNzd29yZEhhc2giOiIkMmEkMDgkd0tTSXQuNXhLblJUMEI0anViQ3hkdXdMOEw0S0hENDA4S2JLdHFON1IyVXBWdGd6MGFyY20iLCJfX3YiOjAsImFwcHMiOlsiNTk0MDU3ZDQ5Yzc0Y2IwMDExMzg0Y2VkIiwiNTk0MDU3ZDQ5Yzc0Y2IwMDExMzg0Y2YwIl19.7IG-fUPNdqlyvhbQtBY7YEFZMq10yU9mHe8p9v7IjuI'
var secret = 'frank123'

console.log("Token", token)
console.log("Secret", secret)

var decoded = jwt.decode(token, secret)
console.log("Decoded", decoded)
