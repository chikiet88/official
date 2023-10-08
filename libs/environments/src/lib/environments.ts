export const environment = {
  production: false,
  BaseImage:"https://images.tazagroup.vn/",
  APITINYMCE: "1cdi3qs7qw7nogvpu6poxqc6z7bf4a4hurwyao0kdbd741dl",
  APIURL: "http://localhost:3333",
  VNPAY:
  {
    vnp_TmnCode:'HDERMAWT',
    vnp_HashSecret:'RPEVGGQRQAJTRFYAYKDSDIEWANYGICRT',
    vnp_Url:"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_Api:"https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    vnp_ReturnUrl: "http://localhost:8888/order/vnpay_return"
  },
  SECRETKEY: "mycustomuselongsecret",
  EXPIRESIN: "60 days",
  FirebaseInit:{
    apiKey: "AIzaSyAuvMdAWsbDXzA6IoOIiuRhr8w6-VqN4gs",
    authDomain: "hderma-e806b.firebaseapp.com",
    projectId: "hderma-e806b",
    storageBucket: "hderma-e806b.appspot.com",
    messagingSenderId: "297498165872",
    appId: "1:297498165872:web:2636d766b29bc99515eab5",
    measurementId: "G-ZX7TQ6ZTTH"
  },
  keydriveapi: {
    "type": "service_account",
    "project_id": "tazagroup",
    "private_key_id": "83d6cbbf8e0cb05f0b043d3e0a1958554dd590bc",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDFPdv7DLm4Pac9\nGJTLV/iEFHIouwsl9vLRJyd4qrrQfeOWquXCoSq3JjSbdpu+TnbwkBQ0mh25rxDJ\nkCU/DlBCqDhdGTO3nNKeAXm+MCHpmR+V/OBC29tgVslaVHFdxy82lNSn5X2XzNMT\nsdlivFbGDFc2tfIrAWwRhVO2DGca1DFK21BrVsRN+abrx0BbQA8jYYVeP6FaaMdh\nUdRsEnSGyYCT6UyZULyZDrb6WBQr2szhBPArJdQs/U7y34HVD7QCeMz03l7uHj66\nnMSaHlof9Cpj+dCJyPONDta5pDnHkw7GmvdFWl6CfjM3rrKmNMTdK9xEXVKknGGX\nanS0SYItAgMBAAECggEABcZDLnJiQuFAiCq0EHqe1/Rmnd1RUjyMl1BMzjI8DeaM\nRy5G/mUMLxh7PyHrJVh+uu7nkzKqiXPKoLFg+xucK0IULwWR3LTxUEGSzYfzNjeO\nvoFiFL2ttSr/8hkOyJlllHTUVPtZq0a1LJpvAX5UvATtzg2S7Wy5O+S/XVEM+QgN\naxwW5uvKLvcBDM3gqMqJFToxi86ijcNqj5cQZ0RcBTz9swfJMGFsVf+DJE8HomJx\nn/NIA65JcjOz5xuEo2gQ15LcEsKJa0sPkedzKqEryBhoRIdZNZj686fy7oVhCC1Y\n78PPhLLutQZ/XcEYm/R6WEfeZ2op4Z0CAxBVXuYxAQKBgQD4MZwa0N6BifGey1E7\n8wrgN14534QIfe/qy4NF0+LZxAe9bBaIK7WJr/0c9NWBsMuu3rM57FzsZEHZPoDt\nx2jZ0c9k0z1WZVZ9u0GSdcfHOaCIJRmTiC6ZHrPWfzp7NpBAYjN2dWcWasalaqir\nueKyyWU2QTd/FUfoWUMV6KwGvQKBgQDLcf8TC28KW/qCXt6bFtYcoTaEKBIZEy5H\nGk3vauWxUaeTHo1bRCmaK5/FRoKUbULioFpBgKgy+JzCAUzSdld5o0UeFhKwOp4Z\nSSNeshSbRR910sNdQhEeNyzBz6F8tpYjR9ckl2gQakfHlc/8SWVVOQSOROVA0jDx\nfpjQOIyYMQKBgQCck6eY30ZQULcm57ui52xoEWYXeqQwO0sdRDDX35mQqnP7k3IP\njAumBmnXV7pObDvDYWmOVEg3NfS42g66c3/5UrzVLdLXa20KOxVeEYHsdLWKzmT5\nRwOmw9DOtEsvqjeM9qbix6Q2ZzxU5Rnt5IJZKmb4uGILgWBw+8cvzi6gvQKBgQC5\n4ARBfS/Nki21kUHnBp1G+Q/a/NVULY8ZjXHpLYyATm9BXieeXA96eSL3Va2WOKFk\nd0cfE5IZR8XJBvEOVOslCkPq8hXPBy9NQOJc8W0cU7IjrxWpjeQf7B8rUC1lyVgx\nEcECAIcmgEPmmPy2rsQzce20okOmzqPC8HxjuVbS8QKBgQCJ7Q7reYlhJ634TE4j\nJSdbo1irCBuD1doNonmJ2HGptkg0fcCbdxQXhNnzOslqymedQaSadsMRp0XHoFbd\nL43iB0bSMpO4zXmaqqtqW2i40e1BKxm3muVibxYC7Cf9pPRyDBYDNH5HG86toAOT\nvxYii6HGTzy7Qg05bAGk+Q/Imw==\n-----END PRIVATE KEY-----\n",
    "client_email": "drive-tazagroup@tazagroup.iam.gserviceaccount.com",
    "client_id": "107824773839130289254",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/drive-tazagroup%40tazagroup.iam.gserviceaccount.com"
  },
  DB_USERS: {
    type: 'mysql',
    host: '103.221.222.71',
    port: 3306,
    username: 'tazaspac_chikiet',
    password: '@Hikiet88',
    database: 'tazaspac_chikiet',
    autoLoadEntities: true,
    synchronize: true,
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci",
  },
};
