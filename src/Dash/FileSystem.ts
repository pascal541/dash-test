import {FileSystem} from 'dash-compiler'
import fs from 'fs'
import path from 'path'
import {File} from '@web-std/file'

export class NodeFileSystem extends FileSystem {
    constructor(protected baseDirectory: string = '') {
        super()
    }

    protected resolvePath(filePath: string) {
        // If filePath is absolute path or no baseDirectory is set, return filePath
        if (this.baseDirectory === '' || path.isAbsolute(filePath))
            return filePath

        return path.join(this.baseDirectory, filePath)
    }

    async readFile(filePath: string) {
        const fileData = fs.readFileSync(this.resolvePath(filePath))

        return new File([fileData], path.basename(filePath))
    }

    async writeFile(filePath: string, content: string | Uint8Array) {
        fs.mkdirSync(path.dirname(this.resolvePath(filePath)), {
            recursive: true
        })

        fs.writeFileSync(this.resolvePath(filePath), content)
    }

    async unlink(path: string) {
        fs.rmSync(this.resolvePath(path), {recursive: true})
    }

    async readdir(filePath: string) {
        const entries = []

        for await (const entry of fs.readdirSync(this.resolvePath(filePath))) {
            let entryPath = path.join(this.resolvePath(filePath), entry)

            entries.push(<const>{
                name: entry,
                kind: fs.lstatSync(entryPath).isDirectory() ? 'directory' : 'file',
            })
        }

        return entries
    }

    async mkdir(path: string): Promise<void> {
        fs.mkdirSync(this.resolvePath(path), {recursive: true})
    }

    async lastModified(filePath: string) {
        return (
            fs.statSync(this.resolvePath(filePath)).mtime?.getTime() ?? 0
        )
    }
}