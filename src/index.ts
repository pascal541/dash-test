import {Dash, initRuntimes} from 'dash-compiler'
import {isMatch} from 'bridge-common-utils'
import {NodeFileSystem} from './Dash/FileSystem'
import {FileTypeImpl, PackTypeImpl} from './Dash/Definitions'
import axios from 'axios'
import path from 'path'

build().then()

async function createDashService() {
    const input = new NodeFileSystem(path.join(__dirname, '..', 'test_project'))
    const output = new NodeFileSystem(path.join(__dirname, '..', 'test_project'))
    const dash = new Dash(input, output,
        {
            config: path.join(__dirname, '..', 'test_project', 'config.json'),
            mode: 'production',
            packType: <any>new PackTypeImpl(undefined),
            fileType: <any>new FileTypeImpl(undefined, isMatch),
            requestJsonData: (dataPath: string) =>
                axios.get(
                    dataPath.replace(
                        'data/',
                        'https://raw.githubusercontent.com/bridge-core/editor-packages/main/'
                    )
                ).then(resp => resp.data)
        })
    await dash.setup()
    return dash
}

async function build() {
    initRuntimes()
    const dash = await createDashService()
    await dash.build()
}