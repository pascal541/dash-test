import {PackType, FileType} from 'mc-project-core'
import axios from 'axios'

export class PackTypeImpl extends PackType<void> {
    async setup() {
        this.packTypes = await axios.get(
            'https://raw.githubusercontent.com/bridge-core/editor-packages/main/packages/minecraftBedrock/packDefinitions.json'
        ).then(resp => resp.data)
    }
}
export class FileTypeImpl extends FileType<void> {
    async setup() {
        this.fileTypes = await axios.get(
            'https://raw.githubusercontent.com/bridge-core/editor-packages/main/dist/minecraftBedrock/fileDefinitions.json'
        ).then(resp => resp.data)
    }
}