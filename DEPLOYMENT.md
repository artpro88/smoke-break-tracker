# 🚀 Deployment Guide

## Local Deployment

### Development
```bash
# Terminal 1: Backend
npm start

# Terminal 2: Frontend
npm run client
```

Access at http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## Cloud Deployment Options

### Option 1: Heroku (Recommended for Beginners)

1. **Install Heroku CLI**
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create smoke-break-tracker
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Option 2: Vercel (For Frontend Only)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd client
   vercel
   ```

3. **Update API URL** in frontend to point to backend

### Option 3: Railway

1. **Connect GitHub Repository**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure Environment**
   - Set `NODE_ENV=production`
   - Set `PORT=5000`

3. **Deploy**
   - Railway automatically deploys on push

### Option 4: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN cd client && npm install && npm run build && cd ..
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. **Build Image**
   ```bash
   docker build -t smoke-break-tracker .
   ```

3. **Run Container**
   ```bash
   docker run -p 5000:5000 smoke-break-tracker
   ```

## Environment Variables

Create `.env` file in root:
```env
NODE_ENV=production
PORT=5000
DATABASE_PATH=./smoke_tracker.db
```

## Database Persistence

### SQLite (Current)
- Database file: `smoke_tracker.db`
- Stored in application directory
- Persists across restarts

### For Cloud Deployment
Consider migrating to:
- PostgreSQL (Heroku, Railway)
- MongoDB (Atlas)
- Firebase Realtime Database

## Monitoring & Logging

### Local
```bash
npm start
# Check console output
```

### Heroku
```bash
heroku logs --tail
heroku logs --tail --app smoke-break-tracker
```

### Railway
- View logs in Railway dashboard
- Real-time monitoring available

## Backup & Recovery

### Backup Database
```bash
cp smoke_tracker.db smoke_tracker.db.backup
```

### Restore Database
```bash
cp smoke_tracker.db.backup smoke_tracker.db
```

## Performance Optimization

1. **Enable Gzip Compression**
   - Already configured in Express

2. **Database Indexing**
   - Add indexes for frequently queried columns

3. **Caching**
   - Implement Redis for session caching

4. **CDN**
   - Serve static files from CDN

## Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Regular backups
- [ ] Monitor error logs

## Scaling

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Run multiple instances
- Use shared database

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching

## Troubleshooting

### App Won't Start
```bash
# Check logs
heroku logs --tail

# Restart
heroku restart
```

### Database Connection Error
```bash
# Check database file exists
ls -la smoke_tracker.db

# Reset database
rm smoke_tracker.db
npm start
```

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

---

**Choose the deployment option that best fits your needs!**

