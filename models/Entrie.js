const {Schema, model} = require('mongoose')
const entrySchema = new Schema({
    initiator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    medcenter: String,
    division: String,
    specialisation: String,
    anestasia: String,
    anestasiaType:{
        type: String,
        default: 'net'
    },
    serviceCode:String,
    serviceNameRus:String,
    serviceNameEng:String,
    price:Number,
    subpodryad:Boolean,
    subpodryadOrg:String,
    priceSubpodryad:Number,
    numberOfServices:Number,
    serviceAnalog:String,
    comment:String,
    dateOfStart: Date,
    laborCost: Object,
    premises:Object,
    equipment:Object,
    materials:Object,
    status:String,
    currentdepartment:String
})
const entry = model('entries', entrySchema)
module.exports = entry
