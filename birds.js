const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');
const { required } = require('joi');

const router = express.Router();
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const BirdSchema = mongoose.Schema(
    {
        id: Number,
        type: String,
        color: String,
        price: Number
    }
);

const JoiSchema = joi.object(
    {
        id: joi.number(),
        type: joi.string()
            .required(),
        color: joi.string()
            .required(),
        price: joi.number()
            .required(),
    }
);

const Bird = mongoose.model('Bird', BirdSchema);

router.get('/', (req, res) => {
    res.send("Welcome to birds section !");
}
);

router.get('/get', (req, res) => {
    Bird.find()
        .exec()
        .then(result => {
            res.json(result);
        }
        )
        .catch(err => {
            res.send("An error ocurred !");
        }
        );
}
);

router.get('/get/:id', (req, res) => {
    Bird.findOne({ id: req.params.id })
        .exec()
        .then(result => {
            res.send(result);
        }
        )
        .catch(err => {
            res.send("An error ocurred!");
        }
        );
}
);

router.post('/add', (req, res) => {
    const result = JoiSchema.validate(req.body);
    if (result.error)
        res.send("your entries are invalid!");
    else {
        const newBird = new Bird(
            {
                id: req.body.id,
                type: req.body.type,
                color: req.body.color,
                price: req.body.price
            }
        );

        newBird
            .save()
            .then(result => {
                res.send("Your entries have been saved successfully!");
                res.json(result);
            }
            )
            .catch(err => {
                res.send("An error occurred!");
            }
            );
    }
}
);

router.put('/updatePrice/:id', (req, res) => {

    Bird.update({ id: req.params.id }, { price: req.body.price })
        .exec()
        .then(result => {
            res.send("Your entries have been saved successfully!");
            res.json(result);
        }
        )
        .catch(err => {
            res.send("An error occurred!");
        }
        );

}
);

router.delete('/delete/:id', (req, res) => {
    Bird.remove({ id: req.params.id })
        .exec()
        .then(result => {
            res.send("Removed successfully!");
        }
        )
        .catch(err => {
            res.send("An error occurred!");
        }
        );
}
);

module.exports = router;