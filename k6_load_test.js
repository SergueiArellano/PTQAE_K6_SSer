
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 10 },
        { duration: '2m', target: 20 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const res = http.get('https://reqres.in/api/users?page=2');

    check(res, {
        'status es 200': (r) => r.status === 200,
        'tiempo de respuesta < 1s': (r) => r.timings.duration < 1000,
    });

    sleep(1);
}
