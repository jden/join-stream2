var through = require('through2');

module.exports = function (sep, opts) {
    if (typeof sep === 'object') {
        opts = sep;
        sep = opts.sep;
    }
    if (!opts) opts = {};
    
    var num = 0;
    var tr = through(function (buf, encoding, callback) {
        if (opts.end) {
            this.push(buf);
            this.push(sep);
        }
        else {
            if (num > 0) {
                this.push(sep);
            }
            this.push(buf);
        }
        num ++;
        callback()
    });
    
    return tr;
};
