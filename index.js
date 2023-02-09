const bitbucketjs = require('./bitbucket-js/src/index')

API_TOKEN = "ATATT3xFfGF0bbGs_umLw8Mzp1ki0vMI7Vw5iq1kXNxvO6MtxH2L5cTpYYB8EAP4Hfjh9mc1h4rlLHQRqeJvJv3OHJw0tF_gNJqGQl8fe-TlILM1CoPWUdHiiiLJUK7himhC7ldeLdvgYruewmPHQE-lW65BC6Rkhlh5N9aQIhq9KWUq0So8ltU=C6D36C40"
const REPO_ACCESS_TOKEN = "ATCTT3xFfGN00zX5gupf36-P1yROX2k9Nrsm1oYquRx1zGcNIpp4jUT7ptqt3o2yUF5viupksvj5FIOdB_XcnT9_407djdYUQnkEk2Q_EWMkRlPqQQkKWENW7fKZANLHE4jzh6VqH5HDX-efmzV2Jv5SQNYweBsgOSPeRVQed5zndf-Fp1HVIno=378C8AF4"

const clientOptions = {
    auth: {
        token: REPO_ACCESS_TOKEN
    },
}

async function run() {
    try {
        const bitbucket = bitbucketjs({
            auth: {
                token: REPO_ACCESS_TOKEN
            }
        })
        // const r = await bitbucket.user.get()
        // console.log(r)

        // const res = await bitbucket.repositories.readSrc({ commit: "HEAD", path: ".", repo_slug: "maciejReimann/my-first-repo/src/master/" })
        console.log(bitbucket)
        // const result = await bitbucket.users.get({ selected_user: "maciejReimann" })

        // console.log(result)
    } catch (e) {
        console.error(e)
    }
}

run()
