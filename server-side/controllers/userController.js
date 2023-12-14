
let userModel = require("../Models/userModel");
let fs = require("fs");

let addNewContact = async (req, res) => {

    let { mobile, saveAs } = req.body;
    try {

        let contactToBeSaved = await userModel.findOne({
            mobile:mobile
        })
        // User is associated with our application or not
        if (!contactToBeSaved) {
            return res.status(300).send({
                message:"This User doesn't have an account in this platform"
            })
        }

        // mobile number is same as the requester
        if (contactToBeSaved._id == req._id) {
            return res.status(300).send({
                message:"You can't save your own contact here"
            })
        }

        
        let User = await userModel.findOne({
            _id: req._id
        });
       // contact aleady saved or not
         let  IsContactAlreadySaved = User.savedContacts.find(c => c.mobile == mobile);

        if (IsContactAlreadySaved) {
            return res.status(300).send({
                message:"Contact already exist in your contact list"
            })
        }

        let temp = {
            id:contactToBeSaved._id,
            userImg: contactToBeSaved.profilePic,
            savedAs: saveAs,
        }

        User.savedContacts.push(temp);
        await User.save();

        res.status(200).send(User.savedContacts);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

let getAllContact = async (req, res) => {
    try {

        let user = await userModel.findOne({
            _id:req._id
        })

        if (!user) {
            return res.status(404).send({
                message:"User not found"
            })
        };

        if (user.savedContacts) {
            res.status(200).send(user.savedContacts);
        } else {
            res.status(404).send({message:"You don't have any saved contacts"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

let updateUser = async (req, res) => {
 try {
        let updatedUser = await userModel.findOneAndUpdate({
            _id: req._id
        }, req.body, { new: true });

        if (updatedUser) {
            res.status(200).send(updatedUser)
        } else {
            res.status(404).send({
                message: 'User not found'
            })
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

let uploadProfileImage = async (req, res) => {
    try {
        let url = `${process.env.BASE_URL}/${req.file.filename}`;
        
        let user = await userModel.findOne({
            _id: req._id
        });
         
        // if user has aleady another image,remove it from server storage
        if (user.profilePic) {
            let temp = user.profilePic.split(process.env.BASE_URL)[1];

            if (fs.existsSync(`public${temp}`)) {
                
                 fs.unlink(`public${temp}`, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err)
                }
            })
            }

           
        }

        // update profile image stored in users who saved my contact; 
        let updateImageToOthersContact = await userModel.find({
            "savedContacts.id": req._id
        });


        updateImageToOthersContact.map(async(user) => {
          let cont=user.savedContacts.find(contact => contact.id==req._id);
            cont.userImg = url;
            await user.save()
        })

        console.log(updateImageToOthersContact[0].savedContacts)
       
        user.profilePic = url;
        await user.save();

        res.status(200).send(user);   

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

let getUserById = async (req, res) => {
    try {
        let user = await userModel.findOne({
            _id:req.params.userId
        })
        
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        res.status(200).send(user)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


module.exports = {
    addNewContact,
    getAllContact,
    updateUser,
    uploadProfileImage,
    getUserById
}