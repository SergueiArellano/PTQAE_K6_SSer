
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 500 },
        { duration: '2m', target: 1000 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<1500'],
        http_req_failed: ['rate<0.05'],
    },
};

export default function () {
    const res = http.get('https://reqres.in/api/users?page=2');

    check(res, {
        'status es 200': (r) => r.status === 200,
        'tiempo de respuesta < 1.5s': (r) => r.timings.duration < 1500,
    });

    sleep(0.5);
}
