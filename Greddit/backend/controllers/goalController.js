

const asyncHandler = require('express-async-handler');
const Mysg = require('../modules/Mysg');
const User = require('../modules/User');
const Post = require('../modules/Post');
const dotenv = require('dotenv').config();
const { application } = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
// var ObjectId = require('mongodb').ObjectID;
const { ObjectId } = require('mongodb');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
client = new MongoClient('mongodb+srv://mahika11:mahika11@dass.20n8stt.mongodb.net/dassapp?retryWrites=true&w=majority', options)

var db = mongoose.connection;

const collection = client.db('dassapp').collection('mysgs');
const collection2 = client.db('dassapp').collection('posts');
const collection3 = client.db('dassapp').collection('users');

// console.log(collection)


const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' })
})

const register = asyncHandler(async (req, res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var user_name = req.body.user_name;
    var email = req.body.email;
    var age = req.body.age;
    var phone = req.body.phone;
    var pass = req.body.pass;

    const user = new User({ first_name, last_name, user_name, email, age, phone, pass });
    await user.save();

    res.status(200).json({ message: `Update goal ${req.params.id}` })

})

const login = asyncHandler(async (req, res) => {
    const { user_name, pass } = req.body;
    const user = await User.findOne({ user_name });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('username found')
    const isPasswordMatch = await bcrypt.compare(pass, user.pass);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('password matched')

    const token = jwt.sign({ id: user._id, user_name: user.user_name }, process.env.JWT_SECRET, { expiresIn: '365d' });

    res.status(200).json({ token })
})

const mysg = asyncHandler(async (req, res) => {
    var name = req.body.name;
    var desc = req.body.desc;
    var tag = req.body.tag;
    var bankey = req.body.bankey;
    var author = req.user.user_name;
    var joinedby = req.user.user_name;
    const mysg = new Mysg({ name, desc, tag, bankey, author, joinedby });
    await mysg.save();
    res.status(200).json({ message: `Update goal ${req.params.id}` })

})

const sendpost = asyncHandler(async (req, res) => {
    var text = req.body.text;
    var postedin = req.body.postedin;
    var author = req.user.user_name;
    var postedby = author;
    const post = new Post({ text, postedby, postedin });
    await post.save();
    res.status(200).json({ message: `Update goal ${req.params.id}` })

})




