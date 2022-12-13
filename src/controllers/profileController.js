import Profile from "../database/models/Profile.js"
import Cv_data from "../database/models/cv_data.js"
import Category_cv from "../database/models/category_cv.js"
import User from "../database/models/User.js"
import DoctorInfo from "../database/models/DoctorInfo.js"


export const getProfiles = async (req, res, next) => {
  try {
    const result = await Profile.findAll()
    res.status(200).json({ code: "success", data: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ code: "error", data: [] })
  }
}

export const uploadImage = (req, res, next) => {
  try {
    const url = req.protocol + '://' + req.get('host')
    res.status(200).json({code:'success',url:`https://mediapp.up.railway.app/static/images/${req.file.filename}`})
  } catch (error) {
    console.log('error', error);
  }
}

export const saveDoctorProfile = async(req, res) => {
  try {
    const {bio, cv_data,specialties,health_code, urlImage } = req.body;
    const user = await  User.findOne({
      where: { id: req.userid },
      include: [
        {
          model: DoctorInfo,
          as: "isDoctor",
        },
      ],
    })

    await User.update({
      picture:`/public/${urlImage.file.filename}`
    },{where:{id:user.id}})
 
    const result =  await new Promise(async(resolve, reject) => {
      let fieldsData = []
      cv_data.forEach(item => {
        Cv_data.findOne({
          where:{id:item.id}
        }).then(async result => {   
          if(result !== null){
            const updated = await Cv_data.update({
              name:item.name,
              placeHolder:item.placeHolder,
              controlType:item.controlType,
              value:item.value,
            },
            {where:{id:result.id}})  
            console.log('al actualizar',updated);

            if(updated){
              console.log('se actualizo');
              Cv_data.findAll({
                where:{doctorDataId:user.isDoctor.id},
                include:[{
                  model:Category_cv
                }] 
              }).then(result => {
                console.log(result);
                fieldsData.push(result)
              }).catch(error => console.log(error));   
            }
          }else{
            const categorycv = await Category_cv.findOne({where:{name:item.category_cv.name}});
            const create = await Cv_data.create({
              name:item.name,
              placeHolder:item.placeHolder,
              controlType:item.controlType,
              value:item.value,
              categoryCVId:categorycv.id,
              doctorDataId:user.isDoctor.id
            })  
            console.log('al crear',create);
            if(create){
              console.log('se creo');
              Cv_data.findAll({
                where:{doctorDataId:user.isDoctor.id},
                include:[{
                  model:Category_cv
                }] 
              }).then(result => {
                console.log(result);
                fieldsData.push(result)
              }).catch(error => console.log(error));   
            }
          }
        }).catch(error => console.log(error))
      }) 
      resolve(fieldsData)                
    })

    if(user?.isDoctor){
      await DoctorInfo.update(
        {
          health_code,
          specialty_id:specialties,
          bio
        },
        {
          where:{id:user.isDoctor.id}
        })
    }
    
    res.status(200).json({code:'success', fields:result, message:'procesed correctly'})
  } catch (error) {
    res.status(500).json({code:'error', message:error})
  }
}
