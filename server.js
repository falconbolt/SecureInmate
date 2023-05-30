const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const express = require('express');
const connectDB = require('./config/db')
const path = require('path');
const fs =require('fs');
const colors = require('colors');



// Load env vars    
dotenv.config({path: `./config/config.env`})    

// connect to database
connectDB();

const app = express();

// cookie parser
app.use(cookieParser())

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



// Route files
const auth = require('./routes/auth');
const authV2 = require('./routes/authV2');
const inmate = require('./routes/inmateRoutes')
const errorHandler =require('./middleware/error')

//mount routers  
app.use('/api/v1/auth', auth);
app.use('/api/v1/authV2', authV2);
app.use('/api/v1/inmate', inmate);
app.use(errorHandler);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

// app.use(errorHandler)


PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
.yellow.bold
));

//Handle unhandled promise rejections
// process.on('unhandledRejection',(err,promise)=>{
//     console.log(`Err:${err.message}`.red)
//     // Close server & exit process
//     server.close(()=>process.exit(1))
// })
