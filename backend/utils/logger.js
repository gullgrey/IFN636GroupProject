//Define Logger class
class Logger {
    static instance = null;
    constructor(){
        if(Logger.instance){
            return Logger.instance;
        }
        //Initialize the logger
        this.logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toUpperCase() : 'INFO';
        console.log(`Logger: Initialized with log level: ${this.logLevel}`);

        //Save the instance
        Logger.instance = this;
    }

    checkLogLevel(level){
        const levels = ['INFO', 'WARN', 'ERROR'];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    log(level, message, data = null){
        const upperLevel = level.toUpperCase();
        if(this.checkLogLevel(upperLevel)){
            const timestamp = new Date().toISOString();
            let logMessage = `[${timestamp}] [${upperLevel}] ${message}`;
            if(data !== null && data !== undefined){
                try{
                    logMessage += ` Data: ${JSON.stringify(data, null, 2)}`;
                }catch(err){
                    logMessage += ` Data: (Could not stringify data: ${err.message})`;
                }
            }

            if(upperLevel === 'ERROR'){
                console.error(logMessage);
            }else if(upperLevel === 'WARN'){
                console.warn(logMessage);
            }else{
                console.log(logMessage);
            }
        }
    }

    info(message, data){
        this.log('INFO', message, data);
    }
    warn(message, data){
        this.log('WARN', message, data);
    }
    error(message, data){
        this.log('ERROR', message, data);
    }

}

//create singleton Instance
const logger = new Logger();

module.exports = logger;
