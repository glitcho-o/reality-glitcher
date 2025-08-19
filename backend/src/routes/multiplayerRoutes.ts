import { Router } from 'express';

const router = Router();

// Mock session data
const sessions: any[] = [];

// Create multiplayer session
router.post('/sessions', (req, res) => {
  try {
    const { hostUserId, sessionName } = req.body;

    const session = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      hostUserId,
      sessionName: sessionName || 'AR Session',
      createdAt: new Date(),
      participants: [],
      isActive: true,
    };

    sessions.push(session);

    res.status(201).json({
      message: 'Session created successfully',
      session,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Join session
router.post('/sessions/:sessionId/join', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userId, username } = req.body;

    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (!session.isActive) {
      return res.status(400).json({ error: 'Session is not active' });
    }

    // Add participant if not already in session
    const existingParticipant = session.participants.find((p: any) => p.userId === userId);
    if (!existingParticipant) {
      session.participants.push({
        userId,
        username,
        joinedAt: new Date(),
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      });
    }

    res.json({
      message: 'Joined session successfully',
      session,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join session' });
  }
});

// Leave session
router.post('/sessions/:sessionId/leave', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { userId } = req.body;

    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Remove participant
    session.participants = session.participants.filter((p: any) => p.userId !== userId);

    res.json({
      message: 'Left session successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to leave session' });
  }
});

// Get session info
router.get('/sessions/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.find(s => s.id === sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// List active sessions
router.get('/sessions', (req, res) => {
  try {
    const activeSessions = sessions.filter(s => s.isActive);
    res.json({ sessions: activeSessions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

export { router as multiplayerRoutes };