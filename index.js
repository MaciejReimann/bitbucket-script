const axios = require('axios');
const { execSync } = require('child_process');
const path = require('path');
const FormData = require('form-data');

const fs = require('fs');

API_TOKEN = "ATATT3xFfGF0bbGs_umLw8Mzp1ki0vMI7Vw5iq1kXNxvO6MtxH2L5cTpYYB8EAP4Hfjh9mc1h4rlLHQRqeJvJv3OHJw0tF_gNJqGQl8fe-TlILM1CoPWUdHiiiLJUK7himhC7ldeLdvgYruewmPHQE-lW65BC6Rkhlh5N9aQIhq9KWUq0So8ltU=C6D36C40"
const REPO_ACCESS_TOKEN = "ATCTT3xFfGN00zX5gupf36-P1yROX2k9Nrsm1oYquRx1zGcNIpp4jUT7ptqt3o2yUF5viupksvj5FIOdB_XcnT9_407djdYUQnkEk2Q_EWMkRlPqQQkKWENW7fKZANLHE4jzh6VqH5HDX-efmzV2Jv5SQNYweBsgOSPeRVQed5zndf-Fp1HVIno=378C8AF4"

const clientOptions = {
    auth: {
        token: REPO_ACCESS_TOKEN
    },
}

const O_AUTH = {
    KEY: "5DVVgHF4pQAr8RUuc6",
    SECRET: "4Khq2uWWTw8cYZNBLwaF49pr2W2btkr2"
}

async function run(args) {
    const [workspace, repository, packageName, version] = args
    console.log("Updating: ", { workspace, repository, packageName, version })

    // TODO: consider implementing a function that builds the path to package.json in a given repo
    // and (maybe) throw if no such file is found
    const baseURL = "https://api.bitbucket.org/2.0"
    const defaultPathToFile = "src"
    const mainBranch = "master"
    const filename = "package.json"

    const repoLink = `${baseURL}/repositories/${workspace}/${repository}`

    // Alternative solution: 
    // CONS: need to fetch all repo through the wires
    // PROS: git API available
    // - fetch repo
    // - write to file
    // - change file content
    // = commit & push
    // try {
    //     execSync('git clone repoLink', {
    //         stdio: [0, 1, 2], // we need this so node will print the command output
    //         cwd: path.resolve(__dirname, 'temp'), // path to where you want to save the file
    //     })
    // } catch (e) {
    //     console.error(e)
    // }
    try {
        // Get current package.json:

        // const baseURL = "https://api.bitbucket.org/2.0"
        // const { data: maybeJSON } = await axios.get(`${baseURL}/repositories/${workspace}/${repository}/${defaultPathToFile}/${mainBranch}/${filename}`, {
        //     headers: {
        //         "Authorization": `Bearer ${REPO_ACCESS_TOKEN}`,
        //         'content-type': "application/json"
        //     }
        // })


        // let packageJSON
        // try {
        //     packageJSON = JSON.parse(JSON.stringify(maybeJSON))
        // } catch (e) {
        //     throw e
        // }

        // console.log(`Current file: ${packageJSON}`)
        // console.log(packageJSON)

        // const updatedDependencies = bumpVersion(packageJSON.dependencies, { packageName, version })
        // const newPackageJSON = { ...packageJSON, dependencies: updatedDependencies }

        // console.log("newPackageJSON")
        // console.log(newPackageJSON)

        const newPackageJSON = {
            name: 'test-repo',
            version: '1.0.0',
            description: '',
            main: 'index.js',
            scripts: { test: 'echo "Error: no test specified" && exit 1' },
            repository: {
                type: 'git',
                url: 'git+https://bitbucket.org/maciejReimann/my-first-repo.git'
            },
            author: '',
            license: 'ISC',
            bugs: { url: 'https://bitbucket.org/maciejReimann/my-first-repo/issues' },
            homepage: 'https://bitbucket.org/maciejReimann/my-first-repo#readme',
            dependencies: { axios: '1.2.3' }
        }

        const client_id = "maciejReimann"
        const code = REPO_ACCESS_TOKEN
        const authURL = `https://bitbucket.org/site/oauth2/access_token`



        const response = await axios.post(
            'https://bitbucket.org/site/oauth2/access_token',
            new URLSearchParams({
                'grant_type': 'client_credentials'
            }),
            {
                auth: {
                    username: O_AUTH.KEY,
                    password: O_AUTH.SECRET
                }
            }
        );

        console.log(response)

        // TODO: create a commit: 

        // const newBranch = "bump-version"
        // const formData = new FormData();
        // formData.append('my_field', 'my value');

        // const response = await axios(`${baseURL}/repositories/${workspace}/${repository}/${defaultPathToFile}/${mainBranch}/${filename}`, {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": `Bearer ${REPO_ACCESS_TOKEN}`,
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     body: formData
        // })

        // console.log("response")
        // console.log(response)



    } catch (e) {
        console.error(e)
    }
}

const bumpVersion = (dependencies, { packageName, version }) => {
    if (!dependencies) return // TODO: throw error in validate()
    if (!dependencies[packageName]) return // TODO: throw error validate()

    console.log(`Current version of: ${packageName} is: ${dependencies[packageName]}`)

    // TODO: bump only when necessary: npm install compare-versions
    // https://www.npmjs.com/package/compare-versions

    const newDeps = { ...dependencies, [packageName]: version }

    return newDeps
}

run(process.argv.slice(2))
