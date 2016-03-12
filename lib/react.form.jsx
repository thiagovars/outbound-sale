ReactForm = {
    array2json: function(data) {
        var new_data = {}
        $(data).each(function (index, obj){
            new_data[obj.name] = obj.value;
        });
        return new_data;
    }
}