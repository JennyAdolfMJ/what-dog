'use strict';

const got = require('got');
const validUrl = require('valid-url').isUri;

function whatDog(imageUrl) {
    if (!validUrl(imageUrl)) {
        return Promise.reject(new Error('A valid url is required.'));
    }

    return got.post('https://www.what-dog.net/Home/Analyze', {
        query: {
            isTest: 'False',
            version: '001',
            faceUrl: imageUrl,
            faceName: imageUrl
        },
        json: true
    }).then(response => {
        try {
            const whatDog = JSON.parse(response.body);
            return {
                isDog: whatDog.IsDog,
                breed: whatDog.BreedName,
                about: whatDog.Keywords
            };
        } catch (err) {
            return {
                isDog: false,
                breed: 'Not a dog',
                about: ''
            };
        }
    }).catch(err => {
        throw new Error(err);
    });
}

function callback(imageUrl, cb) {
    whatDog(imageUrl)
        .then(doggyData => cb(null, doggyData))
        .catch(err => cb(err));
}

// callback support is provided for a training exercise
module.exports = (imageUrl, cb) => {
    if (typeof cb === 'function') {
        callback(imageUrl, cb);
    } else {
        return whatDog(imageUrl);
    }
};
