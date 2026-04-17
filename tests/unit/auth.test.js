const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('JWT', () => {
  it('signs and verifies token', () => {
    const token = jwt.sign({ username: 'alice' }, 'secret');
    expect(jwt.verify(token, 'secret').username).toBe('alice');
  });

  it('rejects tampered token', () => {
    expect(() => jwt.verify('bad.token.here', 'secret')).toThrow();
  });
});

describe('bcrypt', () => {
  it('hashes and matches password', async () => {
    const hash = await bcrypt.hash('pass123', 10);
    expect(await bcrypt.compare('pass123', hash)).toBe(true);
  });

  it('rejects wrong password', async () => {
    const hash = await bcrypt.hash('correct', 10);
    expect(await bcrypt.compare('wrong', hash)).toBe(false);
  });
});