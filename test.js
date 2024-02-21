// @ts-nocheck
import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
    apiKey: "2a73e9b5",
    apiSecret: "MThuoQLowlmGO5Ob"
});

vonage.verify.start({
    number: "17069630304",
    brand: "Vonage- Tess"
})
    .then(resp => console.log(resp.request_id))
    .catch(err => console.error(err));