import User from "../database/models/User.js"


export const updateUser = async(req, res, next) => {
    const {
        countryId,
        dateofbirth,
        email,
        id_number,
        lastnames,
        names,
        phone,
        picture,
    } = req.body

    const {id} = req.params

    try {
        User.update({
            countryId ,
            dateofbirth,
            email ,          
            id_number ,            
            lastnames,
            names ,
            phone ,
            picture      

        },{where:{id}})
        res.status(200).json({code:"success", message:"update is successfuly"})
    } catch (error) {
        res.status(500).json({code:"error", message:error})
    }
}