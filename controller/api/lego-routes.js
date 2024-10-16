const router = require('express').Router();
const { Model } = require('sequelize');
const { User, Lego } = require('../../model');
const ImageKit = require("imagekit");
require('dotenv').config();

let imagekit;

if (process.env.IMGK_P_KEY) {
    imagekit = new ImageKit({
        publicKey: "public_8G/3nl0eC38UW68J/IGvQcCRi6I=",  // Updated public key
        privateKey: process.env.IMGK_P_KEY,  // Using the new private key stored in .env
        urlEndpoint: "https://ik.imagekit.io/bzladgycc/"   // Make sure the URL is correct, adjust if needed
    });
} else {
    imagekit = new ImageKit({
        publicKey: "public_8G/3nl0eC38UW68J/IGvQcCRi6I=",  // Updated public key
        privateKey: process.env.IMGK_P_KEY,  // Fallback in case it's not available in .env
        urlEndpoint: "https://ik.imagekit.io/bzladgycc/"
    });
}

router.post('/', async (req, res) => {
    try {
        imagekit.upload({
            file: req.body.lego_url,
            fileName: "test1.jpg"
        }, async function (error, result) {
            if (error) console.log(error);
            else {
                await Lego.create({
                    lego_url: result.url,
                    user_id: req.session.user_id
                });
            }
        });

        res.status(200).json("success");

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/saved', async (req, res) => {
    try {
        const legoData = await Lego.findByPk(req.session.user_id, {
            raw: true,
            attributes: ['lego_url'],
            include: [
                {
                    model: User, as: "user"
                }
            ]
        });

        res.json(legoData.lego_url);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
