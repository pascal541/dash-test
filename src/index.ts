import {Dash} from 'dash-compiler'
import {isMatch} from 'bridge-common-utils'
import {NodeFileSystem} from './Dash/FileSystem'
import {FileTypeImpl, PackTypeImpl} from './Dash/Definitions'

compile().then()

async function compile() {
    const input = new NodeFileSystem('')
    const output = new NodeFileSystem('')
    let compiler = new Dash(input, output,
        {
            config: '',
            packType: <any>new PackTypeImpl(undefined),
            fileType: <any>new FileTypeImpl(undefined, isMatch),
            requestJsonData: (dataPath: string) =>
                fetch(
                    dataPath.replace(
                        'data/',
                        'https://raw.githubusercontent.com/bridge-core/editor-packages/main/'
                    )
                ).then((resp) => resp.json())
        })
    //await compiler.build()
}