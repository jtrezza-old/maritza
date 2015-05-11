
var backbone = require('backbone');
var _ = require('underscore');

(function($, Backbone, _){

    //Post model
    var post = {
        id: null,
        title: null,
        slug: null,
        body: null,
        state_id: null,
        user_id: null
    };

    //Extending post object with Backbone.Events methods to make it capable of listen changes from views.
    _.extend(post, Backbone.Events);

    //Declaring elements that belong to the DOM after the DOM is ready
    $(document).on('ready', function(){

        var txaPostText = document.getElementById('txaPostText'),
            txaPostLive = document.getElementById('txaPostLive');

        //Giving the textareas the Backbone.Events methods too.
        _.extend(txaPostText, Backbone.Events);
        _.extend(txaPostLive, Backbone.Events);

        //Assigning the textareas changing events a callback.
        txaPostText.onkeyup = txaPostText.onblur = txaPostLive.onkeyup = txaPostLive.onblur = textChange;

        //Listening to the textareas changing events from the Post model.
        post.listenTo(txaPostText, 'change', postListening);
        post.listenTo(txaPostLive, 'change', postListening);

        //TODO: Implement listeners on views to reflect changes on the model
    });

    //Callback for Post model events listener.
    var postListening = function(data, element){
        var obj = this;
        for(var i in data){
            obj[i] = data[i];
            console.log('Received from '+element.id+ ': '+ data[i]);
        }
    };

    //Callback for texteareas changing events.
    var textChange = function(){
        var element = this,
            data = {body: element.value};

        this.trigger("change", data, element);
    };
}(jQuery, backbone, _));