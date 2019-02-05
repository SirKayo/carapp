
$(document).ready(function(){
    $("#add").on('click',function(){
        $("#submitForm").trigger('reset')
        col=$(".pointer").attr("data-id")
        if(col!="0"){
            $("#"+col).toggle();
            $(".pointer").attr("data-id",0)
        }else{
            $("#formRow").toggle();
        }
        $('#formRow').prependTo('#table')
        $("#submit").data({'store': "create"});
    });
    $("#table").on('click','.edit',function(){
        page = $(".pointer").attr("page");
        $("#formRow > td").find("input[type=text], textarea").val("");
        $("#formRow > td").find("input[type=date], textarea").val("");
        id = $(this).data('id');
        var col=$(".pointer").attr("data-id")
        if(col!="0"){
            $("#"+col).toggle();
            $(".pointer").attr("data-id",0)
        }else{
            if($("#formRow").is(':hidden')){
                $("#formRow").toggle();
            }
        }
        $(".pointer").attr("data-id",id)
        $("#"+id).toggle();
        io.socket.get('/'+$(".pointer").attr("page")+'/'+id,function(resData){
            $.each(resData,function(key, value){
                $('input[name="'+key+'"].uk-input').val(value).trigger('change');
                if(page=='rent'){
                    $('select[name="'+key+'"]').val(value).trigger('change')
                }
            })
            $("#back").data('id', resData['id']);
            $("#submit").data({'id': resData['id'], 'store': "edit"});
        })
    });
    $("#table").on('click','.trash',function(){
        id = $(this).data('id');
        io.socket.delete('/'+$(".pointer").attr("page")+'/'+id,function(resData){
        });
        $("tr#"+id).remove()
    })
    $("#table").on('click','#back',function(){
        col=$(".pointer").attr("data-id")
        if(col!="0"){
            $("#"+col).toggle();
            $(".pointer").attr("data-id",0)
        }
        $("#formRow").toggle();
    });
    $("#table").on('click','#submit',function(){
        page = $(".pointer").attr("page");
        var flag=true;
        $('input.uk-input').each(function(){
            $(this).trigger('change');
            if($(this).hasClass("uk-form-danger")){
                flag=false;
            }
            
        })
        if(flag==true){
            switch($(this).data('store')) {
                case 'create':
                    data = $("#submitForm").serializeFormJSON();
                    $("#formRow").toggle();
                    io.socket.post('/'+page,data,function(resData){
                        id = resData['id'];
                        row = $('<tr/>',{id:id});
                        ['id', 'createdAt', 'updatedAt', 'cashed', 'events'].forEach(e => delete resData[e]);
                        $.each(resData,function(key, value){
                            $(row).append(
                                $('<td/>',{
                                    name: key,
                                    text: value,
                                    class: "uk-text-small"
                                })
                            )
                            switch(key){
                                case 'validityCit':
                                    io.socket.post('/event',{
                                        description: "Гражданска",
                                        date: value,
                                        vehicle: id
                                    })
                                break;
                                case 'validityAuto':
                                    io.socket.post('/event',{
                                        description: "Автокаско",
                                        date: value,
                                        vehicle: id
                                    })
                                break;
                                case 'annual':
                                    io.socket.post('/event',{
                                        description: "Годишен Преглед",
                                        date: value,
                                        vehicle: id
                                    })
                                break;
                            }
                        });
                        buttons = $('<td/>', {}); 
                        edit = $('<a/>',{
                                class: 'uk-icon-link edit',
                                'data-id': id,
                                'uk-icon': 'icon: pencil'
                            }).appendTo(buttons);
                        trash = $('<a/>',{
                                class: 'uk-icon-link trash',
                                'data-id': id,
                                'uk-icon': 'icon: trash'
                            }).appendTo(buttons);
                        if(page=='rent'){
                            print = $('<a/>',{
                                class: 'uk-icon-link print',
                                'data-id': id,
                                'uk-icon': 'icon: download'
                            }).appendTo(buttons);
                            cash = $('<a/>',{
                                    class: 'uk-icon-link cash',
                                    'data-id': id,
                                    'uk-icon': 'icon: play'
                                }).appendTo(buttons);
                        }
                        $(row).append(buttons);
                        
                        row.appendTo('#table');
                    })
                    $("#submitForm").trigger("reset");
                    break;
                case 'edit':
                    page = $(".pointer").attr("page");
                    id = $(this).data('id');
                    switchToggle(id);
                    $(".pointer").attr("data-id",0)
                    data = $("#submitForm").serializeFormJSON();
                    row = $('tr#'+id);
                    io.socket.patch('/'+$(".pointer").attr("page")+'/'+id,data,function(resData){
                        $.each(resData,function(key, value){
                            $(row).children('td[name="'+key+'"]').text(value);
                        })
                        $(row).children('.edit').data('id', resData['id']);
                        $(row).children('.trash').data('id', resData['id']);
                        $("#submit").data({'id': resData['id'], 'store': "edit"});
                    })
                    break;
            }
        }
    })
    $('#search').on('change input paste',function(e){
        value = $(this).val();
        e.preventDefault();
        $("td").filter(function() {
            re = new RegExp(value, 'gi');
            return $(this).text().match(re);
        }).parents("tr").prependTo('#table');
    })
    function switchToggle(id){
        $("#formRow").toggle();
        $("#"+id).toggle();
    }
    (function ($) {
        $.fn.serializeFormJSON = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    })(jQuery);
});