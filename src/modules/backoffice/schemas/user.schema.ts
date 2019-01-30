import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
// }, { id: false }); // id é um virtual que retorna o valor do _id
// }, { _id: false }); // remnove o _id do schema
// }, { minimize: false }); // Por padrão o mongo minimiza os docs, não persistindo propriedades que não tem dados
// schema.set('validateBeforeSave', false); // Desabilita as validações do Mongoose
// }, { collation: { locale: 'en_US', strength: 1 } }); // altera o collation
// , { skipVersioning: { dontVersionMe: true } }); // Desabilita o versionamento
