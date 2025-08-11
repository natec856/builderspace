// Simple in-memory staging pool (replace with Supabase/DB logic in production)
const stagingPool = []; // { user, joinedAt: Date }

const groupSize = 5;

// Generate a random color for the new group

function getRandomColor() {
  const colors = [
    '#FF5733', '#4CAF50', '#2196F3',
    '#9C27B0', '#FF9800', '#009688',
    '#E91E63', '#3F51B5', '#795548'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// When creating a group
const color = getRandomColor();
// Save `color` to your DB in the `color` column


function addUserToStagingPool(newUser) {
  stagingPool.push({
    user: newUser,
    joinedAt: new Date()
  });

  tryFormGroup();
}

function tryFormGroup() {
  // Sort by join time to respect waiting order
  const sortedPool = [...stagingPool].sort((a, b) => a.joinedAt - b.joinedAt);

  if (sortedPool.length < 4) return;

  const now = new Date();

  // Try to form group of 5 first
  if (sortedPool.length >= groupSize) {
    const groupEntries = sortedPool.slice(0, groupSize);
    formGroup(groupEntries);
    return;
  }

  // Fallback: form group of 4 if oldest user has waited 24h
  const oldestUser = sortedPool[0];
  const hoursWaited = (now - oldestUser.joinedAt) / (1000 * 60 * 60);

  if (hoursWaited >= 24 && sortedPool.length >= 4) {
    const groupEntries = sortedPool.slice(0, 4);
    formGroup(groupEntries);
  }
}

function formGroup(groupEntries) {
  const users = groupEntries.map(entry => entry.user);

  // Remove from staging pool
  for (const entry of groupEntries) {
    const index = stagingPool.findIndex(p => p.user.id === entry.user.id);
    if (index !== -1) stagingPool.splice(index, 1);
  }

  // Use matching logic to optimize final group arrangement (optional but useful)
  const matchedGroups = matchUsersIntoGroups(users);
  const bestGroup = matchedGroups[0] || users;

  // TODO: Save this group to your database
  console.log("✅ New group formed:", bestGroup.map(u => u.username));
}

// Matching logic based on shared interests and experience proximity
function matchUsersIntoGroups(users) {
  const scores = new Map();

  users.forEach(userA => {
    scores.set(userA.id, new Map());

    users.forEach(userB => {
      if (userA.id === userB.id) return;

      const sharedInterests = userA.interests.filter(interest =>
        userB.interests.includes(interest)
      ).length;

      const experienceGap = Math.abs(userA.experienceLevel - userB.experienceLevel);
      const score = sharedInterests * 10 - experienceGap * 2;

      scores.get(userA.id).set(userB.id, score);
    });
  });

  const used = new Set();
  const groups = [];

  for (const user of users) {
    if (used.has(user.id)) continue;

    const group = [user];
    used.add(user.id);

    const userScores = scores.get(user.id);
    if (!userScores) continue;

    const candidates = Array.from(userScores.entries())
      .filter(([id]) => !used.has(id))
      .sort((a, b) => b[1] - a[1])
      .slice(0, groupSize - 1);

    for (const [id] of candidates) {
      const match = users.find(u => u.id === id);
      if (match) {
        group.push(match);
        used.add(match.id);
      }
    }

    groups.push(group);
  }

  return groups;
}

module.exports = {
  addUserToStagingPool,
  stagingPool,
  matchUsersIntoGroups // optional export for testing/debugging
};
 