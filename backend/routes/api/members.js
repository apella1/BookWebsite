const express = require('express');
const router = express.Router();
const members = require('../../Members');

// getting a single member 
router.get('/:id', (req, res) => { 
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) { 
        res.json(members.filter( member => member.id === parseInt(req.params.id)))
    }else { 
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

// the route gets all members 
router.get('/', (req, res) => { 
    res.json(members);
})

// creating a member - post 
router.post('/', (req, res) => {
    const newMember =  {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email, 
        status: 'active'
    }

    if(!newMember.name || !newMember.email) { 
        return res.status(400).json({ msg: 'Please include a name and an email address.'})
    }

    members.push(newMember);
    res.json(members);
})


// update member - put
router.put('/:id', (req, res) => { 
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updateMember = req.body; 
        members.forEach(member => { 
            if (member.id === parseInt(req.params.id)) { 
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email; 

                res.json({ msg: 'Member updated', member})
            } 
        })
    }else {
        res.status(400).json({msg: `No member found with id ${req.params.id}`})
    }
});

// delete member - delete
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({msg: 'Member successfully deleted.', members: members.filter(member => member.id !== parseInt(req.params.id))})
    }else { 
        res.status(400).json(`No member with id ${req.params.id}`)
    }
});

module.exports = router;
