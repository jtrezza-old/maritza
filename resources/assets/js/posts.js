
var backbone    = require('backbone');
var _           = require('underscore');
var post        = require('./my_modules/models/post');

(function($, Backbone, _, post){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Extending post object with Backbone.Events methods to make it capable of listen changes from views.
    _.extend(post, Backbone.Events);

    //Declaring elements that belong to the DOM after the DOM is ready
    $(document).on('ready', function(){

        var txaPostText = document.getElementById('txaPostText'),
            txaPostLive = document.getElementById('txaPostLive'),
            boxPreview  = document.getElementById('boxPreview');

        //Giving the textareas the Backbone.Events methods too.
        _.extend(txaPostText, Backbone.Events);
        _.extend(txaPostLive, Backbone.Events);
        _.extend(boxPreview, Backbone.Events);

        //Assigning the textareas' changing events a callback.
        txaPostText.onkeyup = txaPostText.onblur = txaPostLive.onkeyup = txaPostLive.onblur = textChange;

        //Listening to the textareas' changing events from the Post model.
        post.listenTo(txaPostText, 'change', postListening);
        post.listenTo(txaPostLive, 'change', postListening);

        //Listening to the textareas' changing events from the each other textarea
        txaPostLive.listenTo(txaPostText, 'change', txaListening);
        txaPostText.listenTo(txaPostLive, 'change', txaListening);

        boxPreview.listenTo(post, 'change', boxPreviewListening);
    });

    var boxPreviewListening = function(data){
        var box = this;
        $.ajax({
            url: '/parser/parse',
            data: {text: data.body},
            type: 'post',
            dataType: 'html',
            success: function(r){
                box.innerHTML = r;
            }
        });
    };

    //Callback por textareas' events listener.
    var txaListening = function(data, element){
        if(this.value !== element.value){
            this.value = element.value;
        }
    };

    //Callback for Post model events listener.
    var postListening = function(data, element){
        var obj = this;
        var changed = false;
        for(var i in data){
            //Detecting changes in object
            changed = (obj[i] !== data[i]) ? true : changed;
            obj[i] = data[i];
        }
        if(changed){
            obj.trigger("change", obj);
        }
    };

    //Callback for texteareas' changing events.
    var textChange = function(){
        var element = this,
            data = {body: element.value};

        this.trigger("change", data, element);
    };
}(jQuery, backbone, _, post));