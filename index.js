const axios = require('axios');

API_TOKEN = "ATATT3xFfGF0bbGs_umLw8Mzp1ki0vMI7Vw5iq1kXNxvO6MtxH2L5cTpYYB8EAP4Hfjh9mc1h4rlLHQRqeJvJv3OHJw0tF_gNJqGQl8fe-TlILM1CoPWUdHiiiLJUK7himhC7ldeLdvgYruewmPHQE-lW65BC6Rkhlh5N9aQIhq9KWUq0So8ltU=C6D36C40"
const REPO_ACCESS_TOKEN = "ATCTT3xFfGN00zX5gupf36-P1yROX2k9Nrsm1oYquRx1zGcNIpp4jUT7ptqt3o2yUF5viupksvj5FIOdB_XcnT9_407djdYUQnkEk2Q_EWMkRlPqQQkKWENW7fKZANLHE4jzh6VqH5HDX-efmzV2Jv5SQNYweBsgOSPeRVQed5zndf-Fp1HVIno=378C8AF4"

const clientOptions = {
    auth: {
        token: REPO_ACCESS_TOKEN
    },
}

async function run(args) {
    const [workspace, repository, packageName, version] = args
    console.log("Updating: ", { workspace, repository, packageName, version })

    // TODO: consider implementing a function that builds the path to package.json in a given repo
    // and (maybe) throw if no such file is found
    const defaultPathToFile = "src/master"
    const filename = "package.json"
    try {
        const baseURL = "https://api.bitbucket.org/2.0"
        const { data: currentFile } = await axios.get(`${baseURL}/repositories/${workspace}/${repository}/${defaultPathToFile}/${filename}`, {
            headers: {
                "Authorization": `Bearer ${REPO_ACCESS_TOKEN}`,
                'Accept': "application/json"
            }
        })
        // TODO: validate JSON
        console.log(`Current file: ${JSON.parse(JSON.stringify(currentFile))}`)
        console.log(currentFile)

        const updatedFile = bumpVersion(currentFile, { packageName, version })
    } catch (e) {
        console.error(e)
    }
}

const bumpVersion = (json, { packageName, newVersion }) => {
    if (!json.dependencies) return // TODO: throw error in validate()
    if (!json.dependencies[packageName]) return // TODO: throw error validate()

    console.log(`Current version of: ${packageName} is: ${json.dependencies[packageName]}`)

    // TODO: bump only when necessary: npm install compare-versions
    // https://www.npmjs.com/package/compare-versions
}

run(process.argv.slice(2))
