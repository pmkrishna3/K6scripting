import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
  vus: 3,
  iterations: 3,
};

// Load CSV once
const users = new SharedArray('users data', function () {
  return open('D:/K6Scripting/user.csv')
    .split('\n')
    .slice(1)
    .map(row => {
      const [username, password] = row.split(',');
      return { username, password };
    });
});

export default function () {
  const user = users[__ITER];

  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('https://test-api.example.com/login', payload, params);

  check(res, {
    'login success': (r) => r.status === 200,
  });
}




