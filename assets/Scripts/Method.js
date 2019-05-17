var Method = {
    getItemsFromArr: function (Arr, NeedItem = 1) {
        var temp_array = [];
        for (var t = 0; t < Arr.length; ++t) {
            temp_array.push(Arr[t]);
        }
        var return_array = [];
        for (var i = 0; i < NeedItem; ++i) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length > 0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                return_array.push(temp_array[arrIndex]);
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return return_array;
    },

    mixArrItems: function (arr) {
        var temp_array = [];
        for (var t = 0; t < arr.length; ++t) {
            temp_array.push(arr[t]);
        }

        if (temp_array.length > 0) {
            for (var i = 0, len = temp_array.length; i < len; ++i) {
                var rand = parseInt(Math.random() * len);
                var temp = temp_array[rand];
                temp_array[rand] = temp_array[i];
                temp_array[i] = temp;
            }
        }

        return temp_array;
    },

};

module.exports = Method;
