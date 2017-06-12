### 安装使用
```shell
    npm install html-inject-snippet-loader --save-dev
```

```
{
    test:'html',
    use:[{
        'loader':'html-inject-snippet-loader',
        options:{
            snippets:[
                { // match tag name
                    tag:tagName, //required 要匹配的标签名
                    isOpenTag:true, //optional, true for openTag or false for closeTag. default openTag
                    global: false, //optional, true for all and false for the first match. default: just first tag
                    /**
                    * matchTagContent and snippet
                    * action = 'append'   matchTagContent + snippet
                    * action = 'prepend'  snippent + matchTagContent
                    * default ''
                    * if action not set,
                    * when isOpenTag is true, default value is 'append'
                    * when isOpenTag is false, default Value is 'prepend'
                    **/
                    action:'', //optional. 
                    snippet:'',//required the inject snippet code
                },
                //*for example
                // source code '<head>test</head>
                
                //result: <head>headInjecttest</head>
                {
                    tag:'head',
                    snippet:'headInject'
                },
                
                //result: <head>testheadInject</head>
                {
                    tag:'head',
                    isOpenTag:false
                    snippet:'headInject
                },
                //result:headInject<head>test</test>
                {   
                    tag:'head',
                    snippet:'headInject',
                    action:'prepend'
                }，
                //result:<head>test</test>headInject
                {
                    tag:'head',
                    isOpenTag:false
                    snippet:'headInject',
                    action:'append'
                }
            ]    
        }
    }]
}
```