const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/user')

const JWT_SECRET = 'qwerty123(*&jklzx'

router.get('/', async (req, res) => {
    try {
      const user = await User.find()
      res.json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getUser, (req, res) => {
	res.json(res.user)
  })

router.post('/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	const checkExistingUser = await User.findOne({username})

	try {
		if(checkExistingUser){
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		const response = await User.create({
			username,
			password
		})
	} catch (error) {
		throw error
	}

	res.json({ status: 'ok' })
})


router.patch('/change-password/:id', getUser, async (req, res) => {
	const { newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	try {
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	}
})


router.post('/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}
	try {
		const user = jwt.verify(token, JWT_SECRET)
		const _id = user.id
		const password = await bcrypt.hash(plainTextPassword, 10)
		await User.updateOne(
			{ _id },
			{ $set: { password } }
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

router.delete('/:id', getUser, async (req, res) => {
	try {
	  await res.user.remove()
	  res.json({ message: 'Deleted User' })
	} catch (err) {
	  res.status(500).json({ message: err.message })
	}
  })


router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'User does not exist.' })
	}

	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign({
			id: user._id,
			username: user.username
		},
		JWT_SECRET
		)
		return res.json({ status: 'ok', id: user._id, token: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})


async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if (user == null) {
		return res.status(404).json({ message: 'Cannot find user' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}

	res.user = user
	next()
}

module.exports = router