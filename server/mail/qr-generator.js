
const dotenv = require('dotenv');
dotenv.config();
const qr = require('qr-image');
 
module.exports = {
    generateQR: function(data){
        console.log("generate QR")
        // var qr_svg = qr.image(`name: ${data.name}\n email: ${data.email}\n phone: ${data.phone}\n ticketKind: ${data.ticketKind}`, { type: 'png' });
        // qr_svg.pipe(require('fs').createWriteStream(`./mail/QR_${data.email}.png`));
        var svg_string = qr.imageSync(`name: ${data.name}\n email: ${data.email}\n phone: ${data.phone}\n ticketKind: ${data.ticketKind}`, { type: 'svg' });
        return svg_string;
    }
}

