const {Schema, model} = require('mongoose')
const entrySchema = new Schema({
    initiator:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    medcenter: String,
    

})