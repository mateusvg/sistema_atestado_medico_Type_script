export const currency = (value: any) => {

    function getMoney(str: any) {
        return parseInt(str.replace(/[\D]+/g, ''));
    }
    function formatReal(int: any) {
        
        var tmp = int + '';

        if(tmp.length == 1) tmp = "00"+tmp
        if(tmp.length == 2) tmp = "0"+tmp

        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            if(tmp.indexOf(".") == 0) tmp = "00"+tmp
        return tmp;
    }
    let teste = getMoney(value)
    return formatReal(teste)

}

//https://wbruno.com.br/expressao-regular/formatar-em-moeda-reais-expressao-regular-em-javascript/