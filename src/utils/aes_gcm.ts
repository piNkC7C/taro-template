import JSEncrypt from "jsencrypt";

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtFg28bPqVUdlg/K3/091
rYkXHUFe3ssYjTMCn13xUK1g2RmZmHBD7KNaq+1nnWpI77rrmmqoRT8ful/xBHsN
aVpYl60cOF+5p5IFvdl8U/Ry7eFtu1fQVhrW75CN6lyjbz4wUIb8T18fDbKEgww2
UUUQo0QOePObgf34btT+vP3RxZ6bxkhyTn8Nl2KTdQL7zDVMYaiDqJbqLT04Pc18
urLBYetQm25zWje8u4S7IBBf+HPM1jbSVNyNAZlAoEVbzaICTbZm3BVeb3cZwz8y
KEa7/KvCpOCSXdrjq4xf9Jf0fCivGWHll/vHkWYSPWVapUpRQXFwM7FSL7nBfz1C
bwIDAQAB
-----END PUBLIC KEY-----`

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQC0WDbxs+pVR2WD
8rf/T3WtiRcdQV7eyxiNMwKfXfFQrWDZGZmYcEPso1qr7WedakjvuuuaaqhFPx+6
X/EEew1pWliXrRw4X7mnkgW92XxT9HLt4W27V9BWGtbvkI3qXKNvPjBQhvxPXx8N
soSDDDZRRRCjRA5485uB/fhu1P68/dHFnpvGSHJOfw2XYpN1AvvMNUxhqIOoluot
PTg9zXy6ssFh61CbbnNaN7y7hLsgEF/4c8zWNtJU3I0BmUCgRVvNogJNtmbcFV5v
dxnDPzIoRrv8q8Kk4JJd2uOrjF/0l/R8KK8ZYeWX+8eRZhI9ZVqlSlFBcXAzsVIv
ucF/PUJvAgMBAAECggEBAKNjVIwQc1pFr/wmN3rwk23gSPexVPFGUX0DXPnjk5CD
M74dCmHoPDG1IZ2oHXqpY2EGGRQyUzdBZE5nQ6XKkjEDsEXiiTGt0Da3/cmts40g
Z8uKs+7KNS79bANpFJniyhMr5Xvff9GtHSY8uP89XiytBNDWBMKh+h6AaMaI5C11
xm8W0Ha623lFkthvx1d9zdndiBjrsV3X9VGJ2dCwEL5VX7l/UP5/S1Jo4zZRHwY7
9L/xPfLQ5E46sty72l/upPRQsNx6utLAEUBCh7TUSZbr9lSn26AQ8zK+v6fdkGmj
aYNbxgXANfXriU1vj6Xrz8j73PBbN16QdXw/zpxKBxECgYEA2Q8XHMZPWPsdYHfO
XSKpX8NJPq6i0dL7lh9KqZiJj7N1j7k+bUqEiS4iviqZG1l2IziBl4zEWCbGopTx
V4ODZ0O1P15hwdl06gGgaCCau1pc1wqMWspRUJo+JOH9m5QqFfIzWmncZXOkevqD
7WrWjDnef30y6JImVe2a/oIXnJcCgYEA1LLvyVeUISaSM9wy//6fc4iGov+riulV
y3hbRWBn1uh9BJ3K8R0qN+lHCl/nqiTDXZMD4/HEgSjyOVz/Wm86vGkqwKl1fkF2
1cquSkxUNxUmyAZ+e8CD4tiUaMTIqE/N8qdFgd1Js0A3sKX4XYfWEKesNXdyHEPZ
RlqhVqSMy+kCgYEAz25SYhdKIPjp3BTiS7MiNfgEeTifNPHxqEeDLIwvefrAcHdR
J1S9T/OdFCrVYoOeGI6ZmeDWin+T+C9qbH2sB/V2snZZ6c0Mo8ymJJx0AnOaoY7d
Dq6mAudEWC74E8QGbC6n0NG14+Yd28Coby1Yl21+KkvVaNiydg+5vVtJgUUCgYEA
ywiv6jNGfEqUXxrAOCt3S9K0Kp4Bww0vT5XpEhWPqc6toB173qNnbI2quZWIz5pe
P1GZ8hoT6PMMHYPPYSUyHS4KmHRqaoXVCQl7TAMGlLoFFgVU8Y54lq8FI+lMXZYo
UownxmpU8t3HC0GzDp0e0zErKrKFY8PEgOr8fXd/yxkCgYEAuYB7BAkdmMpnOMLb
CzrDB2LZXdF/fXp4Ju1zpUemZI+4YIkLAr1rjTs7CsmBp8wGjFpMuriL0x3gLgLm
xYgCjxWQDDC2RLWr+VpQeftVABG2Xc9meEDP3crw9SZeovHJCOvTmgDc9wjAQdqS
Oy/M0H8aaH8qDUmVCfi1x5b/3bk=
-----END PRIVATE KEY-----`

export type IAccountLogin = {
    username: string;
    password: string;
}

// 加密数据
export const encrypt = (data: IAccountLogin) => {
    const encryptor = new JSEncrypt();
    encryptor.setPrivateKey(publicKey);
    return JSON.stringify(encryptor.encrypt(JSON.stringify(data)));
};

// 解密数据
export const decrypt = (encryptedData: string) => {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(privateKey);
    return JSON.parse(JSON.stringify(decryptor.decrypt(encryptedData)));
};
