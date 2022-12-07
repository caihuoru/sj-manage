export default class ConfigUtil {   

    static readFile(filePath) {
        try{
            // 創建一個新的xhr對象
            let xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                // eslint-disable-next-line
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            const okStatus = document.location.protocol === "file" ? 0 : 200;
            xhr.open("GET", filePath, false);
            xhr.overrideMimeType("text/html;charset=utf-8");
            xhr.send(null);
            return xhr.status === okStatus ? xhr.responseText : null;
        }catch(err){
            console.log('read file error:',err)
            return null
        }   
    }
    /** 檢測版本 */
    static checkVersion (version) {
        if (ConfigUtil.CheckVersion === false)return
        try { 
            let filePath ='version.json'
            let config = JSON.parse(
            this.readFile(filePath + "?" + parseInt(Math.random()*1000000))
            );
            if (version != config.version){
                ConfigUtil.CheckVersion = false                
                return config.message
            }
        } catch(err) {
            console.log('read config err',err)
        }
        return ""
    }

}

ConfigUtil.config = {}
ConfigUtil.CheckVersion = true