const data = asyncHandler(async (req, res) => {
    const author = req.user.user_name;

    try {
        const data = await collection.find({ author: author }).toArray();
        // console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

const profile = asyncHandler(async (req, res) => {
    const author = req.user.user_name;
    try {
        const data = await collection3.find({ user_name: author }).toArray();

        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
const showsub_desc = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    try {
        const data = await collection.find({ _id: objectId }).toArray();
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})
const showsg = asyncHandler(async (req, res) => {
    try {
        const data = await collection.find().toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

const showpost = asyncHandler(async (req, res) => {
    try {
        // console.log("ma");
        const id = req.params.id;
        const data = await collection2.find({ postedin: id }).toArray();
        // console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

const showsaved = asyncHandler(async (req, res) => {
    try {
        console.log("ma");
        const author = req.user.user_name
        console.log(author);
        const data = await collection3.find({ user_name: author }).toArray();
        console.log(data);
        // const objectId = new ObjectId(data[0].savedpost[0]);
        const postIds = data.map(doc => doc.savedpost).flat();

        // console.log(objectId);
        // const post = await collection2.find({_id:objectId}).toArray();
        const post = await collection2.find({ _id: { $in: postIds.map(id => new ObjectId(id)) } }).toArray();

        console.log(post);
        res.send(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

const showjoined = asyncHandler(async (req, res) => {
    const author = req.user.user_name;
    console.log("show joined")
    try {
        const data = await collection.find({ joinedby: author }).toArray();

        // console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})


const joinreq = asyncHandler(async (req, res) => {
    const author = req.user.user_name;
    const id = req.params.id;
    const objectId = new ObjectId(id);
    console.log("show joining")
    try {
        const data = await collection.find({ _id: objectId }).toArray();
        console.log(data[0].joinreq);

        if (data[0].joinreq.length !== 0) {
            console.log("not empty");
            res.send(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})



const joinsg = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const objectId = new ObjectId(id);
    console.log("bbuixbsaxa");
    const data = await collection.find({ _id: objectId }).toArray();

    const joinauth = req.body.name;

    console.log(joinauth);
    collection.updateOne({ _id: objectId }, { $push: { joinedby: `${joinauth}` }, $pull: { joinreq: `${joinauth}` } }, (err, result) => {


        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.updatedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("added");
        return res.status(200).json({ message: 'joined added' });
    }
    )
})

const upvote = asyncHandler(async (req, res) => {

    const id = req.body.id;
    console.log("in upvote function");
    const objectId = new ObjectId(id);
    const data = await collection2.findOne({ _id: objectId });
    const author = req.user.user_name;
    if (data.upvotedby.some(user => user === author)) {
        return res.status(400).json({ message: 'User has already upvoted this post' });
    }
    collection2.updateOne(
        { _id: objectId },
        { $push: { upvotedby: author } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("upvoted");
            return res.status(200).json({ message: 'upvote added' });
        }
    )
})
const addsave = asyncHandler(async (req, res) => {

    const id = req.body.id;
    console.log("in save function");
    const author = req.user.user_name;
    console.log(author);
    const data = await collection3.findOne({ user_name: author });

    if (data.savedpost.some(user => user === id)) {
        return res.status(400).json({ message: 'post already saved' });
    }
    // const objectId = new ObjectId(data._id);
    collection3.updateOne(
        { _id: data._id },
        { $push: { savedpost: id } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("saved");
            return res.status(200).json({ message: 'save post added' });
        }
    );
})
const editprofile = asyncHandler(async (req, res) => {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const phone = req.body.phone;
    console.log("in edit profile function");
    const author = req.user.user_name;
    console.log(author);
    const data = await collection3.findOne({ user_name: author });


    collection3.updateOne(
        { _id: data._id },
        {
            $set: {
                first_name: first_name,
                last_name: last_name,
                age: age,
                phone: phone
            }
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("edited");
            return res.status(200).json({ message: 'profile edited' });
        }
    );
})
const removesave = asyncHandler(async (req, res) => {
    const id = req.body.id;
    console.log("in remove save function");
    const author = req.user.user_name;
    console.log(author);
    const data = await collection3.findOne({ user_name: author });
    // const objectId = new ObjectId(data._id);
    collection3.updateOne(
        { _id: data._id },
        { $pull: { savedpost: id } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("save removed");
            return res.status(200).json({ message: 'save post removed' });
        }
    );

})

const removefollow = asyncHandler(async (req, res) => {
    const name = req.body.name;
    console.log("in remove follower function");
    const author = req.user.user_name;
    console.log(author);
    const data = await collection3.findOne({ user_name: author });
    collection3.updateOne(
        { _id: data._id },
        { $pull: { followers: name } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("follow removed");
            return res.status(200).json({ message: 'follower removed' });
        }
    );

})
const unfollow = asyncHandler(async (req, res) => {
    const name = req.body.name;
    console.log("in remove following function");
    const author = req.user.user_name;
    console.log(author);
    const data = await collection3.findOne({ user_name: name });
    collection3.updateOne(
        { _id: data._id },
        { $pull: { following: author } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("following removed");
            return res.status(200).json({ message: 'unfollowed done' });
        }
    );

})
const addcomment = asyncHandler(async (req, res) => {

    const id = req.body.id;
    const comment = req.body.comment;
    console.log("in comment function");
    const objectId = new ObjectId(id);

    collection2.updateOne(
        { _id: objectId },
        { $push: { comment: comment } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("upvoted");
            return res.status(200).json({ message: 'upvote added' });
        }
    );
})


const downvote = asyncHandler(async (req, res) => {

    const id = req.body.id;
    console.log("in downvote function");
    const objectId = new ObjectId(id);
    const data = await collection2.findOne({ _id: objectId });
    const author = req.user.user_name;
    if (data.downvotedby.some(user => user === author)) {
        return res.status(400).json({ message: 'User has already upvoted this post' });
    }
    collection2.updateOne(
        { _id: objectId },
        { $push: { downvotedby: author } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: 'Document not found' });
            }
            console.log("downvoted");
            return res.status(200).json({ message: 'downvote added' });
        }
    );
})



const addfollow = asyncHandler(async (req, res) => {
    const id = req.body.id;
    console.log("in follow function");
    const objectId = new ObjectId(id);
    const data = await collection2.findOne({ _id: objectId });
    const usertofollow = await collection3.findOne({ user_name: data.postedby });
    console.log(usertofollow.user_name);
    const author = req.user.user_name;
    console.log(author);
    if (usertofollow.followers.some((usertofollow) => usertofollow === author)) {
        return res.status(400).json({ message: "User is already following" });
    }
    if (usertofollow.user_name === author) {
        return res.status(400).status({ message: "cant follow himself" });
    }
    collection3.updateOne(
        { _id: usertofollow._id },
        { $push: { followers: author } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: "Document not found" });
            }
            console.log("follower added");
        }
    );
});


const addfollowing = asyncHandler(async (req, res) => {
    const id = req.body.id;
    console.log("in following function");
    const objectId = new ObjectId(id);
    const data = await collection2.findOne({ _id: objectId });  // data = post
    // const user = await collection3.findOne({ user_name: data.postedby });
    const author = req.user.user_name;
    const user_author = await collection3.findOne({ user_name: author });
    if (user_author.user_name === data.postedby) {
        return res.status(400).status({ message: "cant follow himself" });
    }
    collection3.updateOne(
        { _id: user_author._id },
        { $push: { following: data.postedby } },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (result.modifiedCount === 0) {
                console.log("doc not found");
                return res.status(404).json({ message: "Document not found" });
            }
            console.log("following added");
            return res.status(200).json({ message: "following added" });
        }
    );


});


const joinreject = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const objectId = new ObjectId(id);
    console.log("rejectaxa");
    const data = await collection.find({ _id: objectId }).toArray();

    const joinauth = req.body.name;

    console.log(joinauth);
    collection.updateOne({ _id: objectId }, { $pull: { joinreq: `${joinauth}` } }, (err, result) => {


        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.updatedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("removed");
        return res.status(200).json({ message: 'joining request removed' });
    }
    )
})

const leave = asyncHandler(async (req, res) => {
    console.log("in leave");
    const author = req.user.user_name;
    const id = req.params.id;
    const objectId = new ObjectId(id);
    console.log("leaveaxa");
    const data = await collection.find({ _id: objectId }).toArray();
    collection.updateOne({ _id: objectId }, { $pull: { joinedby: `${author}` } }, (err, result) => {


        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.updatedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("removed");
        return res.status(200).json({ message: 'joining request removed' });
    }
    )
})


const deletemysg = asyncHandler(async (req, res) => {
    const author = req.user.user_name;
    const id = req.params.id;
    // console.log(id);
    // console.log(author);
    const objectId = new ObjectId(id);
    collection.deleteMany({ _id: objectId }, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.deletedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("deleted");
    })
})


const deletepost = asyncHandler(async (req, res) => {
    const author = req.user.user_name;
    const id = req.params.id;
    console.log(id);
    console.log("delete post");
    // console.log(author)

    // Nest the second delete operation within the first delete operation's callback function
    collection2.deleteMany({ postedin: id }, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.deletedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("deleted");
        return res.status(200).json({ message: 'Document deleted' });
    })


})



const nopost = asyncHandler(async (req, res) => {
    try {
        console.log("ma");
        const id = req.params.id;
        console.log(id);

        const data = await collection2.find({ postedin: id }).toArray();
        console.log(data.length);

        // console.log(objectId);
        // const post = await collection2.find({_id:objectId}).toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

const deleteuserpost = asyncHandler(async (req, res) => {

    const id = req.params.id;
    console.log(id);  //mysub id
    const objectId = new ObjectId(id);
    const post = await collection2.findOne({ postedin: id });

    console.log("delete post");
    // console.log(author)
    console.log(post);
    const savedpostid = post._id.toString();

    console.log(savedpostid);
    const usersave = await collection3.findOne({ savedpost: savedpostid });
    console.log(usersave);
    // Nest the second delete operation within the first delete operation's callback function
    collection3.updateOne({ _id: usersave._id }, { $pull: { savedpost: savedpostid } }, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (result.deletedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("deleted");
        return res.status(200).json({ message: 'Document deleted' });
    })


})




const joiningsg = asyncHandler(async (req, res) => {
    const author = req.user.user_name;
    const id = req.params.id;
    const objectId = new ObjectId(id);
    console.log(objectId)
    console.log(author)
    collection.updateOne({ _id: objectId }, { $push: { joinreq: `${author}` } }, (err, result) => {
        console.log("updateOne function executed");

        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.updatedCount === 0) {
            console.log("doc not found");
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log("addedd");
        return res.status(200).json({ message: 'joined added' });
    }
    )
})



module.exports = {
    getGoals, register, login, editprofile, nopost, removefollow, unfollow, data, deletepost, addfollowing, deleteuserpost, showsaved, removesave, mysg, profile, addcomment, addsave, upvote, addfollow, downvote, deletemysg, showpost, sendpost, showsg, joinsg, showjoined, joiningsg, joinreq, joinreject, leave, showsub_desc
}