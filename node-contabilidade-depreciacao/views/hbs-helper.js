
module.exports = {
    select: function (value, options) {
        return options.fn()
            .split('\n')
            .map(function (v) {
                var t = 'value="' + value + '"';
                return RegExp(t).test(v) ? v.replace(t, t + ' selected="selected"') : v;
            })
            .join('\n');
    },

    numberFormat: function (value, options) {
        // Helper parameters
        var dl = options.hash['decimalLength'] || 2;
        var ts = options.hash['thousandsSep'] || ',';
        var ds = options.hash['decimalSep'] || '.';

        // Parse to float
        var value = parseFloat(value);

        // The regex
        var re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';

        // Formats the number with the decimals
        var num = value.toFixed(Math.max(0, ~~dl));

        // Returns the formatted number
        return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts);
    },
    ifEquals: function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    ifNotEquals: function (arg1, arg2, options) {
        return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
    }
}
