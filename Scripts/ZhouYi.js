$(function () {
    var gua_list = new Array();
    gua_list["g111111"] = "乾为天";//1.乾为天
    gua_list["g000000"] = "坤为地";//2.坤为地
    gua_list["g100010"] = "水雷屯";//3.水雷屯
    gua_list["g010001"] = "山水蒙";//4.山水蒙
    gua_list["g111010"] = "水天需";//5.水天需
    gua_list["g010111"] = "天水讼";//6.天水讼
    gua_list["g010000"] = "地水师";//7.地水师
    gua_list["g000010"] = "水地比";//8.水地比
    gua_list["g111011"] = "风天小畜";//9.风天小畜



    $(".divination").click(function () {
        $('.oldSymbols').empty();
        $('.newSymbols').empty();

        var oldSymbolsCode = "";
        var newSymbolsCode = "";
        var bianYao = 0;


        var oldSymbolsHtml = "";
        var newSymbolsHtml = "";
        for (var i = 0; i < 6; i++) {
            var yao = getYao();
            oldSymbolsCode = oldSymbolsCode + yao % 2;

            if (yao == 6 || yao == 9) {
                bianYao++;
            }

            if (yao == 6 || yao == 7) {
                newSymbolsCode = newSymbolsCode + "1";
            } else {
                newSymbolsCode = newSymbolsCode + "0";
            }

            oldSymbolsHtml = getOldYaoHtml(yao, oldSymbolsHtml);
            newSymbolsHtml = getNewYaoHtml(yao, newSymbolsHtml);

        }

        console.log(oldSymbolsCode);
        console.log(newSymbolsCode);

        oldSymbolsHtml = "<h3>本卦:" + getGuaName("g" + oldSymbolsCode) + "</h3>" + oldSymbolsHtml
        newSymbolsHtml = "<h3>变卦:" + getGuaName("g" + newSymbolsHtml) + "</h3>" + newSymbolsHtml



        $('.oldSymbols').append(oldSymbolsHtml);
        $('.newSymbols').append(newSymbolsHtml);
        readHelpHtml(bianYao);
    });

    function getNewYaoHtml(yao, oldstr) {
        var newStr = "";
        var col = "black";
        newStr += '<div class="row">';
        newStr += '<div class="col-xs-2" ></div>';
        if (yao == 7 || yao == 6) {
            newStr += '<div class="col-xs-8" style="background-color:' + col + ';">&nbsp;</div>';
        }
        else {
            newStr += '<div class="col-xs-3" style="background-color:' + col + ';">&nbsp;</div>';
            newStr += '<div class="col-xs-2" ></div>';
            newStr += '<div class="col-xs-3" style="background-color:' + col + ';">&nbsp;</div>';
        }
        newStr += '<div class="col-xs-2" ></div>';
        newStr += '</div>';
        newStr += '<div class="row">';
        newStr += '<div class="col-xs-12" style="height:0.5em">&nbsp;</div>';
        newStr += '</div>';

        oldstr = newStr + oldstr;
        return oldstr;
    }

    function getOldYaoHtml(yao, oldstr) {
        var newStr = "";
        var col = "black";
        if (yao == 6 || yao == 9) {
            col = "red";
        }
        newStr += '<div class="row">';
        newStr += '<div class="col-xs-2" ></div>';
        if (yao == 7 || yao == 9) {
            newStr += '<div class="col-xs-8" style="background-color:' + col + ';">&nbsp;</div>';
        }
        else {
            newStr += '<div class="col-xs-3" style="background-color:' + col + ';">&nbsp;</div>';
            newStr += '<div class="col-xs-2" ></div>';
            newStr += '<div class="col-xs-3" style="background-color:' + col + ';">&nbsp;</div>';
        }
        newStr += '<div class="col-xs-2" ></div>';
        newStr += '</div>';
        newStr += '<div class="row">';
        newStr += '<div class="col-xs-12" style="height:0.5em">&nbsp;</div>';
        newStr += '</div>';

        oldstr = newStr + oldstr;
        return oldstr;
    }

    function readHelpHtml(bianyaoNum) {
        var content = "";
        $('.readHelp').empty();
        switch (bianyaoNum) {
            case 0:
                content = "六爻一个都没变，这时用本卦的卦辞来判断吉凶";
                break;
            case 1:
                content = "六爻中只有一个爻是变爻，这个时候就用本卦变爻的爻辞来判断";
                break;
            case 2:
                content = "如果卦里有两个爻发生变动，那就用本卦里这两个变爻的占辞来判断吉凶，并以位置靠上的哪一个变爻的占辞为主";
                break;
            case 3:
                content = "有三个变爻，就不能用变爻的爻辞来判断了，得用本卦和变卦的卦辞，以本卦的卦辞为主";
                break;
            case 4:
                content = "有四个变爻，这时就用变卦的两个不变爻的爻辞来判断吉凶";
                break;
            case 5:
                content = "有五个变爻，用变卦的那一个不变爻的爻辞来判断吉凶";
                break;
            case 6:
                content = "有六个变爻，这得分两种情况：一是六爻都是阳爻（构成了乾卦），或者六爻都是阴爻（构成了坤卦），那么，如果是乾卦，就用乾卦的“用九”的爻辞判断吉凶，如果是坤卦，就用坤卦的“用六”的爻辞判断吉凶。二是除了这两种情况之外的其他六爻全变的情况，就用变卦的卦辞来判断吉凶";
                break;
        }
        $('.readHelp').append('<p>' + content + '</p>');
    }

    function getYao() {
        var num = 49;//总数
        var result = getResult(num);//5,9

        num = num - result;
        var result2 = getResult(num);//4,8

        num = num - result2;
        var result3 = getResult(num);

        var res = (num - result3) / 4;//结果，正确结果24,28,32,36
        console.log(res);
        return res;

    }

    function getResult(num) {
        var result = 1;
        num = num - result;

        var randomNum = Math.random() * (num - 1);
        var tian = Math.ceil(randomNum)
        var di = num - tian;

        var tianModule = getMod(tian, 4);
        var diModule = getMod(di, 4);

        result = result + tianModule + diModule;
        return result;
    }

    //取模，为0时返回模数
    function getMod(num, module) {
        var res = num % module;
        return res == 0 ? 4 : res;

    }

    function getGuaName(GuaCode) {
        return gua_list[GuaCode];
    }

});