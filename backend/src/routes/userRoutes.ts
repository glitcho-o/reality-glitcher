import { Router } from 'express';

const router = Router();

// Mock users database
const users: any[] = [];

// Get user profile
router.get('/profile/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Get user friends
router.get('/friends/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock friends data
    const friends = [
      {
        id: 'friend1',
        username: 'ARExplorer',
        avatar: 'https://via.placeholder.com/50',
        lastSeen: new Date(),
      },
      {
        id: 'friend2',
        username: 'CyberpunkFan',
        avatar: 'https://via.placeholder.com/50',
        lastSeen: new Date(),
      },
    ];

    res.json({ friends });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

// Add friend
router.post('/friends/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const { friendUsername } = req.body;

    // Mock adding friend logic
    res.json({ 
      message: 'Friend request sent',
      friendUsername 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add friend' });
  }
});

export { router as userRoutes };