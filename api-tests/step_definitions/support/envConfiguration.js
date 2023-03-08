process.env['NODE_CONFIG_DIR'] = __dirname + '/../../config/development' + require('path').delimiter +
                                 __dirname + '/../../config/production' + require('path').delimiter +
                                 __dirname + '/../../config/testing'

const config = require('config')

class envConfiguration {
    constructor(){
        this.host = this._getConfigValue('host')
        this.uri = this._getConfigValue('uri')
    }

    _getConfigValue(key){
        if(config.has(key)){
            return config.get(key)
        } else {
            console.warn('Environment config `'+ key + '` '+ 'doesn\'t exist')
        }
    }

    getHost(){
        return this.host
    }

    getUri(){
        return this.uri
    }
}

module.exports = envConfiguration