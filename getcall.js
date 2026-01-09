import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  const res = http.get('https://dummy.restapiexample.com/api/v1/employees/1');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
