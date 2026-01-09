import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '30s'
};

export default function() {

    const res = http.get('https://dummy.restapiexample.com/api/v1/employees/1');
    check(res, {
        'status is 200': (r)=> r.status ===  200,
    
    });
    sleep(1);

}

