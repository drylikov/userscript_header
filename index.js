var fs = require('fs');

var getPackage = function(packagePath) {
    /* eslint-disable no-sync, lines-around-comment */
    return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    /* eslint-enable no-sync, lines-around-comment */
};

var UserscriptHeader = function() {};

UserscriptHeader.fromPackage = function(packagePath) {
    var header = new UserscriptHeader();
    header.setDataFromPackage(getPackage(packagePath));
    return header;
};

UserscriptHeader.prototype = {
    constructor: UserscriptHeader,
    _data: {},
    _sortedFields: ['name', 'author', 'version', 'description'],

    getData: function() {
        return this._data;
    },

    setData: function(data) {
        this._data = data;
    },

    toString: function() {
        var header = '// ==UserScript==\n';

        Object.keys(this.getData()).forEach(function(key) {
            var values = this.getData()[key];

            if (!(values instanceof Array)) {
                values = [values];
            }
            values.forEach(function(value) {
                header += '// @' + key + ' ' + value + '\n';
            });
        }.bind(this));

        header += '// ==/UserScript==\n';

        return header;
    },

    setDataFromPackage: function(pkg) {
        var data = {};
        pkg.userscript = pkg.userscript || {};

        // Default to package values for some fields.
        this._sortedFields.forEach(function(field) {
            var value = pkg.userscript[field] || pkg[field];
            if (value) {
                data[field] = value;
            }
        });

        Object.keys(pkg.userscript).forEach(function(key) {
            if (this._sortedFields.indexOf(key) === -1) {
                data[key] = pkg.userscript[key];
            }
        }.bind(this));

        this.setData(data);
    },
};

module.exports = UserscriptHeader;