class Flash { 
    constructor(req){
        this.req = req
        this.success = this.extractFlashmessage('success')
        this.fail = this.extractFlashmessage('fail')
    }

    extractFlashmessage(name){
        let message = this.req.flash(name)
        return message.length > 0 ? message[0] : false
    }

    // hasMessage(){
    //     return !this.success && !this.fail ? false : true
    // }   hasMessage : flash.hasMessage()

    static getMessage(req){
        let flash = new Flash(req)
        return {
            success : flash.success,
            fail : flash.fail
        }
    }
}


module.exports = Flash
