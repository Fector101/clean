const path = require('path')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Student');

const { getAllStudents } = require("./../db")

const authMiddleware = (req, res, next) => {
  if (req.cookies.authenticated === 'true') {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};




const router = express.Router();

// router.get('/admin-dashboard', async (req, res) => {
//     try {
//       // const users = await User.find().select('-password'); // Don't send passwords
//       res.json({ users });
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
// })
router.get('/admin-dashboard', authMiddleware, async (req, res) => {
  try {
    const studentsData = getAllStudents();
      // req.user is set by the middleware
      res.json({ 
      message: 'Admin dashboard accessed successfully', 
      studentsData

      });
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
  });

router.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/admin.html'));
})

module.exports = router;
