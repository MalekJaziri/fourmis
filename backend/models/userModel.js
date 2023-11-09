import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema ({
        pseudo:{
            type: String,
            required: [true, 'La valeur Pseudo est obligatoire'],
            unique: true,
            message: 'Pseudo exisantant, connectez-vous ou choisissez un autre Pseudo '
        },
        surname:{
            type: String,
            required: [true, 'La valeur Nom est obligatoire'],
        },
        name:{
            type: String,
            required: [true, 'La valeur Prenom est obligatoire'],
        },
        email: {
            type: String,
            required: [true, 'La valeur e-mail est obligatoire'],
            match:  /.+\@.+\..+/,
            unique: true,
            message: 'adresse mail exisantante, connectez-vous ou choisissez une autre adresse mail'
        },
        password: {
            type: String,
            match: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/,
            required: [true, 'Oui oui, il faut quand même mettre un mot de passe']
        },
        image: 
            {
                type: String,
            }
            ,
        
        isAdmin: {
            type: Boolean
            
        },
        fourmilliere: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Fourmilliere',
          
        }
        ]
    }, {
        timestamps: true,
        versionKey: false
    } 
);


userSchema.methods.createJWT = function () {
    return jwt.sign({
        id : this.id,
        email: this.email
    }, process.env.KEY_JWT, {expiresIn: '24h'})
}


userSchema.pre('save', async function(next){
    // cette methode permet de crypter le mdp (hacher) avant l'enregistrement 
    const salt = await bcrypt.genSalt(10) // Génération d'un "sel" pour le hachage.
    
    this.password = await bcrypt.hash(this.password, salt)
    next()
    
}) 

userSchema.post('save', function(error, doc, next) {
     if (error.name === 'MongoServerError' && error.code === 11000) {
        const message = `Le champ '${Object.keys(error.keyValue)[0]}' doit être unique.`;
        next(new Error(message));
    } else {
        next(error); 
    }
    // En résumé, ce middleware post('save') est utilisé pour détecter et gérer les erreurs de duplicata lors de la sauvegarde d'un document utilisateur dans la base de données, en renvoyant un message d'erreur personnalisé en cas de duplication d'une valeur unique.
})

userSchema.methods.comparePassword = function(loggerPassword, callback){
    // compare() => methode de bcrypt, compare le mdp fournis avec celui dans la base de donées (this.password)
    bcrypt.compare(loggerPassword, this.password, (err, isMatch) => {
        if (err) return callback(err); 
        callback(null, isMatch); 
    });
    
}; 



export default mongoose.model('User', userSchema);