export default class Info {

    getInfo(req, res) {

        res.render('info', {
            argumento: process.argv,
            plataforma: process.platform,
            version: process.version,
            memoria: process.memoryUsage(),
            path: process.execPath,
            proceso: process.pid,
            carpeta: process.cwd()
        })
    }
}
