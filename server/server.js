require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize, User, Course, Resource, Progress } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'luxury-secret-key-2024';

app.use(cors());
app.use(express.json());

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

// --- Auth Routes ---

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Course Routes ---

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Resource Routes ---

app.get('/api/resources', async (req, res) => {
    try {
        const resources = await Resource.findAll();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Progress Routes ---

app.get('/api/progress', authenticateToken, async (req, res) => {
    try {
        const progress = await Progress.findAll({ where: { userId: req.user.id } });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/progress', authenticateToken, async (req, res) => {
    const { courseId, lessonId } = req.body;
    try {
        let progress = await Progress.findOne({ where: { userId: req.user.id, courseId } });

        if (progress) {
            const completedLessons = Array.isArray(progress.completedLessons) ? progress.completedLessons : [];
            if (!completedLessons.includes(lessonId)) {
                completedLessons.push(lessonId);
                progress.completedLessons = completedLessons;
                progress.lastAccessed = new Date();
                await progress.save();
            }
        } else {
            progress = await Progress.create({
                userId: req.user.id,
                courseId,
                completedLessons: [lessonId],
                lastAccessed: new Date()
            });
        }
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Initialization & Seeding ---

const seedData = async () => {
    const userCount = await User.count();
    if (userCount === 0) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const luxuryPassword = await bcrypt.hash('luxury2024', 10);

        await User.bulkCreate([
            { id: 'u1', email: 'pablo@visualgrowth.info', password: hashedPassword, full_name: 'Pablo Admin', role: 'Admin' },
            { id: 'u2', email: 'catherine@sustainable-luxury.com', password: luxuryPassword, full_name: 'Catherine Sonolet', role: 'Training Consultant' }
        ]);

        await Course.create({
            id: 'sustainability-essentials',
            title: 'Sustainability Essentials for Luxury Teams',
            description: 'Master the fundamentals of CSR and how to communicate it to luxury clients.',
            thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
            modules: [
                {
                    id: 'm1',
                    title: 'Introduction to Luxury CSR',
                    lessons: [
                        { id: 'l1', title: 'Why Sustainability Matters', duration: '15m' },
                        { id: 'l2', title: 'Global Luxury Trends', duration: '20m' }
                    ]
                },
                {
                    id: 'm2',
                    title: 'Sustainable Materials',
                    lessons: [
                        { id: 'l3', title: 'Traceability in Raw Materials', duration: '25m' },
                        { id: 'l4', title: 'Innovative Alternatives', duration: '30m' }
                    ]
                }
            ]
        });

        await Resource.bulkCreate([
            { id: 'brand-guide', title: 'Sustainable Branding Guide 2024', type: 'PDF', description: 'A comprehensive guide on how to integrate sustainability into your brand narrative.', fileUrl: '/assets/pdf/branding-guide.pdf', category: 'Guides' },
            { id: 'material-audit', title: 'Material Audit Checklist', type: 'Worksheet', description: 'Use this checklist to audit your supply chain materials.', fileUrl: '/assets/pdf/audit-checklist.pdf', category: 'Tools' }
        ]);

        console.log('Database seeded successfully.');
    }
};

console.log('Starting server initialization...');

sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
        seedData()
            .then(() => {
                app.listen(PORT, '0.0.0.0', () => {
                    console.log(`Server is live and listening on port ${PORT}`);
                });
            })
            .catch(err => {
                console.error('Error during data seeding:', err);
            });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
        process.exit(1);
    });
