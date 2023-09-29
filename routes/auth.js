const express = require('express');
const {check, validationResult} = require('express-validator');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('login',{title:'Login Page'});
});

//fake database
const credential = {
    email:'jUkz@test.com',
    password: '12345678'
}

router.post('/login',

[
    check('email')
    .notEmpty()
    .withMessage('email is required.'),

    check('password')
    .notEmpty()
    .withMessage('password is required.')
    .isLength({min:8})
    .withMessage('password must be at least 8 characters.')
]


,(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        // res.send({ errors: errors.array() });
        res.render('login',{title:'Login Page', errors: 'Please check your input' });
    }else{
        if(email == credential.email && password == credential.password){
            //create a session
            req.session.user = req.body.email;
            res.redirect('/dashboard');
        }else{
            res.render('login',{title:'Login Page', isInvalid: 'Your credential does not exist' });
        }
    }
});

function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');

    if (password !== confirmPassword) {
        passwordError.textContent = "Passwords do not match.";
        return false;
    }

    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        return false;
    }

    // If validation passes, the form will be submitted
    return true;
}
router.get('/dashboard', (req, res)=>{
    if(req.session.user){
        res.render('dashboard',{title:'Dashboard', user:req.session.user});
    }else{
        res.sendStatus(403);
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.render('login', {title:'Login Page', logout:'Logout successfully!'});
        }
    });
   
});


module.exports = router;