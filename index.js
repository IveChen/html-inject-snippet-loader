var loaderUtils = require("loader-utils");

function inject(content, snippet, config) {
    return content.replace(config.reg, function (matchStr) {
        if (config.action == 'append') {
            return matchStr + snippet;
        } else if (config.action == 'prepend') {
            return snippet + matchStr;
        }
    });
}

module.exports = function (source) {
    var config = loaderUtils.getOptions(this);
    if (config.snippets && config.snippets instanceof Array) {
        config.snippets.forEach(function (item, key) {
            var newItem = Object.assign({}, {
                isOpenTag: true,
                global: false
            }, item);
            if (!newItem.action) {
                newItem.action = newItem.isOpenTag ? 'append' : 'prepend';
            }
            if (newItem.snippet) {
                var reg;
                if (newItem.isOpenTag) {
                    reg = new RegExp('<' + newItem.tag + '[^>]*>', newItem.global ? 'g' : '');
                } else {
                    reg = new RegExp('</' + newItem.tag + '>', newItem.global ? 'g' : '');
                }
                source = inject(source, newItem.snippet, {
                    reg: reg,
                    action: newItem.action
                });
            }
        });
    }
    return source;
};