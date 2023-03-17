import mongooseTypePhone from 'mongoose-type-phone'
import mongoose from 'mongoose';
import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";

class UsuariosDaoMongodb extends ContenedorMongodb{
    constructor(){
        super('usuarios', {
            name: {type: String, required: true},
            adress: {type: String, required: true},
            age: {type: Number, required: true},
            email: {type: String, required: true, index: { unique: true }},
           //photo: {type: String, required: true},
            password: {type: String, required: true },
            phone: {
                type: mongoose.SchemaTypes.Phone,
                required: true,
                allowBlank: false,
                allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE, mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE],
                phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL,
                defaultRegion: 'AR',
                parseOnGet: false
            }
        })
    }
}

export default UsuariosDaoMongodb