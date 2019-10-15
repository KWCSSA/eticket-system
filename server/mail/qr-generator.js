
const dotenv = require('dotenv');
dotenv.config();
const qr = require('qr-image');
 
module.exports = {
    generateQR: function(data){
        console.log("generate QR")
        var qr_svg = qr.image('I love QR!', { type: 'png' });
        qr_svg.pipe(require('fs').createWriteStream(`./mail/QR_${data.email}.png`));
        var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
    }
}

