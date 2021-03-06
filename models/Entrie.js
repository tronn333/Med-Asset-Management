const {Schema, model} = require('mongoose') //schema for bd of form
const entrySchema = new Schema({
    initiator:{
        type: Schema.Types.ObjectId,
        ref: 'users'
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
    price:String,
    subpodryad:String,
    subpodryadOrg:String,
    priceSubpodryad:String,
    numberOfServices:String,
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
